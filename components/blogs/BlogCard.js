import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlogLike from "@/components/blogs/BlogLike";

dayjs.extend(relativeTime);

export default function BlogCard({ blog }) {
  return (
    <div className="card mb-4">
      <div
        style={{
          height: "200px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src={blog.image || "/images/placeholder-1920x1080.webp"}
          alt={blog.title}
          height="100%"
          width="auto"
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h5>
        <div className="card-text">
          <div
            dangerouslySetInnerHTML={{
              __html:
                blog.content.length > 160
                  ? `${blog.content.substring(0, 160)}...`
                  : blog.content,
            }}
          />
        </div>
        <div className="card-footer d-flex flex-column justify-content-between">
          <small className="text-muted">Category: {blog.category}</small>
          <small className="text-muted">
            Author: {blog.postedBy.name || "Admin"}
          </small>
          <small className="text-muted">
            Posted: {dayjs(blog.createdAt).fromNow()}
          </small>
          <BlogLike blog={blog} />
        </div>
      </div>
    </div>
  );
}
