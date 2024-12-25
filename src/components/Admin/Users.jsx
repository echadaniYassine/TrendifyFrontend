import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, promoteUser } from '../../api/admin/apiAdmin'; // Adjust the import path if needed

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // For error handling

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
    // Implement the promotion logic (e.g., change the role of the user)
    const newRole = 'admin'; // Set the new role for promotion, e.g., 'admin'
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
    <div>
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <table>
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
                <button onClick={() => handlePromote(user._id)}>Promote</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
