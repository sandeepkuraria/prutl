// models/familyMember.js
const db = require('../config/database');

// Create a new family member
const createFamilyMember = async ({ family_id, user_id, relationship, remark }) => {
    const query = `
        INSERT INTO family_members (family_id, user_id, relationship, remark)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;
    const values = [family_id, user_id, relationship, remark];

    try {
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Get all family members
const getAllFamilyMembers = async () => {
    const query = 'SELECT * FROM family_members';

    try {
        const { rows } = await db.pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Get a family member by ID
const getFamilyMemberById = async (id) => {
    const query = 'SELECT * FROM family_members WHERE family_member_id = $1';
    const values = [id];

    try {
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Update a family member
const updateFamilyMember = async (id, { family_id, user_id, relationship, remark }) => {
    const query = `
        UPDATE family_members
        SET family_id = $1, user_id = $2, relationship = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
        WHERE family_member_id = $5
        RETURNING *
    `;
    const values = [family_id, user_id, relationship, remark, id];

    try {
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

// Delete a family member
const deleteFamilyMember = async (id) => {
    const query = 'DELETE FROM family_members WHERE family_member_id = $1 RETURNING *';
    const values = [id];

    try {
        const { rows } = await db.pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createFamilyMember,
    getAllFamilyMembers,
    getFamilyMemberById,
    updateFamilyMember,
    deleteFamilyMember,
};
