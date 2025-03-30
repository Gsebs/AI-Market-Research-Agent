import { NextResponse } from 'next/server';
import { fetchStockData, fetchMarketNews } from '@/lib/market-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json(
        { error: 'Stock symbol is required' },
        { status: 400 }
      );
    }

    const [stockData, newsData] = await Promise.all([
      fetchStockData(symbol),
      fetchMarketNews(symbol)
    ]);

    if (!stockData) {
      return NextResponse.json(
        { error: 'Failed to fetch stock data' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...stockData,
      news: newsData
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch market data' },
      { status: 500 }
    );
  }
} 