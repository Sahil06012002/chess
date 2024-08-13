"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
const router = express_1.default.Router();
router.get('/login/federated/google', passport.authenticate('google'));
exports.default = router;
