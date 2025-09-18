import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET all samagri
export async function GET() {
  const [rows] = await pool.query("SELECT * FROM Samagri");
  return NextResponse.json(rows);
}

// POST new samagri
export async function POST(req) {
  const { option_name, price } = await req.json();
  await pool.query(
    "INSERT INTO Samagri (option_name, price) VALUES (?, ?)",
    [option_name, price]
  );
  return NextResponse.json({ message: "Samagri added ✅" });
}
