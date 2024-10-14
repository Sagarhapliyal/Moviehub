import React from "react";
import { Link } from "react-router-dom";
function Navbar(){
return(
<>
<div style={{
    display:"flex",
    gap:"100px"
}}>
    
    <Link to="/"> <img style={{
        height:"50px",
        marginLeft:"30px",
        marginTop:"10px"
    }} src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSNxfk5x_KAS2gjfQY8joN2fuHQUPjOUlSjCGcF2gQH0s5n_3mc" alt="" />
    </Link>
    <li style={{
        
        color:"white",
        display:"flex",
        fontSize:"20px"
    }}> 
       
        
        <ul>
        <Link to="/Englishmovie" className="link">
            English-Movie
            </Link>
        </ul>
       
        <ul>
            <Link to="/">
            Hindi Movie
            </Link>
        </ul>
      
    </li>
   
</div>
</>
)

}
export default Navbar  