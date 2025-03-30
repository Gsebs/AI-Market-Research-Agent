import React, { useState, useEffect } from 'react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  volume: number;
  timestamp: string;
}

interface NewsItem {
  title: string;
  url: string;
  source: string;
  timestamp: string;
  summary: string;
}

export default function MarketInsights() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [symbol, setSymbol] = useState('AAPL');
  const [isLoading, setIsLoading] = useState(false);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`/api/market-data?action=stock&symbol=${symbol}`);
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchMarketNews = async () => {
    try {
      const response = await fetch('/api/market-data?action=news');
      const data = await response.json();
      setNewsItems(data);
    } catch (error) {
      console.error('Error fetching market news:', error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchStockData(), fetchMarketNews()]).finally(() => {
      setIsLoading(false);
    });
  }, [symbol]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Stock Information</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol..."
            className="p-2 border rounded-lg"
          />
          <button
            onClick={() => fetchStockData()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Refresh
          </button>
        </div>
        {isLoading ? (
          <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
        ) : stockData ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">{stockData.symbol}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Price</p>
                <p className="text-2xl font-bold">${stockData.price}</p>
              </div>
              <div>
                <p className="text-gray-600">Change</p>
                <p className={`text-2xl font-bold ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stockData.change > 0 ? '+' : ''}{stockData.change}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Volume</p>
                <p className="text-xl">{stockData.volume.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated</p>
                <p className="text-xl">{new Date(stockData.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>No stock data available</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Market News</h2>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                    {item.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-2">{item.summary}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{item.source}</span>
                  <span>{new Date(item.timestamp).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 