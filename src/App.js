import './App.css';
import React,{ useEffect , useState } from "react";
import Recipe from './Recipe';

function App() {
  const APP_ID ="6e0c4f72";
  const APP_KEY ="537f9ad29f708a768e7f9634fa65d96a";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('chicken');

  useEffect(() =>{
    getRecipes();
  },[query]);

  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch} />
        <button  type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe title ={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients} />
      ))}
      </div>
    </div>
  );
}

export default App;