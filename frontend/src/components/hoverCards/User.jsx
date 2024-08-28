import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '../ui/card';


const UserHoverCard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/user/get-one-user', { id: userId });
      setUserDetails(response.data);
    } catch (err) {
      setError('Error fetching user details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Card className="bg-white shadow-md rounded-lg p-4 cursor-pointer" onClick={fetchUserDetails}>
        <h2 className="text-xl font-bold mb-2">Click to the see the student details</h2>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {userDetails && (
          <div className="mt-4">
            <p className="text-gray-700"><strong>Name:</strong> {userDetails.name}</p>
            <p className="text-gray-700"><strong>Email:</strong> {userDetails.email}</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default UserHoverCard;