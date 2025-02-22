"use client";
import { useEffect, useState } from "react";
import { fetchAvailableBreeds } from "../api/search/route";

export default function FetchBreeds() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogBreeds = async () => {
      try {
        const breeds = await fetchAvailableBreeds();
        setBreeds(breeds);
      } catch (err) {
        setError(`Failed to fetch available dogs:  ${err}`);
      } finally {
        setLoading(false);
      }
    };

    getDogBreeds();
  }, []);

  return (
    <div className="p-2 max-w-md mx-auto border rounded-md shadow-md">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <label className="font-semibold pr-4 mb-4">Filter by Breeds</label>

      {!loading && !error && (
        <select className="space-y-3">
          {breeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      )}
    </div>
  );
}
