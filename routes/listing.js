const express = require("express");
const router = express.Router(); // Call Router to create an instance
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const lisitngController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

//index and create route
router
.route("/")
.get( wrapAsync(lisitngController.index))
.post(
    isLoggedIn,
    // validateListing,
    upload.single('listing[image]'),
     wrapAsync(lisitngController.createListing));



// New route
router.get("/new",isLoggedIn,lisitngController.renderNewForm );

//show route , update route and delete route
router
.route("/:id")
.get(wrapAsync(lisitngController.showListing))
.put(isLoggedIn,
isOwner,
upload.single("listing[image]"),
 validateListing, wrapAsync(
    lisitngController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(
        lisitngController.destroyListing));

// Edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(
    lisitngController.renderEditForm));

module.exports = router;