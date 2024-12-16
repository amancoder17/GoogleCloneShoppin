export const fetchNewsResults = async () => {
    const endpoint ='https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=7f3da597b7314fb4bc65a09dfebd74bd';
  
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
  
      if (data.status === "ok" && Array.isArray(data.articles)) {
        return data.articles;
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  
    return [];
  };