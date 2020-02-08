import React, { useState } from "react";
import '../style/index.css';
import Main from "./main";
import Book from "./book";
import ThankYou from "./thankYou";
import Navbar from "./navbar";


export default Cont => {
    const [page, setPage] = useState(0);
  
    return (
      <div>
        <Navbar setPage={setPage} />
        {page === 0 ? <Main setPage={setPage} /> : null}
        {page === 1 ? <Book setPage={setPage} /> : null}
        {page === 2 ? <ThankYou /> : null}
      </div>
    );
  };