import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

function FindMechanic() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [mechanics, setMechanics] = useState([]);
  const [search, setSearch] = useState("");
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/mechanics")
      .then((res) => res.json())
      .then((data) => setMechanics(data))
      .catch(console.error);
  }, []);

  const filtered = mechanics.filter((mech) => {
    const fullName = `${mech.user.first_name} ${mech.user.last_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(search.toLowerCase()) ||
      mech.user.location.toLowerCase().includes(search.toLowerCase()) ||
      mech.specialization.toLowerCase().includes(search.toLowerCase());

    const matchesMin = minRate ? mech.hourly_rate >= parseFloat(minRate) : true;
    const matchesMax = maxRate ? mech.hourly_rate <= parseFloat(maxRate) : true;

    return matchesSearch && matchesMin && matchesMax;
  });

  if (!user) return <p className="pt-20 text-center text-white">Please login first</p>;

  return (
    <div className="pt-20 px-4 md:px-10 max-w-6xl mx-auto text-gray-100">

      <h1 className="text-3xl font-bold mb-6 text-white">Available Mechanics</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="flex-1">
          <label className="block mb-1 text-white">Search by Name / Location / Specialization</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Type here..."
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Min Rate</label>
          <input
            type="number"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            className="w-24 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block mb-1 text-white">Max Rate</label>
          <input
            type="number"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            className="w-24 px-3 py-2 border rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-600 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Specialization</th>
              <th className="px-4 py-2 border">Hourly Rate</th>
              <th className="px-4 py-2 border">Rating</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-400">
                  No mechanics found.
                </td>
              </tr>
            ) : (
              filtered.map((mech) => (
                <tr key={mech.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border">{mech.user.first_name} {mech.user.last_name}</td>
                  <td className="px-4 py-2 border">{mech.user.location}</td>
                  <td className="px-4 py-2 border">{mech.user.phone}</td>
                  <td className="px-4 py-2 border">{mech.specialization}</td>
                  <td className="px-4 py-2 border">KES {mech.hourly_rate}</td>
                  <td className="px-4 py-2 border">{mech.rating || 0}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => navigate(`/mechanic/${mech.user.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FindMechanic;