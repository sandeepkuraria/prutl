//prutl-frontend-npm6node14/src/components/common/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links-container">
        {/* <Link to="/projectCollaboration" className='footerLink'>Project Collaboration</Link> */}
        <Link to="/aboutUs" className="footerLink">
          About Us
        </Link>
      </div>

      <div className="footer-social-links-container">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-logo"
        >
          <div className="footer-logo-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="150"
                className="pattern-fb"
                fill="#1c1c1c"
              />
              <path
                className="pattern-fb-back"
                fill="#9ca3af"
                d="M150 30.6c-66 0-120 53.9-120 120.5 0 60 43.9 109.8 101.3 119v-83.3h-37.1v-34.6h34.6V118.1c0-29.9 17.8-46.3 45-46.3 13 0 26.7 2.3 26.7 2.3v31.1h-14.9c-14.6 0-19.2 9-19.2 18.1v21.9h32.6l-5.3 34.6h-27.4v83.3c57.4-9.2 101.3-59 101.3-119 0-66.6-54-120.5-120-120.5Z"
              ></path>
            </svg>
          </div>
        </a>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-logo"
        >
          <div className="footer-logo-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="150"
                className="pattern-insta"
                fill="#1c1c1c"
              />
              <path
                className="pattern-insta-back"
                fill="#9ca3af"
                d="M195 37.5h-90C49.5 37.5 22.5 64.5 22.5 112.5v75c0 48 27 75 82.5 75h90c55.5 0 82.5-27 82.5-75v-75c0-48-27-75-82.5-75m-15 15a18.75 18.75 0 0 1 18.75 18.75A18.75 18.75 0 0 1 180 90a18.75 18.75 0 0 1-18.75-18.75A18.75 18.75 0 0 1 180 52.5M150 52.5a75 75 0 0 1 75 75a75 75 0 0 1-75 75a75 75 0 0 1-75-75a75 75 0 0 1 75-75m0 30a45 45 0 0 0-45 45a45 45 0 0 0 45 45a45 45 0 0 0 45-45a45 45 0 0 0-45-45Z"
              />
            </svg>
          </div>
        </a>

        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-logo"
        >
          <div className="footer-logo-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="150"
                className="pattern-youtube"
                fill="#1c1c1c"
              />
              <path
                className="pattern-youtube-back"
                fill="#9ca3af"
                d="m125 187.5l64.875-37.5L125 112.5v75m138.45-97.875c1.575 5.875 2.7 13.75 3.6 23.75.9 10 1.35 18.625 1.35 26.125L275 150c0 27.375-2 47.5-5.55 60.375-3.125 11.25-10.375 18.5-21.625 21.625-5.875 1.575-16.625 2.7-33.125 3.6-16.25.875-31.125 1.35-44.875 1.35L150 237.5c-52.375 0-85-2-97.875-5.55-11.25-3.125-18.5-10.375-21.625-21.625-1.575-5.875-2.7-13.75-3.6-23.75-.9-10-1.35-18.625-1.35-26.125L25 150c0-27.375 2-47.5 5.55-60.375 3.125-11.25 10.375-18.5 21.625-21.625 5.875-1.575 16.625-2.7 33.125-3.6 16.25-.875 31.125-1.35 44.875-1.35L150 62.5c52.375 0 85 2 97.875 5.55 11.25 3.125 18.5 10.375 21.625 21.625Z"
              />
            </svg>
          </div>
        </a>

        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-logo"
        >
          <div className="footer-logo-svg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 300 300"
            >
              <circle
                cx="150"
                cy="150"
                r="150"
                className="pattern-linkedin"
                fill="#1c1c1c"
              />
              <path
                className="pattern-linkedin-back"
                fill="#9ca3af"
                d="M237.5 37.5a25 25 0 0 1 25 25v175a25 25 0 0 1-25 25H62.5a25 25 0 0 1-25-25V62.5a25 25 0 0 1 25-25h175m-6.25 193.75v-66.25a40.75 40.75 0 0 0-40.75-40.75c-10.625 0-23 6.5-29 16.25v-13.875h-34.875v104.625h34.875v-61.625c0-9.625 7.75-17.5 17.375-17.5a17.5 17.5 0 0 1 17.5 17.5v61.625h34.875M82.25 107a21 21 0 0 0 21-21c0-11.625-9.375-21.125-21-21.125a21.125 21.125 0 0 0-21.125 21.125c0 11.625 9.5 21 21.125 21m17.375 123.625v-104.625H68.75v104.625h30.875Z"
              />
            </svg>
          </div>
        </a>
      </div>

      <div className="footer-copyright-container">
        <p className="footer-copyright-text">
          &copy; 2024 PRUTL. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
