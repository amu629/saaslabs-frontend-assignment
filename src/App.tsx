import { useState, useEffect } from "react";
// import data from "./data.json";
import "./App.css";
import React from 'react';


interface AppProps { 
  theme: string;
}

interface DataItems {
  "s.no": number;
  "percentage.funded": number;
  "amt.pledged": number;
}

const App: React.FC<AppProps> = ({theme}) => {
  const [data, setData] = useState<DataItems[]>([]);
  const rowsPerPage: number = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPage: number = Math.ceil(data.length / rowsPerPage);

  const currentData: Array<DataItems> = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json')
      const data = await response.json();
      setData(data);
    }
    fetchData();
  },[]);

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers: Array<number | string> = [];
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPage);
      } else {
        if (currentPage < totalPage - 1) {
          for (let i = currentPage - 2; i <= currentPage; i++) {
            pageNumbers.push(i);
          }
          pageNumbers.push("...");
          pageNumbers.push(totalPage);
        } else {
          for (let i = totalPage - 4; i <= totalPage; i++) {
            pageNumbers.push(i);
          }
        }
      }
    }
    return pageNumbers;
  };

  return (
    <>
      <div className="table-container">
        <h3>List of Projects</h3>
        <table className={`tableItems ${theme}`}>
          <thead>
            <tr>
              <th scope="col">S.No.</th>
              <th scope="col">Percentage funded</th>
              <th scope="col">Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 && currentData.map((item: DataItems, index: number) => (
              <tr key={index}>
                <td>{item["s.no"]}</td>
                <td>{item["percentage.funded"]}</td>
                <td>{item["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`pagination ${theme}`}>
        <button
          onClick={handlePrevClick}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          &laquo;
        </button>
        {getPageNumbers().map((page: string | number, index: number) =>
          page === "..." ? (
            <span key={index} className="ellipsis" aria-hidden="true">
              {page}
            </span>
          ) : (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={`pageNumber ${theme} ${
                typeof page === "number" && page === currentPage ? "active" : ""
              }`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPage || totalPage===0}
          aria-label="Go to next page"
        >
          &raquo;
        </button>
      </div>
    </>
  );
};

export default App;
