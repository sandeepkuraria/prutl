// models/organization.js

const { pool } = require('../config/database');

const createOrganization = async (organizationData) => {
    const {
        org_name, org_type, address, phone_number, contact_person,
        city, county, state, country, pin_code, remark
    } = organizationData;

    try {
        const query = `
            INSERT INTO organizations (
                org_name, org_type, address, phone_number, contact_person,
                city, county, state, country, pin_code, remark
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *
        `;
        const values = [
            org_name, org_type, address, phone_number, contact_person,
            city, county, state, country, pin_code, remark
        ];
        const { rows } = await pool.query(query, values);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const getAllOrganizations = async () => {
    try {
        const query = 'SELECT * FROM organizations';
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

const getOrganizationById = async (id) => {
    try {
        const query = 'SELECT * FROM organizations WHERE org_id = $1';
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error('Organization not found');
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const updateOrganization = async (id, organizationData) => {
    const {
        org_name, org_type, address, phone_number, contact_person,
        city, county, state, country, pin_code, remark
    } = organizationData;

    try {
        const query = `
            UPDATE organizations
            SET org_name = $1, org_type = $2, address = $3, phone_number = $4, 
                contact_person = $5, city = $6, county = $7, state = $8, 
                country = $9, pin_code = $10, remark = $11, updated_at = CURRENT_TIMESTAMP
            WHERE org_id = $12
            RETURNING *
        `;
        const values = [
            org_name, org_type, address, phone_number, contact_person,
            city, county, state, country, pin_code, remark, id
        ];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            throw new Error('Organization not found');
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteOrganization = async (id) => {
    try {
        const query = 'DELETE FROM organizations WHERE org_id = $1 RETURNING *';
        const { rows } = await pool.query(query, [id]);
        if (rows.length === 0) {
            throw new Error('Organization not found');
        }
        return rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
};

// // models/organization.js
// const { pool } = require('../config/database');

// const createOrganization = async (organizationData) => {
//     const {
//         org_code, org_name, org_type, address, phone_number, contact_person,
//         city, county, state, country, pin_code, remark
//     } = organizationData;
//     try {
//         const query = `
//             INSERT INTO organizations (
//                 org_code, org_name, org_type, address, phone_number, contact_person,
//                 city, county, state, country, pin_code, remark
//             )
//             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//             RETURNING *
//         `;
//         const values = [
//             org_code, org_name, org_type, address, phone_number, contact_person,
//             city, county, state, country, pin_code, remark
//         ];
//         const { rows } = await pool.query(query, values);
//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

// const getAllOrganizations = async () => {
//     try {
//         const query = 'SELECT * FROM organizations';
//         const { rows } = await pool.query(query);
//         return rows;
//     } catch (error) {
//         throw error;
//     }
// };

// const getOrganizationById = async (id) => {
//     try {
//         const query = 'SELECT * FROM organizations WHERE org_id = $1';
//         const { rows } = await pool.query(query, [id]);
//         if (rows.length === 0) {
//             throw new Error('Organization not found');
//         }
//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

// const updateOrganization = async (id, organizationData) => {
//     const {
//         org_code, org_name, org_type, address, phone_number, contact_person,
//         city, county, state, country, pin_code, remark
//     } = organizationData;
//     try {
//         const query = `
//             UPDATE organizations
//             SET org_code = $1, org_name = $2, org_type = $3, address = $4, phone_number = $5, 
//                 contact_person = $6, city = $7, county = $8, state = $9, country = $10, 
//                 pin_code = $11, remark = $12, updated_at = CURRENT_TIMESTAMP
//             WHERE org_id = $13
//             RETURNING *
//         `;
//         const values = [
//             org_code, org_name, org_type, address, phone_number, contact_person,
//             city, county, state, country, pin_code, remark, id
//         ];
//         const { rows } = await pool.query(query, values);
//         if (rows.length === 0) {
//             throw new Error('Organization not found');
//         }
//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

// const deleteOrganization = async (id) => {
//     try {
//         const query = 'DELETE FROM organizations WHERE org_id = $1 RETURNING *';
//         const { rows } = await pool.query(query, [id]);
//         if (rows.length === 0) {
//             throw new Error('Organization not found');
//         }
//         return rows[0];
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = {
//     createOrganization,
//     getAllOrganizations,
//     getOrganizationById,
//     updateOrganization,
//     deleteOrganization,
// };
