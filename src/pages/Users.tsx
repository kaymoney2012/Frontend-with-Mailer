import { useEffect, useState } from "react";
import { getUsers } from "../api";

interface User {
  id: number;
  email: string;
  username: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}

function capitalize(name: string) {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 p-5">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5 max-w-5xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-lg shadow p-4 text-center"
          >
            <div className="flex justify-end">
              <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                User #{user.id}
              </span>
            </div>

            <div className="w-16 h-16 rounded-full bg-orange-400 text-white text-2xl font-bold flex items-center justify-center mx-auto my-2">
              {capitalize(user.name.firstname).charAt(0)}
            </div>

            <h5 className="font-semibold my-1">
              {capitalize(user.name.firstname)} {capitalize(user.name.lastname)}
            </h5>
            <p className="text-gray-400 text-sm">@{user.username}</p>
            <p className="text-gray-600 text-xs mt-1">Email: {user.email}</p>
            <p className="text-gray-600 text-xs">Phone: {user.phone}</p>

            <div className="flex justify-between text-xs bg-gray-100 rounded-md p-2 my-2.5">
              <span>City: {capitalize(user.address.city)}</span>
              <span>Zip: {user.address.zipcode}</span>
            </div>

            <div className="bg-orange-400 text-white text-xs rounded-md p-2">
              Address: {capitalize(user.address.street)} {user.address.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
