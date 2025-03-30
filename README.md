# AI Market Research Agent

An AI-powered market research and analysis tool that helps you understand market trends, analyze competitors, and make data-driven decisions.

## Features

- 🤖 AI-powered market research assistant
- 📊 Real-time market data and stock information
- 📈 Competitor analysis and insights
- 📰 Latest market news and updates
- 🔄 Interactive chat interface

## Tech Stack

- Next.js 13 with App Router
- TypeScript
- OpenAI GPT-4/3.5
- LangChain
- Pinecone Vector Database
- PostgreSQL
- TailwindCSS
- Docker

## Prerequisites

- Node.js 18 or later
- Docker and Docker Compose
- OpenAI API key
- Alpha Vantage API key
- Pinecone API key

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-market-research-agent.git
   cd ai-market-research-agent
   ```

2. Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_key_here
   USE_GPT4=true
   ALPHA_VANTAGE_API_KEY=your_key_here
   PINECONE_API_KEY=your_key_here
   PINECONE_ENVIRONMENT=your_env_here
   PINECONE_INDEX_NAME=market-research-index
   POSTGRES_URI=postgresql://postgres:postgres@db:5432/market_research
   ```

3. Start the development environment:
   ```bash
   docker-compose up
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Deployment

1. Build the Docker image:
   ```bash
   docker build -t ai-market-research-agent .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env ai-market-research-agent
   ```

### Cloud Deployment

The application can be deployed to various cloud platforms:

#### Vercel
```bash
vercel
```

#### AWS Elastic Beanstalk
1. Install the EB CLI
2. Initialize EB environment:
   ```bash
   eb init
   eb create
   ```

## Project Structure

```
.
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   └── page.tsx         # Main page
├── components/          # React components
├── lib/                 # Utility functions and services
├── agents/             # AI agent implementations
├── public/             # Static files
└── scripts/            # Database scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 