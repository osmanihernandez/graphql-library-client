import { useQuery } from "@apollo/client";
import { useState } from "react";
import AuthorForm from "./AuthorForm";
import Pagination from "./Pagination";
import { ALL_AUTHORS } from "graphql/queries/queries.gql";

const Authors = () => {
  const { data, loading } = useQuery(ALL_AUTHORS);

  const [page, setPage] = useState(0);
  const pageSize = 5;

  if (loading) return <p>Loading...</p>;

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedAuthors = data.allAuthors.slice(start, end);

  return (
    <section>
      <h2>Authors</h2>

      <div className="authors-grid">
        <div className="authors-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Born</th>
                <th>Books</th>
              </tr>
            </thead>

            <tbody>
              {paginatedAuthors.map((author) => (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.born || "unknown"}</td>
                  <td>{author.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            page={page}
            setPage={setPage}
            total={data.allAuthors.length}
            pageSize={pageSize}
          />
        </div>

        <div className="authors-form">
          <AuthorForm authors={data.allAuthors} />
        </div>
      </div>
    </section>
  );
};

export default Authors;
