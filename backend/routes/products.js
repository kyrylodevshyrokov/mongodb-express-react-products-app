const Router = require("express").Router;
const mongodb = require("mongodb");
const status = require("http-status");

const db = require("../db");

const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

const router = Router();

// Get list of products products
router.get("/", (req, res, next) => {
  const products = [];

  db.getDb()
    .db()
    .collection("products")
    .find()
    .sort({ price: -1 })
    .toArray()
    .then((productDocs) => {
      productDocs.forEach((doc) => {
        doc.price = doc.price.toString();
        products.push(doc);
      });
    })
    .then((result) => {
      res.status(status.OK).json(products);
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    });
});

// Get single product
router.get("/:id", (req, res, next) => {
  db.getDb()
    .db()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((productDoc) => {
      productDoc.price = productDoc.price.toString();
      res.status(status.OK).json(productDoc);
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    });
});

// Add new product
// Requires logged in user
router.post("", (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image,
  };

  db.getDb()
    .db()
    .collection("products")
    .insertOne(newProduct)
    .then((result) => {
      console.log(result);
      res
        .status(status.CREATED)
        .json({ message: "Product added", productId: result.insertedId });
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    });
});

// Edit existing product
// Requires logged in user
router.patch("/:id", (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: Decimal128.fromString(req.body.price.toString()),
    image: req.body.image,
  };

  db.getDb()
    .db()
    .collection("products")
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedProduct })
    .then((result) => {
      res
        .status(status.OK)
        .json({ message: "Product updated", productId: req.params.id });
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    });
});

// Delete a product
// Requires logged in user
router.delete("/:id", (req, res, next) => {
  db.getDb()
    .db()
    .collection("products")
    .deleteOne({ _id: new ObjectId(req.params.id) })
    .then((result) => {
      res.status(status.OK).json({ message: "Product deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An error occurred" });
    });
});

module.exports = router;
