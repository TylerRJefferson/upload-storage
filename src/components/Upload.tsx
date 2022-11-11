import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getStorage, ref, StorageReference, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCUn4aAEVUhR8_g4818DnRl0ed0EfUj6sw",
  authDomain: "upload-storage-tj.firebaseapp.com",
  projectId: "upload-storage-tj",
  storageBucket: "upload-storage-tj.appspot.com",
  messagingSenderId: "789085538840",
  appId: "1:789085538840:web:15ff356a0097e7d181516d"
};

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  console.log({selectedFile})
  const handleUpload = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if(!selectedFile) {
      alert("Please select a file first")
      return
    }
    //connect to firebase project
    const app = initializeApp(firebaseConfig); 
    // connect to storage bucket
    const storage = getStorage(app);
    // create a reference to our file in storage
    const filename = selectedFile?.name;
    const imageRef: StorageReference = ref(storage, "photos/" + filename);
    // (Todd's quick cheat) create the url from reference
    const url = `https://firebasestorage.googleapis.com/v0/b/upload-storage-tj.appspot.com/o/photos%2F${filename}?alt=media`
    // upload file to bucket
    uploadBytes(imageRef, selectedFile);
    // add an await or .then and then update DB with url
  }
  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="photo" 
        onChange={(e: React.FormEvent<HTMLInputElement> | any) => 
          setSelectedFile(e.currentTarget.files[0])} />
      <button type="submit">Upload</button>
    </form>
  )
}