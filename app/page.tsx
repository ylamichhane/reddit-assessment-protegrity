// Dummy data for Reddit posts
const dummyPosts = [
  {
    id: 1,
    title: "What's your favorite programming language and why?",
    content: "I've been coding for years and I'm curious to hear what languages other developers prefer. Personally, I love TypeScript for its type safety and JavaScript ecosystem compatibility.",
    author: "u/code_master_42",
    comments: 127,
    url: "https://reddit.com/r/programming/comments/123456"
  },
  {
    id: 2,
    title: "Just finished building my first React app!",
    content: "After months of learning, I finally completed my first React application. It's a simple todo app but I'm proud of it. Here's what I learned along the way...",
    author: "u/react_beginner",
    comments: 89,
    url: "https://reddit.com/r/reactjs/comments/123457"
  },
  {
    id: 3,
    title: "The future of AI in software development",
    content: "With tools like GitHub Copilot and ChatGPT becoming more prevalent, how do you think AI will change the way we write code? Will it replace developers or enhance our productivity?",
    author: "u/ai_enthusiast",
    comments: 234,
    url: "https://reddit.com/r/artificial/comments/123458"
  },
  {
    id: 4,
    title: "Best practices for API design in 2024",
    content: "I'm designing a new REST API and want to make sure I'm following current best practices. What are your go-to patterns for authentication, error handling, and versioning?",
    author: "u/api_designer",
    comments: 156,
    url: "https://reddit.com/r/webdev/comments/123459"
  },
  {
    id: 5,
    title: "How I optimized my database queries and improved performance by 300%",
    content: "My application was running slowly, so I decided to analyze and optimize my database queries. Here's a detailed breakdown of what I found and how I fixed it...",
    author: "u/db_optimizer",
    comments: 312,
    url: "https://reddit.com/r/database/comments/123460"
  },
  {
    id: 6,
    title: "The importance of accessibility in web development",
    content: "Accessibility isn't just a nice-to-have feature—it's essential for creating inclusive web experiences. Here are some key principles and tools I use in my projects...",
    author: "u/a11y_advocate",
    comments: 178,
    url: "https://reddit.com/r/webdev/comments/123461"
  },
  {
    id: 7,
    title: "My journey from bootcamp to senior developer",
    content: "Three years ago, I graduated from a coding bootcamp with no prior programming experience. Today, I'm a senior developer. Here's my story and the lessons I learned...",
    author: "u/bootcamp_grad",
    comments: 445,
    url: "https://reddit.com/r/cscareerquestions/comments/123462"
  },
  {
    id: 8,
    title: "Why I switched from JavaScript to TypeScript",
    content: "After years of using JavaScript, I finally made the switch to TypeScript. The learning curve was steep, but the benefits are incredible. Here's my experience...",
    author: "u/typescript_convert",
    comments: 267,
    url: "https://reddit.com/r/typescript/comments/123463"
  },
  {
    id: 9,
    title: "Building a microservices architecture: lessons learned",
    content: "My team recently migrated from a monolithic application to microservices. It was challenging but rewarding. Here are the key lessons and best practices we discovered...",
    author: "u/microservices_dev",
    comments: 189,
    url: "https://reddit.com/r/softwarearchitecture/comments/123464"
  },
  {
    id: 10,
    title: "The state of CSS in 2024: new features and best practices",
    content: "CSS has evolved significantly in recent years. From CSS Grid to Container Queries, here's what's new and how to use these features effectively in your projects...",
    author: "u/css_expert",
    comments: 134,
    url: "https://reddit.com/r/css/comments/123465"
  },
  {
    id: 11,
    title: "How to handle state management in large React applications",
    content: "As your React app grows, state management becomes increasingly complex. I've tried Redux, Zustand, and Context API. Here's my comparison and recommendations...",
    author: "u/state_manager",
    comments: 223,
    url: "https://reddit.com/r/reactjs/comments/123466"
  },
  {
    id: 12,
    title: "Security best practices for web developers",
    content: "Security should be a top priority for every web developer. Here are the most common vulnerabilities I see and how to prevent them in your applications...",
    author: "u/security_dev",
    comments: 298,
    url: "https://reddit.com/r/websecurity/comments/123467"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-secondary">
            Protegrity Reddit Feed
          </h1>
          <p className="text-gray-600 mt-2">
            Curated posts from the developer community
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6">
          {dummyPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
            >
              {/* Card Content */}
              <div className="p-6">
                {/* Post Title */}
                <h2 className="text-lg font-semibold text-secondary mb-3 line-clamp-2 hover:text-primary transition-colors duration-200">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                  >
                    {post.title}
                  </a>
                </h2>

                {/* Post Content */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.content}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="font-medium">{post.author}</span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {post.comments}
                  </span>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                  >
                    Read full post
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
