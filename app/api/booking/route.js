import { NextResponse } from "next/server";
import pool from "@/lib/db";  // MySQL connection

/* ================== GET ALL BOOKINGS ================== */
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM Bookings");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error fetching Bookings:", error);
    return NextResponse.json({ error: "Failed to fetch Bookings" }, { status: 500 });
  }
}

/* ================== CREATE BOOKING ================== */
export async function POST(request) {
  try {
    const { user_id, full_id, samagri_id, bhoj_id, booking_date, booking_time, review } = await request.json();

    if (!user_id || !full_id || !samagri_id || !bhoj_id || !booking_date || !booking_time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO Bookings (user_id, full_id, samagri_id, bhoj_id, booking_date, booking_time, review) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, full_id, samagri_id, bhoj_id, booking_date, booking_time, review]
    );

    return NextResponse.json({ message: "✅ Booking created", booking_id: result.insertId });
  } catch (error) {
    console.error("❌ Error creating Booking:", error);
    return NextResponse.json({ error: "Failed to create Booking" }, { status: 500 });
  }
}

/* ================== UPDATE BOOKING ==================
   Example: PUT /api/bookings?id=5
   Body: { "booking_date": "2025-09-18", "booking_time": "12:30:00", "review": "Great service" }
=================================================== */
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    }

    const { booking_date, booking_time, review } = await request.json();

    const [result] = await pool.query(
      "UPDATE Bookings SET booking_date = ?, booking_time = ?, review = ? WHERE booking_id = ?",
      [booking_date, booking_time, review, id]
    );

    return NextResponse.json({ message: "✅ Booking updated", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error updating Booking:", error);
    return NextResponse.json({ error: "Failed to update Booking" }, { status: 500 });
  }
}

/* ================== DELETE BOOKING ==================
   Example: DELETE /api/bookings?id=5
=================================================== */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
    }

    const [result] = await pool.query("DELETE FROM Bookings WHERE booking_id = ?", [id]);

    return NextResponse.json({ message: "✅ Booking deleted", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error deleting Booking:", error);
    return NextResponse.json({ error: "Failed to delete Booking" }, { status: 500 });
  }
}
