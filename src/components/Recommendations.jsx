import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, LOGGEDIN_USER } from "graphql/queries/queries.gql";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Recommendations = () => {
  const { data: userData, loading: userLoading } = useQuery(LOGGEDIN_USER);

  const [getBooks, { data, loading, error }] = useLazyQuery(ALL_BOOKS);

  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    const genre = userData?.loggedinUser?.favoriteGenre;

    if (genre) {
      getBooks({
        variables: { genres: [genre] },
      });
    }
  }, [userData, getBooks]);

  useEffect(() => {
    setPage(0);
  }, [data]);

  if (userLoading || loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const favoriteGenre = userData?.loggedinUser?.favoriteGenre;

  const books = data?.allBooks || [];

  const start = page * pageSize;
  const end = start + pageSize;
  const paginatedBooks = books.slice(start, end);

  return (
    <section>
      <h2>Recommendations</h2>

      <p>
        books in your favorite genre{" "}
        <span style={{ textDecoration: "underline" }}>
          <strong>{favoriteGenre}</strong>
        </span>
      </p>

      {books.length === 0 ? (
        <p>No recommendations found</p>
      ) : (
        <>
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
            total={books.length}
            pageSize={pageSize}
          />
        </>
      )}
    </section>
  );
};

export default Recommendations;
