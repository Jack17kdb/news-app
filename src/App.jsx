import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search.jsx";
import Pagination from "./components/Pagination.jsx";
import LoadingSkeleton from "./components/LoadingSkeleton.jsx";

function App() {
  const [category, setCategory] = useState("Games");
  const [news, setNews] = useState({ results: [] });
  const [page, setPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const currentData = news.results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handleFetch = async (pageToken = null, reset = false) => {
    try {
      setIsLoading(true);
      setError(null);

      let url = `https://newsdata.io/api/1/latest?apikey=${import.meta.env.VITE_NEWS_API_KEY}&q=${category}`;
      if (pageToken) url += `&page=${pageToken}`;

      const response = await axios.get(url);
      const data = response.data;

      setTotalResults(data.totalResults || 0);
      setPage(data.nextPage || null);

      if (reset) {
        setNews(data);
        setCurrentPage(1);
      } else {
        setNews(prev => ({
          ...prev,
          results: [...prev.results, ...(data.results || [])]
        }));
      }
    } catch (error) {
      console.error("error fetching news:", error);
      setError("Error loading news");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = () => {
    handleFetch(null, true);
  };

  const handlePageChange = (newPage) => {
    if (newPage > currentPage && page) {
      handleFetch(page, false);
      setCurrentPage(newPage);
    }
  };


  useEffect(() => {
    handleCategoryChange();
  }, [category]);

  if (isLoading) {
    return (
      <LoadingSkeleton />
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-400">{error}</p>
        <button onClick={() => window.location.reload()} className="btn btn-outline btn-error mt-4">
          Retry
        </button>
      </div>
    );
  }


  return (
    <>
      <div className="min-h-screen">
        <div className="w-full bg-base-100 h-16 text-white flex items-center px-3 top-0 z-10 shadow-xl">
          <h1 className="text-2xl font-bold">News App</h1>
        </div>

        <div>
          <div className="flex mt-3 items-center justify-center">
            <Search
              category={category}
              setCategory={setCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="flex mt-3 items-center justify-center">
            <h3 className="font-semibold">Total Results: {totalResults}</h3>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {currentData.length > 0 &&
            currentData.map((data, key) => {
              if (data.image_url !== null) {
                return (
                  <div key={key} className="card bg-base-100 w-96 shadow-sm mb-4 ml-2">
                    <figure>
                      <img
                        src={data.image_url}
                        className="w-full h-48 object-cover"
                        alt="null" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{data.title}</h2>
                      <div className="card-actions justify-end">
                        <a href={data.link}>
                          <button className="btn btn-primary">Read More</button>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              } else {
                return null;
              }
            }
            )
          }
        </div>

        <div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default App
