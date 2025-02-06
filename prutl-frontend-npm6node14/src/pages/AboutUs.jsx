// //pcombinator-frontend-npm6node14/src/pages/AboutUs.jsx

// import React from 'react'
// import '../styles/AboutUs.css'; 
// import { Link } from 'react-router-dom';

// const AboutUs = () => {
//   return (
//     <div className="about-us">
//       <header className="about-header">
//         <h1>About Us</h1>
//         <p>Empowering Collaborative Project Management</p>
//       </header>
//       <section className="about-intro">
//         <p>PCombinator is a dynamic platform designed to connect academicians, researchers, mentors, organizations, investors, students, and freshers...</p>
//       </section>
//       <section className="about-vision-mission">
//         <h2>Our Vision and Mission</h2>
//         <p><strong>Vision:</strong> To be the leading platform...</p>
//         <p><strong>Mission:</strong> To provide tools, resources...</p>
//       </section>
//       <section className="about-offers">
//         <h2>What We Offer</h2>
//         <ul>
//           <li><strong>For Students:</strong> Live projects...</li>
//           <li><strong>For Academicians:</strong> Tools for managing...</li>
//           {/* <!-- Other categories --> */}
//         </ul>
//       </section>
//       <section className="about-how-it-works">
//         <h2>How It Works</h2>
//         <ol>
//           <li><strong>Sign Up:</strong> Create your profile...</li>
//           <li><strong>Connect:</strong> Join projects...</li>
//           {/* <!-- Other steps --> */}
//         </ol>
//       </section>
//       <section className="about-testimonials">
//         <h2>Testimonials</h2>
//         <blockquote>
//           <p>"Thanks to PCombinator, I was able to work on real-world projects..."</p>
//           <footer>— User Name, Student</footer>
//         </blockquote>
//         {/* <!-- Other testimonials --> */}
//       </section>
//       <section className="about-team">
//         <h2>Our Team</h2>
//         {/* <!-- Team member cards --> */}
//       </section>
//       <section className="about-contact">
//         <h2>Contact Us</h2>
//         <p>Email: contact@pcombinator.com</p>
//         <p>Phone: +1234567890</p>
//         <Link to="/contactUs" className="contactusbtn">Contact us</Link>
//         {/* <!-- Contact form --> */}
//       </section>
//       <footer className="about-footer">
//         {/* <!-- Footer links and social media icons --> */}
//       </footer>
//     </div>
//   );
// }

// export default AboutUs
//pcombinator-frontend-npm6node14/src/pages/AboutUs.jsx

import React from 'react'
import { Link } from 'react-router-dom';
import wallpaperImage from "../assets/kidsPulling.jpg";
import wallpaperImageScrap from "../assets/scrap.jpg";
import wallpaperImageOfficeCollegue from "../assets/officeCollegue.jpg";
import wallpaperImageBalanceStones from "../assets/BalanceStones.jpg";
import profileImage from "../assets/profileImage.png";
import remarkProfileImage from "../assets/samGarcia.png";

const AboutUs = () => {
  return (
    <div className=" text-gray-800">
          {/* PRUTL Header */}
          <div className="text-center py-16 bottom-remark-card text-white">
            <h1 className="text-4xl font-bold uppercase">
              PASSIONIT RURAL UNITY TALENT LEAGUE (PRUTL)
            </h1>
            <p className="mt-2 text-lg font-light italic">
              “Igniting Rural Talent, Uniting Hearts, Inspiring Innovations.”
            </p>
          </div>
    
          {/* Vision & Mission Section */}
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Vision */}
              <div className="p-8 bg-white shadow-lg rounded-lg loginFormContainer">
                <h2 className="text-2xl font-bold footerLink mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To empower rural communities globally by nurturing talent,
                  fostering innovation, and strengthening family bonds through
                  inclusive, soul-enriching games and events.
                </p>
              </div>
    
              {/* Mission */}
              <div className="p-8 bg-white shadow-lg rounded-lg loginFormContainer">
                <h2 className="text-2xl font-bold footerLink mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To create an engaging platform for rural students, parents, and
                  educators to showcase their talents, foster creativity, and
                  collaborate on innovative projects using the PASSION Dimensions
                  framework. We aim to promote family togetherness and reduce
                  over-reliance on social media.
                </p>
              </div>
            </div>
          </div>
    
          {/* Relevance to All Countries */}
          <div className="text-white py-16 bottom-remark-card">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold">Relevance to All Countries</h2>
              <p className="mt-4 text-lg leading-relaxed">
                PASSIONIT PRUTL GAMES resonates universally as it taps into the
                shared need for community, creativity, and meaningful connections
                beyond digital platforms. By fostering local talent, promoting
                family engagement, and encouraging innovation, it addresses global
                challenges such as rural development, education, and social
                cohesion. Through the PASSION Dimensions, it empowers communities
                worldwide to leverage their unique cultural strengths, contributing
                to a more connected and innovative society.
              </p>
            </div>
          </div>
    
          {/* Features Section */}
          <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center loginFormContainer">
              <img
                src={wallpaperImage}
                alt="Collaborate with Experts"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h3 className="mt-6 text-xl font-bold text-home">
                Collaborate with Diverse Experts
              </h3>
              <p className="mt-2 text-center text-gray-700">
                Access a network of academicians, researchers, and mentors to bring
                your ideas to life.
              </p>
            </div>
    
            {/* Feature 2 */}
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center loginFormContainer">
              <img
                src={wallpaperImageScrap}
                alt="Convert Ideas"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h3 className="mt-6 text-xl font-bold text-home">
                Convert Ideas into Products
              </h3>
              <p className="mt-2 text-center text-gray-700">
                Work with professionals to refine concepts and create innovative
                solutions.
              </p>
            </div>
    
            {/* Feature 3 */}
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center loginFormContainer">
              <img
                src={wallpaperImageOfficeCollegue}
                alt="Efficient Project Management"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h3 className="mt-6 text-xl font-bold text-home">
                Efficient Project Management
              </h3>
              <p className="mt-2 text-center text-gray-700">
                Utilize cutting-edge tools to streamline projects and ensure
                efficiency.
              </p>
            </div>
    
            {/* Feature 4 */}
            <div className="p-8 bg-white shadow-lg rounded-lg flex flex-col items-center loginFormContainer">
              <img
                src={wallpaperImageBalanceStones}
                alt="Revenue Optimization"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <h3 className="mt-6 text-xl font-bold text-home">
                Revenue Optimization
              </h3>
              <p className="mt-2 text-center text-gray-700">
                Maximize revenue opportunities by leveraging our expert guidance and
                resources.
              </p>
            </div>
          </div>
    
          {/* Testimonials */}
          <div className="loginFormContainer py-16 ">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-home">What People Say</h2>
              <div className="mt-8 flex flex-col md:flex-row items-center gap-6">
                <div className="bg-white p-6 shadow-lg rounded-lg w-full bottom-remark-card">
                  <p className="text-gray-700">
                    "PRUTL has been instrumental in transforming my ideas into
                    profitable products. The collaborative environment and expert
                    guidance have significantly boosted my project success."
                  </p>
                  <div className="flex items-center mt-4">
                    <img
                      src={remarkProfileImage}
                      alt="Sam Garcia"
                      className="w-12 h-12 rounded-full"
                    />
                    <span className="ml-4 text-gray-800 font-bold">Sam Garcia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Call to Action */}
          <div className="text-center py-16 ">
            <h2 className="text-3xl font-bold text-home">Join Us Today</h2>
            <p className="mt-4 text-gray-700">
              Be part of a revolutionary platform that empowers rural talent and
              fosters global collaboration.
            </p>
            <Link
              to="/contactUs"
              className="mt-6 inline-block button-bg text-white px-6 py-3 rounded-lg text-lg font-semibold "
            >
              Contact Us
            </Link>
          </div>
        </div>
  );
}

export default AboutUs
