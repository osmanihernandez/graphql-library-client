import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_BOOK } from "graphql/mutations/mutations.gql";

import {
  updateBookCache,
  updateAuthorCache,
  updateRecommendationCache,
} from "utils/helpers/cache.helper";

const BookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    published: "",
    genres: [],
  });

  const [genre, setGenre] = useState("");

  const [createBook] = useMutation(CREATE_BOOK, {
    update: (_, { data }) => {
      updateBookCache(data.addBook);
      updateAuthorCache(data.addBook.author);
      updateRecommendationCache(data.addBook);
    },
  });

  const handleChange = (e, field) => {
    setBook((prev) => ({
      ...prev,
      [field]: e.target.value, // 🔥 CHANGED: removed parseInt
    }));
  };

  const addGenre = () => {
    if (!genre) return;
    setBook((prev) => ({
      ...prev,
      genres: prev.genres.concat(genre),
    }));
    setGenre("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const publishedYear = parseInt(book.published, 10); // 🔥 NEW

    if (isNaN(publishedYear)) {
      alert("Please enter a valid year");
      return;
    }

    createBook({
      variables: {
        book: {
          ...book,
          published: publishedYear,
        },
      },
    });

    setBook({
      title: "",
      author: "",
      published: "",
      genres: [],
    });
  };

  return (
    <section className="book-form-section">
      <h2>Add Book</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-grid">
          <label>
            Title
            <input
              value={book.title}
              onChange={(e) => handleChange(e, "title")}
            />
          </label>

          <label>
            Author
            <input
              value={book.author}
              onChange={(e) => handleChange(e, "author")}
            />
          </label>

          <label>
            Published
            <input
              value={book.published}
              onChange={(e) => handleChange(e, "published")}
            />
          </label>
        </div>

        <div className="genre-row">
          <label className="genre-label">
            Genre
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </label>

          <button type="button" onClick={addGenre} className="secondary">
            Add
          </button>
        </div>

        <p className="genre-list">
          <strong>Genres:</strong> {book.genres.join(", ") || "none"}
        </p>

        <button type="submit">Add book</button>
      </form>
    </section>
  );
};

export default BookForm;
