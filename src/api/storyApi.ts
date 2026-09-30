import type { Story } from "../types/story";
import.meta.env.VITE_API_URL

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const request = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const body = (await response.json().catch(() => null)) as
    | T
    | { message?: string }
    | null;

  if (!response.ok) {
    const message =
      body &&
      typeof body === "object" &&
      "message" in body
        ? body.message
        : undefined;

    throw new Error(
      message ?? `Request failed with status ${response.status}`
    );
  }

  return body as T;
};

export const getStories = (): Promise<Story[]> =>
  request<Story[]>("/api/stories");

export const createStory = async (
  story: Story
): Promise<Story> => {
  const response = await request<{ story: Story }>(
    "/api/stories",
    {
      method: "POST",
      body: JSON.stringify(story),
    }
  );

  return response.story;
};

export const updateStoryApi = async (
  story: Story
): Promise<Story> => {
  const response = await request<{ story: Story }>(
    `/api/stories/${encodeURIComponent(story.id)}`,
    {
      method: "PUT",
      body: JSON.stringify(story),
    }
  );

  return response.story;
};

export const deleteStoryApi = (
  storyId: string
): Promise<void> =>
  request<void>(
    `/api/stories/${encodeURIComponent(storyId)}`,
    {
      method: "DELETE",
    }
  );