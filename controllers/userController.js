const User = require("../models/user")
// import {
// 	ReasonPhrases,
// 	StatusCodes,
// 	getReasonPhrase,
// 	getStatusCode,
// } from 'http-status-codes';
const {StatusCodes} = require('http-status-codes')


const createUser = async (req, res) => {
    console.log("hello");
    console.log(req.body);
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Email is already in use' });
      }
      const user = await User.create({ name, email, password, role });
      res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };





  module.exports = {
    createUser
  }