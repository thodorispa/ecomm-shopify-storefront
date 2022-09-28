import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../utils/data";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import router from "next/router";
import SideCart from "./SideCart"
import UseOutsideAlerter from './UseOutsideAlerter'

const Navbar = () => {

  const dispatch = useDispatch();

  const { collections, cart, sideNav, cartClasses } = useSelector(x => x);
  const { customer } = useSelector(x => x.customer)
  const [nav, setNav] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState({
    first: false,
    second: false,
    third: false,
  });

  const controlNavbar = () => {
    if (typeof window !== 'undefined') { 
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        if (sideNav || nav) {
          setShow(true)
        } else if (!sideNav && !nav){
          setShow(false)
        }
      } else { // if scroll up show the navbar
          setShow(true);  
      }
      setLastScrollY(window.scrollY); 
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', controlNavbar);
      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      ref.current.style.padding = "30px 10px";
    } else {
    }
  }, [])

  function UseOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsHovered(prevState => ({
            ...prevState,
            third: false,
          }))
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  UseOutsideAlerter(wrapperRef);

  //Render classes in order to change the menu bar when burger menu clicked, activate the menu
  const renderCssClasses = () => {
    let classes = "navlinks";
    let drop_classes = "c-dropdown"

    if (nav) {
      classes += " activenav";
    }
    return classes;
  };
  const handleFirstHoverClick = () => {
    setIsHovered(prevState => ({
      ...prevState,
      first: false,
    }));
    setNav(false);
  }
  const handleSecondHoverClick = () => {
    setIsHovered(prevState => ({
      ...prevState,
      second: false,
    }));
    setNav(false);
  }

  const hoverActions = (e, link) => {
    if (link.name === "ΠΡΟΪΟΝΤΑ") {
      setIsHovered(prevState => ({
          ...prevState,
          first: true,
        }))
    } else if (link.name === "ΑΛΛΑ") {
      setIsHovered(prevState => ({
          ...prevState,
          second: true,
        }))
    }
  }
  const disableHoverActions = (e, link) => {
    if (link.name === "ΠΡΟΪΟΝΤΑ") {
      setIsHovered(prevState => ({
          ...prevState,
          first: false,
        }))
    } else if (link.name === "ΑΛΛΑ") {
      setIsHovered(prevState => ({
          ...prevState,
          second: false,
        }))
    }
  }

  useEffect(() => {
    dispatch({ type: "TOGGLE_CART", payload: "side-cart" })
    
    if (sideNav && !nav) {
      dispatch({ type: "TOGGLE_CART", payload: "side-cart active-cart" })
    }
  },[sideNav, nav]);

  return (
    <>
      <header className={show? 'navbar active' : 'navbar hidden'}>
        <Link href="/">
          <a onClick={() => dispatch({ type: "TOGGLE_NAV", payload: false})}>
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
                <li 
                onMouseEnter={(e) => hoverActions(e, link)}
                onMouseLeave={(e) => disableHoverActions(e, link)} >
                  {link.name}
                </li>
                {link.name === "ΠΡΟΪΟΝΤΑ" ? (
                   <>
                   <article className={`c-dropdown ${isHovered.first ? 'hover-active' : ' '}`}
                     >
                       {collections?.map((collection, i) => (
                         <Link key={i} href={`/collections/${collection.title}`}>
                           <li 
                           onMouseEnter={() => setIsHovered(prevState => ({
                             ...prevState,
                             first: true,
                           }))}
                           onMouseLeave={() => setIsHovered(prevState => ({
                             ...prevState,
                             first: false,
                           }))}
                           onClick={handleFirstHoverClick}
                           className="drop-link"
                           >{collection.title}</li>
                         </Link>
                       ))}
                     </article>
                     </>
                ) : "" }
                  {link.name === "ΑΛΛΑ" ? (
                    <div className={`c-dropdown ${isHovered.second ? 'hover-active' : ''}`}>
                      <Link href="/products">
                        <li 
                        className="drop-link"
                        onMouseEnter={() => setIsHovered(prevState => ({
                          ...prevState,
                          second: true,
                        }))}
                        onMouseLeave={() => setIsHovered(prevState => ({
                          ...prevState,
                          second: false,
                        }))}
                        onClick={handleSecondHoverClick}>
                          Register
                        </li>
                      </Link>
                      <Link href="/products">
                        <li 
                        className="drop-link"
                        onMouseEnter={() => setIsHovered(prevState => ({
                          ...prevState,
                          second: true,
                        }))}
                        onMouseLeave={() => setIsHovered(prevState => ({
                          ...prevState,
                          second: false,
                        }))}
                        onClick={handleSecondHoverClick}>
                          Sign In
                        </li>
                      </Link>
                    </div>
                  ) : ""}
               </div>
              );
            })}
            </nav>
          {!customer ? (
            <section className="usr-menu">
              <section className="user_toggle"
              ref={wrapperRef}>
                <i style={{ padding: "8px", cursor: "pointer" }}
                 className="fa-solid fa-user"
                 id="nav-icons"
                 onClick={() => setIsHovered(prevState => ({
                  ...prevState,
                  third: !isHovered.third,
                }))}></i>
                <div 
                style={{ marginTop: "30px"}} 
                className={`dropdown ${isHovered.third ? 'hover-active' : ''}`}
                ref={wrapperRef}>
                  <Link href="/register">
                    <li 
                    className="drop-link-user"
                    onClick={() => setIsHovered(prevState => ({
                      ...prevState,
                      third: false,
                    }))}>Εγγραφή</li>
                  </Link>
                  <Link href="/signIn">
                    <li 
                    className="drop-link-user"
                    className="drop-link-user"
                    onClick={() => setIsHovered(prevState => ({
                      ...prevState,
                      third: false,
                    }))}>Σύνδεση</li>
                  </Link>
                </div>
              </section>
                <i style={{ fontSize: "20px", padding: "8px", cursor: "pointer" }} 
                className="fa-solid fa-cart-shopping"
                id="nav-icons"
                onClick={() => dispatch({ type: "TOGGLE_NAV", payload: !sideNav})}>
                </i>
                {show ? <SideCart /> : <></>}
              <span className='badge badge-warning' id='lblCartCount'>{cart?.lines.length}</span>
            </section>
          ) : (
            <section className="usr-menu">
              <section className="user_toggle"
              ref={wrapperRef}>
                <section onClick={() => setIsHovered(prevState => ({
                    ...prevState,
                    third: !isHovered.third,
                  }))}>
                  <span style={{cursor: "pointer"}}>{customer.firstName}</span>
                  <i style={{ padding: "8px", cursor: "pointer", alignSelf: "center" }} 
                  className="fa-solid fa-user"
                  id="nav-icons"></i>
                </section>
                <div style={{ marginTop: "30px" }} 
                className={`dropdown ${isHovered.third ? 'hover-active' : ''}`}
                ref={wrapperRef}>
                  <Link href="/">
                    <li 
                    className="drop-link-user"
                    className="drop-link-user"
                    onClick={() => setIsHovered(prevState => ({
                      ...prevState,
                      third: false,
                    }))}>Προτιμήσεις</li>
                  </Link>
                  <Link href="/">
                    <li className="drop-link-user"
                    className="drop-link-user"
                    onClick={() => setIsHovered(prevState => ({
                      ...prevState,
                      third: false,
                    }))}>Ιστορικό Παραγγελιών</li>
                  </Link>
                  <Link href="/">
                    <li
                      className="drop-link-user"
                      onClick={async () => {
                        setIsHovered(prevState => ({
                          ...prevState,
                          third: false,
                        }))
                        await Axios.get(`/api/customer/logout`)
                        router.reload(router.query)
                      }}>Αποσύνδεση</li>
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
