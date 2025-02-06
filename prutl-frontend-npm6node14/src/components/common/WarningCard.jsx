// // src/components/common/WarningCard.jsx
// import React from "react";

// const WarningCard = ({ message, onClose }) => {
//   return (
//     <div className="fixed top-10 left-0 right-0 mt-4 mx-4 bg-red-100 border border-red-400 px-4 py-2 rounded-md shadow-lg z-40">
//       <div className="flex justify-between items-center ">
//         <p className="errorTextColor">{message}</p>
//         <button
//           onClick={onClose}
//           className="ml-4 bg-red-700 text-white px-2 py-1 rounded-md"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WarningCard;


// // src/components/common/WarningCard.jsx
// import React from 'react';

// const WarningCard = ({ message, onClose }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         <h4 className="text-lg font-bold mb-4">There was a problem</h4>
//         <i className="a-icon a-icon-alert text-red-500 text-2xl mb-4"></i>
//         <div className="a-alert-content mb-4">
//           <ul className="a-unordered-list a-nostyle a-vertical a-spacing-none">
//             <li>
//               <span className="a-list-item">{message}</span>
//             </li>
//           </ul>
//         </div>
//         <button
//           className="mt-4 px-4 py-2 bg-themeColorOrange text-white rounded-md hover:bg-hoverButtonColorOrange"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default WarningCard;
