import { NextResponse } from "next/server";
import pool from "@/lib/db";  // MySQL connection

/* ================== GET ALL PANDIT ================== */
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM PanditFullDetails");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error fetching Pandit:", error);
    return NextResponse.json({ error: "Failed to fetch Pandit" }, { status: 500 });
  }
}

/* ================== CREATE PANDIT ================== */
export async function POST(request) {
  try {
    const { full_name, specialization, experience_years, language, phone_number, fees, available_date, available_time, is_available } = await request.json();

    if (!full_name || !specialization || !experience_years || !language || !phone_number || !fees || !available_date || !available_time) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const [result] = await pool.query(
      `INSERT INTO PanditFullDetails 
       (full_name, specialization, experience_years, language, phone_number, fees, available_date, available_time, is_available) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [full_name, specialization, experience_years, language, phone_number, fees, available_date, available_time, is_available]
    );

    return NextResponse.json({ message: "✅ Pandit created", full_id: result.insertId });
  } catch (error) {
    console.error("❌ Error creating Pandit:", error);
    return NextResponse.json({ error: "Failed to create Pandit" }, { status: 500 });
  }
}

// /* ================== UPDATE PANDIT ================== 
//    Example: PUT /api/pandit?id=3
//    Body: { "fees": 500, "is_available": true }
// =================================================== */
// export async function PUT(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Pandit ID required" }, { status: 400 });
//     }

//     const { full_name, specialization, experience_years, language, phone_number, fees, available_date, available_time, is_available } = await request.json();

//     const [result] = await pool.query(
//       `UPDATE PanditFullDetails SET full_name=?, specialization=?, experience_years=?, language=?, phone_number=?, fees=?, available_date=?, available_time=?, is_available=? WHERE full_id=?`,
//       [full_name, specialization, experience_years, language, phone_number, fees, available_date, available_time, is_available, id]
//     );

//     return NextResponse.json({ message: "✅ Pandit updated", affectedRows: result.affectedRows });
//   } catch (error) {
//     console.error("❌ Error updating Pandit:", error);
//     return NextResponse.json({ error: "Failed to update Pandit" }, { status: 500 });
//   }
// }

// /* ================== DELETE PANDIT ==================
//    Example: DELETE /api/pandit?id=3
// =================================================== */
// export async function DELETE(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ error: "Pandit ID required" }, { status: 400 });
//     }

//     const [result] = await pool.query("DELETE FROM PanditFullDetails WHERE full_id = ?", [id]);

//     return NextResponse.json({ message: "✅ Pandit deleted", affectedRows: result.affectedRows });
//   } catch (error) {
//     console.error("❌ Error deleting Pandit:", error);
//     return NextResponse.json({ error: "Failed to delete Pandit" }, { status: 500 });
//   }
// }