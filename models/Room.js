import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    booked: [{
      from: { type: Date, default: Date.now},
      to: { type: Date, default: Date.now }
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);