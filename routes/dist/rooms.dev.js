"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _room = require("../controllers/room.js");

var _verifyToken = require("../utils/verifyToken.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //CREATE


router.post("/:hotelid", _verifyToken.verifyAdmin, _room.createRoom); //UPDATE
// router.put("/availability/:id", updateRoomAvailability);

router.put("/:id", _verifyToken.verifyAdmin, _room.updateRoom); //DELETE

router["delete"]("/:id/:hotelid", _verifyToken.verifyAdmin, _room.deleteRoom); //GET

router.get("/:id", _room.getRoom); //GET ALL

router.get("/", _room.getRooms);
router.put('/rooms/:roomId', _room.bookRoom);
var _default = router;
exports["default"] = _default;