"use client";
import { useEffect, useState } from "react";
// import Image from "next/image";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/dogs/breeds`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const breeds: string[] = await response.json();
        setBreeds(breeds);

        // const result: DataItem[] = await response.json();
        // setData(result);
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Dog Breeds</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="list-disc pl-5">
          {breeds.map((breed, index) => (
            <li key={index}>{breed}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
