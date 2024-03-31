import express from "express";
import { createListing, deleteListing, getListing, getListingss, updateListing} from "../Controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router= express.Router();


router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);
router.get('/get',getListingss);
router.get('/:id',verifyToken,getListing);


export default router;