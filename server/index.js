//Import packages
const express = require("express");
const session = require("express-session");
const mongodbSession = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const cors = require("cors");

//Import file from other folders
const connectDatabase = require("./config/connectDatabase");
const authURLs = require("./routes/auth");
const privateURLs = require("./routes/private");
const userURLs = require("./routes/user");
const bookURLs = require("./routes/book");

//Variable Declaration
const app = express();
const PORT = process.env.PORT || 4000;

//Use dotenv package wit the path
dotenv.config({ path: "./config.env" });

//Connect to the database
connectDatabase();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true, // enable set cookie
  })
);

const store = new mongodbSession({
  uri: process.env.DATABASE_ACCESS,
  collection: "mySessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 100,
    },
  })
);

app.use("/api/auth", authURLs);
app.use("/private", privateURLs);
app.use("/user", userURLs);
app.use("/book", bookURLs);

const server = app.listen(PORT, () => {
  console.log(`Server is running: ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error ${err}`);
  server.close(() => process.exit(1));
});
