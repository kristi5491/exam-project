import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
// export const updateRoomAvailability = async (req, res, next) => {
//   try {
//     await Room.updateOne(
//       { "roomNumbers._id": req.params.id },
//       {
//         $push: {
//           "roomNumbers.$.unavailableDates": req.body.dates
//         },
//       }
//     );
//     res.status(200).json("Room status has been updated.");
//   } catch (err) {
//     next(err);
//   }
// };
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};

export const bookRoom = async (req, res, next) => {
  const dbQuery = {};
  const { from, to } = req.body;

  const roomId = req.params.id;

  try {
    const room = await Room.findById(roomId);

    if (room) {
      dbQuery.roomId = roomId;
    } else {
      return res.status(404).json('Room havent been found')
    }

    const {booked } = room;
    /**
     * booked: [
     *   { from: '2023-05-01', to: '2023-05-10' },
     *   { from: '2023-05-20', to: '2023-05-21' },
     *   { from: '2023-05-12', to: '2023-05-14' },
     * ]
     */
    // from => '2023-05-25'
    // to => '2023-06-01'
    // if (from) {
    //   dbQuery['booked.to'] = { $gte: from }
    // }

    // if (to) {
    //   dbQuery['booked.from'] = { $lte: to }
    // }
  // 
  const docs = await Room.findOneAndUpdate(dbQuery, {
      $push: { booked: {
        from: from, to: to
      } }
    });

    if (docs) {
      return res.status(200).send(docs)
    } else {
      return res.status(400).json('Room unavailable')
    }

  } catch (err) {
    next(err);
  }
}