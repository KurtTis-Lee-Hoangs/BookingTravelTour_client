import React, { useEffect } from "react";
import "../styles/scroll-btn.css";

const ScrollButton = () => {
  // Scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollToTopButton = document.getElementById("scrollToTopButton");
      if (window.scrollY > document.body.scrollHeight / 30) {
        scrollToTopButton.style.display = "block";
      } else {
        scrollToTopButton.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="scrollToTopButton"
      className="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <i class="ri-arrow-up-line"></i>
    </button>
  );
};

export default ScrollButton;
