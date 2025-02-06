// prutl-frontend-npm6node14/src/pages/CategoryManagement.jsx

import React from 'react';
import CategoryList from '../components/categoryManagement/CategoryList.jsx';

const CategoryManagement = () => {
  return (
    <div className="categoryManagementContainer">
      <h1>Category Management</h1>
      <CategoryList />
    </div>
  );
};

export default CategoryManagement;
