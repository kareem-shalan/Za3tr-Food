import { useNavigate, useLocation } from 'react-router-dom';
import { ContextMeals } from '../context/ContextMeals';
import { useContext, useEffect, useState, useRef } from 'react';

const CategoryFilters = () => {
  const [categories, setCategories] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { CaptionMeals } = useContext(ContextMeals);

  useEffect(() => {
    CaptionMeals().then((data) => {
      if (data?.meals) {
        setCategories(data.meals);
      }
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });
  }, [CaptionMeals]);

  // Update selected category when route changes
  useEffect(() => {
    if (location.pathname.startsWith('/category/')) {
      const category = location.pathname.split('/').pop();
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    let scrollInterval;
    const scrollContainer = scrollRef.current;

    const startAutoScroll = () => {
      if (!isHovered && scrollContainer) {
        scrollInterval = setInterval(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
            scrollContainer.scrollLeft = 0;
          } else {
            scrollContainer.scrollLeft += 1.5;
          }
        }, 30);
      }
    };

    startAutoScroll();

    return () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
      }
    };
  }, [isHovered]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide relative"
      >
        {categories?.map((category) => (
          <button
            key={category.strCategory}
            onClick={() => handleCategoryClick(category.strCategory)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full bg-white shadow-sm hover:shadow-lg transition-all duration-300 whitespace-nowrap transform hover:-translate-y-1 hover:bg-primary/5 group ${
              selectedCategory === category.strCategory ? 'bg-primary/10 text-primary' : ''
            }`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
              {getCategoryEmoji(category.strCategory)}
            </span>
            <span className="font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
              {category.strCategory}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Helper function to get appropriate emoji for each category
const getCategoryEmoji = (category) => {
  const emojiMap = {
    'Beef': '🥩',
    'Chicken': '🍗',
    'Dessert': '🍰',
    'Lamb': '🍖',
    'Miscellaneous': '🍽️',
    'Pasta': '🍝',
    'Pork': '🥓',
    'Seafood': '🦐',
    'Side': '🥗',
    'Starter': '🥪',
    'Vegan': '🥬',
    'Vegetarian': '🥕',
    'Breakfast': '🍳',
    'Goat': '🐐',
    'Soup': '🥣'
  };

  return emojiMap[category] || '🍴';
};

export default CategoryFilters; 