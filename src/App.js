import { useState } from "react";

function App() {
  const [gridInt, setGridInt] = useState([]);
  const [gridStars, setGridStars] = useState([]);
  const [grids, setGrids] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const checkInt = (i) => {
    let elem = document.getElementById(i);

    setGridInt(gridInt.filter((el) => el !== i))
    elem.classList.remove('grid-btn-active');

    if(gridInt.length <= 4) {
      if(gridInt.includes(i)) {
        return null;
      }
      setGridInt([...gridInt, i]);
      elem.classList.add('grid-btn-active');
    }
  }

  const checkStar = (s) => {
    let elem = document.getElementById("s"+s);

    setGridStars(gridStars.filter((el) => el !== s))
    elem.classList.remove('grid-star-btn-active');

    if(gridStars.length <= 1) {
      if(gridStars.includes(s)) {
        return null;
      }
      setGridStars([...gridStars, s]);
      elem.classList.add('grid-star-btn-active');
    }
  }

  const clearGrid = () => {
    setGridInt([]);
  }

  const confGrid = () => {
    if(gridInt.length === 5) {
      setGrids([{...grids, gridInt}]);
    }else {
      console.log("Erreur: Il faut 5 chiffres.")
    }
    
  }

  let numbers = range(1, 50);
  let stars = range(1, 12);

  console.log(gridInt.length);
  console.log(gridInt.sort());

  
  console.log(gridStars.length);
  console.log(gridStars.sort());

  console.log(grids);
  
  return (
    <div className="main-container">
      <div className="grid-game">
        {numbers.map((i) => (
          <>
          <button
            id={i} 
            className='grid-btn'
            value={i} 
            onClick={() => checkInt(i)}
          >
            {i}
          </button>
          </>
        ))}
      </div>
      <div className="stars-grid">
      {stars.map((s) => (
          <>
          <button
            id={"s"+s} 
            className='grid-star-btn'
            value={s} 
            onClick={() => checkStar(s)}
          >
            {s}
          </button>
          </>
        ))}
      </div>
      <div>
        <button onClick={() => clearGrid()}>Effacer</button>
        <button onClick={() => confGrid()}>Valider</button>
      </div>
      <div className="resume">
          <h2>Mes grilles</h2>
          {grids.map((i) => (
            i.gridInt
          ))}
      </div>
    </div>
  );
}

export default App;
