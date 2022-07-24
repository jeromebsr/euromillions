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
  const [matchGrid, setMatchGrid] = useState({matchInt: {}, matchStars: {}});
  const [earning, setEarning] = useState(0);
  let jackpot = 230000000;

  useEffect(() => {
    localStorage.setItem('credit', credit);
  }, [credit]);
  
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

  const buildDraw = async () => {
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
    
     // CHEAT RESULT 
     int = [1,2,3,4,5];
     stars = [1,2];
     // END CHEAT

    if(int.length === 5 && stars.length === 2) {
      console.log("lenght int + stars OK");
      setDrawArrInt(int)
      setDrawArrStars(stars)
      compareResults(int, stars)
    }



    await compareResults(int, stars);
    await calcEarning();
    await dispatchEarning();
  }

  const compareResults = (int, stars) => {
    setDisabled(true);
    setDisplayed(false);

    let matchInt = [];
    let matchStars = [];

    
    gridInt.map((gi) => {
      if(int.includes(gi)) {
        matchInt.push(gi);
      }
    })

    gridStars.map((gs) => {
      if(stars.includes(gs)) {
        matchStars.push(gs);
      }
    })

    setMatchGrid({matchInt, matchStars});
  }

  const calcEarning = () => {
    let intL = matchGrid.matchInt.length;
    let starsL = matchGrid.matchStars.length;

    console.log(intL, starsL);
    
    switch(intL + '-' + starsL) {
      case "5-2": 
        console.log('Rang 1');
        setEarning(jackpot);
        break;
      case "5-1":
        console.log('Rang 2');
        setEarning(4413400.80);
        break;
      case "5-0":
        console.log('Rang 3');
        setEarning(30174.50);
        break;
      case "4-2": 
        console.log('Rang 4');
        setEarning(1402.70);
        break;
      case "4-1": 
        console.log('Rang 5');
        setEarning(135.60);
        break;
      case "3-2":
        console.log('Rang 6');
        setEarning(69.30);
        break;  
      case "4-0": 
        console.log('Rang 7');
        setEarning(+credit+41);
        break;
      case "2-2":
        console.log('Rang 8');
        setEarning(17);
        break;
      case "3-1":
        console.log('Rang 9');
        setEarning(12.30);
        break;  
      case "3-0":
        console.log('Rang 10');
        setEarning(9.30);
        break;  
      case "1-2":
        console.log('Rang 11');
        setEarning(8);
        break;  
      case "2-1":
        console.log('Rang 12');
        break;  
      case "2-0":
        console.log('Rang 13');
        setEarning(3.90);
        break;  
      default: 
        console.log('Aucun gain');
    }
    console.log(intL);
    console.log(starsL);
  }

  const dispatchEarning = () => {
    setCredit(credit+earning)  
  }

  const reloadCredit = () => {
    setCredit(1000);
    setSoldError(false);
    return window.location.reload(false);
  }

  const currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  let numbers = range(1, 50);
  let stars = range(1, 12);
  //console.log(matchGrid);
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
        <h1>Jackpot de {currencyFormat(jackpot)}€</h1>
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
                  opacity: Array.isArray(matchGrid.matchInt) && !matchGrid.matchInt.includes(el) ? 0.4 : 1
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
                  opacity: Array.isArray(matchGrid.matchStars) && !matchGrid.matchStars.includes(el) ? 0.4 : 1
                }} 
                disabled 
                className="grid-star-btn grid-star-btn-active"
              >
                {el}
              </button>
            ))
          ))}
          <div className="grid-options">
            <button 
              className="icon-btn" 
              style={{
                display: displayed ? "block" : "none"
              }}
              onClick={() => removeGrid()}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>   
          {!displayed ? 'Vos gains : ' + earning + '€' : null}    
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
