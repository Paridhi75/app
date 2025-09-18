import { NextResponse } from "next/server";
import pool from "@/lib/db";  // MySQL connection

/* ================== GET ALL USERS ================== */
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM Users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

/* ================== CREATE USER ================== */
export async function POST(request) {
  try {
    const { full_name, email, password } = await request.json();

    if (!full_name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO Users (full_name, email, password) VALUES (?, ?, ?)",
      [full_name, email, password]
    );

    return NextResponse.json({ message: "✅ User created", user_id: result.insertId });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

/* ================== UPDATE USER ==================
   Example: PUT /api/users?id=3
   Body: { "email": "new@mail.com", "password": "newpass" }
=================================================== */
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const { email, password } = await request.json();

    const [result] = await pool.query(
      "UPDATE Users SET email = ?, password = ? WHERE user_id = ?",
      [email, password, id]
    );

    return NextResponse.json({ message: "✅ User updated", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

/* ================== DELETE USER ==================
   Example: DELETE /api/users?id=3
=================================================== */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    const [result] = await pool.query("DELETE FROM Users WHERE user_id = ?", [id]);

    return NextResponse.json({ message: "✅ User deleted", affectedRows: result.affectedRows });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
