import { useEffect, useState } from "react";
import Credit from "./components/Credit";

function App() {
  const [credit, setCredit] = useState(localStorage.getItem('credit'));
  const [gridInt, setGridInt] = useState([]);
  const [gridStars, setGridStars] = useState([]);
  const [grids, setGrids] = useState([]);
  const [drawArrInt, setDrawArrInt] = useState([]);
  const [drawArrStars, setDrawArrStars] = useState([]);
  const [gridError, setGridError] = useState("");
  const [soldError, setSoldError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [displayed, setDisplayed] = useState(true);
  const [matchGrid, setMatchGrid] = useState({matchInt: [], matchStars: []});
  const [earning, setEarning] = useState();

  useEffect(() => {
    localStorage.setItem('credit', credit);
  }, [credit]);

  useEffect(() => {
    calcEarning()
  }, [matchGrid]);

  useEffect(() => {
    if(earning > 0) {
      setCredit(credit+earning);
    }
  },[earning])
  
  const range = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  const checkInt = (i) => {
    let elem = document.getElementById(i);

    setGridInt(gridInt.filter((el) => el !== i))
    elem.classList.remove('grid-btn-active');

    if(gridInt.length <= 4) {
      if (gridInt.includes(i)) {
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

    if(gridInt > 1 || gridStars > 1) {
      clearGrid();
    }


    while(arrInt.length < 5) {
      rand = randomNumberInRange(1, 50);
      if(!arrInt.includes(rand)) {
        checkInt(rand);
        arrInt.push(rand);
      }else {
        arrInt.pop();
      }
    }

    while(arrStars.length < 2) {
      rand = randomNumberInRange(1, 12);
      if(!arrStars.includes(rand)) {
        checkStar(rand);
        arrStars.push(rand);
      }else {
        arrStars.pop();
      }
    }
    
    setGridInt(arrInt);
    setGridStars(arrStars);
  }

  const clearGrid = () => {
    setGridInt([]);
    setGridStars([]);

    for(let i=1; i < 50; i++) {
      let elem = document.getElementById(i);
      setGridInt(gridInt.filter((el) => el !== i))
      elem.classList.remove('grid-btn-active');
    }

    for(let s=1; s < 12; s++) {
      let elem = document.getElementById("s"+s);
      setGridStars(gridStars.filter((el) => el !== s))
      elem.classList.remove('grid-star-btn-active');
    }
  }

  const removeGrid = () => {
    setGrids([]);
  }

  const confGrid = () => {
    if(gridInt.length === 5 && gridStars.length === 2) {
      setGrids([{...grids, gridInt, gridStars}]);
      setGridError("");
      setDisabled(false);
    }else {
      setDisabled(true);
      setGridError("Erreur: Il faut 5 chiffres et 2 étoiles.");
    }
  }

  const randomNumberInRange = (min, max) => {
    let rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
  }

  const buildDraw = () => {
    if(credit < 2.50) {
      setSoldError(true);
      return false;
    } else {
      setCredit(credit-2.50)
    }
    let int = [];
    let stars = [];

    while(int.length < 5) {
      let rand = randomNumberInRange(1,50);
      if(!int.includes(rand)) {
        int.push(rand);
      }else {
        int.pop();
      }
    }

    while(stars.length < 2) {
      let rand = randomNumberInRange(1,12);
      if(!stars.includes(rand)) {
        stars.push(rand);
      }else {
        stars.pop();
      }
    }

    if(int.length === 5 && stars.length === 2) {
      setDrawArrInt(int)
      setDrawArrStars(stars)
      compareResults(int, stars)
    }
  }

  const compareResults = (int, stars) => {
    setDisabled(true);
    setDisplayed(false);

    let matchInt = [];
    let matchStars = [];

    gridInt.map((gi) => {
      if(int.includes(gi)) {
        console.log("true int");
        matchInt.push(gi);
      }
    })

    gridStars.map((gs) => {
      if(stars.includes(gs)) {
        console.log("true star");
        matchStars.push(gs);
      }
    })

    return setMatchGrid({matchInt, matchStars});
  }

  const calcEarning = () => {
    console.log(matchGrid);
    let intL = matchGrid.matchInt.length;
    let starsL = matchGrid.matchStars.length;

    console.log(intL, starsL);
    
    switch(intL + '-' + starsL) {
      case "5-2": 
        setEarning(230000000);
        break;
      case "5-1":
        setEarning(4413400.80);
        break;
      case "5-0":
        setEarning(30174.50);
        break;
      case "4-2": 
        setEarning(1402.70);
        break;
      case "4-1": 
        setEarning(135.60);
        break;
      case "3-2":
        setEarning(69.30);
        break;  
      case "4-0": 
        setEarning(+credit+41);
        break;
      case "2-2":
        setEarning(17);
        break;
      case "3-1":
        setEarning(12.30);
        break;  
      case "3-0":
        setEarning(9.30);
        break;  
      case "1-2":
        setEarning(8);
        break;  
      case "2-1":
        setEarning(5.90);
        break;  
      case "2-0":
        setEarning(3.90);
        break;  
      default: 
        setEarning(0);
    }
  }

  const reloadCredit = () => {
    setCredit(10);
    setSoldError(false);
    return window.location.reload(false);
  }

  const currencyFormat = (number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number);
  }

  let numbers = range(1, 50);
  let stars = range(1, 12);

  return (
    <>
    {soldError ? (
      <div className="sold-error-container">
        <h2>Solde insuffisant</h2>
        <p>Vous n'avez plus assez de crédit pour jouer. Veuillez recharger votre compte.</p>
        <button 
          className="action-btn"
          onClick={() => reloadCredit()}
        >
            Recharger
          </button>
      </div>
    ) : (
      <>
      <Credit credit={credit} />
      <div className="header">
        <h1>Jackpot de {currencyFormat(230000000)}</h1>
      </div>
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
          <button 
            style={{
              marginBottom: 10, 
              display: displayed ? "block" : "none"
            }} 
            className="action-btn" 
            onClick={() => generateFlash()}
          >
            <i className="fa-solid fa-bolt"></i> Flash
          </button>
          <button 
          style={{
            display: displayed ? "block" : "none"
          }}
            className="action-btn" 
            onClick={() => confGrid()}
          >
            Ajouter
          </button>
          <div className="grid-error">{gridError}</div>
        </div>
      </div>
      <div className="resume">
        <div className="title">
            <h2>Mes grilles</h2>
        </div>
        <div className="grid-game">
          {grids.map((i) => (
            i.gridInt
            .sort((a,b) => (a-b))
            .map((el) => (
              <button 
                style={{
                  cursor: "initial",
                  opacity: Array.isArray(matchGrid.matchInt) && !matchGrid.matchInt.includes(el) && drawArrInt.length > 0 ? 0.4 : 1
                }} 
                disabled 
                className="grid-btn grid-btn-active"
              >
                {el}
              </button>
            ))
          ))}
          {grids.map((i) => (
            i.gridStars
            .sort((a,b) => (a-b))
            .map((el) => (
              <button 
                style={{
                  cursor: "initial",
                  opacity: Array.isArray(matchGrid.matchStars) && !matchGrid.matchStars.includes(el) && drawArrStars.length > 0 ? 0.4 : 1
                }} 
                disabled 
                className="grid-star-btn grid-star-btn-active"
              >
                {el}
              </button>
            ))
          ))}          
          <div className="grid-options">
            {disabled === false ? 'Total : '+ currencyFormat(2.50) : null}
          </div>   
            {!displayed ? 'Vos gains : ' + currencyFormat(earning) : null}    
        </div>
        <div>
          <button 
          style={{
            display: displayed ? "block" : "none"
          }}
            disabled={disabled} 
            className="action-btn" 
            onClick={() => buildDraw()}
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
        <button
          style={{
            display: displayed === false ? "block" : "none"
          }}
          className="action-btn"
          onClick={() => window.location.reload(false)}
        >
          <i className="fa-solid fa-rotate-right"></i> Rejouer
        </button>
      </div>
      </>
    )}
    </>
  );
}

export default App;
