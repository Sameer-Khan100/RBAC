const crypto = require('crypto');

function generateJWTSecretKey() {
  return crypto.randomBytes(64).toString('hex');
}

const secretKey = generateJWTSecretKey();
console.log('Your JWT Secret Key:', secretKey);
