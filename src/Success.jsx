import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-center p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Payment Successful! ✅</h2>
        <p className="text-gray-700 mb-4">Your payment was successfully processed.</p>
        <Link to="/" className="px-6 py-2 bg-gree-300 text-white rounded-lg hover:bg-black transition">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Success;
