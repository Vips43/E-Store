import React, { useEffect } from "react";
import useMyStore from "../store/store";
import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";

function Users() {
 const { users, fetchUsers, loading } = useMyStore(
  useShallow((state) => ({
   users: state.users,
   fetchUsers: state.fetchUsers,
   loading: state.isLoading,
  })),
 );

 const navigate = useNavigate();

 useEffect(() => {
  fetchUsers();
 }, [fetchUsers]);

 if (loading) {
  return (
   <div className="flex justify-center items-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
   </div>
  );
 }

 return (
  <div className="bg-gray-50 min-h-screen p-8">
   <header className="max-w-6xl mx-auto mb-10 text-center">
    <h1 className="text-3xl font-bold text-gray-800">User Directory</h1>
    <p className="text-gray-500 mt-2">Manage and view system users</p>
   </header>

   <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {users.map((user) => (
     <div
      key={user.id}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
     >
      {/* Top Banner Accent */}
      <div className="h-2 bg-sky-600"></div>

      <div className="p-6 flex flex-col items-center">
       {/* Profile Image with Ring */}
       <div className="relative">
        <img
         src={user.image}
         alt={user.firstName}
         className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
        />
        <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
       </div>

       {/* User Identity */}
       <div className="text-center mt-4">
        <h2 className="text-xl font-bold text-gray-900 leading-tight">
         {user.firstName} {user.lastName}
        </h2>
        <span className="inline-block mt-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 rounded-full">
         {user.role}
        </span>
       </div>

       {/* Contact Info List */}
       <div className="w-full mt-6 space-y-3 border-t border-gray-50 pt-6">
        <div className="flex items-center text-sm text-gray-600">
         <span className="mr-3 opacity-50">📧</span>
         <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
         <span className="mr-3 opacity-50">📞</span>
         <span>{user.phone}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
         <span className="mr-3 opacity-50">🏢</span>
         <span className="font-medium text-gray-800">{user.company.name}</span>
        </div>
       </div>

       {/* Action Button */}
       <button
        onClick={() => navigate(`/users/${user.id}`)}
        className="w-full mt-6 py-2.5 px-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-sky-600 transition-colors duration-200"
       >
        View Full Profile
       </button>
      </div>
     </div>
    ))}
   </main>
  </div>
 );
}

export default Users;
