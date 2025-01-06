import React, { useState, useEffect } from "react";
import { getUserOrders } from "../../api/admin/OrdersManage"; // Adjust import according to your file structure
import Cookies from 'js-cookie'; // Import js-cookie
import "../../styles/components/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      const token = Cookies.get('token'); // Retrieve token from cookies
      console.log("Token:", token); // Log the token for debugging

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
    <div className="section-content">
      <h3 className="orders-title">Your Orders</h3>
      {orderLoading ? (
        <p className="orders-loading">Loading orders...</p>
      ) : error ? (
        <p className="orders-error">{error}</p>
      ) : orders.length === 0 ? (
        <p className="orders-empty">No orders available at the moment.</p>
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
              <p className="order-detail">
                <strong>Items:</strong>
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
