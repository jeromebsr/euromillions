import { useState } from "react";

function App() {
  const [gridInt, setGridInt] = useState([]);
  const [grids, setGrids] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const checkInt = (i) => {
    let elem = document.getElementById(i);

    if(gridInt.length <= 4) {
      if(gridInt.includes(i)) {
        elem.classList.remove('grid-btn-active');
        return null;
      }
      setGridInt([...gridInt, i]);
      elem.classList.add('grid-btn-active');
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

  let result = range(1, 50);

  console.log(gridInt.length);
  console.log(gridInt.sort());
  console.log(grids);
  
  return (
    <div className="main-container">
      <div className="grid-game">
        {result.map((i) => (
          <>
          <button
            id={i} 
            className='grid-btn'
            value={i} 
            onClick={() => checkInt(i)}
            // style={{ 
            //   backgroundColor: isActive ? '#001367' : null, 
            //   color: isActive ? 'white' : null 
            // }}
          >
            {i}
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
