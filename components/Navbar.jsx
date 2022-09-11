import React, { useState } from "react";
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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <nav className="navbar">
        <Link href="/">
          <a>
            <div className="logo">
              <h3>Katoi Soaps</h3>
            </div>
          </a>
        </Link>
        <div className="test">
          <div className="bar-toggle" >
            <i id="icon" className="fas fa-bars fa-lg" onClick={navOnClick}></i>
          </div>
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
              <Link href="/cart">
                <i  className="fa-solid fa-cart-shopping"></i>
              </Link>
              
            </div>
          ) : (
            <div className="cart-toggle">
              <Link className="fa-solid fa-cart-shopping" href="/cart" />
              <i className="fa-solid fa-user"></i>
            </div>
          )}



        </div>

      </nav>
    </div>

  );
}

export default Navbar;