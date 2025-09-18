"use client";

import { useEffect, useState } from "react";

export default function PanditPage() {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPandits() {
      try {
        const res = await fetch("/api/pandit");
        const data = await res.json();
        setPandits(data);
      } catch (err) {
        console.error("Error fetching pandits:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPandits();
  }, []);

  if (loading) return <p>Loading pandits...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Pandit Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pandits.map((p) => (
          <div key={p.full_id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{p.full_name}</h2>
            <p>Specialization: {p.specialization}</p>
            <p>Experience: {p.experience_years} years</p>
            <p>Language: {p.language}</p>
            <p>Phone: {p.phone_number}</p>
            <p>Fees: ₹{p.fees}</p>
            <p>Date: {new Date(p.available_date).toLocaleDateString()}</p>
            <p>Time: {p.available_time}</p>
            <p>Available: {p.is_available ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
