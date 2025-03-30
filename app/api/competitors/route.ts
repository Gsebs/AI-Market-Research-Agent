import { NextResponse } from 'next/server';
import { MarketAnalyst } from '@/agents/market-analyst';

const agent = new MarketAnalyst();

export async function POST(request: Request) {
  try {
    const { industry, competitors } = await request.json();

    if (!competitors || !Array.isArray(competitors) || competitors.length === 0) {
      return NextResponse.json(
        { error: 'At least one competitor is required' },
        { status: 400 }
      );
    }

    if (!industry || typeof industry !== 'string') {
      return NextResponse.json(
        { error: 'Industry is required and must be a string' },
        { status: 400 }
      );
    }

    const analysis = await agent.analyzeCompetitors(industry, competitors);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing competitors:', error);
    return NextResponse.json(
      { error: 'Failed to analyze competitors' },
      { status: 500 }
    );
  }
} 