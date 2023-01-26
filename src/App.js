import { useState, useEffect } from "react";

const width = 8;
const candyColors = ["blue", "green", "orange", "purple", "red", "yellow"];

const App = () => {
  const [currentColorArrangment, setCurrentColorArrangment] = useState([]);
  const [squarebeingDragged, setSquareBeingDragged] = useState(null);
  const [squarebeingReplaced, setSquareBeingReplaced] = useState(null);

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
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
        return true;
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangment[i];

      if (
        columnOfFour.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        columnOfFour.forEach((square) => (currentColorArrangment[square] = ""));
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        rowOfThree.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        rowOfThree.forEach((square) => (currentColorArrangment[square] = ""));
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangment[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;
      if (
        rowOfFour.every(
          (square) => currentColorArrangment[square] === decidedColor
        )
      ) {
        rowOfFour.forEach((square) => (currentColorArrangment[square] = ""));
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 55; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);
      if (isFirstRow && currentColorArrangment[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArrangment[i] = candyColors[randomNumber];
      }
      if (currentColorArrangment[i + width] === "") {
        currentColorArrangment[i + width] = currentColorArrangment[i];
        currentColorArrangment[i] = "";
      }
    }
  };

  const dragStart = (e) => {
    console.log(e.target);
    console.log("drag start");
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    console.log(e.target);
    console.log("drag drop");
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    console.log("drag end");

    const squarebeinDraggedId = parseInt(
      squarebeingDragged.getAttribute("data-id")
    );

    const squarebeinReplacedId = parseInt(
      squarebeingReplaced.getAttribute("data-id")
    );

    currentColorArrangment[squarebeinReplacedId] =
      squarebeingDragged.style.backgroundColor;
    currentColorArrangment[squarebeinDraggedId] =
      squarebeingReplaced.style.backgroundColor;

    console.log("squarebeinDraggedId", squarebeinDraggedId);
    console.log("squarebeingReplacedId", squarebeinReplacedId);

    const validMoves = [
      squarebeinDraggedId - 1,
      squarebeinDraggedId + width,
      squarebeinDraggedId - width,
      squarebeinDraggedId + 1,
    ];

    const validMove = validMoves.includes(squarebeinReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();

    const isAColumnOfThree = checkForColumnOfThree();
    const isARowOfThree = checkForRowOfThree();

    if (
      squarebeinReplacedId &&
      validMove &&
      (isAColumnOfFour || isARowOfFour || isAColumnOfThree || isARowOfThree)
    ) {
      console.log("validMove", validMove);
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColorArrangment[squarebeinReplacedId] =
        squarebeingReplaced.style.backgroundColor;
      currentColorArrangment[squarebeinDraggedId] =
        squarebeingDragged.style.backgroundColor;
    }
    setCurrentColorArrangment([...currentColorArrangment]);
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
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColorArrangment([...currentColorArrangment]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColorArrangment,
  ]);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangment.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
