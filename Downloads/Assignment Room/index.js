const express = require("express");
const db = require("./config/mongoose");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const admin = require("./models/admin");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
const expressLayout = require("express-ejs-layouts");

const port = 8000;

const app = express();

app.use(express.urlencoded());

//use static files
app.use(express.static("./assets"));

//setup view engine
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout", "layoutA", "layoutB");
app.use(expressLayout);

app.use(
  session({
    name: "AssignmentRoom",
    secret: "ppajatakrv",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect mongodb setup ok");
      }
    ),
  })
);

//authenticate
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//use flash for error handling
app.use(flash());
app.use(customMiddleware.setFlash)

//use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the Server");
    return;
  }
  console.log(`Server is running on port : ${port}`);
});
