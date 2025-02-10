import { connectToDatabase } from "@/app/lib/db";
import File from "@/app/models/File";

export async function GET() {
  try {
    await connectToDatabase();
    const files = await File.find({});
    return Response.json(files, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
