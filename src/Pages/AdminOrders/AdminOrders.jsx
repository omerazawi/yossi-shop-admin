import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState("");

  /* כותרת עם הטוקן */
  const tokenHeader = {
    headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
  };

  /* --- בקשת כל ההזמנות --- */
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/orders", tokenHeader);
      setOrders(data);
    } catch (err) {
      console.error("שגיאה בקבלת הזמנות", err);
      setError("אין הרשאה או שהטוקן פג תוקף. התחבר מחדש.");
navigate('/login')
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  /* מחיקה */
  const handleDelete = async (id) => {
    if (!window.confirm("למחוק הזמנה?")) return;
    await axios.delete(`http://localhost:3001/orders/${id}`, tokenHeader);
    fetchOrders();
  };

  /* התחלת עריכה */
  const handleEdit = (order) => {
    setEditingId(order._id);
    setEditData(order);
  };

  /* שמירת עריכה */
  const handleSave = async () => {
    await axios.put(
      `http://localhost:3001/orders/${editingId}`,
      editData,
      tokenHeader
    );
    setEditingId(null);
    fetchOrders();
  };

  const onChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  /* ---------- UI ---------- */
  return (
    <div style={{ padding: "1rem" }}>
      <h2>ניהול הזמנות</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {orders.map((o) => (
        <div
          key={o._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          {editingId === o._id ? (
            <>
              <input
                name="fullName"
                value={editData.fullName}
                onChange={onChange}
              />
              <input
                name="address"
                value={editData.address}
                onChange={onChange}
              />
              <select name="status" value={editData.status} onChange={onChange}>
                <option value="ממתינה">ממתינה</option>
                <option value="מחכה למשלוח">מחכה למשלוח</option>
                <option value="נשלחה">נשלחה</option>
                <option value="בוצעה בהצלחה">בוצעה בהצלחה</option>
                <option value="בוטלה">בוטלה</option>
              </select>
              <button onClick={handleSave}>שמור</button>
              <button onClick={() => setEditingId(null)}>ביטול</button>
            </>
          ) : (
            <>
              <p><strong>שם:</strong> {o.fullName}</p>
              <p><strong>כתובת:</strong> {o.address}</p>
              <p><strong>סטטוס:</strong> {o.status}</p>
              <button onClick={() => handleEdit(o)}>ערוך</button>
              <button onClick={() => handleDelete(o._id)}>מחק</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
