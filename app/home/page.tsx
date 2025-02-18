"use client";
import { useEffect, useState } from "react";
import { fetchAvailableBreeds } from "../api/search/route";

export default function Home() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDogBreeds = async () => {
      try {
        const breeds = await fetchAvailableBreeds();
        setBreeds(breeds);
        console.log("breeds: ", breeds);
      } catch (err) {
        setError(`Failed to fetch available dogs:  ${err}`);
      } finally {
        setLoading(false);
      }
    };

    getDogBreeds();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Available Dog Breeds</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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
