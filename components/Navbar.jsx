import React, {useState} from "react";
import { navLinks } from "../utils/data"
import Link from "next/link";

const Navbar = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [nav, setNav] = useState(false);
  const navOnClick = () => {
    setNav(!nav);
  }

  const linkOnClick = () => {
    setNav(false);
  }

  //Render classes in order to change the menu bar when burger menu clicked, activate the menu
  const renderCssClasses = () => {
    let classes = "navlinks";

    if (nav) {
      classes += " activenav"; 
    }
    return classes;
  }
  return ( 
    <div>
      <nav className="navbar">
        <Link href="/">
          <a>
            <div className="logo">
              <h3>Katoi Soaps</h3>
            </div>
          </a>
        </Link>
        <nav className={renderCssClasses()}>
        {navLinks.map((link, index) => {
          return (
            <ul className="link">
              <Link className="link" href={link.path}>
                <li onClick={navOnClick} key={index}>{link.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
      {!isLogged ? (
        <div className="cart-toggle">
        <Link href="/cart">
         <i id="icon" className="fa-solid fa-cart-shopping"></i>
        </Link>
        <div className="user_toggle">
          <i className="fa-solid fa-user"></i>
          <div className="dropdown">
          <Link href="/register"> 
           <li className="drop-link">Register</li>
          </Link>
          <Link href="/signIn"> 
           <li className="drop-link">Sign In</li>
          </Link>
          </div>
          </div>
        </div>
      ) : (
        <div className="cart-toggle">
        <Link href="/cart">
         <i id="icon" className="fa-solid fa-cart-shopping"></i>
        </Link>
        <i style={{position: "relative", right: "70px",fontSize:"larger" }}className="fa-solid fa-user"></i>
        <pre style={{position: "absolute", right:"100px", top:"7px"}}>username</pre>
        </div>
      )}
      <div className="bar-toggle" >
        <i id="icon" className="fas fa-bars fa-lg" onClick={navOnClick}></i>
      </div>
      </nav>
    </div>

   );
}
 
export default Navbar;