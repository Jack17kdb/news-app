import { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search.jsx";

function App() {
  const [category, setCategory] = useState("Games");
  const [news, setNews] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const handleCategoryChange = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = `https://newsdata.io/api/1/latest?apikey=pub_b60ef4725bde42d4869f6250e2723b1f&q=${category}`
      const response = await axios.get(url);
      setNews(response.data);
      setTotalResults(response.data.totalResults);
      console.log(response.data);
    } catch (error) {
      console.log("error fetching news: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleCategoryChange();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-2">
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
        <span className="loading loading-bars loading-2xl"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen gap-2">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="w-full bg-base-100 h-16 text-white flex items-center px-3 top-0 z-10 shadow-xl">
          <h1 className="text-2xl font-bold">News App</h1>
        </div>
        <div>
          <div className="flex mt-3 items-center justify-center">
            <Search category={category} setCategory={setCategory} handleCategoryChange={handleCategoryChange} />
          </div>
          <div className="flex mt-3 items-center justify-center">
            <h3 className="font-semibold">Total Results: {totalResults}</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
          {news?.results?.length > 0 &&
            news.results.map((data, key) => (
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
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
