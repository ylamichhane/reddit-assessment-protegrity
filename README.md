# Protegrity Reddit Feed

A Next.js application that fetches and displays Reddit posts with AI-powered summarization capabilities.

## Features

- ⚡ Next.js 15 with App Router
- 🎨 Tailwind CSS for styling with Protegrity branding
- 📝 TypeScript for type safety
- 🚀 ESLint for code quality
- 📱 Responsive design with custom breakpoints
- 🔗 Reddit API integration with pagination
- 🤖 AI-powered post summarization using OpenAI
- 🗄️ PostgreSQL database for caching summaries
- ♿ Accessibility features (WCAG 2.2 AA compliant)
- 🌙 Dark mode support

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd reddit-assessment
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```bash
# PostgreSQL Database URL
POSTGRESS_DB_URL=postgresql://username:password@localhost:5432/reddit_summaries

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### API Endpoints

- `GET /api/hello` - Returns a hello message
- `POST /api/summarize` - Generates AI summaries for Reddit posts

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── hello/
│   │   │   └── route.ts
│   │   └── summarize/
│   │       └── route.ts
│   ├── actions/
│   │   └── reddit-actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Controls.tsx
│   ├── Pagination.tsx
│   ├── RedditPostCard.tsx
│   └── SummarySidebar.tsx
├── lib/
│   ├── database.ts
│   └── reddit-api.ts
├── public/
│   └── assets/
│       ├── fonts/
│       ├── logo.png
│       └── favicon.webp
├── package.json
└── README.md
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
