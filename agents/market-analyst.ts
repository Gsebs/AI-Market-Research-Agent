import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { config } from '@/lib/config';

export class MarketAnalyst {
  private model: ChatOpenAI;
  private systemPrompt: string;

  constructor() {
    this.model = new ChatOpenAI({
      openAIApiKey: config.OPENAI_API_KEY,
      modelName: config.USE_GPT4 ? 'gpt-4' : 'gpt-3.5-turbo',
      temperature: 0.7,
    });

    this.systemPrompt = `You are an expert market research analyst with deep knowledge of various industries, market trends, and competitive analysis. Your role is to:

1. Analyze market trends and provide insights
2. Evaluate competitive landscapes
3. Identify market opportunities and risks
4. Provide data-driven recommendations
5. Explain complex market dynamics in clear terms

Please provide detailed, well-structured responses that combine analytical insights with practical recommendations.`;
  }

  async initialize(): Promise<void> {
    // Verify that we can connect to OpenAI
    try {
      const testResponse = await this.model.invoke([
        new SystemMessage("Test connection"),
        new HumanMessage("Test")
      ]);
      
      if (!testResponse) {
        throw new Error('Failed to initialize OpenAI connection');
      }
    } catch (error) {
      console.error('Error initializing market analyst:', error);
      throw new Error('Failed to initialize market analyst');
    }
  }

  async processQuery(query: string): Promise<string> {
    if (!query.trim()) {
      throw new Error('Query cannot be empty');
    }

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.systemPrompt),
        new HumanMessage(query)
      ]);

      if (typeof response.content !== 'string') {
        throw new Error('Unexpected response format from AI model');
      }

      return response.content;
    } catch (error) {
      console.error('Error processing query:', error);
      throw new Error('Failed to process query');
    }
  }

  async analyzeCompetitors(industry: string, competitors: string[]): Promise<string> {
    if (!industry || competitors.length === 0) {
      throw new Error('Industry and competitors are required');
    }

    const prompt = `Please analyze the competitive landscape for the following companies in the ${industry} industry:
    
Companies: ${competitors.join(', ')}

Please provide:
1. Key strengths and weaknesses of each competitor
2. Market positioning
3. Competitive advantages
4. Market share analysis (if applicable)
5. Recommendations for competing effectively`;

    try {
      const response = await this.model.invoke([
        new SystemMessage(this.systemPrompt),
        new HumanMessage(prompt)
      ]);

      if (typeof response.content !== 'string') {
        throw new Error('Unexpected response format from AI model');
      }

      return response.content;
    } catch (error) {
      console.error('Error analyzing competitors:', error);
      throw new Error('Failed to analyze competitors');
    }
  }

  async predictMarketTrends(industry: string): Promise<string> {
    if (!industry.trim()) {
      throw new Error('Industry cannot be empty');
    }

    const query = `Please analyze current market trends and provide future predictions for the ${industry} industry. Include:
1. Current market dynamics
2. Emerging trends and patterns
3. Growth opportunities
4. Potential disruptions
5. Regulatory considerations`;
    
    return this.processQuery(query);
  }
} 