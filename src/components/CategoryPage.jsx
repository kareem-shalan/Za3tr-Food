import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import { ContextMeals } from '../context/ContextMeals';
import { PlusIcon } from '@heroicons/react/24/outline';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { MealsByName } = useContext(ContextMeals);

  useEffect(() => {
    setIsLoading(true);
    MealsByName(categoryName)
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((error) => {
        console.error('Error fetching category meals:', error);
        setMeals([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryName, MealsByName]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!meals.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No meals found in this category</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <div
            key={meal.idMeal}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden group"
          >
            <Link
              to={`/product/${meal.idMeal}`}
              className="relative aspect-square overflow-hidden block"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                  {meal.strCategory}
                </span>
                <span className="text-xs text-gray-500 italic">
                  {meal.strArea}
                </span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 line-clamp-1 mb-2">
                {meal.strMeal}
              </h3>
              <button
                className="w-full bg-primary text-white px-3 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center space-x-2 text-sm"
                aria-label={`Add ${meal.strMeal} to cart`}
              >
                <span>Add to Cart</span>
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage; 