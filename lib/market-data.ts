import { config } from '@/lib/config';

export interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  lastUpdated: string;
}

export async function fetchStockData(symbol: string): Promise<StockData | null> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${config.ALPHA_VANTAGE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const quote = data['Global Quote'];
    if (!quote) {
      return null;
    }

    return {
      symbol: quote['01. symbol'] || symbol,
      price: quote['05. price'] || 'N/A',
      change: quote['09. change'] || 'N/A',
      changePercent: quote['10. change percent'] || 'N/A',
      volume: quote['06. volume'] || 'N/A',
      lastUpdated: quote['07. latest trading day'] || 'N/A'
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}

export async function fetchMarketNews(symbol: string): Promise<any[]> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&symbol=${symbol}&apikey=${config.ALPHA_VANTAGE_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Alpha Vantage API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.feed || [];
  } catch (error) {
    console.error('Error fetching market news:', error);
    return [];
  }
} 