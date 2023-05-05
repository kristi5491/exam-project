import express from "express";
import {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    // updateRoomAvailability,
  } from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();


//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
// router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);


/**
 * POST /rooms/:roomId
 * body: { bookedFrom: '2023-04-28T00:00:00Z', bookedTo: '2023-05-08T00:00:00Z' }
 */



export default router;