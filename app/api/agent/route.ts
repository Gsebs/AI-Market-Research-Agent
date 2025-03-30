import { NextResponse } from 'next/server';
import { MarketAnalyst } from '@/agents/market-analyst';

// Create a singleton instance of the MarketAnalyst
let agent: MarketAnalyst | null = null;

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { query } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    // Initialize agent if not already initialized
    if (!agent) {
      agent = new MarketAnalyst();
      await agent.initialize();
    }

    const response = await agent.processQuery(query);
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 