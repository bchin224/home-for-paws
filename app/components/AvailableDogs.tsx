"use client"; // Needed for useEffect in Next.js App Router

import { useEffect, useState } from "react";
import { fetchDogIDs, fetchDogDetails } from "../api/search/route";
import Filter from "./Filter";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export default function AvailableDogs() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const sortByBreed = (dogs: Dog[]): Dog[] => {
  //   return dogs.sort((a, b) => a.breed.localeCompare(b.breed));
  // };

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);

      // Get all dog IDs
      const dogIds = await fetchDogIDs();
      if (dogIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch dog details in batches of 100 (API limit)
      const dogDetails: Dog[] = [];
      for (let i = 0; i < dogIds.length; i += 100) {
        const batchIds = dogIds.slice(i, i + 100);
        const batchDogs = await fetchDogDetails(batchIds);

        dogDetails.push(...batchDogs);
      }

      // // sort alphabetically by breed
      // const sortedDogs = sortByBreed(dogDetails);
      // setDogs(sortedDogs);

      setDogs(dogDetails);
      setLoading(false);
    };

    fetchDogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Available Dogs</h1>
      <Filter />
      {loading ? (
        <p>Loading dogs...</p>
      ) : dogs.length === 0 ? (
        <p>No dogs found.</p>
      ) : (
        <ul className="grid grid-cols-3 gap-4">
          {dogs.map((dog) => (
            <li key={dog.id} className="border p-2 rounded-md shadow-md">
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
