import React, { useState, useEffect } from "react";
import AddUniversity from "./AddUniversity";
import ManageUniversities from "./ManageUniversities";
import AddProgram from "./AddProgram";
import ManagePrograms from "./ManagePrograms";
import Admin from "./Admin";
import Form from "./Form";
import FieldOfStudy from "./FieldOfStudy";
import Location from "./Location";

function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || ""); // Retrieve role from localStorage
  const [screen, setScreen] = useState(1); // Track student screens
  const [adminScreen, setAdminScreen] = useState(""); // Track admin screens

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole); // Save role to localStorage
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole("");
    setAdminScreen(""); // Reset admin screen on logout
  };

  const goToNext = () => setScreen(screen + 1);

  useEffect(() => {
    if (!role) {
      setScreen(1); // Reset to first student screen if no role
      setAdminScreen(""); // Reset admin screen if no role
    }
  }, [role]);

  const renderLogoutButton = () => (
    <button
      className="logout-button"
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );

  if (!role) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to IB Matching App</h1>
        <p>Select your role:</p>
        <button onClick={() => handleRoleSelect("student")}>Student</button>
        <button onClick={() => handleRoleSelect("admin")}>University Admin</button>
      </div>
    );
  }

  if (role === "student") {
    return (
      <>
        {renderLogoutButton()}
        {screen === 1 && <FieldOfStudy goToNext={goToNext} />}
        {screen === 2 && <Location goToNext={goToNext} />}
        {screen === 3 && <Form />}
      </>
    );
  }

  if (role === "admin") {
    if (!adminScreen) {
      return (
        <>
          {renderLogoutButton()}
          <Admin setAdminScreen={setAdminScreen} />
        </>
      );
    }

    const renderAdminScreen = () => {
      switch (adminScreen) {
        case "addUniversity":
          return <AddUniversity />;
        case "manageUniversities":
          return <ManageUniversities />;
        case "addProgram":
          return <AddProgram />;
        case "managePrograms":
          return <ManagePrograms />;
        default:
          return <Admin setAdminScreen={setAdminScreen} />;
      }
    };

    return (
      <>
        {renderLogoutButton()}
        {renderAdminScreen()}
        <button
          onClick={() => setAdminScreen("")}
          style={{ marginTop: "20px" }}
        >
          Back to Dashboard
        </button>
      </>
    );
  }

  return null;
}

export default App;
