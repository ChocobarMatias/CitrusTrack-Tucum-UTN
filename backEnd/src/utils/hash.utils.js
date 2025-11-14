const bcrypt = require('bcrypt');

// Funcion para hashear contraseñas (encriptarlas de forma segura)
const hashPassword = async (password) => {
  const saltRounds = 10;// Numero de rondas de salting
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Funcion para comparar contraseñas (verificar si coinciden)
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };