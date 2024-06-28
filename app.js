const express = require('express')
const sequelize = require('./config/db')
const Product = require('./models/product')
const Categories = require('./models/category')
const User = require('./models/user')
const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')
const categoryRoute = require('./routes/categoryRoutes')
require('dotenv').config();


const app = express()

app.use(express.json())

app.use('/user', userRoute)
app.use('/product', productRoute)
app.use('/category', categoryRoute)


const PORT = process.env.PORT || 3000;


(async () => {
    try {
      await sequelize.authenticate();
      console.log('DB Connection has been established successfully.');
  
      // // Synchronize models
      // await sequelize.sync({ force: true }); // Use force: true to drop and recreate tables
      // console.log('All models were synchronized successfully.');
  
      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
  