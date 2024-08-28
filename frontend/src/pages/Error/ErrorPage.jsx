import React from 'react';
import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sorry, the page you are searching does not exist or Our server are down right now.</h1>
      <p className="text-lg mb-6">Please try again later.</p>
      <Button onClick={handleRetry} className="bg-blue-500 hover:bg-blue-600 text-white">
        Retry
      </Button>
    </div>
  );
};

export default ErrorPage;