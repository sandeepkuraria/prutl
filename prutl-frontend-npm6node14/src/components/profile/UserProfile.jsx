import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

  useEffect(() => {
    // First, try to get user and profile picture URL from localStorage
    let user = localStorage.getItem('user');
    let profilePictureUrl = localStorage.getItem('profile_picture_url');
    
    if (!user) {
      // If not found in localStorage, try sessionStorage
      user = sessionStorage.getItem('user');
    }
    if (!profilePictureUrl) {
      // If not found in localStorage, try sessionStorage
      profilePictureUrl = sessionStorage.getItem('profile_picture_url');
    }

    if (user) {
      setUser(JSON.parse(user));
    }

    if (profilePictureUrl) {
      // Prefix the URL with the backend address
      const fullUrl = `http://localhost:5000${profilePictureUrl}`;
      setProfilePictureUrl(fullUrl);
    }
  }, []);

  console.log('Profile Picture URL++++++++++:', profilePictureUrl);

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {user && (
        <div className="membership-list p-6 rounded-lg shadow-md">
          <div className='flex items-center space-x-4'>
          <img
              src={profilePictureUrl}
              alt="Profile"
              width="50"
              height="50"
              className="rounded-full mt-4"
            />
          <h1 className="text-3xl font-bold mt-6 ">
         {user.name} </h1>
          </div>

          <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="mb-2"><span className="font-semibold">Phone:</span> {user.phone_number}</p>
          <p className="mb-2"><span className="font-semibold">City:</span> {user.city}</p>
          <p className="mb-2"><span className="font-semibold">County:</span> {user.county}</p>
          <p className="mb-2"><span className="font-semibold">State:</span> {user.state}</p>
          <p className="mb-2"><span className="font-semibold">Country:</span> {user.country}</p>
          <p className="mb-2"><span className="font-semibold">Pin Code:</span> {user.pin_code}</p>
          <p className="mb-2"><span className="font-semibold">User Type:</span> {user.user_type}</p>

          {/* Display the profile picture if available */}
          
        </div>
      )}
    </div>
  );
};

export default UserProfile;

// 
// import React, { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [user, setUser] = useState(localStorage.getItem('user'));

//   useEffect(() => {
//     let user = localStorage.getItem('user');
//     if (user) {
//       user = JSON.parse(user);
//     } else {
//       user = null;
//     }
//     setUser(user);
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
//       {user && (
//         <div className="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
//           <p className="mb-2"><strong>Email:</strong> {user.email}</p>
//           <p className="mb-2"><strong>Phone:</strong> {user.phone_number}</p>
//           <p className="mb-2"><strong>City:</strong> {user.city}</p>
//           <p className="mb-2"><strong>County:</strong> {user.county}</p>
//           <p className="mb-2"><strong>State:</strong> {user.state}</p>
//           <p className="mb-2"><strong>Country:</strong> {user.country}</p>
//           <p className="mb-2"><strong>Pin Code:</strong> {user.pin_code}</p>
//           <p className="mb-2"><strong>User Type:</strong> {user.user_type}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;




// // src/components/profile/UserProfile.jsx
// import React, {  useEffect, useState } from 'react';

// const UserProfile = () => {
// const [user, setUser]=useState(localStorage.getItem('user'));

// useEffect(() => {
//   let user  = localStorage.getItem('user')
//   if(user){
//     user=JSON.parse(user);
//   }else{
//     user=null;
//   }
//   setUser(user)
// }, [])

//   return (
//     <div className="">
//       {user && (
//         <div className="card">
//           <h1>{user.name}</h1>
//           <p>Email: {user.email}</p>
//           <p>Phone: {user.phone_number}</p>
//           <p>City: {user.city}</p>
//           <p>County: {user.county}</p>
//           <p>State: {user.state}</p>
//           <p>Country: {user.country}</p>
//           <p>Pin Code: {user.pin_code}</p>
//           <p>User Type: {user.user_type}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;
