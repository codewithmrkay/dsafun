import { connectToDatabase } from "@/app/lib/db"
import File from "@/app/models/File";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);

    await connectToDatabase();
    const newFile = new File({
      filename: file.name,
      filepath: `/uploads/${filename}`,
    });

    await newFile.save();

    return Response.json({ message: "File uploaded", file: newFile }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
