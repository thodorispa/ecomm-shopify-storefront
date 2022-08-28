import React from "react";
import { navLinks } from "../utils/data"
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">
        <a>
          <div className="brand">
            <h3>Katoi Soaps</h3>
          </div>
        </a>
      </Link>
      <nav>
        {navLinks.map((link, index) => {
          return (
            <ul>
              <Link href={link.path}>
                <li key={index}>{link.name}</li>
              </Link>
            </ul>
          );
        })}
      </nav>
    </header>
  );
}