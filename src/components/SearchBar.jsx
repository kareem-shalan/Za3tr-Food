import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import { ContextMeals } from '../context/ContextMeals';
import { useContext, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

const SearchBar = () => {
  const [TargetMeal, setTargetMeal] = useState([]);
  const { MealsByName } = useContext(ContextMeals);

  function handleSubmit(values) {
    let meals = values.search;
    MealsByName(meals)
      .then((res) => {
        setTargetMeal(res.meals || []);
      })
      .catch((err) => {
        console.error('Search error:', err);
        setTargetMeal([]);
      });
  }

  const Formik = useFormik({
    initialValues: {
      search: ''
    },
    onSubmit: handleSubmit
  });

  return (
    <div className="w-full">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="relative">
          <input
            type="text"
            name="search"
            value={Formik.values.search}
            onChange={Formik.handleChange}
            onBlur={Formik.handleBlur}
            placeholder="Search for your favorite food..."
            className="input pl-12"
          />
          <MagnifyingGlassIcon
            onClick={Formik.handleSubmit}
            className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primary transition-colors"
          />
        </div>
      </div>

      {/* Search Results */}
      {TargetMeal && TargetMeal.length > 0 && (

        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 font-serif">
            Found {TargetMeal.length} {TargetMeal.length === 1 ? 'meal' : 'meals'} for <span className="text-primary">{Formik.values.search}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {TargetMeal.map((meal) => (
              <Link
                key={meal.idMeal}
                to={`/product/${meal.idMeal}`}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="relative aspect-square overflow-hidden group">
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                </div>
                <div className="p-4 ">
                  <div className="flex justify-between items-center mb-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      {meal.strCategory}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      {meal.strArea}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1">
                    {meal.strMeal}
                  </h3>
                  <button
                    className="bg-primary text-white px-2 py-1 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center space-x-1 group text-xs"
                    aria-label={`Add ${meal.strMeal} to cart`}
                  >
                    <span>Add to Cart</span>
                    <PlusIcon className="h-3 w-3 group-hover:rotate-90 transition-transform duration-200" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {Formik.values.search && TargetMeal && TargetMeal.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No meals found for "{Formik.values.search}"</p>
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default SearchBar; 