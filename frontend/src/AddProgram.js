import React from "react";

const AddProgram = () => {
  return (
    <div className="form-container">
      <h1>Add a New Program</h1>
      <form>
        <label>Program Name:</label>
        <input type="text" placeholder="Enter program name" />
        <label>University:</label>
        <select>
          <option value="">Select a University</option>
          <option value="1">University 1</option>
          <option value="2">University 2</option>
        </select>
        <label>Field of Study:</label>
        <input type="text" placeholder="Enter field of study" />
        <button type="submit">Add Program</button>
      </form>
    </div>
  );
};

export default AddProgram;
