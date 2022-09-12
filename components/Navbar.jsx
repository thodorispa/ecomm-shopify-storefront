import React, { useState } from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";

const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [nav, setNav] = useState(false);
  const navOnClick = () => {
    setNav(!nav);
  };

  const linkOnClick = () => {
    setNav(false);
  };

  //Render classes in order to change the menu bar when burger menu clicked, activate the menu
  const renderCssClasses = () => {
    let classes = "navlinks";

    if (nav) {
      classes += " activenav";
    }
    return classes;
  };
  return (
    <>
      <header className="navbar">
        <Link href="/">
          <a>
            <div className="logo">
              <h3>Katoi Soaps</h3>
            </div>
          </a>
        </Link>
        <section style={{ width: "100%" }}>
          <section>
            <div className="bar-toggle">
              <i
                id="icon"
                className="fas fa-bars fa-lg"
                onClick={navOnClick}
              ></i>
            </div>
          </section>
          <nav className={renderCssClasses()}>
            {navLinks.map((link, index) => {
              return (
                <ul className="link">
                    <li onClick={navOnClick} key={index}>
                      {link.name}
                    </li>
                    {link.name === "FACE" ? (
                      <div className="c-dropdown">
                      <Link href="/">
                        <li className="drop-link">Peeling</li>
                      </Link>
                      <Link href="/">
                        <li className="drop-link">Lotion</li>
                      </Link>
                    </div>
                    ) : "" }
                    {link.name === "BODY" ? (
                      <div className="c-dropdown">
                      <Link href="/">
                        <li className="drop-link">Register</li>
                      </Link>
                      <Link href="/">
                        <li className="drop-link">Sign In</li>
                      </Link>
                    </div>
                    ) : "" }
                </ul>
              );
            })}
          </nav>
          <section className="usr-menu">
            <div className="user_toggle">
              <i style={{padding: "8px", cursor:"pointer"}} className="fa-solid fa-user"></i>
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
              <i style={{fontSize:"20px", padding: "8px",  cursor:"pointer"}} className="fa-solid fa-cart-shopping"></i>
            </Link>
          </section>
        </section>
      </header>
    </>
  );
};

export default Navbar;
