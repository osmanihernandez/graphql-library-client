import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ALL_BOOKS } from "graphql/queries/queries.gql";
import Pagination from "./Pagination";

const Books = () => {
  const { data, loading } = useQuery(ALL_BOOKS);

  const [selected, setSelected] = useState("all");
  const [filter, setFilter] = useState(null);

  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    setPage(0);
  }, [filter]);

  if (loading) return <p>Loading...</p>;

  const options = data.allBooks.reduce(
    (acc, book) => [...acc, ...book.genres.filter((g) => !acc.includes(g))],
    ["all"],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilter(selected === "all" ? null : selected);
  };

  const booksToShow = filter
    ? data.allBooks.filter((b) => b.genres.includes(filter))
    : data.allBooks;

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedBooks = booksToShow.slice(start, end);

  return (
    <section>
      <div className="books-header">
        <h2>Books</h2>

        <form onSubmit={handleSubmit} className="filter-form">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="filter-select"
          >
            {options.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <button type="submit" className="secondary">
            Filter
          </button>
        </form>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
        </thead>

        <tbody>
          {paginatedBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        page={page}
        setPage={setPage}
        total={booksToShow.length}
        pageSize={pageSize}
      />
    </section>
  );
};

export default Books;
