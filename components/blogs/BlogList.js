import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
  return (
    <div className="container mb-5">
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4 mb-3" key={blog._id}>
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
