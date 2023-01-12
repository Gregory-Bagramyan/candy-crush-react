import { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangment[i];

      if (
        columnOfThree.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        columnOfThree.forEach(
          (square) => (currentColorArrangment[square] = "")
        );
      }
    }
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfThree();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);
    return () => clearInterval(timer);
  }, [checkForColumnOfThree, currentColorArrangment]);

  console.log(currentColorArrangment);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
