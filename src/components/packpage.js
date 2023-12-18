import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router'
import packs from './packs'
import playerinfo from './playersinfo'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import "./starstyle.css"
import { useDispatch, useSelector } from 'react-redux'
import { addcard, addgems } from './reducers/slice'


export default function Packpage() {
      const [reward, setreward] = useState({'image':''});
      const getRandomArrayMember = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const getRandomObject = (objects) => {
        const rarityPercentages = {
            'B': 30,
            'S': 30,
            'G': 18,
            'K': 14,
            'T': 8,
            'I': 1,
        };
        // Calculate total percentage
        const totalPercentage = Object.values(rarityPercentages).reduce((sum, percentage) => sum + percentage, 0);

        // Generate a random number between 0 and totalPercentage
        const randomNumber = Math.random() * totalPercentage;

        // Determine the rarity based on the random number
        let cumulativePercentage = 0;
        let selectedRarity = null;

        for (const [rarity, percentage] of Object.entries(rarityPercentages)) {
            cumulativePercentage += percentage;
            if (randomNumber < cumulativePercentage) {
                selectedRarity = rarity;
                break;
            }
        }

        // Find objects with the selected rarity
        let objectsWithSelectedRarity = objects.filter(obj => obj.rarity === selectedRarity);

        // If no objects with the selected rarity, pick a random object of a different rarity
        if (objectsWithSelectedRarity.length === 0) {
            const otherRarities = Object.keys(rarityPercentages).filter(rarity => rarity !== selectedRarity);
            const randomDifferentRarity = otherRarities[Math.floor(Math.random() * otherRarities.length)];
            objectsWithSelectedRarity = objects.filter(obj => obj.rarity === randomDifferentRarity);
        }

        // If still no objects are found, return null or handle it as needed
        if (objectsWithSelectedRarity.length === 0) {
            return null;
        }

        // Shuffle the array to get a random object of the selected rarity
        shuffleArray(objectsWithSelectedRarity);

        return objectsWithSelectedRarity[0];
    };

    // Function to shuffle an array in place (Fisher-Yates algorithm)
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };
    //dik k7olya
    const Userstate = useSelector((state)=>state.user);
    const dispatch = useDispatch()
    const {id} = useParams()
    let urlid = id;
    // dispatch(addegems(100))
    const packplayers = [];
    playerinfo.map((pl,index)=>{
      if (["S","G","T","I","K"].includes(urlid) && urlid.length === 1){
        if(pl.rarity==urlid){
          packplayers.push(pl);
        }
      }else{
      if(pl.team==urlid){
        packplayers.push(pl);
      }
      }
      }
      );
    const [isVisible, setIsVisible] = useState(false);
    const clickcheck = () =>{
      if (pack.price > Userstate.gems){
        alert("not enough gems")
      }else{
        dispatch(addgems(-pack.price))
        handleClick()
      }
    }
    const handleClick = () => {
      let newReward;
      
      if (["S","G","T","I","K"].includes(urlid) && urlid.length === 1){
        newReward = getRandomArrayMember(packplayers);
      } else {
        newReward = getRandomObject(packplayers);
      }
    
      setreward(newReward);
    };
    
    useEffect(() => {
      if (reward.image=="") {
        return;
      }
      // This code block will be executed after the state has been updated
      dispatch(addcard(reward));
      console.log(reward);
      setIsVisible(true);
    
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        govis();
      }, 7000);
    
      // Clean up the timeout when the component unmounts or when reward changes
      return () => clearTimeout(timeoutId);
    }, [reward]);
    const switchvis = () => {
      document.getElementById("packshop").style.display = "inline"
      document.getElementById("reward").style.display = "none"
    }
    const govis = () => {
      document.getElementById("packshop").style.display = "none"
      document.getElementById("reward").style.display = "inline"
    }


    let pack = packs.find((obj) => obj.id === urlid);
    useEffect(() => {
        if (urlid === 'T') {
          document.body.style.background = 'linear-gradient(90deg, rgba(0,117,153,1) 0%, rgba(0,31,69,1) 51%, rgba(4,0,25,1) 100%)';
          // document.getElementById('buybutton').className = "button-65 text-center mx-auto m-4";
        } else if (urlid === 'I') {
          document.body.style.background = 'linear-gradient(90deg, rgba(29,29,27,1) 0%, rgba(102,103,87,1) 59%, rgba(147,147,89,1) 100%)';
          // document.getElementById('buybutton').className = "button-66 text-center mx-auto m-4";
          document.body.style.color = "#bdb679";

        }
    
        // Clean up the background color when the component unmounts
        return () => {
          // document.getElementById('buybutton').className = "button-64 text-center mx-auto m-4";
          document.body.style.background = 'linear-gradient(90deg, rgba(122,0,142,1) 20%, rgba(0,148,179,1) 100%)';
          document.body.style.color = "white";

        };
      });


    if (["S","G","T","I","K"].includes(urlid) && urlid.length === 1){
        return (
           <div>
            <div id='packshop'  style={{display : "inline"}}>
              <h1>{pack.name}</h1>
              <h3>Featured Cards</h3>
              <button class="button-64 text-center mx-auto m-4" role="button" id='buybutton' onClick={clickcheck}><span class="text">Open pack {pack.price}<img height='32' src='/images/currency/gembundlesm.png'/></span></button>
            <Row id='shop'>
                {packplayers.map((pl)=>{
                        return (<Col key={uuidv4()}><Link to={`/Card/${pl.name}`}><img key={pl.name} src={pl.image} width="250" /></Link></Col>)
                    })
                }
            </Row>
            {isVisible && <div className="full-screen-overlay"></div>}
            </div>
                      <div id='reward' style={{display : "none"}}>
                      <h1>
                        Your Reward 
                      </h1>
                      <img src={reward.image} width="250" />
                      <button class="button-64 text-center mx-auto m-4" role="button" onClick={switchvis}><span class="text">Back</span></button>
                </div>
            </div>
          )
    }else{
        return (
          <div>          
            <div id='packshop' style={{display : "inline"}}>
             <h1>{pack.name}</h1>
             <h3>Featured Cards</h3>
             <button class="button-64 text-center mx-auto m-4" role="button" onClick={clickcheck}><span class="text">Open pack {pack.price}<img height='32' src='/images/currency/gembundlesm.png'/></span></button>
            <Row id='shop'>
                {packplayers.map((pl,index)=>{
                        return (<Col key={uuidv4()}><Link to={`/Card/${pl.name}`}><img key={pl.name} src={pl.image} width="250" /></Link></Col>)
                    })
                }
            </Row>
            {isVisible && <div className="full-screen-overlay"></div>}
          </div>
          <div id='reward' style={{display : "none"}}>
                <h1>
                  Your Reward 
                </h1>
                <img src={reward.image} width="250" />
                <button class="button-64 text-center mx-auto m-4" role="button" onClick={switchvis}><span class="text">Back</span></button>
          </div>
          </div>

          )
    }

  
}
