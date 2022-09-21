import React from 'react';

const Footer = () => {
  return ( 
    <footer className="footer">
      <header className="footer-title">
      <h1 >Κατώι Αμοργός</h1>
      </header>
      <section>
        <article className="info">
          <h4>Contact</h4>
          <h4>Terms of use</h4>
          <h4>Faqs</h4>
        </article>
        <article className="social">
          <h1>Connect with us</h1>
          <section>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
          </section>
        </article>
      </section>
    </footer>
   );
}
 
export default Footer;