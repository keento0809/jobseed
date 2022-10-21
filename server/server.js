const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 8080;
dotenv.config();

app.listen(() => {
  console.log(`[server] server is listening on port ${port}`);
});
