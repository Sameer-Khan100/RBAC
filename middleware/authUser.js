const jwt = require("jsonwebtoken");
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
require('dotenv').config();


const authenticateToken =  async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

  if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }

  try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if the user exists
      const user = await User.findByPk(decoded.userId);

      if (!user) {
          return res.status(401).json({ message: 'Unauthorized' });
      }


      req.user = user;
      console.log("userrr",req.user)
      

      next();
  } catch (error) {
      console.error('Error authenticating token:', error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
};

const authenticateRole = (role)=> 
  async (req, res, next) => {
  try {

      if(req.user.role === role)
        {
          next();

        }
        else{
          res.status(StatusCodes.FORBIDDEN).json({message: 'You dont have permission to perform this action'})
        }

  } catch (error) {
      console.error('Role is not supported:', error);
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Please provide all required fields' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });

    // If user not found or password doesn't match, return 400 (invalid email/password)
    if (!user) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return 200 (sign in successful) with token and user id
    res.status(StatusCodes.OK).json({ token, userId: user.id });
  } catch (error) {
    console.error('Error in signIn:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
};


module.exports = {
  signIn,
  authenticateToken,
  authenticateRole
};
