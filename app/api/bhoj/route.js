import { NextResponse } from "next/server";
import pool from "@/lib/db";  // MySQL connection

/* ================== GET ALL BHOJ ================== */
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM Bhoj");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error fetching Bhoj:", error);
    return NextResponse.json({ error: "Failed to fetch Bhoj" }, { status: 500 });
  }
}

/* ================== CREATE BHOJ ================== */
export async function POST(request) {
  try {
    const { price_per_person, capacity, total_price } = await request.json();

    if (!price_per_person || !capacity || !total_price) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO Bhoj (price_per_person, capacity, total_price) VALUES (?, ?, ?)",
      [price_per_person, capacity, total_price]
    );

    return NextResponse.json({ message: "✅ Bhoj created", bhoj_id: result.insertId });
  } catch (error) {
    console.error("❌ Error creating Bhoj:", error);
    return NextResponse.json({ error: "Failed to create Bhoj" }, { status: 500 });
  }
}

/* ================== UPDATE BHOJ ================== 
   Example: PUT /api/bhoj?id=2
   Body: { "price_per_person": 150, "capacity": 200, "total_price": 30000 }
=================================================== */
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Bhoj ID required" }, { status: 400 });
    }

    const { price_per_person, capacity, total_price } = await request.json();

    const [result] = await pool.query(
      "UPDATE Bhoj SET price_per_person = ?, capacity = ?, total_price = ? WHERE bhoj_id = ?",
      [price_per_person, capacity, total_price, id]
    );

    return NextResponse.json({ message: "✅ Bhoj updated", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error updating Bhoj:", error);
    return NextResponse.json({ error: "Failed to update Bhoj" }, { status: 500 });
  }
}

/* ================== DELETE BHOJ ==================
   Example: DELETE /api/bhoj?id=2
=================================================== */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Bhoj ID required" }, { status: 400 });
    }

    const [result] = await pool.query("DELETE FROM Bhoj WHERE bhoj_id = ?", [id]);

    return NextResponse.json({ message: "✅ Bhoj deleted", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error deleting Bhoj:", error);
    return NextResponse.json({ error: "Failed to delete Bhoj" }, { status: 500 });
  }
}
