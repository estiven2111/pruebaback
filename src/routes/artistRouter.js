const {Router} = require("express");

const {  getArtistHandler } = require("../Handlers/artistHandler/getAllArtistHandlers");
const {getArtistById} = require("../Handlers/artistHandler/getArtistById")
const {delArtistHandler} = require("../Handlers/artistHandler/delArtistHandler");
const {postArtistHandler} = require("../Handlers/artistHandler/postArtistHandler")
const { updateArtistHandler } = require("../Handlers/artistHandler/updateArtistHandler");
const {delLogArtistHandler} = require("../Handlers/artistHandler/delLogArtistHandler");
const {restoreArtistHandler} = require("../Handlers/artistHandler/restoreArtistHandler");
const {forgotPasswordHandler} = require("../Handlers/artistHandler/forgotPasswordHandler");
const {getArtistByCat} = require("../Handlers/searchHandler/getArtistByCat")
const {getAllCategories} = require("../Handlers/searchHandler/getAllCategories")
const authLogin = require("../Handlers/artistHandler/authLogin");
const authArtist = require("../Handlers/artistHandler/authArtist")
const verifyAuth = require("../middlewares/verifyAuth");
const fileupload = require("express-fileupload")
const passport = require("../middlewares/authGoogle")
const artistRouter = Router();


artistRouter.get("/", getArtistHandler);
artistRouter.get("/:id", getArtistById);
artistRouter.delete("/:id", delArtistHandler);
artistRouter.put("/update/:id", fileupload({useTempFiles: true,tempFileDir: "./uploads"}) ,updateArtistHandler);
artistRouter.put("/delete/:id", delLogArtistHandler);
artistRouter.put("/restore/:id", restoreArtistHandler);
artistRouter.post("/",fileupload({useTempFiles: true,tempFileDir: "./uploads"}), postArtistHandler);
artistRouter.post("/login", authLogin);
artistRouter.get("/login/me", verifyAuth, authArtist)
artistRouter.put("/forgotPassword", forgotPasswordHandler)


artistRouter.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
          "profile", 
          "email"
      ]
  }),
(req, res, next) => {
  // Esta función se ejecutará solo si la autenticación falla
  res.status(401).json({ error: "Autenticación fallida" });
}
);

artistRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "no se pudo iniciar sesion con google",
    failureRedirect: "/auth/google",
    // session: false,
    }),
    (req, res) => {
  
      try{
    //   const userString = JSON.stringify(req.user);
    
      
      res.send(req.user
        // ` 
        // <!DOCTYPE html>
        // <html lang="en">
  
        // <body>
            
  
        // </body>
        // <script> window.opener.postMessage(${userString}, 'http://localhost:3001') </script>
        // </html>
        // `
      )}catch (error) {
        res.status(400).json({error: error.message})
      }
    }
  );





module.exports = artistRouter;