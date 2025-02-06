// const bcrypt = require('bcryptjs');
// const db = require('../config/database');

// const createUser = async (user) => {
//   const { name, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url } = user;
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);
//   const query = `
//     INSERT INTO users (name, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
//     RETURNING *
//   `;
//   const values = [name, email, hashedPassword, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url];
//   const { rows } = await db.pool.query(query, values);
//   console.log("Inserted user:", rows[0]);
//   return rows[0];
// };

// const updateUser = async (id, user) => {
//   const { name, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url } = user;
//   let hashedPassword;
//   if (password) {
//     const salt = await bcrypt.genSalt(10);
//     hashedPassword = await bcrypt.hash(password, salt);
//   } else {
//     const currentUser = await getUserById(id);
//     hashedPassword = currentUser.password;
//   }
//   const query = `
//     UPDATE users
//     SET name = $1, email = $2, password = $3, phone_number = $4, user_type = $5, membership_id = $6, usergroup_id = $7, referrer_id = $8, city = $9, county = $10, state = $11, country = $12, pin_code = $13, remark = $14, profile_picture_url = $15, updated_at = CURRENT_TIMESTAMP
//     WHERE user_id = $16
//     RETURNING *
//   `;
//   const values = [name, email, hashedPassword, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// const getAllUsers = async () => {
//   // const query = 'SELECT user_id, user_code, name, email, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, created_at, updated_at FROM users';
//   const query = 'SELECT * FROM users';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// const getUserById = async (id) => {
//   // const query = 'SELECT user_id, user_code, name, email, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, created_at, updated_at FROM users WHERE user_id = $1';
//   const query = 'SELECT * FROM users WHERE user_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// const getUserByEmail = async (email) => {
//   const query = 'SELECT * FROM users WHERE email = $1';
//   const { rows } = await db.pool.query(query, [email]);
//   return rows[0];
// };

// const deleteUser = async (id) => {
//   const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createUser,
//   getUserByEmail,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// };


//models/userModel.js
const bcrypt = require('bcryptjs');
const db = require('../config/database');

const createUser = async (user) => {
  const {  name, date_of_birth, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark,profile_picture_url } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const query = `
    INSERT INTO users ( name, date_of_birth, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark,profile_picture_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *
  `;
  const values = [ name, date_of_birth, email, hashedPassword, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

const getAllUsers = async () => {
  // const query = 'SELECT user_id, user_code, name, date_of_birth, email, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url, created_at, updated_at FROM users';
  const query = 'SELECT * FROM users';
  const { rows } = await db.pool.query(query);
  return rows;
};

const getUserById = async (id) => {
  // const query = 'SELECT user_id, user_code, name, date_of_birth, email, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url, created_at, updated_at FROM users WHERE user_id = $1';
  const query = 'SELECT * FROM users WHERE user_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await db.pool.query(query, [email]);
  return rows[0];
};

const updateUser = async (id, user) => {
  const {  name, date_of_birth, email, password, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url } = user;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
    let hashedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  } else {
    // If no new password is provided, fetch the existing password from the database
    const currentUser = await getUserById(id);
    hashedPassword = currentUser.password;
  }
  const query = `
    UPDATE users
    SET  name = $1, date_of_birth = $2, email = $3, password = $4, phone_number = $5, user_type = $6, membership_id = $7, usergroup_id = $8, referrer_id = $9, city = $10, county = $11, state = $12, country = $13, pin_code = $14, remark = $15, profile_picture_url = $16, updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $17
    RETURNING *
  `;
  const values = [ name, date_of_birth, email, hashedPassword, phone_number, user_type, membership_id, usergroup_id, referrer_id, city, county, state, country, pin_code, remark, profile_picture_url, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE user_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

// **********************************************************************************************

// **********************************************************************************************
