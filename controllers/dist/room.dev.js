"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookRoom = exports.getRooms = exports.getRoom = exports.deleteRoom = exports.updateRoom = exports.createRoom = void 0;

var _Room = _interopRequireDefault(require("../models/Room.js"));

var _Hotel = _interopRequireDefault(require("../models/Hotel.js"));

var _error = require("../utils/error.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createRoom = function createRoom(req, res, next) {
  var hotelId, newRoom, savedRoom;
  return regeneratorRuntime.async(function createRoom$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hotelId = req.params.hotelid;
          newRoom = new _Room["default"](req.body);
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(newRoom.save());

        case 5:
          savedRoom = _context.sent;
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(_Hotel["default"].findByIdAndUpdate(hotelId, {
            $push: {
              rooms: savedRoom._id
            }
          }));

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](6);
          next(_context.t0);

        case 14:
          res.status(200).json(savedRoom);
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t1 = _context["catch"](2);
          next(_context.t1);

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 17], [6, 11]]);
};

exports.createRoom = createRoom;

var updateRoom = function updateRoom(req, res, next) {
  var updatedRoom;
  return regeneratorRuntime.async(function updateRoom$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_Room["default"].findByIdAndUpdate(req.params.id, {
            $set: req.body
          }, {
            "new": true
          }));

        case 3:
          updatedRoom = _context2.sent;
          res.status(200).json(updatedRoom);
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // export const updateRoomAvailability = async (req, res, next) => {
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


exports.updateRoom = updateRoom;

var deleteRoom = function deleteRoom(req, res, next) {
  var hotelId;
  return regeneratorRuntime.async(function deleteRoom$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          hotelId = req.params.hotelid;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(_Room["default"].findByIdAndDelete(req.params.id));

        case 4:
          _context3.prev = 4;
          _context3.next = 7;
          return regeneratorRuntime.awrap(_Hotel["default"].findByIdAndUpdate(hotelId, {
            $pull: {
              rooms: req.params.id
            }
          }));

        case 7:
          _context3.next = 12;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](4);
          next(_context3.t0);

        case 12:
          res.status(200).json("Room has been deleted.");
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t1 = _context3["catch"](1);
          next(_context3.t1);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15], [4, 9]]);
};

exports.deleteRoom = deleteRoom;

var getRoom = function getRoom(req, res, next) {
  var room;
  return regeneratorRuntime.async(function getRoom$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_Room["default"].findById(req.params.id));

        case 3:
          room = _context4.sent;
          res.status(200).json(room);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getRoom = getRoom;

var getRooms = function getRooms(req, res, next) {
  var rooms;
  return regeneratorRuntime.async(function getRooms$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_Room["default"].find());

        case 3:
          rooms = _context5.sent;
          res.status(200).json(rooms);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          next(_context5.t0);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getRooms = getRooms;

var bookRoom = function bookRoom(req, res, next) {
  var dbQuery, _req$body, from, to, roomId, room, booked, docs;

  return regeneratorRuntime.async(function bookRoom$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          dbQuery = {};
          _req$body = req.body, from = _req$body.from, to = _req$body.to;
          roomId = req.params.id;
          _context6.prev = 3;
          _context6.next = 6;
          return regeneratorRuntime.awrap(_Room["default"].findById(roomId));

        case 6:
          room = _context6.sent;

          if (!room) {
            _context6.next = 11;
            break;
          }

          dbQuery.roomId = roomId;
          _context6.next = 12;
          break;

        case 11:
          return _context6.abrupt("return", res.status(404).json('Room havent been found'));

        case 12:
          booked = room.booked;
          booked.forEach(function (book) {
            var from = book.from,
                to = book.to;
            var bookedFrom = from;
            var bookedTo = to;

            if (bookedFrom <= from <= bookedTo) {
              return res.status(404).json('Room unavailable');
            }

            if (bookedFrom <= to <= bookedTo) {
              return res.status(404).json('Room unavailable');
            }
          });
          _context6.next = 16;
          return regeneratorRuntime.awrap(_Room["default"].updateOne({
            _id: roomId
          }, {
            $push: {
              booked: {
                from: from,
                to: to
              }
            }
          }));

        case 16:
          docs = _context6.sent;

          if (!docs) {
            _context6.next = 21;
            break;
          }

          return _context6.abrupt("return", res.status(200).send(docs));

        case 21:
          return _context6.abrupt("return", res.status(400).json('Room unavailable'));

        case 22:
          _context6.next = 27;
          break;

        case 24:
          _context6.prev = 24;
          _context6.t0 = _context6["catch"](3);
          next(_context6.t0);

        case 27:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 24]]);
};

exports.bookRoom = bookRoom;