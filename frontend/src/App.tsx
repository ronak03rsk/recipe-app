import React, { useEffect, useState } from "react";
import { getRecipes, addRecipe } from "./api";
import "./App.scss";

interface Recipe {
    id?: number;
    name: string;
    ingredients: string;
    steps: string;
}

const App: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [newRecipe, setNewRecipe] = useState<Recipe>({ name: "", ingredients: "", steps: "" });
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            const data = await getRecipes();
            setRecipes(data);
        } catch (error) {
            console.error("Failed to fetch recipes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddRecipe = async () => {
        if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.steps) {
            alert("Please fill in all fields");
            return;
        }
        
        try {
            await addRecipe(newRecipe);
            fetchRecipes();
            setNewRecipe({ name: "", ingredients: "", steps: "" });
        } catch (error) {
            console.error("Failed to add recipe:", error);
        }
    };

    const formatIngredientsList = (ingredients: string) => {
        return ingredients.split(',').map(item => item.trim());
    };
    
    const formatStepsList = (steps: string) => {
        return steps.split('.').filter(step => step.trim() !== '').map(step => step.trim());
    };

    return (
        <div className="App">
            <h1>Recipe Sharing App</h1>
            
            <div className="recipe-form">
                <h2>Add New Recipe</h2>
                <div className="form-group">
                    <label htmlFor="recipeName">Recipe Name</label>
                    <input 
                        id="recipeName"
                        type="text" 
                        placeholder="e.g. Chocolate Chip Cookies" 
                        value={newRecipe.name} 
                        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea 
                        id="ingredients"
                        placeholder="Enter ingredients separated by commas (e.g. 2 cups flour, 1 cup sugar, 2 eggs)" 
                        value={newRecipe.ingredients} 
                        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="steps">Cooking Steps</label>
                    <textarea 
                        id="steps"
                        placeholder="Enter steps separated by periods (e.g. Mix dry ingredients. Add wet ingredients. Bake at 350°F.)" 
                        value={newRecipe.steps} 
                        onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} 
                    />
                </div>
                
                <button onClick={handleAddRecipe}>Add Recipe</button>
            </div>
            
            {isLoading ? (
                <p>Loading recipes...</p>
            ) : recipes.length === 0 ? (
                <div className="empty-state">
                    <p>No recipes yet. Add your first recipe above!</p>
                </div>
            ) : (
                <div className="recipes-container">
                    {recipes.map((recipe, index) => (
                        <div className="recipe-card" key={recipe.id || index}>
                            <h3>{recipe.name}</h3>
                            
                            <div className="recipe-section">
                                <h4>Ingredients</h4>
                                <ul className="ingredients-list">
                                    {formatIngredientsList(recipe.ingredients).map((ingredient, i) => (
                                        <li key={i}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="recipe-section">
                                <h4>Steps</h4>
                                <ol className="steps-list">
                                    {formatStepsList(recipe.steps).map((step, i) => (
                                        <li key={i}>{step}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
