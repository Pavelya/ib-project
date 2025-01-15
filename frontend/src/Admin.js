import React from "react";

const Admin = ({ setAdminScreen }) => {
  const handleNavigation = (screen) => {
    setAdminScreen(screen);
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-options">
        <button onClick={() => handleNavigation("addUniversity")}>
          Add University
        </button>
        <button onClick={() => handleNavigation("manageUniversities")}>
          Manage Universities
        </button>
        <button onClick={() => handleNavigation("addProgram")}>
          Add Program
        </button>
        <button onClick={() => handleNavigation("managePrograms")}>
          Manage Programs
        </button>
      </div>
    </div>
  );
};

export default Admin;
