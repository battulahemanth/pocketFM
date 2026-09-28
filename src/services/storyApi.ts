import type { Story } from "../types/story";

const API_URL = "http://localhost:5000/api/stories";

export const getAllStories = async (): Promise<Story[]> => {
  const response = await fetch(`${API_URL}/getAllStories`);

  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }

  const data = await response.json();

  return data;
};