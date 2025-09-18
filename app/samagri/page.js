"use client";

import { useEffect, useState } from "react";

export default function SamagriPage() {
  const [samagri, setSamagri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSamagri() {
      try {
        const res = await fetch("/api/samagri");
        const data = await res.json();
        setSamagri(data);
      } catch (err) {
        console.error("Error fetching samagri:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSamagri();
  }, []);

  if (loading) return <p>Loading samagri...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Samagri Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {samagri.map((s) => (
          <div key={s.samagri_id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{s.option_name}</h2>
            <p>Price: ₹{s.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
