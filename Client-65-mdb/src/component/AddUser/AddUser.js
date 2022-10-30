import React, { useState } from 'react';

const AddUser = () => {
   const [allUser, setUser] = useState({});

   const handleAddUser = (e) => {
      e.preventDefault();
      console.log(allUser);

      fetch('http://localhost:5000/users', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(allUser)
      })
         .then(res => res.json())
         .then(data => {
            if (data.acknowledged) {
               alert("User Added succesfully");
               e.target.reset();
            }
         })
   }

   const handleInputBlur = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      const newUser = { ...allUser };
      newUser[field] = value;
      setUser(newUser);
   }

   return (
      <div>
         <form onSubmit={handleAddUser}>
            <input onBlur={handleInputBlur} type="text" placeholder="name" name="name" />
            <br />
            <input onBlur={handleInputBlur} type="email" placeholder="email" name="email" />
            <br />
            <input onBlur={handleInputBlur} type="text" placeholder="Address" name="address" />
            <br />
            <button>Add User</button>
         </form>
      </div>
   );
};

export default AddUser;