const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const gradesRoutes = require("./routes/grades");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/grades", gradesRoutes);

// Start the server
const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
