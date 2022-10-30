import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
   const users = useLoaderData();
   const [displayUsers, setDisplayUser] = useState(users)

   const handleDelete = (id) => {
      // eslint-disable-next-line no-restricted-globals
      const agree = confirm('Are you want to delete for sure?');
      if (agree) {
         fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
         })
            .then((res) => res.json())
            .then(data => {
               if (data.deletedCount > 0) {
                  const remainingUser = displayUsers.filter(user => user._id !== id);
                  setDisplayUser(remainingUser)
                  alert('user deleted successfully.');
               }
            })
      }
   }

   return (
      <div>
         <ul>
            {
               users.map((user) =>
                  <li key={user._id}>
                     {user.name} {user.email}
                     <Link to={`/update/${user._id}`} >
                        <button>Update</button>
                     </Link>
                     <button onClick={() => handleDelete(user._id)}>X</button>
                  </li>)
            }
         </ul>
         <Link to="/users/add">Add User</Link>
      </div>
   );
};

export default Home;