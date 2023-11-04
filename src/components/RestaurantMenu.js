
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { Menu_API } from "../utils/constants";
 


const RestaurantMenu =()=>{

    

     const {resId}= useParams()
    //   console.log(params)

     const resInfo =useRestaurantMenu(resId)

    
    if(resInfo === null) return <Shimmer/>;
    

      const {name,cuisines,costForTwoMessage,imageId
        , 
      }= resInfo?.cards[0]?.card?.card?.info;

        const  {itemCards}= resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;
      console.log(itemCards)
    return ( 
        <div className="menu  border  m-4 p-4">
         
            <h1 className="font-bold"> {name}</h1>
            <h3  className="font-bold"> {cuisines.join(", ")}-{costForTwoMessage}</h3>
            <h3> </h3>
            <h2>Menu</h2>
            <ul className=" ">
                {itemCards.map((item) => (<li className="flex justify-between border m-4 p-4 font-bold bg-gray-200" key={item.card.info.id}> {item.card.info.name}<br></br>  {"      "}{item.card.info.price/100 ||item.card.info.defaultPrice/100  }Rs <b>{<img  className="bg-green-100" src={ Menu_API +item.card.info.imageId }/> } </b></li>) )}
                 
            </ul>
        </div>
    )
}

export default RestaurantMenu;