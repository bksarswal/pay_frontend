import { Link } from 'react-router-dom';

function Failed() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen b text-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-2">Payment Failed ❌</h2>
        <p className="text-gray-700 mb-4">Oops! Something went wrong. Please try again.</p>
        <Link to="/" className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-black transition">
          Try Again
        </Link>
      </div>
    </div>
  );
}

export default Failed;
