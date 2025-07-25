const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const app = require("./app");
const mongoose = require("mongoose");

const DB = process.env.DB_URL;
const PASSWORD = process.env.DB_PASSWOPRD;
const DB_URL = DB.replace("<password>", PASSWORD);

mongoose
  .connect(DB_URL)
  .then(() => console.log(`db connected`))
  .catch((err) => console.log(`💥 DB ${err}`));

app.listen(5050, () => {
  console.log(`server started at 5050`);
});
