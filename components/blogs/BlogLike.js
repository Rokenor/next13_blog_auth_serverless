"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function BlogLike({ blog }) {
  const { data, status } = useSession();

  const [likes, setLikes] = useState(blog.likes);

  const router = useRouter();
  const pathname = usePathname();

  const isLiked = likes.includes(data?.user?._id);

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/blog/unlike`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: blog._id }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to unlike: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setLikes(data.likes);
      toast.success("Blog unliked");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to unlike blog.");
    }
  };

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("You must be logged in to like a blog.");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    }

    try {
      if (isLiked) {
        // unlike
        const answer = confirm("Are you sure you want to unlike this blog?");
        if (answer) {
          handleUnlike();
        }
      } else {
        // like
        const response = await fetch(`${process.env.API}/user/blog/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blogId: blog._id }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to like: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setLikes(data.likes);
        toast.success("Blog liked");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to like blog.");
    }
  };

  return (
    <>
      <small className="text-muted pointer">
        <span onClick={handleLike}>❤️ {likes.length} likes</span>
      </small>
    </>
  );
}
