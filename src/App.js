import { useState, useEffect } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import BookForm from "./components/BookForm";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";

import { BOOK_ADDED } from "graphql/subscriptions/subscriptions.gql";

import {
  updateBookCache,
  updateAuthorCache,
  updateRecommendationCache,
} from "utils/helpers/cache.helper";

import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("books");
  const [token, setToken] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data?.bookAdded;
      if (!bookAdded) return;

      updateBookCache(bookAdded);
      if (bookAdded.author) updateAuthorCache(bookAdded.author);
      updateRecommendationCache(bookAdded);

      window.alert(
        `${bookAdded.title} by ${
          bookAdded.author?.name || "Unknown"
        } was added`,
      );
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("library-user-token");
    if (token) setToken(token);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
    setCurrentView("books");
    setMenuOpen(false);
  };

  const handleNav = (view) => {
    setCurrentView(view);
    setMenuOpen(false);
  };

  const isActive = (view) => (currentView === view ? "active" : "");

  return (
    <main className="container">
      {/* NAVBAR */}
      <nav className="navbar">
        <strong>Library</strong>

        {/* DESKTOP NAV */}
        <ul className="nav-links">
          <li>
            <a
              className={isActive("authors")}
              onClick={() => handleNav("authors")}
            >
              Authors
            </a>
          </li>

          <li>
            <a className={isActive("books")} onClick={() => handleNav("books")}>
              Books
            </a>
          </li>

          {token && (
            <>
              <li>
                <a
                  className={isActive("add_book")}
                  onClick={() => handleNav("add_book")}
                >
                  Add Book
                </a>
              </li>

              <li>
                <a
                  className={isActive("recommend")}
                  onClick={() => handleNav("recommend")}
                >
                  Recommend
                </a>
              </li>
            </>
          )}
        </ul>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          {token ? (
            <button className="outline" onClick={logout}>
              Logout
            </button>
          ) : (
            <button onClick={() => handleNav("login")}>Login</button>
          )}

          <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* DRAWER (MOBILE) */}
      <div className={`drawer ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ✕
        </button>

        <ul>
          <li>
            <a
              className={isActive("authors")}
              onClick={() => handleNav("authors")}
            >
              Authors
            </a>
          </li>

          <li>
            <a className={isActive("books")} onClick={() => handleNav("books")}>
              Books
            </a>
          </li>

          {token && (
            <>
              <li>
                <a
                  className={isActive("add_book")}
                  onClick={() => handleNav("add_book")}
                >
                  Add Book
                </a>
              </li>

              <li>
                <a
                  className={isActive("recommend")}
                  onClick={() => handleNav("recommend")}
                >
                  Recommend
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* CONTENT */}
      <section>
        {currentView === "authors" ? (
          <Authors />
        ) : currentView === "books" ? (
          <Books />
        ) : currentView === "login" ? (
          <Login setToken={setToken} setCurrentView={setCurrentView} />
        ) : currentView === "add_book" ? (
          <BookForm />
        ) : currentView === "recommend" ? (
          <Recommendations />
        ) : null}
      </section>
    </main>
  );
}

export default App;
