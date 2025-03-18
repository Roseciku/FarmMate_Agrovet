const db = require ('../config/db');
const jwt = require("jsonwebtokens");
const bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
require("dotenv").config();

//register a user
exports.registerUser = async(req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message:"Please correct input errors", errors: errors.array()});
    }
}