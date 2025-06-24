import React, { useContext } from "react";
import "./ManageCategory.css";
import { IoMdAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { ProductContext } from "../../Context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function ManageCategory() {
const navigate = useNavigate();
  const {
    addCategory,
    handleImageCategoryChange,
    newCategory,
    setNewCategory,
  } = useContext(ProductContext);


  return (
    <div className="category-container">
      <FaArrowRight className='back-btn' onClick={() => navigate('/products')}/>
      <h2 className="category-title">הוספת קטגוריה</h2>
        <div className="input-section">
          <div className="input-section-body">
          <label className='img-label'>
            {newCategory.image ? (
             <img src={newCategory.image} alt="Category Preview" /> )
            : (<LuImagePlus className='add-img-icon' />)
              }
            <input className='img-input' type="file" onChange={(e) => handleImageCategoryChange(e)} accept="image/*" />
          </label>
          <input 
            type="text" 
            placeholder="שם הקטגוריה.." 
            value={newCategory.name} 
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <div className="add-category-btn" onClick={addCategory}>
            <p>הוסף קטגוריה</p>
          </div>
          </div>
        </div>
    </div>
  );
}
