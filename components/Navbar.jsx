import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import router from "next/router";
import SideCart from "./SideCart"

const Navbar = () => {

  const dispatch = useDispatch();
  const { customer } = useSelector(x => x.customer);
  const { cart } = useSelector(x => x);
  const {cartClasses} = useSelector(x => x);
  
  const ref = useRef();
  const [nav, setNav] = useState(false);
  const [sideCart, setSideCart] = useState(false);

  useEffect(() => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      ref.current.style.padding = "30px 10px";
    } else {
    }
  }, [])


  const navOnClick = () => {
    setNav(!nav);
  };

  const linkOnClick = () => {
    setNav(false);
  };


  //Render classes in order to change the menu bar when burger menu clicked, activate the menu
  const renderCssClasses = () => {
    let classes = "navlinks";
    let drop_classes = "c-dropdown"

    if (nav) {
      classes += " activenav";
    }
    return classes;
  };
  useEffect(() => {
    dispatch({ type: "TOGGLE_CART", payload: "side-cart" })
    
    if (sideCart) {
      dispatch({ type: "TOGGLE_CART", payload: "side-cart active-cart" })
    }

  },[sideCart]);

  return (
    <>
      <header ref={ref} className="navbar">
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
            {navLinks.map((link, i) => {
              return (
                <ul className="link" key={i}>
                  <li >
                    {link.name}
                  </li>
                  {link.name === "FACE" ? (
                    <div className="c-dropdown">
                      <Link href="/products">
                        <li onClick={linkOnClick} className="drop-link">Peeling</li>
                      </Link>
                      <Link href="/products">
                        <li onClick={linkOnClick} className="drop-link">Lotion</li>
                      </Link>
                    </div>
                  ) : ""}
                  {link.name === "BODY" ? (
                    <div className="c-dropdown">
                      <Link href="/products">
                        <li onClick={linkOnClick} className="drop-link">Register</li>
                      </Link>
                      <Link href="/products">
                        <li onClick={linkOnClick} className="drop-link">Sign In</li>
                      </Link>
                    </div>
                  ) : ""}
                </ul>
              );
            })}
          </nav>
          {!customer ? (
            <section className="usr-menu">
              <section className="user_toggle">
                <i style={{ padding: "8px", cursor: "pointer" }} className="fa-solid fa-user"></i>
                <div style={{ marginTop: "30px" }} className="dropdown">
                  <Link href="/register">
                    <li className="drop-link">Register</li>
                  </Link>
                  <Link href="/signIn">
                    <li className="drop-link">Sign In</li>
                  </Link>
                </div>
              </section>
              <Link href="/cart">
                <i style={{ fontSize: "20px", padding: "8px", cursor: "pointer" }} className="fa-solid fa-cart-shopping"></i>
              </Link>
              <span className='badge badge-warning' id='lblCartCount'>{cart?.lines.length}</span>
            </section>
          ) : (
            <section className="usr-menu">
              <section className="user_toggle">
                <pre>{customer.firstName}</pre>
                <i style={{ padding: "8px", cursor: "pointer", alignSelf: "center" }} className="fa-solid fa-user"></i>
                <div style={{ marginTop: "40px" }} className="dropdown">
                  <Link href="/">
                    <li className="drop-link">Preferences</li>
                  </Link>
                  <Link href="/">
                    <li className="drop-link">Order History</li>
                  </Link>
                  <Link href="/">
                    <a
                      className="drop-link"
                      onClick={async () => {
                        await Axios.get(`/api/customer/logout`)
                        router.reload(router.query)
                      }}> Log Out</a>
                  </Link> 
                </div>
              </section>
                <i 
                style={{ fontSize: "20px", padding: "8px", cursor: "pointer" }} 
                className="fa-solid fa-cart-shopping"
                onClick={(e) => setSideCart(!sideCart)}>
                </i>
                <SideCart classes={cartClasses}/>
              <span className='badge badge-warning' id='lblCartCount'>{cart?.lines.length}</span>
            </section>
          )}
        </section>
      </header>
    </>
  );
};

export default Navbar;
