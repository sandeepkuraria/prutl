import React from "react";
import { Link } from "react-router-dom";
import prutlBanner from "../assets/kidsPulling.jpg";
import worldMap from "../assets/scrap.jpg";
import missionIcon from "../assets/officeCollegue.jpg";
import visionIcon from "../assets/BalanceStones.jpg";

const PrutlHome = () => {
  return (
    <div className="prutl-home">
      {/* Hero Section */}
      <div className="hero-section">
        <img src={prutlBanner} alt="PRUTL Events" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">
            PASSIONIT RURAL UNITY TALENT LEAGUE (PRUTL)
          </h1>
          <p className="hero-tagline">
            “Igniting Rural Talent, Uniting Hearts, Inspiring Innovations.”
          </p>
          <Link to="/contactUs" className="cta-button">
            Get Involved
          </Link>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="vision-mission-section">
        <div className="vision-box">
          <img src={visionIcon} alt="Vision" className="icon" />
          <h2>Vision</h2>
          <p>
            To empower rural communities globally by nurturing talent, fostering
            innovation, and strengthening family bonds through inclusive,
            soul-enriching games and events.
          </p>
        </div>
        <div className="mission-box">
          <img src={missionIcon} alt="Mission" className="icon" />
          <h2>Mission</h2>
          <p>
            To create an engaging platform for rural students, parents, and
            educators to showcase their talents, foster creativity, and
            collaborate on innovative projects using the PASSION Dimensions
            framework, while promoting family togetherness and reducing
            over-reliance on social media.
          </p>
        </div>
      </div>

      {/* Global Relevance Section */}
      <div className="global-relevance-section">
        <h2 className="section-title">Relevance to All Countries</h2>
        <p className="global-description">
          PRUTL resonates universally by fostering local talent, promoting
          family engagement, and encouraging innovation. It addresses global
          challenges such as rural development, education, and social cohesion.
        </p>
        <img src={worldMap} alt="Global Impact" className="global-image" />
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <h2>Be a Part of the PRUTL Movement!</h2>
        <p>Join hands to empower rural talent and make an impact worldwide.</p>
        <Link to="/contactUs" className="cta-button">
          Join Now
        </Link>
      </div>
    </div>
  );
};

export default PrutlHome;
