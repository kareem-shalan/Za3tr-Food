import React from 'react';

import SearchBar from '../components/SearchBar';
import ProductCard from './../components/ProductCard';

const Home = () => {
  return (
    <div className="animate-fadeIn">
      <SearchBar />
      <div className="mt-8">
        <ProductCard />
      </div>
    </div>
  );
};

export default Home; 