"use client";
import FetchBreeds from "../components/BreedSelector";

// import { useEffect, useState } from "react";
// import { fetchAvailableBreeds } from "../api/search/route";
// import { fetchBreeds } from "../components/FetchBreeds";

export default function Dashboard() {
  return (
    <div>
      <FetchBreeds />
    </div>
  );
}
