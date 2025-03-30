import { z } from 'zod';

const configSchema = z.object({
  // OpenAI Configuration
  OPENAI_API_KEY: z.string().min(1, 'OpenAI API key is required'),
  USE_GPT4: z.string().transform(val => val === 'true').optional().default('false'),

  // Market Data API
  ALPHA_VANTAGE_API_KEY: z.string().min(1, 'Alpha Vantage API key is required'),

  // Vector Database (Pinecone)
  PINECONE_API_KEY: z.string(),
  PINECONE_ENVIRONMENT: z.string(),
  PINECONE_INDEX_NAME: z.string(),

  // Database Configuration
  POSTGRES_URI: z.string(),

  // Deployment
  DEPLOYMENT_ENV: z.string(),

  // Redis Configuration
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().transform(Number),
});

const processEnv = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY,
  USE_GPT4: process.env.USE_GPT4,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_ENVIRONMENT: process.env.PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME: process.env.PINECONE_INDEX_NAME,
  POSTGRES_URI: process.env.POSTGRES_URI,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT || '6379',
  DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV || 'development',
};

export const config = configSchema.parse(processEnv);

export type Config = z.infer<typeof configSchema>; 