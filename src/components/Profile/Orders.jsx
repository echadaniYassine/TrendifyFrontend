import React, { useState, useEffect } from "react";
import { getUserOrders } from "../../api/admin/OrdersManage"; // Adjust import according to your file structure
import Cookies from 'js-cookie'; // Import js-cookie
import "../../styles/profile/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = Cookies.get('token'); // Retrieve token from cookies

      if (!token) {
        setError("No token provided.");
        setOrderLoading(false);
        return;
      }

      try {
        setOrderLoading(true);
        setError(null);
        const response = await getUserOrders(token);

        // Check if the response indicates success and contains orders
        if (response.success && Array.isArray(response.orders)) {
          setOrders(response.orders);
        } else {
          throw new Error("Invalid orders data");
        }
      } catch (err) {
        console.error("Error loading orders:", err);
        if (err.response && err.response.status === 404) {
          setError("No orders found for this user.");
        } else {
          setError(err.message || "Failed to load orders. Please try again later.");
        }
      } finally {
        setOrderLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="orders-section">
      <h3 className="orders-heading">Your Orders</h3>
      {orderLoading ? (
        <p className="orders-loading-text">Loading orders...</p>
      ) : error ? (
        <p className="orders-error-message">{error}</p>
      ) : orders.length === 0 ? (
        <p className="orders-empty-message">No orders available at the moment.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => (
            <li key={order._id} className="order-item">
              <p className="order-detail">
                <strong>Order ID:</strong> {order._id || "N/A"}
              </p>
              <p className="order-detail">
                <strong>Status:</strong> {order.orderStatus || "Unknown"}
              </p>
              <p className="order-detail">
                <strong>Date:</strong>{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="order-detail">
                <strong>Total Amount:</strong> $
                {order.totalAmount?.toFixed(2) || "0.00"}
              </p>
              <p style={{ textAlign: "center", fontSize: "25px" }}>
                <strong>Items</strong>
              </p>
              <ul className="order-items">
                {order.items.map((item, idx) => (
                  <li key={idx} className="order-item-detail">
                    <p className="order-product">
                      Product: {item.productId?.name || "Unknown"}
                    </p>
                    <p className="order-product">
                      Quantity: {item.quantity || 0}
                    </p>
                    <p className="order-product">
                      Price: ${item.price?.toFixed(2) || "0.00"}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default Orders;
