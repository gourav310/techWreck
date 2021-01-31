"use strict";

exports.session = session = require("express-session");
exports.SALT = 1;
exports.bcrypt = bcrypt = require('bcrypt');

var isNUllorUndefined = function isNUllorUndefined(val) {
  return val === null || val === undefined;
};

exports.cors = cors = require('cors');

exports.CorsMiddlware = CorsMiddlware = function CorsMiddlware() {
  return cors({
    credentials: true,
    origin: "http://localhost:3000"
  });
};

exports.AuthMiddleware = AuthMiddleware = function AuthMiddleware(req, res, next) {
  return regeneratorRuntime.async(function AuthMiddleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("auth is here ");

          if (isNUllorUndefined(req.session) || isNUllorUndefined(req.session.userId)) {
            res.status(401).send({
              'error': "Not logged in"
            });
          } else {
            next();
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
};

var express = require('express');

var app = express();
var session_secret = "techislove";

exports.SessionMiddlware = SessionMiddlware = function SessionMiddlware() {
  return session({
    secret: session_secret,
    resave: false,
    cookie: {
      maxAge: 1 * 60 * 60 * 24 * 30
    }
  });
};