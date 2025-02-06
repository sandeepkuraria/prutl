import React from "react";

const ErrorModal = ({ message, onClose }) => {
  // Handler for refreshing or closing the modal
  const handleClose = () => {
    onClose(); // Call the parent's onClose handler
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="backgroundLightDark p-4 rounded shadow-md w-100">
        {/* <h2 className="text-lg font-semibold mb-2">Error</h2> */}
        <p className="text-gray-700">{message}</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;


// import React from "react";

// const ErrorModal = ({ message }) => {
//   // Handler for refreshing the page
//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="fixed  inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="backgroundLightDark p-4 rounded shadow-md w-100">
//         <h2 className="text-lg font-semibold mb-2">Error</h2>
//         <p className="text-gray-700">{message}</p>
//         <div className="flex justify-end mt-4 space-x-2">
//           {/* <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={onClose}
//           >
//             Close
//           </button> */}
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//             onClick={handleRefresh}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ErrorModal;
