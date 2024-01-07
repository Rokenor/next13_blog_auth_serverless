"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import BlogList from "@/components/blogs/BlogList";

export default function UserDashboard() {
  const [likedBlogs, setLikedBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/liked-blogs`);

      if (!response.ok) {
        throw new Error(response.statusText);
        toast.error("Error fetching blogs");
      }

      const data = await response.json();
      setLikedBlogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead text-center">Liked blogs</p>
          <BlogList blogs={likedBlogs} />
        </div>
      </div>
    </div>
  );
}
