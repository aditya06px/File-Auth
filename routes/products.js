const express = require("express");
const router = express.Router();

const { isAuthenticated, isSeller } = require("../middleware/auth");
const upload = require("../utils/fileUpload");

router.post("/create", isAuthenticated, isSeller, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    const { name, price } = req.body;

    if (!name || !price || !req.file) {
      return res.status(500).json({
        err: "we require all3",
      });
    }

    if (Number.isNaN(price)) {
      return res.status(500).json({
        err: "price should be number",
      });
    }

    let productDetails = {
        name,
        price,
        content: req.file.path
    }

    return res.status(200).json({
        status: "ok",
        productDetails
    })
  });

});

module.exports = router;
