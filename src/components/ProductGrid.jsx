
import ProductCard from './ProductCard';

const ProductGrid = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-8">
        <div className="w-full overflow-hidden">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 