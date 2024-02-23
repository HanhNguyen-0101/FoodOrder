import MealItem from "./MealItem";
import useHttp from "./hook/useHttp";
import Error from './UI/Error';

const config = {};

function Meals() {
    const {data: loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', config, []);

    if (isLoading) {
        return <p>Fetching meals...</p>;
    }

    if (error && !isLoading) {
        return <Error title='Failed to fetch meals' message={error} />
    }
    return (
        <ul id="meals">
            {loadedMeals.map(meal => {
                return <MealItem key={meal.id} meal={meal} />
            })}
        </ul>
    );
}

export default Meals;