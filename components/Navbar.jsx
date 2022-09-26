import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import router from "next/router";
import SideCart from "./SideCart"

const Navbar = () => {

  const dispatch = useDispatch();

  const { customer, collections, cart, sideNav, cartClasses } = useSelector(x => x);
  const ref = useRef();
  const [nav, setNav] = useState(false);

  useEffect(() => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      ref.current.style.padding = "30px 10px";
    } else {
    }
  }, [])

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
    
    if (sideNav) {
      dispatch({ type: "TOGGLE_CART", payload: "side-cart active-cart" })
    }
  },[sideNav]);

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
                onClick={() => setNav(!nav)}
              ></i>
            </div>
          </section>
          <nav className={renderCssClasses()}>
            {navLinks.map((link, i) => {
              return (
              <div className="link" key={i}>
                  <li >
                    {link.name}
                  </li>
                  {link.name === "PRODUCTS" ? (
                    <article className="c-dropdown">
                      {collections?.map((collection, i) => (
                        <Link key={i} href={`/collections/${collection.title}`}>
                          <li onClick={() => setNav(false)} className="drop-link">{collection.title}</li>
                        </Link>
                      ))}
                    </article>
                  ) : ""}
                  {link.name === "MORE" ? (
                    <div className="c-dropdown">
                      <Link href="/products">
                        <li onClick={() => setNav(false)} className="drop-link">Register</li>
                      </Link>
                      <Link href="/products">
                        <li onClick={() => setNav(false)} className="drop-link">Sign In</li>
                      </Link>
                    </div>
                  ) : ""}
               </div>
              );
            })}
            </nav>
          {!customer ? (
            <section className="usr-menu">
              <section className="user_toggle">
                <i style={{ padding: "8px", cursor: "pointer" }}
                 className="fa-solid fa-user"
                 id="nav-icons"></i>
                <div style={{ marginTop: "30px"}} className="dropdown">
                  <Link href="/register">
                    <li className="drop-link-user">Register</li>
                  </Link>
                  <Link href="/signIn">
                    <li className="drop-link-user">Sign In</li>
                  </Link>
                </div>
              </section>
                <i style={{ fontSize: "20px", padding: "8px", cursor: "pointer" }} 
                className="fa-solid fa-cart-shopping"
                id="nav-icons"
                onClick={() => dispatch({ type: "TOGGLE_NAV", payload: !sideNav})}>
                </i>
                <SideCart />
              <span className='badge badge-warning' id='lblCartCount'>{cart?.lines.length}</span>
            </section>
          ) : (
            <section className="usr-menu">
              <section className="user_toggle">
                <span>{customer.firstName}</span>
                <i style={{ padding: "8px", cursor: "pointer", alignSelf: "center" }} 
                className="fa-solid fa-user"
                id="nav-icons"></i>
                <div style={{ marginTop: "30px" }} className="dropdown">
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
                id="nav-icons"
                onClick={() => dispatch({ type: "TOGGLE_NAV", payload: !sideNav})}>
                </i>
                <SideCart />
              <span className='badge badge-warning' id='lblCartCount'>{cart?.lines.length}</span>
            </section>
          )}
        </section>
      </header>
    </>
  );
};

export default Navbar;
