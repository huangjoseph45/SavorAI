import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";

const RecipeTemplate = ({ recipe, onClick }) => {
  const recipeList = recipe.content.split("<br>");
  const type = useRef(null);
  let recipeListElements;

  const filteredRecipeList = recipeList.filter((line) => {
    return line.split("*").length - 1 <= 7 && line.trim() !== "";
  });

  //   filteredRecipeList[filteredRecipeList.length - 1] = `Serves ${
  //     filteredRecipeList[filteredRecipeList.length - 1]
  //   } people`;

  if (filteredRecipeList.length > 5) {
    recipeListElements = filteredRecipeList.map((line, index) => {
      const asteriskCount = line.split("*").length - 1;
      line = line.replace(/\*/g, "");
      line = line.trim();

      if (asteriskCount === 6 || asteriskCount === 5) {
        return (
          <li key={index}>
            <h1>{line}</h1>
          </li>
        );
      } else if (asteriskCount === 4) {
        type.current = line;
        return (
          <li key={index}>
            <h2>{line}</h2>
          </li>
        );
      } else if (type.current === "Ingredients") {
        return <li key={index}>{line}</li>;
      } else if (type.current === "Instructions" && line.length > 4) {
        return <li key={index}>{line}</li>;
      } else if (line.length < 5) {
        const starCount = parseFloat(line); // Convert the line to a float number
        return (
          <li key={index}>
            {/* Render full stars */}
            {Array.from({ length: Math.floor(starCount) }).map((_, i) => (
              <FontAwesomeIcon icon={faStar} key={i} className="star" />
            ))}
            {/* Render half star if applicable */}
            {starCount % 1 >= 0.5 && (
              <FontAwesomeIcon
                icon={faStarHalf}
                key={`${index}-half-star`}
                className="star"
              />
            )}
          </li>
        );
      } else {
        return <small key={index}>{line}</small>;
      }
    });
  }

  console.log(filteredRecipeList);
  return (
    <ul
      className="recipe-wrapper scale"
      onClick={() =>
        onClick(filteredRecipeList.filter((item) => item != "<br>"))
      }
    >
      {recipeListElements}
    </ul>
  );
};

export default RecipeTemplate;
