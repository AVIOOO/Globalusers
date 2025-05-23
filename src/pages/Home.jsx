import React, { useEffect, useState } from "react";
import SkeletonLoader from "../components/SkeletonLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  setPage,
  updateUser,
  deleteUser,
} from "../reducers/fetchUsers";
import { logout } from "../reducers/loginUser";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, page, totalPages, loading, error } = useSelector(
    (state) => state.users
  );
  const { token } = useSelector((state) => state.auth);

  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: editingUser.id, ...formData }));
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">User List</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {token && (
            <button
              onClick={handleLogout}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {loading && <SkeletonLoader />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="border p-6 rounded-lg shadow-md bg-white flex flex-col items-center w-full"
              >
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
                />

                <h3 className="text-xl font-semibold mt-4">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-gray-500">{user.email}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-800 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              page={page}
              totalPages={totalPages}
              setPage={(newPage) => dispatch(setPage(newPage))}
            />
          </div>
        </>
      )}

      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEditChange}
                className="w-full p-2 mb-2 border rounded"
              />
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

