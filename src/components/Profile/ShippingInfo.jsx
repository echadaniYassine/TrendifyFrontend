import React, { useState, useEffect } from "react";
import "../../styles/profile/shipping.css";
import axios from "axios";
import Cookies from "js-cookie";

const ShippingInfo = ({ userInfo, updateShippingAddresses }) => {
  const [newAddress, setNewAddress] = useState({
    addressLine1: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedAddress, setEditedAddress] = useState({
    addressLine1: "",
    city: "",
    country: "",
    postalCode: ""
  });
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const token = Cookies.get("token");

  // Fetch the shipping addresses when the component mounts
  useEffect(() => {
    const fetchShippingAddresses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4002/api/Trendify/Trendify_shipping-addresses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShippingAddresses(response.data.shippingAddresses); // Update state with fetched addresses
      } catch (error) {
        console.error("Error fetching shipping addresses:", error);
      }
    };

    fetchShippingAddresses();
  }, [token]);

  const handleAddAddress = async () => {
    if (
      !newAddress.addressLine1 ||
      !newAddress.city ||
      !newAddress.country ||
      !newAddress.postalCode
    ) {
      alert("All address fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4002/api/Trendify/Trendify_add-shipping-address",
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingAddresses(response.data.shippingAddresses); // Update state with new addresses
      updateShippingAddresses(response.data.shippingAddresses); // Update parent component
      setNewAddress({ addressLine1: "", city: "", country: "", postalCode: "" }); // Clear the input after successful addition
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Error adding address.");
    }
  };

  const handleEditAddress = async (index) => {
    if (
      !editedAddress.addressLine1 ||
      !editedAddress.city ||
      !editedAddress.country ||
      !editedAddress.postalCode
    ) {
      alert("All address fields are required.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:4002/api/Trendify/Trendify_update-shipping-addresses",
        { index, updatedAddress: editedAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingAddresses(response.data.shippingAddresses); // Update state with updated addresses
      updateShippingAddresses(response.data.shippingAddresses); // Update parent component
      setEditingIndex(null); // Close the edit mode
      setEditedAddress({ addressLine1: "", city: "", country: "", postalCode: "" }); // Clear the input after successful update
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Error updating address.");
    }
  };

  const handleDeleteAddress = async (address) => {
    console.log("Attempting to delete address:", address); // Log the address to be deleted
  
    try {
      const response = await axios.delete(
        `http://localhost:4002/api/Trendify/Trendify_delete-shipping-address/${encodeURIComponent(address)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Check if the response contains the expected data
      if (response.data && response.data.shippingAddresses) {
        setShippingAddresses(response.data.shippingAddresses); // Update state with remaining addresses
        updateShippingAddresses(response.data.shippingAddresses); // Update parent component
      } else {
        console.error("Unexpected response structure:", response.data);
        alert("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error deleting address:", error.response ? error.response.data : error.message);
      alert("Error deleting address: " + (error.response ? error.response.data.message : error.message));
    }
  };
  

  return (
    <div className="shipping-info-section">
      <h3 className="shipping-info-heading">Shipping Information</h3>
      <p>View and update your shipping addresses here.</p>
  
      <ul className="shipping-address-list">
        {shippingAddresses.length > 0 ? (
          shippingAddresses.map((address, index) => (
            <li key={index} className="shipping-address-item">
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedAddress.addressLine1}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, addressLine1: e.target.value })
                    }
                    className="edit-address-input"
                  />
                  <input
                    type="text"
                    value={editedAddress.city}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, city: e.target.value })
                    }
                    className="edit-address-input"
                  />
                  <input
                    type="text"
                    value={editedAddress.country}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, country: e.target.value })
                    }
                    className="edit-address-input"
                  />
                  <input
                    type="text"
                    value={editedAddress.postalCode}
                    onChange={(e) =>
                      setEditedAddress({ ...editedAddress, postalCode: e.target.value })
                    }
                    className="edit-address-input"
                  />
                  <button onClick={() => handleEditAddress(index)} className="save-address-button">
                    Save
                  </button>
                  <button onClick={() => setEditingIndex(null)} className="cancel-edit-button">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{`${address.addressLine1}, ${address.city}, ${address.country}, ${address.postalCode}`}</p>
                  <div className="shipping-action-buttons">
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setEditedAddress(address);
                      }}
                      className="edit-address-button"
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteAddress(address.addressLine1)} className="delete-address-button">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No shipping addresses available. Add one now!</p>
        )}
      </ul>
  
      <div className="add-new-address-section">
        <input
          type="text"
          placeholder="Enter new shipping address Line 1"
          value={newAddress.addressLine1}
          onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
          className="new-address-input-field"
        />
        <input
          type="text"
          placeholder="Enter city"
          value={newAddress.city}
          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          className="new-address-input-field"
        />
        <input
          type="text"
          placeholder="Enter country"
          value={newAddress.country}
          onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
          className="new-address-input-field"
        />
        <input
          type="text"
          placeholder="Enter postal code"
          value={newAddress.postalCode}
          onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
          className="new-address-input-field"
        />
        <button onClick={handleAddAddress} className="add-new-address-button">
          Add Address
        </button>
      </div>
    </div>
  );
  
};

export default ShippingInfo;
