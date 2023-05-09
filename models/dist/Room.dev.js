"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RoomSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  booked: [{
    from: {
      type: Date,
      "default": Date.now()
    },
    to: {
      type: Date,
      "default": Date.now()
    }
  }]
}, {
  timestamps: true
});

var _default = _mongoose["default"].model("Room", RoomSchema);

exports["default"] = _default;