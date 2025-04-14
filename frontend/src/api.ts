import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/recipes";

export const getRecipes = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addRecipe = async (recipe: any) => {
    await axios.post(`${API_URL}/add`, recipe);
};
