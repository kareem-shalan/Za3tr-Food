import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  ClockIcon, 
  GlobeAltIcon, 
  HeartIcon,
  ShareIcon,
  PrinterIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchMeal = async () => {
      if (!id) {
        setError('No meal ID provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Check cache first
        const cachedMeal = localStorage.getItem(`meal_${id}`);
        if (cachedMeal) {
          const parsedMeal = JSON.parse(cachedMeal);
          if (isMounted) {
            setMeal(parsedMeal);
            setIsLoading(false);
            return;
          }
        }

        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (isMounted) {
          if (response.data?.meals?.[0]) {
            const mealData = response.data.meals[0];
            setMeal(mealData);
            // Cache the meal data
            localStorage.setItem(`meal_${id}`, JSON.stringify(mealData));
          } else {
            setError('Meal not found');
          }
        }
      } catch (err) {
        console.error('Error fetching meal:', err);
        if (isMounted) {
          setError('Failed to load meal details. Please try again later.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchMeal();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Save last viewed meal
  useEffect(() => {
    if (meal) {
      localStorage.setItem('lastViewedMeal', JSON.stringify({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        timestamp: new Date().toISOString()
      }));
    }
  }, [meal]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="space-y-4 text-center">
          <div className="relative mx-auto w-16 h-16">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 border-t-4 border-primary rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-500 animate-pulse">Loading your meal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 sm:p-8 text-center mx-4">
          <div className="text-red-500 text-5xl sm:text-6xl mb-4">🍽️</div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (!meal) return null;

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((num) => ({
      ingredient: meal[`strIngredient${num}`],
      measure: meal[`strMeasure${num}`]
    }))
    .filter(({ ingredient }) => ingredient && ingredient.trim());

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
        
        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white bg-black/20 backdrop-blur-lg rounded-full p-2 hover:bg-black/30 transition-all duration-300"
            >
              <ArrowLeftIcon className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-primary text-white' 
                    : 'bg-black/20 backdrop-blur-lg text-white hover:bg-black/30'
                }`}
              >
                <HeartIcon className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/30 transition-all duration-300">
                <ShareIcon className="h-6 w-6" />
              </button>
              <button className="hidden sm:block p-2 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/30 transition-all duration-300">
                <PrinterIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{meal.strMeal}</h1>
                <div className="flex items-center space-x-4 text-sm sm:text-base">
                  <span className="flex items-center">
                    <GlobeAltIcon className="h-4 w-4 mr-1" />
                    {meal.strArea}
                  </span>
                  <span className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {meal.strCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <button
            className="w-full bg-primary text-white px-6 py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
          >
            <span>Add to Cart</span>
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Ingredients Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ingredients.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold mr-3">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.ingredient}</div>
                  <div className="text-sm text-gray-500">{item.measure}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Instructions</h2>
          <div className="space-y-4">
            {meal.strInstructions.split('.').map((instruction, index) => (
              instruction.trim() && (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{instruction.trim()}.</p>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Tags Card */}
        {meal.strTags && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {meal.strTags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm hover:bg-gray-200 transition-all duration-300"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
