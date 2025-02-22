const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

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
  if (!baseUrl) {
    console.error("ERROR: BASE_URL is undefined.");
    return [];
  }

  try {
    const response = await fetch(`${baseUrl}/dogs/search?size=25`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch dog IDs: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.resultIds || [];
  } catch (error) {
    console.error("Error fetching dog IDs:", error);
    return [];
  }
};

export const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  try {
    const response = await fetch(`${baseUrl}/dogs`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dogIds.slice(0, 100)), // Fetch max 100 at a time
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch dog details: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching dog details:", error);
    return [];
  }
};
