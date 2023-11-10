import MealItem from "./MealItem";
import FetchMeals from "../../server/data/FetchMeals";
import { useEffect, useState } from "react";
import Button from "./UI/Button";

export default function Meals() {
  const { availableMeals, loading } = FetchMeals();
  const meals = availableMeals || [];
  const filters = availableMeals?.labels;
  const [mealFilters, setMealFilters] = useState([]);
  const [readyMeals, setReadyMeals] = useState(meals);

  useEffect(() => {
    //Meals filtered based on selected filters
    if (meals.meals) {
      const newReadyMeals = meals.meals.filter((meal) =>
        mealFilters.every((filter) => meal.labels.includes(filter))
      );
      setReadyMeals(newReadyMeals);
    }
  }, [meals, mealFilters]);

  if (loading) {
    return <div>Loading</div>;
  }

  function handleFilterSelect(id) {
    if (mealFilters.includes(id)) {
      const updatedFilters = mealFilters.filter((label) => label !== id);
      setMealFilters(updatedFilters);
    } else {
      setMealFilters([...mealFilters, id]);
    }
  }

  return (
    <>
      <div id="meals-component">
        <div id="filter-list">
          {filters.map((label) => (
            <Button
              key={label.id}
              onClick={() => handleFilterSelect(label.id)}
              className="filter-btn"
              textOnly
            >
              {label.label}
            </Button>
          ))}
        </div>

        <ul id="meal-list">
          {readyMeals.map((meal) => (
            <MealItem key={meal.id} meal={meal} />
          ))}
        </ul>
      </div>
    </>
  );
}
