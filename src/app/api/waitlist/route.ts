import { NextRequest, NextResponse } from "next/server";

// Waitlist API route
// Stores emails in Supabase (free tier).
// Setup: create a "waitlist" table with columns: id (uuid), email (text), idea (text), created_at (timestamp)
// Then add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your .env.local

export async function POST(req: NextRequest) {
  try {
    const { email, idea } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // If Supabase isn't set up yet, just log and return success
    // This lets you launch the page before wiring up the DB
    if (!supabaseUrl || !supabaseKey) {
      console.log(`[WAITLIST] New signup: ${email} (idea: ${idea})`);
      console.warn("Supabase not configured — email logged to console only.");
      return NextResponse.json({ success: true, fallback: true });
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email, idea }),
    });

    if (!res.ok) {
      const err = await res.text();
      // Handle duplicate email gracefully
      if (err.includes("duplicate") || err.includes("unique")) {
        return NextResponse.json({ success: true, duplicate: true });
      }
      throw new Error(err);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[WAITLIST] Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
