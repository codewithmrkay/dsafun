"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then(setFiles)
      .catch((err) => console.error("Error fetching files:", err));
  }, []);

  const handleDelete = async (id) => {
    const enteredPassword = prompt("Enter password to delete:");

    if (enteredPassword !== "Mrk@123") {
      alert("Wrong PassWork , Ask the daddy i.e KK😎");
      return;
    }

    const res = await fetch("/api/delete", {
      method: "DELETE",
      body: JSON.stringify({ id, password: enteredPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("File deleted successfully!");
      setFiles(files.filter((file) => file._id !== id));
    } else {
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-3 h-screen w-full bg-black text-white">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">File Viewer & Downloader</h1>
      <button
        className="cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={() => router.push("/admin")}>Go to Upload Page</button>
      <div className="rounded-2xl flex gap-3 items-center flex-col border-2 border-dashed border-gray-600 text-center">

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 shadow-lg p-4 rounded-lg ">
          Available File
        </h1>
        <ul className="rounded-2xl p-2 space-y-2 text-gray-300 border-gray-600">
          {files.map((file) => (
            <li
              className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition duration-300"
              key={file._id}>

              <a href={file.filepath} download>{file.filename}</a>
              <button 
              className="ml-5 cursor-pointer bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300"
              onClick={() => window.open(file.filepath, "_blank")}>View</button>
              <button
                className="ml-3 cursor-pointer bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300"
                onClick={() => handleDelete(file._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
