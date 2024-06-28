const { faker } = require('@faker-js/faker');
const sequelize = require('./config/db'); // Adjust the path as needed
const User = require('./models/user'); // Adjust the path as needed

const createFakeUser = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(['super admin', 'admin'])
  };
};

const populateUsers = async (numUsers) => {
  await sequelize.sync({ force: true }); // This will drop the table and re-create it
  const users = [];
  
  for (let i = 0; i < numUsers; i++) {
    users.push(createFakeUser());
  }

  try {
    await User.bulkCreate(users);
    console.log(`${numUsers} users have been created`);
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    await sequelize.close();
  }
};

// Specify the number of users you want to create
populateUsers(10);
