import {API_KEY} from '@env'
export const fetchBingResults = async (query: string): Promise<any[]> => {
    const subscriptionKey = API_KEY;
    const endpoint = 'https://api.bing.microsoft.com/v7.0/search';
  
    if (query.length < 3) {
      return [];
    }
  
    try {
      const response = await fetch(`${endpoint}?q=${encodeURIComponent(query)}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
      });
      const data = await response.json();
  
      if (data.webPages && data.webPages.value) {
        return data.webPages.value;
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  
    return [];
  };