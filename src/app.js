const express = require("express");
const morgan = require("morgan");
const fileupload = require("express-fileupload")
const cors = require("cors")
const mainRouter = require("./routes/index");
const passport = require("passport");
const session = require('express-session');



const app = express();

app.use(morgan("dev"));
app.use(cors())
app.use(express.json());
//? inicializar el modulo passport
app.use(passport.initialize());
app.use(session({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: false
  }));
  // server.use((req, res, next) => {
  //   //http://localhost:3000 https://pi-web-git-main-estiven2111.vercel.app/   https://pi-lqaa7gh3w-estiven2111.vercel.app  https://pi-dovldixrv-estiven2111.vercel.app/
  //   res.header('Access-Control-Allow-Origin', 'https://urbanclub.club'); // (*)update to match the domain you will make the request from
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  //   next();
  // });

// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: "./uploads" // crea una carpeta temporal ponemos la que queramos crear
// }))
app.use(mainRouter);

module.exports = app;