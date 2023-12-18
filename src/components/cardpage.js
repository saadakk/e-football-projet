import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import playerinfo from './playersinfo';
import packs from './packs';
import { Link } from 'react-router-dom';

export default function Cardpage() {

    const {id} = useParams()
    let urlid = id;
    let player = playerinfo.find((obj) => obj.name === urlid);
    let pack = packs.find((obj) => obj.id === player.team);
    useEffect(() => {
        if (player?.rarity === 'T') {
          document.body.style.background = 'linear-gradient(90deg, rgba(0,117,153,1) 0%, rgba(0,31,69,1) 51%, rgba(4,0,25,1) 100%)';
        } else if (player?.rarity === 'I') {
          document.body.style.background = 'linear-gradient(90deg, rgba(29,29,27,1) 0%, rgba(102,103,87,1) 59%, rgba(147,147,89,1) 100%)';
          document.body.style.color = "#bdb679";

        }
    
        // Clean up the background color when the component unmounts
        return () => {
          document.body.style.background = 'linear-gradient(90deg, rgba(122,0,142,1) 20%, rgba(0,148,179,1) 100%)';
          document.body.style.color = "white";

        };
      }, [player]);
  return (
    <div>
      <h1>{player.name}</h1>
      <img src={player.image} width="250" />
      <Link to={`/Pack/${player.team}`}><img src={pack.img} width="250px"/></Link>

    </div>
  )
}
