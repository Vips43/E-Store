import React, { useEffect, useState } from "react";
import useMyStore from "../store/store";
import { useParams } from "react-router-dom";

function FullUserDetails() {
 const users = useMyStore((state) => state.users);
 const fetchUsers = useMyStore((state) => state.fetchUsers);
 const { id } = useParams();

 const [user, setUser] = useState(null);

 useEffect(() => {
  if (users.length === 0) {
   fetchUsers();
  }
 }, []);

 useEffect(() => {
  if (users.length > 0) {
   const searchUser = users.find((user) => user.id === Number(id));
   setUser(searchUser);
   console.log(user);
}
}, [users, id]);

 if (!user) {
  return <p className="p-5">Loading user details...</p>;
 }
 return (
  <main className="p-4">
   <div className="max-w-5xl mx-auto border border-neutral-400 rounded-lg p-4 space-y-6">
    <div className="flex justify-center">
     <img
      src={user.image}
      alt="User"
      className="w-40 h-40 object-cover rounded-full"
     />
    </div>

    <ul className="grid lg:grid-cols-2 gap-8">
     <li className="rounded-lg p-4 space-y-3 [&_p]:grid [&_p]:grid-cols-1 [&_p]:sm:grid-cols-2 [&_p]:gap-1 [&_p]:md:gap-4 [&_strong]:font-medium [&_span]:text-gray-700 shadow-md">
      <strong className="text-xl block mb-2">Personal Details</strong>

      <p>
       <strong>Full Name</strong>
       <span>{user.firstName} {user.lastName}</span>
      </p>
      <p>
       <strong>Date of Birth</strong>
       <span>{user.birthDate}</span>
      </p>
      <p>
       <strong>Gender</strong>
       <span>{user.gender}</span>
      </p>
      <p>
       <strong>Address</strong>
       <span>{user.address.city}</span>
      </p>
      <p>
       <strong>Phone</strong>
       <span>{user.phone}</span>
      </p>
      <p>
       <strong>Email</strong>
       <span className="truncate">{user.email}</span>
      </p>
     </li>

     {/* Card */}
     <li className="rounded-lg p-4 space-y-3 [&_p]:grid [&_p]:grid-cols-1 [&_p]:sm:grid-cols-2 [&_p]:gap-1 [&_p]:md:gap-4 shadow-md">
      <strong className="text-xl block mb-2">Security Details</strong>

      <p>
       <strong>Username</strong>
       <span>{user.username}</span>
      </p>
      <p>
       <strong>Password</strong>
       <span>{user.password}</span>
      </p>
      <p>
       <strong>Mac Address</strong>
       <span>{user.macAddress}</span>
      </p>
      <p>
       <strong>Card Number</strong>
       <span>{user.bank.cardNumber}</span>
      </p>
      <p>
       <strong>Card Type</strong>
       <span>{user.bank.cardType}</span>
      </p>
      <p>
       <strong>University</strong>
       <span>{user.university}</span>
      </p>
     </li>

     {/* Card */}
     <li className="rounded-lg p-4 space-y-3 [&_p]:grid [&_p]:grid-cols-1 [&_p]:sm:grid-cols-2 [&_p]:gap-1 [&_p]:md:gap-4 shadow-md">
      <strong className="text-xl block mb-2">Additional Details</strong>

      <p>
       <strong>Blood Group</strong>
       <span>{user.bloodGroup}</span>
      </p>
      <p>
       <strong>Eye Color</strong>
       <span>{user.eyeColor}</span>
      </p>
      <p>
       <strong>Hair Color</strong>
       <span>{user.hair.color}</span>
      </p>
      <p>
       <strong>Hair Type</strong>
       <span>{user.hair.type}</span>
      </p>
      <p>
       <strong>Weight</strong>
       <span>{user.weight}</span>
      </p>
      <p>
       <strong>Height</strong>
       <span>{user.height}</span>
      </p>
     </li>

     {/* Card */}
     <li className="rounded-lg p-4 space-y-3 [&_p]:grid [&_p]:grid-cols-1 [&_p]:sm:grid-cols-2 [&_p]:gap-1 [&_p]:md:gap-4 shadow-md">
      <strong className="text-xl block mb-2">Company Details</strong>

      <p>
       <strong>Department</strong>
       <span>{user.company.department}</span>
      </p>
      <p>
       <strong>Name</strong>
       <span>{user.company.name}</span>
      </p>
      <p>
       <strong>Title</strong>
       <span>{user.company.title}</span>
      </p>
      <p>
       <strong>Address</strong>
       <span>{user.company.address.address} {user.company.address.city} {user.company.address.state} <strong> PostalCode:-</strong>  {user.company.address.postalCode}</span>
      </p>
     </li>
    </ul>
   </div>
  </main>
 );
}

export default FullUserDetails;
