import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth"; // Make sure this points to your Auth.jsx
import { Navigate } from "react-router-dom";

function Adminedits() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});

  const API_URL = "http://127.0.0.1:5000";
  const access_token = localStorage.getItem("access_token");

  // Admin check
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== "admin")
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl font-bold">Access Denied 🚫</h2>
      </div>
    );

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
      else alert(data.msg || "Failed to fetch users");
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Server error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Start editing a user
  const startEdit = (user) => {
    setEditingUserId(user.id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      is_verified: user.is_verified,
      password: "",
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingUserId(null);
    setFormData({});
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Update user
  const handleUpdate = async (id) => {
    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("User updated successfully");
        setEditingUserId(null);
        fetchUsers();
      } else {
        alert(data.msg || "Update failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully");
        fetchUsers();
      } else {
        alert(data.msg || "Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (loading)
    return <div className="text-white min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Panel - Edit Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Phone</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Verified</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) =>
              editingUserId === u.id ? (
                <tr key={u.id} className="bg-gray-600">
                  <td className="py-2 px-4">{u.id}</td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-gray-700 text-white w-full"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-gray-700 text-white w-full mt-1"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-gray-700 text-white w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-gray-700 text-white w-full"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="px-2 py-1 rounded bg-gray-700 text-white w-full"
                    />
                  </td>
                  <td className="py-2 px-4 text-center">
                    <input
                      type="checkbox"
                      name="is_verified"
                      checked={formData.is_verified}
                      onChange={handleChange}
                      className="accent-blue-500"
                    />
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => handleUpdate(u.id)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={u.id} className="bg-gray-800 hover:bg-gray-700">
                  <td className="py-2 px-4">{u.id}</td>
                  <td className="py-2 px-4">{u.first_name} {u.last_name}</td>
                  <td className="py-2 px-4">{u.email}</td>
                  <td className="py-2 px-4">{u.phone}</td>
                  <td className="py-2 px-4">{u.role}</td>
                  <td className="py-2 px-4 text-center">{u.is_verified ? "✅" : "❌"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => startEdit(u)}
                      className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adminedits;