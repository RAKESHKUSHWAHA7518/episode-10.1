
import RestaurantCard from "./RestaurantCard";
 
 

 import { useEffect, useState } from "react";

 import Shimmer from "./Shimmer";
 import { Link } from "react-router-dom";

 import useOnlineStatus from "../utils/useOnlineStatus";

//  State Variables - super powerful variables



//  Normal JS Variable

// let listOfRestaurantsJs =[
//     {
    
//     data: {
      
//       id: "334475",
//       name: "KFC",
//       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
//        cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
//        costForTwo: 40000,
//        avgRating: "3.8",
//        deliveryTime: 36,
//     }
// },
// {
    
//     data: {
      
//       id: "334476",
//       name: "Dominos",
//       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
//        cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
//        costForTwo: 40000,
//        avgRating: "4.5",
//        deliveryTime: 36,
//     }
// },
// {
    
//     data: {
      
//       id: "334477",
//       name: "MCD",
//       cloudinaryImageId: "bdcd233971b7c81bf77e1fa4471280eb",
//        cuisines: ["Burgers", "Biryani", "American", "Snacks", "Fast Food"],
//        costForTwo: 40000,
//        avgRating: "4.1",
//        deliveryTime: 36,
//     }
// },
// ]

const Body =() =>{

     const [listOfRestaurants, setListOfRestaurant]= useState([]);

     const [filteredRestaurant, setFilteredRestaurant]=useState([])

      const [searchText ,setSearchText] = useState("")

    //    whenever state variable , react triggers a reconciliation cycle (re -render the component)

    console.log("rakesh")

     useEffect (()=>{
        
        fetchData();

     }, []);

   
      const fetchData = async() =>{

        const data =  await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

 
       
       
            const json = await data.json();
      
            console.log(json);

            //  Optional Chaining                                                                
            setListOfRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            setFilteredRestaurant(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        
      };


     
       const onlineStatus = useOnlineStatus();
       if(onlineStatus===false){
        return(
            <h1>
                Look like you are offline
            </h1>
        )
       }

      

//  if(listOfRestaurants.length===0){

//    return <Shimmer/>;

     
    return listOfRestaurants.length===0 ?  <Shimmer/> : (
        <div className='body'>
            <div className='filter flex'>
                <div className="search p-4 m-4">
                    <input type="text"
                     className ="border border-solid border-black"
                      value ={searchText}
                       onChange={(e) =>{
                        setSearchText(e.target.value);
                    }} />
                    <button className="px-4 py-1 bg-green-100 m-4 rounded-lg" onClick={()=>{
                        //  filter
                        const filteredRestaurant = listOfRestaurants.filter(
                            (res)=> res.info.name.toLowerCase().includes(searchText)
                        );

                        setFilteredRestaurant(filteredRestaurant)

                      

                        

                    }}>Search</button>
                </div>
                <div className="p-4 m-4 flex items-center">
                <button  className="filter-btn px-4 py-2 bg-gray-200 rounded-lg" 
                onClick={() => {

                     
                //     filter logic here
                 const filteredList = listOfRestaurants.filter(
                    (res)=>res.info.avgRating>4
                    );
                     setListOfRestaurant(filteredList)

                    // console.log(listOfRestaurants);

                } }
                 
                >
                    Top Rated Restaurants</button>
                    </div>
            </div>




            <div className='res-conatiner flex flex-wrap rounded-lg'>
            
            {
                filteredRestaurant.map((restaurants,index)=>(
               <Link key={restaurants.info.id}  to ={"/restaurants/"+restaurants.info.id}> <RestaurantCard  resData={restaurants}/></Link>)
           ) }
           
 
                 
                
            </div>

        </div>
    )

}



 
export default Body;