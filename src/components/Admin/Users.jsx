import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, promoteUser } from '../../api/admin/apiAdmin'; // Adjust the import path if needed
import '../../styles/admin/Users.css'; // Import the CSS file

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from API
    getUsers()
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        setError('Failed to load users');
      });
  }, []);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => setUsers(users.filter((user) => user._id !== id)))
      .catch((err) => {
        console.error(err);
        setError('Failed to delete user');
      });
  };

  const handlePromote = (id) => {
    const newRole = 'admin'; // Set the new role for promotion
    promoteUser(id, newRole)
      .then((updatedUser) => {
        setUsers(users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        ));
        console.log('User promoted', updatedUser);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to promote user');
      });
  };

  return (
    <div className="users-container">
      <h2 className="users-title">Manage Users</h2>
      {error && <p className="error-message">{error}</p>}
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="promote-button" onClick={() => handlePromote(user._id)}>
                  Promote
                </button>
                <button className="delete-button" onClick={() => handleDelete(user._id)}>
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

export default Users;
