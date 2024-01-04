import Link from "next/link";
import BlogList from "@/components/blogs/BlogList";

async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };
  const searchQuery = new URLSearchParams(urlParams).toString();

  const response = await fetch(`${process.env.API}/blog?${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  });

  if (!response.ok) {
    console.log("Failed to fetch blogs =>", response);
    throw new Error("Failed to fetch blogs");
  }

  const data = await response.json();
  return data;
}

export default async function Home({ searchParams }) {
  const { blogs, currentPage, totalPages } = await getBlogs(searchParams);

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="container">
      <p className="lead text-primary text-center">Latest Blog</p>

      <BlogList blogs={blogs} />

      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link className="page-link" href={`/?page=${currentPage - 1}`}>
                  Previous
                </Link>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, i) => {
              const page = i + 1;

              return (
                <li
                  key={page}
                  className={`page-item ${page === currentPage && "active"}`}
                >
                  <Link className="page-link" href={`/?page=${page}`}>
                    {page}
                  </Link>
                </li>
              );
            })}

            {hasNextPage && (
              <li className="page-item">
                <Link className="page-link" href={`/?page=${currentPage + 1}`}>
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
