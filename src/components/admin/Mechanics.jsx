import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

const inputStyle = {
  padding: "6px",
  minWidth: "140px",
  backgroundColor: "#1e1e1e",
  border: "1px solid #444",
  color: "#eee",
  outline: "none",
};

const selectStyle = {
  ...inputStyle,
  cursor: "pointer",
};

const Mechanics = () => {
  const [mechanics, setMechanics] = useState([]);
  const [users, setUsers] = useState([]);
  const [garages, setGarages] = useState([]);
  const [editableMechanics, setEditableMechanics] = useState({});
  const [newMechanic, setNewMechanic] = useState({
    user_id: "",
    specialization: "",
    hourly_rate: "",
    garage_id: "",
  });

  const fetchData = async () => {
    try {
      const [mRes, uRes, gRes] = await Promise.all([
        axios.get(`${API_URL}/mechanics`),
        axios.get(`${API_URL}/users`),
        axios.get(`${API_URL}/garages`),
      ]);

      const mechanicsArray = Array.isArray(mRes.data) ? mRes.data : [];
      setMechanics(mechanicsArray);
      setUsers(uRes.data || []);
      setGarages(gRes.data || []);

      const editState = {};
      mechanicsArray.forEach((m) => {
        editState[m.id] = { ...m };
      });
      setEditableMechanics(editState);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      await axios.post(`${API_URL}/mechanics`, newMechanic);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`${API_URL}/mechanic/${id}`, editableMechanics[id]);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/mechanic/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: "20px", color: "#eee", background: "#121212", minHeight: "100vh" }}>
      <h2>Mechanics Admin</h2>

      {/* ADD */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select
          style={selectStyle}
          value={newMechanic.user_id}
          onChange={(e) => setNewMechanic({ ...newMechanic, user_id: e.target.value })}
        >
          <option style={{ background: "#1e1e1e" }} value="">Select User</option>
          {users.map((u) => (
            <option key={u.id} value={u.id} style={{ background: "#1e1e1e" }}>
              {u.first_name} {u.last_name}
            </option>
          ))}
        </select>

        <input
          style={inputStyle}
          placeholder="Specialization"
          value={newMechanic.specialization}
          onChange={(e) => setNewMechanic({ ...newMechanic, specialization: e.target.value })}
        />

        <input
          style={inputStyle}
          type="number"
          placeholder="Rate"
          value={newMechanic.hourly_rate}
          onChange={(e) => setNewMechanic({ ...newMechanic, hourly_rate: e.target.value })}
        />

        <select
          style={selectStyle}
          value={newMechanic.garage_id}
          onChange={(e) => setNewMechanic({ ...newMechanic, garage_id: e.target.value })}
        >
          <option style={{ background: "#1e1e1e" }} value="">Select Garage</option>
          {garages.map((g) => (
            <option key={g.id} value={g.id} style={{ background: "#1e1e1e" }}>
              {g.name}
            </option>
          ))}
        </select>

        <button style={{ background: "#007BFF", color: "#fff", border: "none", padding: "6px 12px" }} onClick={handleAdd}>
          Add
        </button>
      </div>

      {/* TABLE */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #444" }}>
            <th>ID</th>
            <th>User</th>
            <th>Specialization</th>
            <th>Rate</th>
            <th>Garage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mechanics.map((m) => (
            <tr key={m.id} style={{ borderBottom: "1px solid #333" }}>
              <td>{m.id}</td>

              <td>
                <select
                  style={selectStyle}
                  value={editableMechanics[m.id]?.user_id || ""}
                  onChange={(e) =>
                    setEditableMechanics({
                      ...editableMechanics,
                      [m.id]: { ...editableMechanics[m.id], user_id: e.target.value },
                    })
                  }
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id} style={{ background: "#1e1e1e" }}>
                      {u.first_name} {u.last_name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <input
                  style={inputStyle}
                  value={editableMechanics[m.id]?.specialization || ""}
                  onChange={(e) =>
                    setEditableMechanics({
                      ...editableMechanics,
                      [m.id]: { ...editableMechanics[m.id], specialization: e.target.value },
                    })
                  }
                />
              </td>

              <td>
                <input
                  style={inputStyle}
                  type="number"
                  value={editableMechanics[m.id]?.hourly_rate || ""}
                  onChange={(e) =>
                    setEditableMechanics({
                      ...editableMechanics,
                      [m.id]: { ...editableMechanics[m.id], hourly_rate: e.target.value },
                    })
                  }
                />
              </td>

              <td>
                <select
                  style={selectStyle}
                  value={editableMechanics[m.id]?.garage_id || ""}
                  onChange={(e) =>
                    setEditableMechanics({
                      ...editableMechanics,
                      [m.id]: { ...editableMechanics[m.id], garage_id: e.target.value },
                    })
                  }
                >
                  {garages.map((g) => (
                    <option key={g.id} value={g.id} style={{ background: "#1e1e1e" }}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </td>

              <td>
                <button
                  style={{ background: "#28A745", color: "#fff", marginRight: "5px", border: "none", padding: "5px" }}
                  onClick={() => handleUpdate(m.id)}
                >
                  Update
                </button>
                <button
                  style={{ background: "#DC3545", color: "#fff", border: "none", padding: "5px" }}
                  onClick={() => handleDelete(m.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mechanics;