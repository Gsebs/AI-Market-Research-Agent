'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [activeTab, setActiveTab] = useState('ai-assistant');

  return (
    <main className="p-4">
      <nav className="flex justify-center space-x-8 mb-4">
        <Link 
          href="#" 
          className={`px-4 py-2 ${activeTab === 'ai-assistant' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('ai-assistant')}
        >
          AI Assistant
        </Link>
        <Link 
          href="#" 
          className={`px-4 py-2 ${activeTab === 'market-insights' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('market-insights')}
        >
          Market Insights
        </Link>
        <Link 
          href="#" 
          className={`px-4 py-2 ${activeTab === 'competitor-analysis' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('competitor-analysis')}
        >
          Competitor Analysis
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'ai-assistant' && <AIAssistant />}
        {activeTab === 'market-insights' && <MarketInsights />}
        {activeTab === 'competitor-analysis' && <CompetitorAnalysis />}
      </div>
    </main>
  );
}

function AIAssistant() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{text: string; sender: 'You' | 'AI'; timestamp: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const timestamp = new Date().toLocaleString();
    const userMessage = { text: query, sender: 'You' as const, timestamp };
    setMessages(prev => [...prev, userMessage]);
    
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to get response');
      }

      const data = await res.json();
      const aiMessage = { text: data.response, sender: 'AI' as const, timestamp: new Date().toLocaleString() };
      setMessages(prev => [...prev, aiMessage]);
      setQuery('');
    } catch (error) {
      console.error('Error:', error);
      setError('Sorry, there was an error processing your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-h-[800px]">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            Ask me anything about market trends, competitor analysis, or industry insights!
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.sender === 'You' 
                ? 'bg-blue-50 ml-auto max-w-[80%]' 
                : 'bg-white mr-auto max-w-[80%] shadow-sm'
            }`}
          >
            <div className="font-semibold mb-1">{message.sender}</div>
            <div className="whitespace-pre-wrap">{message.text}</div>
            <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about market trends, competitor analysis, or industry insights..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={2}
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isLoading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {error && (
          <div className="mt-2 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

interface StockData {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  lastUpdated: string;
}

function MarketInsights() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = async () => {
    if (!symbol) return;
    
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/market-data?symbol=${symbol}`);
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
        setStockData(null);
      } else {
        setStockData(data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError('Failed to fetch stock data. Please try again.');
      setStockData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stock Information</h1>
      <div className="flex gap-4">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="px-4 py-2 border rounded-lg flex-grow"
        />
        <button
          onClick={handleRefresh}
          disabled={isLoading || !symbol}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {stockData && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500">Symbol</h3>
              <p className="text-lg font-semibold">{stockData.symbol}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Price</h3>
              <p className="text-lg font-semibold">${stockData.price}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Change</h3>
              <p className={`text-lg font-semibold ${
                parseFloat(stockData.change) >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stockData.change} ({stockData.changePercent})
              </p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Volume</h3>
              <p className="text-lg font-semibold">{stockData.volume}</p>
            </div>
            <div className="col-span-2">
              <h3 className="text-sm text-gray-500">Last Updated</h3>
              <p className="text-lg font-semibold">{stockData.lastUpdated}</p>
            </div>
          </div>
        </div>
      )}
      
      <h2 className="text-2xl font-bold mt-8">Market News</h2>
      <p className="text-gray-600">Coming soon...</p>
    </div>
  );
}

function CompetitorAnalysis() {
  const [industry, setIndustry] = useState('');
  const [competitor, setCompetitor] = useState('');
  const [competitors, setCompetitors] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCompetitor = () => {
    if (competitor && !competitors.includes(competitor)) {
      setCompetitors([...competitors, competitor]);
      setCompetitor('');
    }
  };

  const handleAnalyze = async () => {
    if (competitors.length === 0) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/competitors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, competitors }),
      });
      
      if (!res.ok) throw new Error('Failed to analyze competitors');
      
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing competitors:', error);
      setAnalysis('Sorry, there was an error analyzing the competitors. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Competitor Analysis</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g., Technology, Healthcare, Finance"
            className="mt-1 w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Competitors</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={competitor}
              onChange={(e) => setCompetitor(e.target.value)}
              placeholder="Enter competitor name"
              className="flex-1 px-4 py-2 border rounded-lg"
              onKeyPress={(e) => e.key === 'Enter' && handleAddCompetitor()}
            />
            <button
              onClick={handleAddCompetitor}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add
            </button>
          </div>
          {competitors.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {competitors.map((comp, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center"
                >
                  {comp}
                  <button
                    onClick={() => setCompetitors(competitors.filter((_, i) => i !== index))}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleAnalyze}
          disabled={isLoading || competitors.length === 0}
          className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Competitors'}
        </button>
      </div>
      {analysis && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Analysis:</h2>
          <p className="whitespace-pre-wrap">{analysis}</p>
        </div>
      )}
    </div>
  );
} 