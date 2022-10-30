import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
   const storedUser = useLoaderData();
   const [allUser, setUser] = useState(storedUser);

   const handleUpdateUser = (e) => {
      e.preventDefault();
      // console.log(allUser);
      fetch(`http://localhost:5000/users/${storedUser._id}`, {
         method: 'PUT',
         headers: {
            'content-type': 'application/json'
         },
         body: JSON.stringify(allUser)
      })
         .then((res) => res.json())
         .then(data => {
            if (data.modifiedCount > 0) {
               alert('Updated user');
            }
         })


   }

   const handleInputUpdateBlur = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newUser = { ...allUser };
      newUser[field] = value;
      setUser(newUser);
   }
   return (
      <div>
         <p>PLease Update {storedUser.name}</p>
         <form onSubmit={handleUpdateUser}>
            <input onChange={handleInputUpdateBlur} type="text" placeholder="name" name="name" defaultValue={storedUser.name} />
            <br />
            <input onChange={handleInputUpdateBlur} type="email" placeholder="email" name="email" defaultValue={storedUser.email} />
            <br />
            <input onChange={handleInputUpdateBlur} type="text" placeholder="Address" name="address" defaultValue={storedUser.address} />
            <br />
            <button>Update User</button>
         </form>
         <Link to="/">Home</Link>
      </div>
   );
};

export default Update;