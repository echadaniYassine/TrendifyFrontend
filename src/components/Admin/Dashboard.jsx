import React, { useState, useEffect } from 'react';
import { getAdminStats } from '../../api/admin/apiAdmin'; // Adjust the import path as needed
import '../../styles/admin/Dashboard.css'; // Import the CSS file

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load stats on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await getAdminStats();
        setStats(statsData);
      } catch (err) {
        setError('Failed to load stats.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {loading ? (
        <p className="loading-text">Loading stats...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="dashboard-stats">
          <div className="stat-item">
            <strong>Total Products:</strong> {stats.totalProducts}
          </div>
          <div className="stat-item">
            <strong>Total Users:</strong> {stats.totalUsers}
          </div>
          <div className="stat-item">
            <strong>Total Orders:</strong> {stats.totalOrders}
          </div>
          <div className="stat-item">
            <strong>Revenue:</strong> ${stats.revenue.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
