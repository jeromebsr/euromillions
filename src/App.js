import { useCallback, useEffect, useState } from "react";

function App() {
  const [gridInt, setGridInt] = useState([]);
  const [gridStars, setGridStars] = useState([]);
  const [grids, setGrids] = useState([]);
  const [drawArrInt, setDrawArrInt] = useState([]);
  const [drawArrStars, setDrawArrStars] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

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

  const generateFlash = () => {
    let arrInt = [];
    let arrStars = [];
    let rand = null;

    while(arrInt.length < 5) {
      rand = randomNumberInRange(1, 50, 'Int');
      if(!arrInt.includes(rand)) {
        checkInt(rand);
        arrInt.push(rand);
      }else {
        arrInt.pop();
      }
    }

    while(arrStars < 2) {
      rand = randomNumberInRange(1, 12, 'Stars');
      if(!arrStars.includes(rand)) {
        checkStar(rand);
        arrStars.push(rand);
      }else {
        arrStars.pop();
      }
    }
    
    console.log(arrInt, arrStars);
  }

  const clearGrid = () => {
    for(let i=1; 1 < 50; i++) {
      let elem = document.getElementById(i);
      setGridStars(gridStars.filter((el) => el !== i))
      elem.classList.remove('grid-btn-active');
      console.log(i, elem);
    }
    setGrids([]);
  }

  const confGrid = () => {
    if(gridInt.length === 5 && gridStars.length === 2) {
      setGrids([{...grids, gridInt, gridStars}]);
      setError("");
      setDisabled(false);
    }else {
      setDisabled(true);
      setError("Erreur: Il faut 5 chiffres et 2 étoiles.");
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
    return rand;
  }

  const buildDraw = () => {
    let int = [];
    let stars = [];
   

    while(int.length < 5) {
      let rand = randomNumberInRange(1,50, 'Int');
      if(!int.includes(rand)) {
        int.push(rand);
      }else {
        int.pop();
      }
    }

    while(stars.length < 2) {
      let rand = randomNumberInRange(1,12, 'Stars');
      if(!stars.includes(rand)) {
        stars.push(rand);
      }else {
        stars.pop();
      }
    }

    setDrawArrInt(int)
    setDrawArrStars(stars)
  }

  const compareResults = async () => {
    await buildDraw();
    let matchInt = [];
    let matchStars = [];

    gridInt.map((gi) => {
      if(drawArrInt.includes(gi)) {
        matchInt.push(gi);
      }
     
    })

    gridStars.map((gs) => {
      if(drawArrStars.includes(gs)) {
        matchStars.push(gs);
      }
    })
  }

  let numbers = range(1, 50);
  let stars = range(1, 12);
  
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
        <button style={{marginBottom: 10}} className="action-btn" onClick={() => generateFlash()}>Flash</button>
        <button className="action-btn" onClick={() => confGrid()}>Ajouter</button>
        <div className="grid-error">{error}</div>
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
        <button 
          disabled={disabled} 
          className="action-btn" 
          onClick={() => compareResults()}
        >
          Jouer
        </button>
      </div>  
      <div className="draw">
        <h2>Tirage</h2>
        {drawArrInt ? drawArrInt
        .sort((a,b) => (a-b))
        .map((el) => (
          <button style={{cursor: "initial"}} disabled className="grid-btn grid-btn-active">{el}</button> 
        )) : "Tirage prochainement"}
        {drawArrStars ?  drawArrStars
        .sort((a,b) => (a-b))
        .map((el) => (
          <button style={{cursor: "initial"}} disabled className="grid-star-btn grid-star-btn-active">{el}</button>
        )): "Tirage prochainement"}
      </div>
    </div>
    </>
  );
}

export default App;
