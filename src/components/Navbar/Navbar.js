import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [showNav, setShowNav] = useState(false);
  useEffect(() => {
    const scrollNavHandler = () => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      });
    };

    scrollNavHandler();
    return () => {
      window.removeEventListener("scroll", scrollNavHandler);
    };
  }, []);
  return (
    <div className={`nav ${showNav && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix Logo"
      />

      <img
        className="nav__avatar"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix Avatar"
      />
    </div>
  );
}

export default Navbar;
