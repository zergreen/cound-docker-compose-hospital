// ExampleComponent.js

import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';

const ExampleComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Simulating an asynchronous API call
    setTimeout(() => {
      const mockData = [1, 2, 3, 4, 5];
      setData(mockData);
      setIsLoading(false);
      navigate('/home')
    }, 1000);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {data.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExampleComponent;
