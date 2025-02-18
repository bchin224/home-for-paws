const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchAvailableBreeds = async () => {
  try {
    const response = await fetch(`${baseUrl}/dogs/breeds`, {
      method: "GET",
      credentials: "include", // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to fetch available dog breeds");
    }

    const breeds: [] = await response.json();
    return breeds;
  } catch (error) {
    console.error("Error fetching available dogs:", error);
    return [];
  }
};
