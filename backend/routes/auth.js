const Router = require("express").Router;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const status = require("http-status");

const db = require("../db");

const router = Router();

const createToken = () => {
  return jwt.sign({}, "secret", { expiresIn: "1h" });
};

router.post("/login", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;

  db.getDb()
    .db()
    .collection("users")
    .findOne({ email })
    .then((userDoc) => {
      return bcrypt.compare(pw, userDoc.password);
    })
    .then((result) => {
      if (!result) {
        throw Error();
      }
      const token = createToken();
      res.status(status.OK).json({
        message: "Authentication succeeded",
        token,
      });
    })
    .catch((err) => {
      res.status(status.UNAUTHORIZED).json({
        message: "Authentication failed, invalid username or password.",
      });
    });
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;

  bcrypt
    .hash(pw, 12)
    .then((hashedPW) => {
      db.getDb()
        .db()
        .collection("users")
        .insertOne({ email, password: hashedPW })
        .then((result) => {
          console.log(result);
          const token = createToken();
          res.status(status.CREATED).json({ token: token, user: { email } });
        })
        .catch((err) => {
          console.log(err);
          res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Creating the user failed." });
        });
      console.log(hashedPW);
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "Creating the user failed." });
    });
});

module.exports = router;
