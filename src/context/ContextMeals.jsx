import { createContext } from "react";
import axios from "axios";

export const ContextMeals = createContext();

export default function ContextMealsProvider(props) {
    function CaptionMeals() {
        return axios
            .get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching categories:", err);
                throw err;
            });
    }

    function FristSection() {
        return axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching meals:", err);
                throw err;
            });
    }

    function getMealById(id) {
        return axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching meal details:", err);
                throw err;
            });
    }

    function MealsByName(name) {
        return axios
            .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then((res) => res.data)
            .catch((err) => {
                console.error("Error fetching meals by name:", err);
                throw err;
            });
    }

    return (
        <ContextMeals.Provider value={{ CaptionMeals, MealsByName, FristSection, getMealById }}>
            {props.children}
        </ContextMeals.Provider>
    );
}