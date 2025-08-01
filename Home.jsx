import React, { useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ThemeContext } from "../contexts/ThemeContext";
import Footer from "../components/Footer";
import Book from "../components/Book";
import { BookContext } from "../contexts/BookContext";

function Home() {
  const { allBooks, setAllBooks } = useContext(BookContext);
  const { theme } = useContext(ThemeContext);
  useEffect(() => {
    axios.get("/api/v1/books/allbooks").then((res) => {
      setAllBooks(res.data.data);
    });
  }, [setAllBooks]);

  return (
    <div>
      <Navbar />
      <div
        className={
          theme === "dark"
            ? "min-h-screen bg-gray-950 text-white"
            : "min-h-screen"
        }
      >
        <h1 className="font-bold text-center text-2xl">ALL BOOKS</h1>
        <div className="flex justify-center items-center flex-wrap">
          {allBooks ? (
            allBooks.map((book) => <Book book={book} key={book._id} />)
          ) : (
            <h1>LODING.......</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
