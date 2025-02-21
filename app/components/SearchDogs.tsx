"use client"; // Needed for useEffect in Next.js App Router

import { useEffect, useState } from "react";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

const fetchDogIDs = async (): Promise<string[]> => {
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

const fetchDogDetails = async (dogIds: string[]): Promise<Dog[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error("❌ ERROR: BASE_URL is undefined.");
    return [];
  }

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
    console.error("❌ Error fetching dog details:", error);
    return [];
  }
};

export default function AvailableDogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);

      // Step 1: Get all dog IDs
      const dogIds = await fetchDogIDs();
      if (dogIds.length === 0) {
        setLoading(false);
        return;
      }

      // Step 2: Fetch dog details in batches of 100 (API limit)
      const dogDetails: Dog[] = [];
      for (let i = 0; i < dogIds.length; i += 100) {
        const batchIds = dogIds.slice(i, i + 100);
        const batchDogs = await fetchDogDetails(batchIds);
        dogDetails.push(...batchDogs);
      }

      setDogs(dogDetails);
      setLoading(false);
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Available Dogs</h1>
      {loading ? (
        <p>Loading dogs...</p>
      ) : dogs.length === 0 ? (
        <p>No dogs found.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {dogs.map((dog) => (
            <li key={dog.id} className="border p-4 rounded-md shadow-md">
              <img
                src={dog.img}
                alt={dog.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{dog.name}</h2>
              <p>Breed: {dog.breed}</p>
              <p>Age: {dog.age} years</p>
              <p>Zip Code: {dog.zip_code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
