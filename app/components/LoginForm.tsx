"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        setMessage("Form submitted successfully!");
        setName("");
        setEmail("");
        router.push("/home");
      } else {
        setMessage("Error submitting form.");
      }
    } catch (error) {
      setMessage(`Network error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow-md">
      <h2 className="text-l font-semibold mb-2">Submit Your Details</h2>
      <div className="mb-2 p-2 border rounded-md">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div className="mb-2 p-2 border rounded-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
};

export default LoginForm;
