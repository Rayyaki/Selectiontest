const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const cors = require("cors");
app.use(cors());
app.use(express.json());
const router = require("./routes");
const db = require("./models");
const { route } = require("./routes/users");
// db.sequelize.sync({ alter: true });

app.use("/users", router.userRouter);
app.use("/post", router.postRouter);
app.use("/avatar", express.static(`${__dirname}/public/Avatar`));
app.use("/posting", express.static(`${__dirname}/public/Imagepo`));
app.listen(PORT, () => {
  console.log(`This server running on PORT ${PORT}`);
});
