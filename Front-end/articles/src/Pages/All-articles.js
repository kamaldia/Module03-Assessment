import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
const Articles = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAcceptedArticles = useCallback(async () => {
    //saves the function so there is no need for compiler to create new instance of it every time it needs it
    try {
      const articles_response = await axios.get(
        "http://localhost:8000/api/articleRoute/getAll"
      ); //axios returns a response object with a data property, we then use .data to get it
      if (articles_response.data) {
        setArticles(articles_response.data.data); //returning the data as an array of objects
      }
    } catch (error) {
      console.error("error fetching accepted articles: ", error);
    } finally {
      setLoading(false);
    }
  }, []); //this dependancy will specify on which change should the compiler recreate the function

  useEffect(() => {
    fetchAcceptedArticles();
  }, []);

  return (
    <>
      {!loading ?
                articles.map((article) => 
                    <section>
                    
                    </section>
                )
                   : 
                <p>Loading...</p>
              }

    </>
  );
};

export default Articles;
