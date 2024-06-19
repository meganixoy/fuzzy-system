const express = require("express");
const routes = require("./routes");

const app = express();
const PORT = 8080;

// Parse JSON payloads
app.use(express.json());

// Routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
