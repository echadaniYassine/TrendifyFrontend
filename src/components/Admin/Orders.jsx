import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../../api/admin/apiAdmin'; // Import the API functions
import '../../styles/admin/Orders.css'; // Import the CSS file

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, orderStatus: updatedOrder.orderStatus } : order
        )
      );
      setSelectedOrder(null);
      setNewStatus('');
    } catch (err) {
      setError('Failed to update order status');
      console.error(err);
    }
  };

  const renderOrderDetails = (order) => {
    return (
      <div className="order-details">
        <h3>Order Details</h3>
        <p><strong>User:</strong> {order.userId.name} {order.userId.username}</p>
        <p><strong>Email:</strong> {order.userId.email}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
        <h4>Items</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.productId.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>

        <div className="order-status-update">
          <h4>Change Order Status</h4>
          <select onChange={(e) => setNewStatus(e.target.value)} value={newStatus}>
            <option value="">Select status</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button onClick={() => handleStatusChange(order._id)}>Update Status</button>
        </div>
        <button className="close-button" onClick={() => setSelectedOrder(null)}>Close</button>
      </div>
    );
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>

      {loading && <p className="loading-text">Loading orders...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && orders.length === 0 && <p>No orders found</p>}

      {!loading && orders.length > 0 && (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId.username}</td>
                  <td>${order.totalAmount}</td>
                  <td>{order.orderStatus}</td>
                  <td>
                    <button onClick={() => setSelectedOrder(order)} className="view-details-button">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && renderOrderDetails(selectedOrder)}
    </div>
  );
};

export default Orders;
