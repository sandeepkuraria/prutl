//models/familyModel.js
const db = require('../config/database');

// Create a new family
const createFamily = async (family) => {
    const {  family_name, address, phone_number, contact_person, city, county, state, country, pin_code, remark } = family;
    const query = `
        INSERT INTO families ( family_name, address, phone_number, contact_person, city, county, state, country, pin_code, remark)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;
    const values = [ family_name, address, phone_number, contact_person, city, county, state, country, pin_code, remark];
    const { rows } = await db.pool.query(query, values);
    return rows[0];
};

// Get all families
const getAllFamilies = async () => {
    const query = 'SELECT * FROM families';
    const { rows } = await db.pool.query(query);
    return rows;
};

// Get a family by ID
const getFamilyById = async (id) => {
    const query = 'SELECT * FROM families WHERE family_id = $1';
    const { rows } = await db.pool.query(query, [id]);
    return rows[0];
};

// Update a family
const updateFamily = async (id, family) => {
    const {  family_name, address, phone_number, contact_person, city, county, state, country, pin_code, remark } = family;
    const query = `
        UPDATE families
        SET  family_name = $1, address = $2, phone_number = $3, contact_person = $4, city = $5, county = $6, state = $7, country = $8, pin_code = $9, remark = $10, updated_at = CURRENT_TIMESTAMP
        WHERE family_id = $11
        RETURNING *
    `;
    const values = [ family_name, address, phone_number, contact_person, city, county, state, country, pin_code, remark, id];
    const { rows } = await db.pool.query(query, values);
    return rows[0];
};

// Delete a family
const deleteFamily = async (id) => {
    const query = 'DELETE FROM families WHERE family_id = $1 RETURNING *';
    const { rows } = await db.pool.query(query, [id]);
    return rows[0];
};

module.exports = {
    createFamily,
    getAllFamilies,
    getFamilyById,
    updateFamily,
    deleteFamily,
};
