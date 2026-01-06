import React, { useEffect } from "react";
import useMyStore from "../store/store";
import { shallow } from "zustand/shallow";
import { Link, useNavigate } from "react-router-dom";

function Users() {
 const users = useMyStore((state) => state.users);
 const fetchUsers = useMyStore((state) => state.fetchUsers);
 const loading = useMyStore((state) => state.isLoading);
 let navigate = useNavigate();

 useEffect(() => {
  fetchUsers();
  console.log(users);
 }, []);

 useEffect(() => {
  if (users.length > 0) {
   console.log("Users Loaded:", users);
  }
 }, [users]);

 if (loading) {
  return <p className="p-5 mx-auto my-20">Loading users...</p>;
 }
 if (users.length === 0) {
  return <p className="p-5 mx-auto my-20">No users available.</p>;
 }

 return (
  <>
   <main className="flex flex-wrap justify-center">
    {users.map((user) => (
     <div key={user.id} className="m-2 w-120 text-sm border border-neutral-400 rounded-md shrink-0">
      <nav className="w-full p-2 flex items-center bg-sky-600">
       <h3 className="capitalize font-bold text-white">{user.role}</h3>
       <div className="ml-auto">
        <span>🔔</span>
        <span>👤</span>
       </div>
      </nav>
      <div className="">
       <div className="flex gap-5 p-3">
        <img
         src={user.image}
         alt=""
         className="shrink-0 aspect-square w-36 h-36"
        />
        <div className="grid [&>p]:flex [&>p]:gap-3">
         <h3 className="text-xl font-bold capitalize my-5">user details</h3>
         <p>
          <strong>Name:</strong>
          <span>
           {user.firstName} {user.lastName}
          </span>
         </p>
         <p>
          <strong>Email:</strong>
          <span>{user.email}</span>
         </p>
         <p>
          <strong>Phone:</strong>
          <span>{user.phone}</span>
         </p>
         <p>
          <strong>Gender:</strong>
          <span>{user.gender}</span>
         </p>
         <p>
          <strong>Company:</strong>
          <span>{user.company.name}</span>
         </p>
        </div>
       </div>
       <button
        className="my-5 border px-3 py-0.5 mx-auto"
        onClick={() => navigate(`/users/${user.id}`)}
       >
        Full details
       </button>
      </div>
     </div>
    ))}
   </main>
  </>
 );
}

export default Users;
