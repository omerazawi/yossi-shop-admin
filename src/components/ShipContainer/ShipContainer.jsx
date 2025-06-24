import React,{useState} from 'react';
import './ShipContainer.css';
import ordersData from '../../Data/Shipping';

export default function ShipContainer() {
    const [orders, setOrders] = useState(ordersData);

    const handleDelete = (id) => {
      setOrders(orders.filter(order => order.id !== id));
    };
  
    const handleStatusChange = (id, newStatus) => {
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status: newStatus } : order
      ));
    };

  return (
<div className="table-container">
  <table>
    <thead>
      <tr>
        <th>מס' הזמנה</th>
        <th>שם המזמין</th>
        <th>טלפון</th>
        <th>כתובת</th>
        <th>סטטוס</th>
        <th>פעולות</th>
      </tr>
    </thead>
    <tbody>
      {orders.map(order => (
        <tr key={order.id}>
          <td>{order.id}</td>
          <td>{order.customerName}</td>
          <td>{order.phone}</td>
          <td>{order.address}</td>
          <td>
            <select value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}>
              <option value="בהכנה">בהכנה</option>
              <option value="נשלח">נשלח</option>
              <option value="ממתין לאישור">ממתין לאישור</option>
              <option value="בוטל">בוטל</option>
            </select>
          </td>
          <td>
            <button onClick={() => handleDelete(order.id)}>מחק</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  )
}
