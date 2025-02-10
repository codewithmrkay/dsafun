"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Admin() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (password !== "Mrk@123") {
      alert("Wrong PassWork , Ask the daddy i.e KK😎");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Upload failed!");
    }
  };

  return (
    <div className="bg-black text-white flex flex-col items-center gap-3 pt-5 h-screen w-full">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Upload Files</h1>
      <button
        className="cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => router.push("/")}>Go to Upload Page</button>
      <form 
      className="rounded-2xl pt-5 p-4 flex gap-3 items-center flex-col border-2 border-dashed border-gray-400 text-center"
      onSubmit={handleUpload}>
        <input 
        className="bg-gray-800 border border-gray-500 p-2 rounded-lg"
        type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input 
        className="w-[250px] cursor-pointer p-3 bg-gray-800 rounded-2xl"
        type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button 
        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        type="submit">Upload</button>
      </form>
    </div>
  );
}
