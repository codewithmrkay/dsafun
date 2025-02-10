import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
});

export default mongoose.models.File || mongoose.model("File", FileSchema);
