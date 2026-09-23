import {
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState } from "../../app/store";

import {
  createStory,
  deleteStoryApi,
  getStories,
  updateStoryApi,
} from "../../api/storyApi";

import {
  addStory,
  deleteStory,
  updateStory,
} from "../../features/stories/storySlice";

import type {
  Episode,
  Story,
} from "../../types/story";

import "./AdminDashboard.css";


const createEpisode = (): Episode => ({
  id: `ep-${Date.now()}-${Math.random()}`,
  title: "",
  duration: "10:00",
  audioUrl: "",
  locked: false,
});


const createStoryForm = (): Story => ({
  id: `story-${Date.now()}-${Math.random()}`,
  title: "",
  author: "",
  rating: 4.5,
  plays: 0,
  image: "",
  category: "Fantasy",
  subcategory: "Adventure",
  description: "",
  episodes: [createEpisode()],
});


const fileToBase64 = (
  file: File
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(
        new Error("Failed to read file")
      );
    };

    reader.readAsDataURL(file);
  });
};


function AdminDashboard() {
  const dispatch = useDispatch();

  const stories = useSelector(
    (state: RootState) =>
      state.stories.items
  );

  const [formData, setFormData] =
    useState<Story>(createStoryForm());

  const [isEditing, setIsEditing] =
    useState(false);

  const [loadingStories, setLoadingStories] =
    useState(false);

  const [savingStory, setSavingStory] =
    useState(false);

  const [deletingStory, setDeletingStory] =
    useState(false);

  const hasLoadedStories =
    useRef(false);


  useEffect(() => {
    if (hasLoadedStories.current) {
      return;
    }

    hasLoadedStories.current = true;

    const loadStories = async () => {
      try {
        setLoadingStories(true);

        const data = await getStories();

        data.forEach((story) => {
          const alreadyExists = stories.some(
            (existingStory) =>
              existingStory.id === story.id
          );

          if (!alreadyExists) {
            dispatch(addStory(story));
          }
        });
      } catch (error) {
        console.error(
          "Failed to load stories:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to load stories"
        );
      } finally {
        setLoadingStories(false);
      }
    };

    loadStories();
  }, [dispatch, stories]);


  const resetForm = () => {
    setFormData(createStoryForm());
    setIsEditing(false);
  };


  const updateField = <
    K extends keyof Story
  >(
    key: K,
    value: Story[K]
  ) => {
    setFormData((previous) => ({
      ...previous,
      [key]: value,
    }));
  };


  const updateEpisode = (
    episodeId: string,
    field: keyof Episode,
    value: string | boolean
  ) => {
    setFormData((previous) => ({
      ...previous,

      episodes: previous.episodes.map(
        (episode) =>
          episode.id === episodeId
            ? {
                ...episode,
                [field]: value,
              }
            : episode
      ),
    }));
  };


  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    try {
      const imageBase64 =
        await fileToBase64(file);

      updateField("image", imageBase64);
    } catch (error) {
      console.error(
        "Image loading error:",
        error
      );

      alert("Failed to load image.");
    }
  };


  const handleAudioChange = async (
    episodeId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("audio/")) {
      alert("Please select a valid audio file.");
      event.target.value = "";
      return;
    }

    try {
      const audioBase64 =
        await fileToBase64(file);

      updateEpisode(
        episodeId,
        "audioUrl",
        audioBase64
      );
    } catch (error) {
      console.error(
        "Audio loading error:",
        error
      );

      alert("Failed to load audio file.");
    }
  };


  const addEpisode = () => {
    setFormData((previous) => ({
      ...previous,

      episodes: [
        ...previous.episodes,
        createEpisode(),
      ],
    }));
  };


  const removeEpisode = (
    episodeId: string
  ) => {
    setFormData((previous) => ({
      ...previous,

      episodes: previous.episodes.filter(
        (episode) =>
          episode.id !== episodeId
      ),
    }));
  };


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (savingStory) {
      return;
    }

    const sanitizedStory: Story = {
      ...formData,

      episodes: formData.episodes.map(
        (episode, index) => ({
          ...episode,
          id:
            episode.id ||
            `ep-${Date.now()}-${index}`,
        })
      ),
    };

    try {
      setSavingStory(true);

      if (isEditing) {
        const updatedStory =
          await updateStoryApi(
            sanitizedStory
          );

        dispatch(updateStory(updatedStory));

        alert(
          "Story updated successfully!"
        );
      } else {
        const newStory =
          await createStory(
            sanitizedStory
          );

        dispatch(addStory(newStory));

        alert(
          "Story added successfully!"
        );
      }

      resetForm();
    } catch (error) {
      console.error(
        "Story save error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save story"
      );
    } finally {
      setSavingStory(false);
    }
  };


  const handleEdit = (story: Story) => {
    setFormData({
      ...story,

      episodes: story.episodes.map(
        (episode) => ({
          ...episode,
        })
      ),
    });

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const handleDelete = async (
    storyId: string
  ) => {
    if (deletingStory) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this story?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingStory(true);

      await deleteStoryApi(storyId);

      dispatch(deleteStory(storyId));

      if (
        isEditing &&
        formData.id === storyId
      ) {
        resetForm();
      }

      alert(
        "Story deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete story error:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete story"
      );
    } finally {
      setDeletingStory(false);
    }
  };


  return (
    <main className="admin-dashboard">
      <header className="admin-dashboard__header">
        <h1>Admin Dashboard</h1>

        <p>
          Manage stories, episodes,
          and content for the app.
        </p>
      </header>

      <section className="admin-dashboard__layout">
        <div className="admin-panel">
          <form
            className="admin-form"
            onSubmit={handleSubmit}
          >
            <label className="admin-form__full">
              Story title

              <input
                type="text"
                value={formData.title}
                onChange={(event) =>
                  updateField(
                    "title",
                    event.target.value
                  )
                }
                placeholder="Enter story title"
                required
              />
            </label>

            <label>
              Author

              <input
                type="text"
                value={formData.author}
                onChange={(event) =>
                  updateField(
                    "author",
                    event.target.value
                  )
                }
                placeholder="Author name"
                required
              />
            </label>

            <label>
              Rating

              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(event) =>
                  updateField(
                    "rating",
                    Number(event.target.value)
                  )
                }
              />
            </label>

            <label>
              Plays

              <input
                type="number"
                min="0"
                value={formData.plays}
                onChange={(event) =>
                  updateField(
                    "plays",
                    Number(event.target.value)
                  )
                }
              />
            </label>

            <label>
              Category

              <input
                type="text"
                value={formData.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value
                  )
                }
                placeholder="Fantasy"
              />
            </label>

            <label>
              Subcategory

              <input
                type="text"
                value={formData.subcategory}
                onChange={(event) =>
                  updateField(
                    "subcategory",
                    event.target.value
                  )
                }
                placeholder="Adventure"
              />
            </label>

            <label className="admin-form__full">
              Story image

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {formData.image && (
                <div className="story-image-preview-wrapper">
                  <img
                    src={formData.image}
                    alt="Story preview"
                    className="story-image-preview"
                  />
                </div>
              )}
            </label>

            <label className="admin-form__full">
              Description

              <textarea
                value={formData.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Write a short description"
              />
            </label>

            <div className="story-spotlight admin-form__full">
              <div className="story-spotlight__header">
                <span className="story-spotlight__badge">
                  Story Magic
                </span>

                <h3>
                  {formData.title ||
                    "New Story Preview"}
                </h3>
              </div>

              <div className="story-spotlight__grid">
                <div className="story-spotlight__card story-spotlight__card--purple">
                  <span>Total Episodes</span>
                  <strong>
                    {formData.episodes.length}
                  </strong>
                </div>

                <div className="story-spotlight__card story-spotlight__card--orange">
                  <span>Story Mood</span>
                  <strong>
                    {formData.category ||
                      "Fantasy"}
                  </strong>
                </div>

                <div className="story-spotlight__card story-spotlight__card--pink">
                  <span>Reader Rating</span>
                  <strong>
                    {formData.rating || "4.5"}
                  </strong>
                </div>
              </div>

              <div className="story-spotlight__footer">
                <div>
                  <small>Audio Ready</small>

                  <p>
                    {formData.episodes.length > 0
                      ? "Episodes prepared for listening"
                      : "No episodes added yet"}
                  </p>
                </div>

                <div className="story-spotlight__icon">
                  🎧
                </div>
              </div>
            </div>

            <div className="episodes-manager admin-form__full">
              <div className="episodes-manager__header">
                <h3>Episodes</h3>

                <button
                  type="button"
                  className="admin-button admin-button--secondary"
                  onClick={addEpisode}
                >
                  + Add Episode
                </button>
              </div>

              <div className="episodes-manager__list">
                {formData.episodes.map(
                  (episode, index) => (
                    <div
                      key={episode.id}
                      className="episode-card"
                    >
                      <div className="episode-card__number">
                        {index + 1}
                      </div>

                      <div className="episode-card__fields">
                        <input
                          type="text"
                          value={episode.title}
                          onChange={(event) =>
                            updateEpisode(
                              episode.id,
                              "title",
                              event.target.value
                            )
                          }
                          placeholder={`Episode ${
                            index + 1
                          } title`}
                        />

                        <div className="episode-card__row">
                          <input
                            type="text"
                            value={episode.duration}
                            onChange={(event) =>
                              updateEpisode(
                                episode.id,
                                "duration",
                                event.target.value
                              )
                            }
                            placeholder="18:20"
                          />

                          <div className="episode-audio-field">
                            <input
                              type="file"
                              accept="audio/*"
                              onChange={(event) =>
                                handleAudioChange(
                                  episode.id,
                                  event
                                )
                              }
                            />

                            {episode.audioUrl && (
                              <audio
                                className="episode-audio-player"
                                controls
                                src={episode.audioUrl}
                              >
                                Your browser does not
                                support audio playback.
                              </audio>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="admin-button admin-button--danger episode-card__remove"
                        onClick={() =>
                          removeEpisode(
                            episode.id
                          )
                        }
                        disabled={
                          formData.episodes.length ===
                          1
                        }
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="admin-form__actions">
              <button
                type="submit"
                className="admin-button admin-button--primary"
                disabled={savingStory}
              >
                {savingStory
                  ? "Saving..."
                  : isEditing
                    ? "Update Story"
                    : "Add Story"}
              </button>

              <button
                type="button"
                className="admin-button admin-button--secondary"
                onClick={resetForm}
                disabled={savingStory}
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <aside className="admin-list">
          <h2>All Stories</h2>

          {loadingStories ? (
            <p>Loading stories...</p>
          ) : stories.length === 0 ? (
            <p>No stories found.</p>
          ) : (
            <ul className="story-admin-list">
              {stories.map((story) => (
                <li
                  key={story.id}
                  className="story-admin-item"
                >
                  <div className="story-admin-item__info">
                    <img
                      src={story.image}
                      alt={story.title}
                    />

                    <div className="story-admin-item__details">
                      <h3>{story.title}</h3>

                      <p>
                        {story.category} •{" "}
                        {story.episodes.length} episodes
                      </p>
                    </div>
                  </div>

                  <div className="story-admin-item__actions">
                    <button
                      type="button"
                      className="admin-button admin-button--secondary"
                      onClick={() =>
                        handleEdit(story)
                      }
                      disabled={
                        savingStory ||
                        deletingStory
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="admin-button admin-button--danger"
                      onClick={() =>
                        handleDelete(story.id)
                      }
                      disabled={
                        savingStory ||
                        deletingStory
                      }
                    >
                      {deletingStory
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>
    </main>
  );
}

export default AdminDashboard;
