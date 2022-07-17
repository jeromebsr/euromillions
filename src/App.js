import { useCallback, useEffect, useState } from "react";

function App() {
  const [gridInt, setGridInt] = useState([]);
  const [gridStars, setGridStars] = useState([]);
  const [grids, setGrids] = useState([]);
  const [drawArrInt, setDrawArrInt] = useState([]);
  const [drawArrStars, setDrawArrStars] = useState([]);
  // const [drawArr, setDrawArr] = useState([]);

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
    setGrids([]);
  }

  const confGrid = () => {
    if(gridInt.length === 5 && gridStars.length === 2) {
      setGrids([{...grids, gridInt, gridStars}]);
    }else {
      console.log("Erreur: Il faut 5 chiffres et 2 étoiles.")
    }
    
  }

  const randomNumberInRange = (min, max, tab) => {
    let array = null;
    if(tab === 'Int') {
      array = drawArrInt;
    }else {
      array = drawArrStars;
    }

    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    if(!array.includes(rand)) {
      return rand
    }
  }

  const buildDraw = () => {
    if(drawArrInt.length < 5) {
      setDrawArrInt([...drawArrInt, randomNumberInRange(1,50, 'Int')])
    }

    if(drawArrStars.length < 2) {
      setDrawArrStars([...drawArrStars, randomNumberInRange(1,12, 'Stars')])
    }
  }

  const testInc = (val) => {
    let newArr = [];
    while(val < 5) {
      
      newArr[newArr].push(val)
      
      val++
    }
    setDrawArrInt([...drawArrInt, newArr])
  }

  testInc(0);

  const compareResults = async () => {
    await buildDraw()
    if(drawArrInt.includes(undefined) || drawArrStars.includes(undefined)) {
      setDrawArrInt([]);
      setDrawArrStars([]);
      console.log("nouveau tirage ");
      buildDraw();
    }
    console.log(drawArrInt, drawArrStars)
  }

  let numbers = range(1, 50);
  let stars = range(1, 12);

  // console.log(gridInt.length);
  // console.log(gridInt.sort());

  
  // console.log(gridStars.length);
  // console.log(gridStars.sort());

  //console.log(grids);
  
  return (
    <>
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
        <button onClick={() => confGrid()}>Ajouter</button>
      </div>
    </div>
    <div className="resume">
      <div className="title">
          <h2>Mes grilles</h2>
      </div>
      <div className="grid-game">
        {grids.map((i) => (
          i.gridInt.sort().map((el) => (
            <button style={{cursor: "initial"}} disabled className="grid-btn grid-btn-active">{el}</button>
          ))          
        ))}
        {grids.map((i) => (
          i.gridStars
          .sort((a,b) => (a-b))
          .map((el) => (
            <button style={{cursor: "initial"}} disabled className="grid-star-btn grid-star-btn-active">{el}</button>
          ))          
        ))}
        <button onClick={() => clearGrid()}><i className="fa-solid fa-trash-can"></i></button>
      </div>
      <div>
        <button onClick={() => compareResults()}>Jouer</button>
      </div>  
      <div className="draw">
            <h2>Tirage</h2>
            {drawArrInt
            .sort((a,b) => (a-b))
            .map((el) => (
              <button style={{cursor: "initial"}} disabled className="grid-btn grid-btn-active">{el}</button> 
            ))}
            {drawArrStars
            .sort((a,b) => (a-b))
            .map((el) => (
              <button style={{cursor: "initial"}} disabled className="grid-star-btn grid-star-btn-active">{el}</button>
            ))}
      </div>
    </div>
    </>
  );
}

export default App;
