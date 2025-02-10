import { connectToDatabase } from "@/app/lib/db";
import File from "@/app/models/File";
import { unlink } from "fs/promises";
import { join } from "path";

export async function DELETE(req) {
  try {
    const { id, password } = await req.json();

    if (password !== "Mrk@123") {
      return Response.json({ error: "Ask the daddy" }, { status: 401 });
    }

    await connectToDatabase();
    const file = await File.findById(id);

    if (!file) {
      return Response.json({ error: "File not found" }, { status: 404 });
    }

    const filePath = join(process.cwd(), "public", file.filepath);
    await unlink(filePath); // Delete the actual file from storage

    await File.findByIdAndDelete(id); // Remove from DB

    return Response.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
