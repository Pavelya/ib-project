const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const gradesRoutes = require("./routes/grades");
const universitiesRoutes = require("./routes/universities");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/grades", gradesRoutes);
app.use("/api/universities", universitiesRoutes);

// Start the server
const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
