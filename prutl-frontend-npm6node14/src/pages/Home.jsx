// //PRUTL-frontend-npm6node14/src/pages/Home.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import wallpaperImage from "../assets/kidsPulling.jpg";
// import wallpaperImageScrap from "../assets/scrap.jpg";
// import wallpaperImageOfficeCollegue from "../assets/officeCollegue.jpg";
// import wallpaperImageBalanceStones from "../assets/BalanceStones.jpg";
// import profileImage from "../assets/profileImage.png";
// import remarkProfileImage from "../assets/samGarcia.png";

// const Home = () => {
//   return (
//     <div className="main-content">
//       <div>
//         <p className="heading">Collaborative Project Management Platform</p>
//         <p className="head-text-info">
//           Join PRUTL to access a diverse network of experts who can assist
//           in managing projects and transforming concepts into profitable
//           products. Benefit from collaborative tools and resources for revenue
//           growth.
//         </p>
//         <Link to="/contactUs" className="contactusbtn">
//           Contact us
//         </Link>
//       </div>
//       <div className="additional-info">
//         <div className="rating">
//           <Star />
//           <Star />
//           <Star />
//           <Star />
//           <Star />
//         </div>
//         <div className="info-section">
//           <p className="text-xs"> Diverse Collaboration</p>
//         </div>
//         <div className="info-section">
//           <p className="text-xs">Revenue Growth</p>
//         </div>
//       </div>
//       <p className="text-sm"> “Enhanced my project success significantly.” </p>

//       <div className="profile-container">
//         <img src={profileImage} alt="Profile" className="profile-image" />
//         <span className="profile-username">Yan Harris</span>
//       </div>

//       <div className="wallpaperImage-container">
//         <div className="rectangleSvg">
//           <svg
//             className="pattern-svg absolute -mr-3 top-8 right-1/2 lg:m-0 lg:left-0"
//             fill="none"
//             viewBox="0 0 404 392"
//           >
//             <defs>
//               <pattern
//                 id="837c3e70-6c3a-44e6-8854-cc48c737b659"
//                 x="0"
//                 y="0"
//                 width="20"
//                 height="20"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <rect
//                   x="0"
//                   y="0"
//                   width="4"
//                   height="4"
//                   className="pattern-rect"
//                   fill="#e1e3e6"
//                 ></rect>
//               </pattern>
//             </defs>
//             <rect
//               width="404"
//               height="392"
//               fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
//             ></rect>
//           </svg>
//         </div>
//         <img
//           src={wallpaperImage}
//           alt="Profile"
//           className="wallpaperImage-image"
//         />
//       </div>
//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Collaborate with Diverse Experts</h2>
//         <div className="subheading-text">
//           Access a network of academicians, researchers, mentors, and more to
//           bring your concepts to life and enhance revenue opportunities.
//         </div>
//       </div>
//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Convert Ideas to Products</h2>
//         <div className="subheading-text">
//           Collaborate with experts for revenue opportunities.
//         </div>
//       </div>
//       <div className="wallpaperImageScrap-container">
//         <img
//           src={wallpaperImageScrap}
//           alt="Profile"
//           className="wallpaperImageScrap-image"
//         />
//       </div>
//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Efficient Project Management</h2>
//         <div className="subheading-text">
//           Utilize effective project management tools to streamline the process
//           of converting ideas into marketable products, ensuring revenue growth.
//         </div>
//       </div>
//       <div className="wallpaperImage-container">
//         <img
//           src={wallpaperImageOfficeCollegue}
//           alt="Profile"
//           className="wallpaperImage-image"
//         />
//       </div>
//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Revenue Optimization</h2>
//         <div className="subheading-text">
//           Maximize revenue opportunities by leveraging the expertise and
//           resources available on PRUTL to refine and launch successful
//           products.
//         </div>
//       </div>
//       <div className="wallpaperImageScrap-container">
//         <img
//           src={wallpaperImageBalanceStones}
//           alt="Profile"
//           className="wallpaperImageScrap-image"
//         />
//       </div>
//       <div className="bottom-remark-card">
//         <div className="remark-text">
//           "Maximize revenue opportunities by leveraging the expertise and
//           resources available on PRUTL to refine and launch successful
//           products."
//         </div>
//         <div className="remark-profile-image-container">
//   <div className="remark-profile-image-wrapper">
//     <img
//       src={remarkProfileImage}
//       alt="Remark Profile"
//       className="remark-profile-image"
//     />
//   </div>
//   <div className="remark-profile-username-wrapper">
//     <span className="remark-profile-username">Sam Garcia</span>
//   </div>
// </div>

//       </div>
//       <div className="connectForSuccess-card">
//         <div className="connectForSuccess-container">
//           <div>
//             <h2 className="connectForSuccess-text">
//               Connect for Success <span className="text-primary">.</span>
//             </h2>
//             <div className="connectForSuccessSubheading-text">
//               "
//               <span>
//                 PRUTL has been instrumental in transforming my ideas into
//                 profitable products. The collaborative environment and expert
//                 guidance have significantly boosted my project success.
//               </span>
//               "<span> - Nathan Williams</span>
//             </div>
//           </div>
//           <div className="bottomContactbutton">
//             <Link to="/contactUs" className="contactusbtn">
//               Contact us
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* <Link to="/signup" className="btn">Get Started</Link> */}
//     </div>
//   );
// };

// const Star = () => (
//   <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="star">
//     <path
//       fill="currentColor"
//       d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
//     ></path>
//   </svg>
// );

// export default Home;

// *************************************************************
// import React from "react";
// import { Link } from "react-router-dom";
// import wallpaperImage from "../assets/kidsPulling.jpg";
// import wallpaperImageScrap from "../assets/scrap.jpg";
// import wallpaperImageOfficeCollegue from "../assets/officeCollegue.jpg";
// import wallpaperImageBalanceStones from "../assets/BalanceStones.jpg";
// import profileImage from "../assets/profileImage.png";
// import remarkProfileImage from "../assets/samGarcia.png";

// const Home = () => {
//   return (
//     <div className="main-content">

//       {/* PRUTL Events Section */}
//       <section className="prutl-events">
//         <h1 className="prutl-heading">PASSIONIT RURAL UNITY TALENT LEAGUE Events</h1>
//         <p className="prutl-tagline">“Igniting Rural Talent, Uniting Hearts, Inspiring Innovations.”</p>
//       </section>

//       {/* Vision & Mission Section */}
//       <section className="vision-mission-section">
//         <div className="vision">
//           <h2>Our Vision</h2>
//           <p>
//             To empower rural communities globally by nurturing talent, fostering innovation, and strengthening
//             family bonds through inclusive, soul-enriching games and events.
//           </p>
//         </div>
//         <div className="mission">
//           <h2>Our Mission</h2>
//           <p>
//             To create an engaging platform for rural students, parents, and educators to showcase their talents,
//             foster creativity, and collaborate on innovative projects using the PASSION Dimensions framework,
//             while promoting family togetherness and reducing over-reliance on social media.
//           </p>
//         </div>
//       </section>

//       {/* Relevance to All Countries */}
//       <section className="global-relevance">
//         <h2>Relevance to All Countries</h2>
//         <p>
//           PASSIONIT PRUTL GAMES resonates universally as it taps into the shared need for community,
//           creativity, and meaningful connections beyond digital platforms. By fostering local talent,
//           promoting family engagement, and encouraging innovation, it addresses global challenges such as
//           rural development, education, and social cohesion. Through the PASSION Dimensions, it empowers
//           communities worldwide to leverage their unique cultural strengths, contributing to a more connected
//           and innovative society.
//         </p>
//       </section>

//       {/* Existing PRUTL Introduction */}
//       <div>
//         <p className="heading">Collaborative Project Management Platform</p>
//         <p className="head-text-info">
//           Join PRUTL to access a diverse network of experts who can assist
//           in managing projects and transforming concepts into profitable
//           products. Benefit from collaborative tools and resources for revenue
//           growth.
//         </p>
//         <Link to="/contactUs" className="contactusbtn">
//           Contact us
//         </Link>
//       </div>

//       <div className="additional-info">
//         <div className="rating">
//           <Star />
//           <Star />
//           <Star />
//           <Star />
//           <Star />
//         </div>
//         <div className="info-section">
//           <p className="text-xs"> Diverse Collaboration</p>
//         </div>
//         <div className="info-section">
//           <p className="text-xs">Revenue Growth</p>
//         </div>
//       </div>
//       <p className="text-sm"> “Enhanced my project success significantly.” </p>

//       <div className="profile-container">
//         <img src={profileImage} alt="Profile" className="profile-image" />
//         <span className="profile-username">Yan Harris</span>
//       </div>

//       <div className="wallpaperImage-container">
//         <img src={wallpaperImage} alt="Profile" className="wallpaperImage-image" />
//       </div>

//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Collaborate with Diverse Experts</h2>
//         <p className="subheading-text">
//           Access a network of academicians, researchers, mentors, and more to bring your concepts to life
//           and enhance revenue opportunities.
//         </p>
//       </div>

//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Convert Ideas to Products</h2>
//         <p className="subheading-text">Collaborate with experts for revenue opportunities.</p>
//       </div>

//       <div className="wallpaperImageScrap-container">
//         <img src={wallpaperImageScrap} alt="Scrap" className="wallpaperImageScrap-image" />
//       </div>

//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Efficient Project Management</h2>
//         <p className="subheading-text">
//           Utilize effective project management tools to streamline the process of converting ideas into
//           marketable products, ensuring revenue growth.
//         </p>
//       </div>

//       <div className="wallpaperImage-container">
//         <img src={wallpaperImageOfficeCollegue} alt="Office Colleagues" className="wallpaperImage-image" />
//       </div>

//       <div className="convert-ideas-text-container">
//         <h2 className="convert-ideas-text">Revenue Optimization</h2>
//         <p className="subheading-text">
//           Maximize revenue opportunities by leveraging the expertise and resources available on PRUTL
//           to refine and launch successful products.
//         </p>
//       </div>

//       <div className="wallpaperImageScrap-container">
//         <img src={wallpaperImageBalanceStones} alt="Balance Stones" className="wallpaperImageScrap-image" />
//       </div>

//       <div className="bottom-remark-card">
//         <p className="remark-text">
//           "Maximize revenue opportunities by leveraging the expertise and resources available on PRUTL
//           to refine and launch successful products."
//         </p>
//         <div className="remark-profile-image-container">
//           <img src={remarkProfileImage} alt="Remark Profile" className="remark-profile-image" />
//           <span className="remark-profile-username">Sam Garcia</span>
//         </div>
//       </div>

//       <div className="connectForSuccess-card">
//         <div className="connectForSuccess-container">
//           <h2 className="connectForSuccess-text">
//             Connect for Success <span className="text-primary">.</span>
//           </h2>
//           <p className="connectForSuccessSubheading-text">
//             "PRUTL has been instrumental in transforming my ideas into profitable products.
//             The collaborative environment and expert guidance have significantly boosted my project success."
//             <br />- Nathan Williams
//           </p>
//           <Link to="/contactUs" className="contactusbtn">
//             Contact us
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Star = () => (
//   <svg viewBox="0 0 20 20" width="1.2em" height="1.2em" className="star">
//     <path
//       fill="currentColor"
//       d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z"
//     ></path>
//   </svg>
// );

// export default Home;

// *****************************************************************************\
import React from "react";
import { Link } from "react-router-dom";
import wallpaperImage from "../assets/kidsPulling.jpg";
import wallpaperImageScrap from "../assets/scrap.jpg";
import wallpaperImageOfficeCollegue from "../assets/officeCollegue.jpg";
import wallpaperImageBalanceStones from "../assets/BalanceStones.jpg";
import profileImage from "../assets/profileImage.png";
import remarkProfileImage from "../assets/samGarcia.png";

const Home = () => {
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
};

export default Home;
