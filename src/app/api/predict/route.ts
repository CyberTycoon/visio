import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    const res = await fetch(`${process.env.API_URL}/predict/`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend API error:", errorText);
        return NextResponse.json({ error: `Error from backend: ${res.statusText}` }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
}
