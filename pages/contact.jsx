import React from "react";
import Link from 'next/Link'

const Contact = () => {
  return (
    <section id="contact-container" className="container">
      <header className="contact">
        <h1>Επικοινωνήστε μαζί μας</h1>
        <article className="contact-intro">
          <section>
            <h4>Χώρα Αμοργού</h4>
          </section>
          <section>
            <h4>Τηλέφωνο</h4>
          </section>
          <section>
            <h4>Mail</h4>
          </section>
        </article>
      </header>
      <header className="contact-social">
        <h1>Συνδεθείτε μαζί μας</h1>
        <section className="contact-intro">
            <a target="_blank" href="https://www.instagram.com/katoiamorgos/?hl=el" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a target="_blank" href="https://www.facebook.com/pages/category/Health-beauty/KATOI-SOAP-802558436565881/" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook"></i>
            </a>
        </section>
      </header>
    </section>
  );
};

export default Contact;
