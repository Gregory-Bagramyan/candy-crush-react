import { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);

  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangment.push(randomColor);
    }

    setCurrentColorArrangment(randomColorArrangment);
  };

  useEffect(() => {
    createBoard();
  }, []);

  console.log(currentColorArrangment);

  return <div></div>;
};

export default App;
