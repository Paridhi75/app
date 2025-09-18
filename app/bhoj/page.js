"use client";

import { useEffect, useState } from "react";

export default function BhojPage() {
  const [bhoj, setBhoj] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBhoj() {
      try {
        const res = await fetch("/api/bhoj");
        const data = await res.json();
        setBhoj(data);
      } catch (err) {
        console.error("Error fetching bhoj:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBhoj();
  }, []);

  if (loading) return <p>Loading bhoj...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Bhoj Options</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bhoj.map((b) => (
          <div key={b.bhoj_id} className="border rounded-lg p-4 shadow-md">
            <p>Price/Person: ₹{b.price_per_person}</p>
            <p>Capacity: {b.capacity}</p>
            <p>Total Price: ₹{b.total_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
