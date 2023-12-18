
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addgems, clearcards } from './reducers/slice';
import playerinfo from './playersinfo';

export default function Game() {
          const compareArrays = (array1, array2) => {
            let result;
            // Validate that the arrays are of the same length
            if (array1.length !== array2.length) {
              throw new Error('Arrays must have the same length');
            }
          
            // Calculate the total values for each array with index impact
            const totalArray1 = array1.reduce((sum, num, index) => sum + num / (index + 1), 0);
            const totalArray2 = array2.reduce((sum, num, index) => sum + num / (index + 1), 0);
          
            // Calculate the difference between the total values
            const difference = totalArray1 - totalArray2;
          
            // Normalize the difference to a range between 0 and 1
            const normalizedDifference = (difference / Math.max(totalArray1, totalArray2, 1))/2;
        
          
            // Generate a random number between 0 and 1
            const randomValue = Math.random();

            if(randomValue>0.5+difference){
              result = false;
            }else{
              result = true;
            }
            return result;
          };
        const getRandomValue = (keysArray, myObject) => {
          // Get a random index from the keysArray
          const randomIndex = Math.floor(Math.random() * keysArray.length);
          console.log(keysArray);
          // Get the random key from the array
          const randomKey = keysArray[randomIndex];
          console.log(randomKey);
          console.log(myObject[randomKey]);

          // Return the corresponding value from the object
          return myObject[randomKey];
        };
          const [player1d, setPlayer1] = useState(null);
          const [player2d, setPlayer2] = useState(null);
          const [scored, setScore] = useState([0, 0]);
          const [balld, setBall] = useState('middle');
        const GAMEON = ()=> {
          console.log(enemyteam);
          console.log(picked);
          var player1;
          var player2;
          let time = 90;
          let middle = ['LM','CM','RM'];
          let midef = ['LDM','RDM'];
          let def = ['LB','LCB','RCB','RB'];
          let gk = ['GK']
          let midatk = ['CAM']
          let ball = 'middle'
          let score = [0,0]

          const intervalId = setInterval(() => {
            setBall(ball);
            switch (ball) {

                case 'middle':
                  player1=getRandomValue(middle,picked);
                  player2=getRandomValue(middle,enemyteam);

                  if(
                  compareArrays([player1.rating,player1.score.pac,player1.score.pas,player1.score.phy],[player2.rating,player2.score.pac,player2.score.pas,player2.score.phy])
                  ){ball = 'ten'}else{ball = 'tyou'}
                break;
                case 'tyou':
                  player1=getRandomValue(midef,picked);
                  player2=getRandomValue(middle,enemyteam);
                  if(
                  compareArrays([player1.rating,player1.score.dri,player1.score.pas,player1.score.phy],[player2.rating,player2.score.dri,player2.score.pas,player2.score.phy])
                  ){ball = 'middle'}else{ball = 'pyou'}
                break;
                case 'pyou':
                  player1=getRandomValue(def,picked);
                  player2=getRandomValue([...middle,...midatk],enemyteam);
                  if(
                  compareArrays([player1.rating,player1.score.def,player1.score.pas,player1.score.phy],[player2.rating,player2.score.dri,player2.score.pas,player2.score.phy])
                  ){ball = 'tyou'}else{ball = 'shotyou'}
                break;
                case 'shotyou':
                  player1=getRandomValue(gk,picked);
                  player2=getRandomValue(midatk,enemyteam);
                  if(
                  compareArrays([player1.rating,player1.score.div,player1.score.han,player1.score.ref],[player2.rating,player2.score.sho+20,player2.score.pac,player2.score.phy])
                  ){ball = 'tyou'}else{ball = 'middle';score[1]++}
                break;
                case 'ten':
                  player2=getRandomValue(midef,enemyteam);
                  player1=getRandomValue(middle,picked);
                  if(
                  compareArrays([player2.rating,player2.score.dri,player2.score.pas,player2.score.phy],[player1.rating,player1.score.dri,player1.score.pas,player1.score.phy])
                  ){ball = 'middle'}else{ball = 'pen'}
                break;
                case 'pen':
                  player2=getRandomValue(def,enemyteam);
                  player1=getRandomValue([...middle,...midatk],picked);
                  if(
                  compareArrays([player2.rating,player2.score.def,player2.score.pas,player2.score.phy],[player1.rating,player1.score.dri,player1.score.pas,player1.score.phy])
                  ){ball = 'ten'}else{ball = 'shoten'}
                break;
                case 'shoten':
                  player2=getRandomValue(gk,enemyteam);
                  player1=getRandomValue(midatk,picked);
                  if(
                  compareArrays([player2.rating,player2.score.div,player2.score.han,player2.score.ref],[player1.rating,player1.score.sho+20,player1.score.pac,player1.score.phy])
                  ){ball = 'ten'}else{ball = 'middle';score[0]++}
                break;
              default:
                break;
            }
            setPlayer1(player1);
            setPlayer2(player2);
            setScore(score);
            console.log(ball,score)
          }, 2000); // 2000 milliseconds = 2 seconds
          setTimeout(() => {
            clearInterval(intervalId);
            if(score[0]>score[1]){
              alert('Game Over YOU WON, 3000 GEMS REWARDED');
              dispatch(addgems(3000));
            }else if(score[0]==score[1]){
              alert('Game Over DRAW 500 gems');
              dispatch(addgems(500));
            }else{
              alert('Game Over you lost, no gems');
            }
          }, 90000); // 90000 milliseconds = 90 seconds
        };
      const [enemyteam,setenemy] = useState({
        'GK':'',
        'LB':'',
        'LCB':'',
        'RCB':'',
        'RB':'',
        'LDM':'',
        'RDM':'',
        'LM':'',
        'CM':'',
        'RM':'',
        'CAM':'',
      }); 
    const [picked,setpicked] = useState({
      'GK':'',
      'LB':'',
      'LCB':'',
      'RCB':'',
      'RB':'',
      'LDM':'',
      'RDM':'',
      'LM':'',
      'CM':'',
      'RM':'',
      'CAM':'',
    }); 
    const fillRandomPositions = (sourceArray, resultObject) => {
      const getRandomUniqueObject = (rarity) => {
        const filteredArray = sourceArray.filter(obj => (obj.rarity === rarity) || (rarity === 'all' && obj.rarity  !='K'));
        if (filteredArray.length === 0) return null;
  
        const randomIndex = Math.floor(Math.random() * filteredArray.length);
        const randomObject = filteredArray[randomIndex];
        sourceArray = sourceArray.filter(obj => obj !== randomObject); // Remove the selected object
        return randomObject;
      };
    
      const fillKeyRandomly = (key, rarity) => {
        const randomObject = getRandomUniqueObject(rarity);
        if (randomObject) {
          resultObject[key] = randomObject;
        }
      };
    
      fillKeyRandomly('GK', 'K');
      fillKeyRandomly('LB', 'all');
      fillKeyRandomly('LCB', 'all');
      fillKeyRandomly('RCB', 'all');
      fillKeyRandomly('RB', 'all');
      fillKeyRandomly('LDM', 'all');
      fillKeyRandomly('RDM', 'all');
      fillKeyRandomly('LM', 'all');
      fillKeyRandomly('CM', 'all');
      fillKeyRandomly('RM', 'all');
      fillKeyRandomly('CAM', 'all');
    
      return resultObject;
    };
    const removeDuplicates = (array, property) => {
      const seen = new Set();
      return array.filter(obj => {
        const value = obj[property];
        if (!seen.has(value)) {
          seen.add(value);
          return true;
        }
        return false;
      });
    };
    const mapBallDToText = (balld) => {
      const ballDMap = {
        'middle': 'The Ball is in the middle',
        'tyou': 'The Ball is towards you',
        'pyou': 'The Ball is towards them',
        'shotyou': 'they are taking a shot at you !!',
        'pen': 'The Ball is towards their penalty area',
        'ten': 'The Ball is towards your penalty area !',
        'shoten': 'you are taking a shot at them !!',
      };
    
      return ballDMap[balld] || 'Unknown'; // Default to 'Unknown' if no match
    };
    const userstate = useSelector((state)=>state.user);
    const cardsnondupe = removeDuplicates([...userstate.cards],'name');
    useEffect(() => {
      const createEnemyTeam = () => {
        setenemy(fillRandomPositions([...playerinfo], {
          'GK': '',
          'LB': '',
          'LCB': '',
          'RCB': '',
          'RB': '',
          'LDM': '',
          'RDM': '',
          'LM': '',
          'CM': '',
          'RM': '',
          'CAM': '',
        }));
      };
      createEnemyTeam();
    }, []);
    let dispatch = useDispatch();
    const startgame = ()=>{
    document.getElementById('start').style.display = 'inline';
    document.getElementById('ready').style.display = 'none';
    GAMEON();
  
  };

  const addPlater = (value, key, event) => {
    if (value === '') {
      setpicked((prevPositions) => ({
        ...prevPositions,
        [key]: '',
      }));
      alert(`'${key}' is empty`);
      event.target.value = '';
      return;
    }
  
    const playerObject = playerinfo.find(player => player.name === value);
  
    if (!playerObject) {
      alert(`Player '${value}' not found in playersinfo`);
      event.target.value = '';
      return;
    }
  
    const isValueExists = Object.values(picked).includes(playerObject);
  
    if (isValueExists) {
      alert(`Player '${value}' already exists`);
      event.target.value = '';
      return;
    }
  
    if (picked.hasOwnProperty(key)) {
      setpicked((prevPositions) => ({
        ...prevPositions,
        [key]: playerObject,
      }));
      alert(`'${value}' is holding '${key}'.`);
    }
  };
  
    const start = () =>{
      let values = Object.values(picked);
      for (let element of values) {
        if (element === '') {

          alert('incomplete');
          return; // Use 'return' to exit the function // Use 'return' to exit the function
        }
      }
      startgame();
    }

  return (
    <div>
    <div id='ready'>
      <Row>
      <h1>Your Team</h1>
      </Row>
      <Row>
      <h3>Goal Keeper</h3>
      </Row>
      <Row>
      <Col>
      <h4>GK</h4>
      <select id='GK' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>
        {cardsnondupe.map((card)=>{
        if(card.rarity == "K"){
          return <option value={card.name}>{card.name}   {card.rating}</option>
        }
      })}</select>
      <div>
      <img
        src={picked['GK'] === '' ? '/images/Silver.png' :(picked['GK'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col>
      </Row>
      <Row>
      <h3>Back</h3>
      </Row>
      <Row>
      <Col>
      <h4>LB</h4>
      <select id='LB' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['LB'] === '' ? '/images/Silver.png' :(picked['LB'].image)}
        alt=""
        width="250"
      />
      </div>
            </Col><Col>
      <h4>LCB</h4>

            <select id='LCB' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['LCB'] === '' ? '/images/Silver.png' : (picked['LCB'].image)}
        alt=""
        width="250"
      />
      </div>
            </Col><Col>
      <h4>RCB</h4>

            <select id='RCB' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['RCB'] === '' ? '/images/Silver.png' : (picked['RCB'].image)}
        alt=""
        width="250"
      />
      </div>
            </Col><Col>
      <h4>RB</h4>

            <select id='RB' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['RB'] === '' ? '/images/Silver.png' : (picked['RB'].image)}
        alt=""
        width="250"
      />
      </div>
            </Col>
      </Row>
      <Row>
      <h3>Deffensive Midfielder</h3>
      </Row>
      <Row>
      <Col>
      <h4>LDM</h4>
      <select id='LDM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['LDM'] === '' ? '/images/Silver.png' : (picked['LDM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col><Col>
      <h4>RDM</h4>
            <select id='RDM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['RDM'] === '' ? '/images/Silver.png' : (picked['RDM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col>
      </Row>
      <Row>
      <h3>Midfielders</h3>
      </Row>
      <Row>
      <Col>
      <h4>LM</h4>

      <select id='LM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['LM'] === '' ? '/images/Silver.png' : (picked['LM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col><Col>
      <h4>CM</h4>

            <select id='CM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['CM'] === '' ? '/images/Silver.png' : (picked['CM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col><Col>
      <h4>RM</h4>

            <select id='RM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['RM'] === '' ? '/images/Silver.png' : (picked['RM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col>
      </Row>
      <Row>
      <h3>Central Attacking Midfielder</h3>
      </Row>
      <Row>
      <Col>
      <h4>CAM</h4>
      <select id='CAM' onChange={(e)=>{addPlater(e.target.value,e.target.id,e)}}><option value='' default>Pick Player...</option>{cardsnondupe.map((card)=>{
              if(card.rarity != "K"){
                return <option value={card.name}>{card.name}   {card.rating}</option>
              }
      })}</select>
            <div>
      <img
        src={picked['CAM'] === '' ? '/images/Silver.png' : (picked['CAM'].image)}
        alt=""
        width="250"
      />
      </div>
      </Col>

      </Row>

      <button class="button-64 text-center mx-auto m-4" role="button" onClick={start}><span class="text">START</span></button>

    </div>
    <div id='start' style={{display:'none'}}>
      <h1>GAME STARTED</h1>
      <Row>
        <Col>
        <Row>
        <h2>ENEMY TEAM</h2>
        </Row>
        <Row>

        <Row>
      <Col><img width='100px' src={enemyteam['GK']?.image} alt="GK" /></Col>
    </Row>

    <Row>
      <Col><img width='100px' src={enemyteam['LB']?.image} alt="LB"  /></Col>
      <Col><img width='100px' src={enemyteam['LCB']?.image} alt="LCB" /></Col>
      <Col><img width='100px'src={enemyteam['RCB']?.image} alt="RCB" /></Col>
      <Col><img width='100px' src={enemyteam['RB']?.image} alt="RB" /></Col>
    </Row>

    <Row>
      <Col><img width='100px' src={enemyteam['LDM']?.image} alt="LDM" /></Col>
      <Col><img width='100px' src={enemyteam['RDM']?.image} alt="RDM" /></Col>
    </Row>

    <Row>
      <Col><img width='100px' src={enemyteam['LM']?.image} alt="LM" /></Col>
      <Col><img width='100px' src={enemyteam['CM']?.image} alt="CM" /></Col>
      <Col><img  width='100px'src={enemyteam['RM']?.image} alt="RM" /></Col>
    </Row>

    <Row>
      <Col><img width='100px' src={enemyteam['CAM']?.image} alt="CAM" /></Col>
    </Row> 
        </Row>
        </Col>
        <Col>
        <h1>EVENTS</h1>
        <Row>
        <h4>
          <h3>the ball is between</h3> 
          <img width='150px' src={player2d?.image} alt="|" />
          and 
          <img width='150px' src={player1d?.image} alt="|" /> 
          <div>
          {mapBallDToText(balld)}
          </div>
        </h4>
        <h3>
          SCORE :{scored[1]}/{scored[0]}
        </h3>
        </Row>
        </Col>
        <Col>
        <Row>
        <h2>YOUR TEAM</h2>
        </Row>
        <Row>

        <Row>
      <Col><img width='100px' src={picked['GK']?.image} alt="GK" /></Col>
    </Row>

    <Row>
      <Col><img width='100px' src={picked['LB']?.image} alt="LB"  /></Col>
      <Col><img width='100px' src={picked['LCB']?.image} alt="LCB" /></Col>
      <Col><img width='100px'src={picked['RCB']?.image} alt="RCB" /></Col>
      <Col><img width='100px' src={picked['RB']?.image} alt="RB" /></Col>
    </Row>
    <Row>
      <Col><img width='100px' src={picked['LDM']?.image} alt="LDM" /></Col>
      <Col><img width='100px' src={picked['RDM']?.image} alt="RDM" /></Col>
    </Row>
    <Row>
      <Col><img width='100px' src={picked['LM']?.image} alt="LM" /></Col>
      <Col><img width='100px' src={picked['CM']?.image} alt="CM" /></Col>
      <Col><img  width='100px'src={picked['RM']?.image} alt="RM" /></Col>
    </Row>
    <Row>
      <Col><img width='100px' src={picked['CAM']?.image} alt="CAM" /></Col>
    </Row> 
        </Row>
        </Col>
      </Row>
    </div>
    </div>
  )
}
