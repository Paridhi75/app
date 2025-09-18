"use client";

import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Bookings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((b) => (
          <div key={b.booking_id} className="border rounded-lg p-4 shadow-md">
            <p>User ID: {b.user_id}</p>
            <p>Pandit ID: {b.full_id}</p>
            <p>Samagri ID: {b.samagri_id}</p>
            <p>Bhoj ID: {b.bhoj_id}</p>
            <p>Date: {new Date(b.booking_date).toLocaleDateString()}</p>
            <p>Time: {b.booking_time}</p>
            <p>Review: {b.review || "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
