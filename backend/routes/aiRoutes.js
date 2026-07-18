const express = require("express");
const router = express.Router();

const aiController = require("../controllers/aiController");

router.get("/test", aiController.testConnection);


module.exports = router;