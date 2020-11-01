import React, { useState, useEffect } from 'react';
import AdminDashboardHeader from './AdminHeader';
import { createCategoty, getCategories } from '../../API/category';
import { createProduct, getProducts } from '../../API/product';
import isEmpty from 'validator/es/lib/isEmpty';
import { showErrorMessage, showSuccessMessage } from '../Helper/helper';
import { showLoading } from '../Helper/Loading';
const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    productImage: null,
    productName: '',
    productDescription: '',
    productPrice: '',
    productCategory: '',
    productQty: '',
  });

  const {
    productImage,
    productName,
    productDescription,
    productPrice,
    productCategory,
    productQty,
  } = productData;
  //LifeCycle Methods
  useEffect(() => {
    loadCategories();
  }, [loading]);
  const loadCategories = async () => {
    await getCategories()
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessages = () => {
    setErrorMsg('');
    setSuccessMsg('');
  };
  //Event handlers
  const handleProductChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };
  const handleProductImage = (e) => {
    console.log(e.target.files[0]);
    setProductData({ ...productData, [e.target.name]: e.target.files[0] });
  };
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (productImage === null) {
      setErrorMsg('Please Choose an Image');
    } else if (
      isEmpty(productName) ||
      isEmpty(productDescription) ||
      isEmpty(productPrice)
    ) {
      setErrorMsg('All Fields are required');
    } else if (isEmpty(productCategory)) {
      setErrorMsg('Please select a category');
    } else if (isEmpty(productQty)) {
      setErrorMsg('Please select a quantity');
    } else {
      let formData = new FormData();
      formData.append('productImage', productImage);
      formData.append('productName', productName);
      formData.append('productDescription', productDescription);
      formData.append('productPrice', productPrice);
      formData.append('productCategory', productCategory);
      formData.append('productQty', productQty);
      createProduct(formData)
        .then((response) => {
          setProductData({
            productImage: null,
            productName: '',
            productDescription: '',
            productPrice: '',
            productCategory: '',
            productQty: '',
          });
          setSuccessMsg(response.data.successMessage);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.errorMessage);
        });
    }
  };
  const handleCategoryChange = (e) => {
    setErrorMsg('');
    setSuccessMsg('');
    setCategory(e.target.value);
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (isEmpty(category)) {
      setErrorMsg('Please enter a category');
    } else {
      const capData = category.charAt(0).toUpperCase() + category.slice(1);
      const data = { category: capData };

      setLoading(true);
      createCategoty(data)
        .then((response) => {
          setLoading(false);
          setSuccessMsg(response.data.successMessage);
          setCategory('');
        })
        .catch((err) => {
          setLoading(false);
          setErrorMsg(err.response.data.errorMessage);
        });
      setCategory('');
    }
  };

  const showactionButttons = () => {
    return (
      <div className='bg-light my-2'>
        <div className='container'>
          <div className='row pb-3'>
            <div className='col-md-4  my-1'>
              <div
                className='btn btn-outline-info btn-block'
                data-toggle='modal'
                data-target='#addCategoryModal'
              >
                <i className='fa fa-plus'> Add Category</i>
              </div>
            </div>
            <div className='col-md-4  my-1'>
              <div
                className='btn btn-outline-warning btn-block'
                data-toggle='modal'
                data-target='#addFoodModal'
              >
                <i className='fa fa-plus'> Add Food</i>
              </div>
            </div>
            <div className='col-md-4  my-1'>
              <div className='btn btn-outline-success btn-block'>
                <i className='fa fa-plus'> View Orders</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const showCategoryModal = () => (
    <div id='addCategoryModal' className='modal' onClick={handleMessages}>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <form action='' onSubmit={handleCategorySubmit}>
            <div className='modal-header bg-info text-white'>
              <h5 className='modal-title'>Add Category</h5>
              <button className='close' data-dismiss='modal'>
                <span>
                  <i className='fa fa-times'></i>
                </span>
              </button>
            </div>
            <div className='modal-body my-2'>
              {errorMsg && showErrorMessage(errorMsg)}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className='text-center'>{showLoading()}</div>
              ) : (
                <>
                  <label htmlFor='' className='text-secondary'>
                    Category
                  </label>
                  <input
                    type='text '
                    className='form-control'
                    name='category'
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' data-dismiss='modal'>
                Close
              </button>
              <button className='btn btn-info' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  const addFoodModal = () => (
    <div id='addFoodModal' className='modal'>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <form action='' onSubmit={handleProductSubmit}>
            <div className='modal-header bg-warning text-white'>
              <h5 className='modal-title'>Add Food</h5>
              <button className='close' data-dismiss='modal'>
                <span>
                  <i className='fa fa-times'></i>
                </span>
              </button>
            </div>
            <div className='modal-body my-2'>
              {errorMsg && showErrorMessage(errorMsg)}
              {successMsg && showSuccessMessage(successMsg)}
              {loading ? (
                <div className='text-center'>{showLoading()}</div>
              ) : (
                <>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='productImage'
                      className='custom-file-input'
                      onChange={handleProductImage}
                    />
                    <label htmlFor='' className='custom-file-label'>
                      Choose File
                    </label>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='' className='text-secondary'>
                      Name
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='productName'
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='' className='text-secondary'>
                      Description
                    </label>
                    <textarea
                      name='productDescription'
                      value={productDescription}
                      cols='30'
                      rows='3'
                      className='form-control'
                      onChange={handleProductChange}
                    ></textarea>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='' className='text-secondary'>
                      Price
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='productPrice'
                      value={productPrice}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className='form-row'>
                    <div className='form-group col-md-6'>
                      <label htmlFor='' className='text-secondary'>
                        Category
                      </label>
                      <select
                        name='productCategory'
                        id=''
                        className='custom-select'
                        onChange={handleProductChange}
                      >
                        <option value=''>Choose One</option>
                        {categories.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.category}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className='form-group col-md-6'>
                      <label htmlFor='' className='text-secondary'>
                        Quantity
                      </label>
                      <input
                        type='number'
                        name='productQty'
                        value={productQty}
                        className='form-control'
                        min='0'
                        max='500'
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' data-dismiss='modal'>
                Close
              </button>
              <button className='btn btn-warning text-white' type='submit'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <section>
      <AdminDashboardHeader />
      {showactionButttons()}
      {showCategoryModal()}
      {addFoodModal()}
    </section>
  );
};

export default Admin;
