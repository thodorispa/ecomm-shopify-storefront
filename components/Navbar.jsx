import React, {useState} from "react";
import { navLinks } from "../utils/data"
import Link from "next/link";

const Navbar = () => {

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
         <div className="bar-toggle" >
          <Link href="/cart">
           <i id="icon" className="fas fa-shopping-cart"></i>
          </Link>
          <i id="icon" className="fas fa-bars fa-lg" onClick={navOnClick}></i>
        </div>
      </nav>
   );
}
 
export default Navbar;