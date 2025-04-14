import React, { useEffect, useState } from "react";
import { getRecipes, addRecipe } from "./api";
import "./App.css";

const App: React.FC = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "", steps: "" });

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        const data = await getRecipes();
        setRecipes(data);
    };

    const handleAddRecipe = async () => {
        await addRecipe(newRecipe);
        fetchRecipes();
        setNewRecipe({ name: "", ingredients: "", steps: "" });
    };

    return (
        <div className="App">
            <h1>Recipe Sharing App</h1>
            <div>
                <input type="text" placeholder="Recipe Name" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} />
                <input type="text" placeholder="Ingredients" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} />
                <input type="text" placeholder="Steps" value={newRecipe.steps} onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} />
                <button onClick={handleAddRecipe}>Add Recipe</button>
            </div>
            <ul>
                {recipes.map((recipe, index) => (
                    <li key={index}>
                        <h3>{recipe.name}</h3>
                        <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                        <p><strong>Steps:</strong> {recipe.steps}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
