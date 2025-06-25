import { useEffect, useState } from "react";
import axios                    from "axios";
import "./Users.css";

export default function Users() {
  const token = localStorage.getItem("adminToken");

  const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: { Authorization: `Bearer ${token}` },
  });

  const [users, setUsers]       = useState([]);
  const [editId, setEditId]     = useState(null);
  const [editData, setEditData] = useState({ fullName: "", email: "" });
  const [error, setError]       = useState("");

  /* --- טוען משתמשים --- */
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch {
      setError("טעינת משתמשים נכשלה – התחבר מחדש?");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  /* --- מחיקה --- */
  const handleDelete = async (id) => {
    if (!window.confirm("למחוק משתמש?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  /* --- התחלת עריכה --- */
  const startEdit = (u) => {
    setEditId(u._id);
    setEditData({ fullName: u.fullName, email: u.email });
  };

  /* --- שמירת עריכה --- */
  const saveEdit = async () => {
    await api.put(`/users/${editId}`, editData);
    setEditId(null);
    fetchUsers();
  };

  const cancelEdit = () => setEditId(null);

  const onChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  /* --- UI --- */
  return (
    <div className="users-wrapper">
      <h2>ניהול משתמשים</h2>
      {error && <p className="error">{error}</p>}

      <table className="users-table">
        <thead>
          <tr>
            <th>שם מלא</th>
            <th>אימייל</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              {editId === u._id ? (
                <>
                  <td>
                    <input
                      name="fullName"
                      value={editData.fullName}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <input
                      name="email"
                      value={editData.email}
                      onChange={onChange}
                    />
                  </td>
                  <td>
                    <button onClick={saveEdit}>💾 שמור</button>
                    <button onClick={cancelEdit}>ביטול</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>
                    <button onClick={() => startEdit(u)}>✏️ ערוך</button>
                    <button onClick={() => handleDelete(u._id)}>🗑️ מחק</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
