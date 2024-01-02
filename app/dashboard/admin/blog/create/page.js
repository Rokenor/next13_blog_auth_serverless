"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";

export default function AdminBlogCreate() {
  // state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();

  // image upload
  const uploadImage = async (e) => {
    //
  };

  // submit to create blog api
  const handleSubmit = async (e) => {
    //
  };

  // return jsx / blog create form
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p className="lead">Create Blog</p>
        </div>
      </div>
    </div>
  );
}
