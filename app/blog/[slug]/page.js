import BlogLike from "@/components/blogs/BlogLike";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

async function getBlog(slug) {
  const response = await fetch(`${process.env.API}/blog/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  const data = response.json();
  return data;
}

export default async function BlogViewPage({ params }) {
  const blog = await getBlog(params.slug);

  return (
    <main>
      <div className="container mb-5">
        <div className="card">
          <div
            style={{
              height: "400px",
              overflow: "hidden",
            }}
          >
            <img
              src={blog.image || "/images/placeholder-1920x1080.webp"}
              alt={blog.title}
              className="card-img-top"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </div>

          <div className="card-body">
            <h5 className="card-title">{blog.title}</h5>
            <div className="card-text">
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content,
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
      </div>
    </main>
  );
}
