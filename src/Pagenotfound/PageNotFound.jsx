import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ClockIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with logo/brand */}
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">Timepiece Haven</h1>
        </div>
        
        {/* Main content */}
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 mb-6">
            <ClockIcon className="h-12 w-12 text-red-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2">404 - Time's Up!</h2>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for has ticked away into the void.
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Return to Home
            </Link>
            
            <Link
              to="/products"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Browse Watches
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="#" className="text-indigo-600 hover:text-indigo-500">Contact our support team</a>
          </p>
        </div>
      </div>
      
      {/* Optional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-indigo-100 opacity-30"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full bg-red-100 opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 rounded-full bg-yellow-100 opacity-20"></div>
      </div>
    </div>
  );
};

export default PageNotFound;