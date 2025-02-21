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

export const fetchDogIDs = async (): Promise<string[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error("❌ ERROR: BASE_URL is undefined.");
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}/dogs/search?size=25`, {
      method: "GET",
      credentials: "include", // Ensure cookies are sent for authentication
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch dog IDs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.resultIds || [];
  } catch (error) {
    console.error("❌ Error fetching dog IDs:", error);
    return [];
  }
};
