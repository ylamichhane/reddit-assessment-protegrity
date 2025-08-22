export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to My App
        </h1>
        <p className="text-gray-600 mb-8">
          Your clean Next.js application is ready!
        </p>
        
        {/* Font demonstration */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-secondary mb-4">DINPro Font Demo</h2>
          <div className="space-y-2 text-left">
            <p className="font-light text-lg">Light (300): The quick brown fox jumps over the lazy dog</p>
            <p className="font-normal text-lg">Regular (400): The quick brown fox jumps over the lazy dog</p>
            <p className="font-medium text-lg">Medium (500): The quick brown fox jumps over the lazy dog</p>
            <p className="font-bold text-lg">Bold (700): The quick brown fox jumps over the lazy dog</p>
            <p className="font-black text-lg">Black (900): The quick brown fox jumps over the lazy dog</p>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-gray-500">
              Font family: <code className="bg-gray-100 px-2 py-1 rounded">var(--font-din-pro)</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
