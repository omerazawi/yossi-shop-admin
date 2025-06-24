import React, { useContext } from 'react';
import './CategorysList.css';
import { ProductContext } from '../../Context/ProductContext';
import { LuImagePlus } from "react-icons/lu";

export default function CategorysList() {

const {
    categories,
    editCategory,
    setEditCategory,
    deleteCategory,
    updateCategory,
    editData,
    setEditData,
    message,
      } = useContext(ProductContext);    

  return (
    <div className="category-list">
           {categories.length > 0 ? (categories.map((category) => (
            <div className="li-container" key={category._id}>
              {editCategory === category._id ? (
                <div className="li">
                  <label className='img-label'>
                    {editData.image && <LuImagePlus className='add-img-icon' />}
                    <input className='img-input' type="file" onChange={(e) => handleImageCategoryChange(e, true)} accept="image/*" />
                  </label>
                  <input 
                    type="text" 
                    value={editData.name} 
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })} 
                  />
                  <div className="category-btn-container">
                  <button onClick={updateCategory}>עדכן</button>
                  <button onClick={() => setEditCategory(null)}>בטל</button>
                </div>
                </div>
              ) : (
                <div className="li">
                  <div className="img-label">
                  {category.image && <img src={category.image} alt="Category" className="category-image" />}
                  </div>
                  <p>{category.name}</p>
                  <div className="category-btn-container">
                  <button onClick={() => { setEditCategory(category._id); setEditData({ name: category.name, image: category.image }); }}>ערוך</button>
                  <button onClick={() => deleteCategory(category._id)}>מחק</button>
                  </div>
                </div>
              )}
            </div>
          )
        )) : (<div>{message}</div>)}
        </div>
  )
}
