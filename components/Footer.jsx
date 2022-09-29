import React from 'react';
import Link from 'next/Link';

const Footer = () => {
  return ( 
    <footer className="footer">
      <header className="footer-title">
      <h1 >Κατώι Αμοργός</h1>
      </header>
      <section>
        <article className="info">
          <Link href="/contact">
            <h4 style={{cursor: "pointer"}}>Επικοινωνία</h4>
          </Link>
          <Link href="/contact">
            <h4 style={{cursor: "pointer"}}>Πολιτική χρήσης</h4>
          </Link>
          <Link href="/contact">
            <h4 style={{cursor: "pointer"}}>Συζνές ερωτήσεις</h4>
          </Link>
        </article>
        <article className="social">
          <h1>Συνδεθείτε μαζί μας</h1>
          <section>
          <a target="_blank" href="https://www.instagram.com/katoiamorgos/?hl=el" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a target="_blank" href="https://www.facebook.com/pages/category/Health-beauty/KATOI-SOAP-802558436565881/" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </section>
        </article>
      </section>
    </footer>
   );
}
 
export default Footer;