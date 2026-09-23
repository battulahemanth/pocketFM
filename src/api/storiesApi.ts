import type { Story } from "../types/story";

const API_URL = "http://localhost:5000/api/stories";

export const getStories = async (): Promise<Story[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  return response.json();
};


export const createStory = async (
  story: Story
): Promise<Story> => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(story),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to create story"
    );
  }

  return response.json();
};


export const updateStoryApi = async (
  story: Story
): Promise<Story> => {
  const response = await fetch(
    `${API_URL}/${story.id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(story),
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to update story"
    );
  }

  return response.json();
};


export const deleteStoryApi = async (
  id: string
) => {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.message || "Failed to delete story"
    );
  }

  return response.json();
};