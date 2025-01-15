import React, { useState } from "react";

const AddUniversity = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("logo", formData.logo);

    try {
      const response = await fetch("http://localhost:5008/api/universities", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("University added successfully!");
        setFormData({ name: "", location: "", logo: null });
      } else {
        alert("Failed to add university.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the university.");
    }
  };

  return (
    <div className="form-container">
      <h1>Add University</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">University Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter university name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a Location --</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Australia">Australia</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="logo">University Logo</label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUniversity;
