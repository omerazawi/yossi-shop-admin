import React, { useContext, useEffect } from 'react';
import './Products.css';
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { ProductContext } from '../../Context/ProductContext';
import ManageCategory from '../../components/ManageCategory/ManageCategory';
import { useNavigate } from 'react-router-dom';
import ProductsList from '../../components/ProductsList/ProductsList';
import CategorysList from '../../components/CategorysList/CategorysList';
import CategoryWithProductsList from '../../components/CategoryWithProductsList/CategoryWithProductsList';


export default function Products() {
  const navigate = useNavigate();
  const {
    handleAddProduct,
    showManageCategory,

  } = useContext(ProductContext);

  return (
    <div className='products'>
      {showManageCategory && <ManageCategory />}

      <div className="buttons-container">
        <div className="product-btn" onClick={() => navigate('/addproducts')}>
          <IoMdAddCircle className='product-btn-icon' />
          <p>הוספת מוצר</p>
        </div>
        <div className="product-btn" onClick={() => navigate('/categorys')}>
          <FaEdit className='product-btn-icon' />
          <p>הוספת קטגוריה</p>
        </div>
      </div>
<div className="products-title">
  <h1>מוצרים קיימים</h1>
</div>
<CategoryWithProductsList />
    </div>
  );
}
