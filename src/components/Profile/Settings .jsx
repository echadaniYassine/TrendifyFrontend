import React, { useState, useEffect, useCallback } from "react";
import "../../styles/profile/settings.css";
import { getUserInfo, modifyUser } from "../../api/auth/user";
import Cookies from 'js-cookie';

const Settings = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        const { username, email, phoneNumber, notifications } = response.data;
        setUsername(username);
        setEmail(email);
        setPhoneNumber(phoneNumber);
        setNotifications(notifications);
      } catch (error) {
        setStatusMessage("Failed to fetch user information.");
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);


  const handleSaveAccountDetails = useCallback(async () => {
    if (!username || !email || !phoneNumber) {
      setStatusMessage("All fields (username, email, phone) are required.");
      return;
    }
  
    try {
      const response = await modifyUser({ username, email, phoneNumber });
      if (response.status === 200) {
        setStatusMessage("Account details updated successfully.");
        window.alert("Your account details have been successfully updated!"); // Display alert

      } else {
        setStatusMessage("Failed to update account details.");
      }
    } catch (error) {
      setStatusMessage(error.message || "An error occurred while updating account details.");
      console.error("Error:", error.response?.data || error.message);
    }
  }, [username, email, phoneNumber]);
  


  const handleChangePassword = useCallback(async () => {
    if (!currentPassword || !newPassword) {
      setStatusMessage("Please fill in both password fields.");
      return;
    }

    try {
      // Assuming modifyUser  can handle password change
      await modifyUser({ currentPassword, password: newPassword });
      setStatusMessage("Password changed successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      setStatusMessage("Failed to change password.");
      console.error(error);
    }
  }, [currentPassword, newPassword]);

  const handleToggleNotifications = useCallback(async () => {
    const newNotificationStatus = !notifications;
    setNotifications(newNotificationStatus);

    try {
      await modifyUser({ notifications: newNotificationStatus });
      setStatusMessage(
        newNotificationStatus
          ? "Notifications enabled successfully."
          : "Notifications disabled successfully."
      );
    } catch (error) {
      setStatusMessage("Failed to update notification preferences.");
      console.error(error);
    }
  }, [notifications]);

  return (
    <div className="settings-section">
      <h3 className="settings-heading">Settings</h3>
      <p className="settings-section_p" >Update your account preferences.</p>
  
      {/* Account Details Section */}
      <div className="account-details-section">
        <h4 className="account-details-section-h4">Account Details</h4>
        <label className="label">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="settings-input-field"
        />
        <label className="label">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="settings-input-field"
        />
        <label className="label">Phone:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="settings-input-field"
        />
        <button onClick={handleSaveAccountDetails} className="settings-save-button">
          Save Account Details
        </button>
      </div>
  
      {/* Change Password Section */}
      <div className="change-password-section">
        <h4 className="change-password-section-h4">Change Password</h4>
        <label className="label">Current Password:</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="settings-input-field"
        />
        <label className="label">New Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="settings-input-field"
        />
        <button onClick={handleChangePassword} className="settings-save-button">
          Change Password
        </button>
      </div>
  
      {/* Notification Preferences */}
      <div className="notification-preferences-section">
        <h4 className="notification-preferences-section-h4">Notification Preferences</h4>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleToggleNotifications}
          />
          Enable Notifications
        </label>
      </div>
  
      {/* Status Message */}
      <p className="settings-status-message">{statusMessage}</p>
    </div>
  );
  
};

export default Settings;