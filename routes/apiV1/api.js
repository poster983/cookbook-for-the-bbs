var express = require('express')
var router = express.Router()


router.use("/recipes", require("./recipes.js"))

router.use("/collections", require("./collections.js"))



module.exports = router