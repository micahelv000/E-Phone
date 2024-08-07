const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");
const transactionsRouters = require("./routes/TransactionRoutes");
const videoRoutes = require('./routes/videoRoutes');

const app = express();
const port = 5000;

connectDB();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", itemRoutes);
app.use("/", transactionsRouters);
app.use("/", videoRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});