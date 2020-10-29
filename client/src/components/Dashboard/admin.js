import React from 'react';
import AdminDashboardHeader from './AdminHeader';
const showactionButttons = () => {
  return (
    <div className='bg-light'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='btn btn-outline-info btn-block'>
              <i>Add Category</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const admin = () => {
  return (
    <>
      <AdminDashboardHeader />
      {showactionButttons()}
    </>
  );
};

export default admin;
