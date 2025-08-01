import { createContext, useState } from "react";

export const BookContext = createContext();

export const BookContextProvider = ({ children }) => {
  const [allBooks, setAllBooks] = useState([]);
  return (
    <BookContext.Provider value={{ allBooks, setAllBooks }}>
      {children}
    </BookContext.Provider>
  );
};
