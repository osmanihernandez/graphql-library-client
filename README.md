# 📚 Library App

## Description

A full-stack web application where users can browse, filter, and manage books. The app allows users to view authors and books, add new entries, and receive personalized recommendations based on their favorite genre.

---

## Main Features

- [x] **Web app includes a books view displaying all available books**
  - Displays:
    - title
    - author
    - published year
  - Supports filtering by genre

- [x] **Web app includes an authors view**
  - Displays:
    - author name
    - birth year
    - number of books written
  - Users can update an author's birth year

- [x] **Users can add new books**
  - Form includes:
    - title
    - author
    - published year
    - genres
  - Supports adding multiple genres

- [x] **User authentication**
  - Users can log in
  - Certain features are restricted to authenticated users:
    - adding books
    - viewing recommendations

- [x] **Personalized recommendations**
  - Displays books based on the user’s favorite genre
  - Dynamically fetched using GraphQL queries

- [x] **Real-time updates**
  - Uses GraphQL subscriptions
  - Newly added books appear instantly across the app

- [x] **Pagination**
  - Implemented for:
    - books
    - authors
    - recommendations
  - Improves usability and performance

- [x] **Responsive UI**
  - Mobile-friendly navigation with a drawer menu
  - Clean and minimal interface

---

## Backend

👉 Backend repository: **https://github.com/osmanihernandez/graphql-library-server.git**

---

## Video Walkthrough

Library App - Watch Video

<div>
    <a href="https://www.loom.com/share/c670d9e08d9e494dbc7c892b6fdddf44">
      <p>Library App - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/c670d9e08d9e494dbc7c892b6fdddf44">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/c670d9e08d9e494dbc7c892b6fdddf44-d2c23777175ee15a-full-play.gif#t=0.1">
    </a>
  </div>

---

## Notes

**Challenging parts**:

- Implementing real-time updates
- Managing UI state across filtering and pagination
- Designing a responsive navigation system
- Handling form validation and user input cleanly

---

## Tech Stack

- React (Create React App)
- Apollo Client (GraphQL)
- CSS (custom styling)
