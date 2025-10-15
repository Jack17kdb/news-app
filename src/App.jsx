import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [category, setCategory] = useState("Games");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const handleCategoryChange = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const url = `https://newsdata.io/api/1/latest?apikey=pub_b60ef4725bde42d4869f6250e2723b1f&q=${category}`
      const response = await axios.get(url);
      setData(response.data);
      setTotalResults(response.data.totalResults);
      console.log(response.data);
    } catch (error) {
      console.log("error fetching data: ", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleCategoryChange();
  }, []);

  if(isLoading) {
      <div>
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        <span className="loading loading-bars loading-xl"></span>
      </div>
  }

  if(error) {
    <p>{error}</p>
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="w-full bg-blue-600 h-12 text-white p-2 shadow-lg">
          <h1 className="text-2xl font-bold">News App</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data > 0 ? <></> : <></>}
        </div>
      </div>
    </>
  )
}

export default App
