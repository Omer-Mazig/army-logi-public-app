import { apiClient } from "./api-client";

/**
 * Fetch all soldiers from backend
 */
export async function getSoldiers() {
  try {
    const response = await apiClient.get("/soldiers");

    console.log("response.data", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching soldiers:", error);
    throw error;
  }
}

export async function getPersonalNumbers(): Promise<number[]> {
  try {
    const response = await apiClient.get("/soldiers/personal-numbers");
    return response.data;
  } catch (error) {
    console.error("Error fetching personal numbers:", error);
    throw error;
  }
}
