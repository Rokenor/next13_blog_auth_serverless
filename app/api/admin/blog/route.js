import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  const _req = await req.json();
  console.log("_req", _req);
  await dbConnect();

  try {
    const { title, content, category, image } = _req;

    switch (true) {
      case !title:
        return NextResponse.json({ err: "Title is required" }, { status: 400 });
      case !content:
        return NextResponse.json(
          { err: "Content is required" },
          { status: 400 }
        );
      case !category:
        return NextResponse.json(
          { err: "Category is required" },
          { status: 400 }
        );
    }

    // check if blog title is taken
    const existingBlog = await Blog.findOne({
      slug: slugify(title?.toLowerCase()),
    });

    // get current user's id
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (existingBlog) {
      return NextResponse.json(
        { err: "Blog with that title already exists" },
        { status: 409 }
      );
    } else {
      // create new blog
      const blog = await Blog.create({
        title,
        content,
        category,
        image: image ? image : null,
        postedBy: token.user._id,
        slug: slugify(title?.toLowerCase()),
      });

      return NextResponse.json(blog, { status: 200 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { err: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
