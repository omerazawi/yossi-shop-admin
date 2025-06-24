import React, { useContext } from 'react';
import './AddProduct.css';
import Select from 'react-select';
import { IoMdClose } from "react-icons/io";
import { LuImagePlus } from "react-icons/lu";
import { ProductContext } from '../../Context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();
  const {
    handleAddProduct,
    handleImageChange,
    handleChange,
    handleSubmit,
    formData,
    setFormData,
    categories
  } = useContext(ProductContext);

  const categoryOptions = categories?.length
    ? categories.map((cat) => ({
        value: cat.name,
        label: (
          <label id='cat-label'>
            <img src={cat.image} alt={cat.name} className='cat-img' />
            <p>{cat.name}</p>
          </label>
        ),
      }))
    : [];

  return (
    <div className='add-product'>
      <IoMdClose className='close-btn' onClick={() => navigate(-1)} />
      <h1>הוספת מוצר חדש</h1>
      <div className="form-container">
        <div className="form">
          <label className="img-label" htmlFor="product-images">
            {formData.images.length > 0 ? (
              formData.images.map((img, indx) => (
                <img
                  key={indx}
                  src={img}
                  alt="product img"
                  style={{ width: 100, height: 100, margin: 5 }}
                />
              ))
            ) : (
              <LuImagePlus className="add-img-icon" />
            )}
          </label>
          <input
            id="product-images"
            className='img-input'
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />

          <label>שם המוצר:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />

          <label>תיאור:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>קטגוריה:</label>
          <Select
            options={categoryOptions}
            onChange={(selectedOption) => handleChange({ target: { name: 'category', value: selectedOption.value } })}
            value={categoryOptions.find((option) => option.value === formData.category)}
          />

          <label>מחיר:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />

          {/* מבצע */}
          <label>
            <input
              type="checkbox"
              name="onSale"
              checked={formData.onSale}
              onChange={(e) => {
                const checked = e.target.checked;
                setFormData((prev) => ({
                  ...prev,
                  onSale: checked,
                  promotion: {
                    type: "",
                    bundleQuantity: "",
                    bundlePrice: "",
                    multiToOneQuantity: ""
                  },
                  discountPercent: 0,
                }));
              }}
            />
            במבצע
          </label>

          {formData.onSale && (
            <>
              <label>סוג מבצע:</label>
              <select
                value={formData.promotion?.type || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    promotion: {
                      ...prev.promotion,
                      type: e.target.value
                    }
                  }))
                }
              >
                <option value="">בחר</option>
                <option value="percentage">אחוזי הנחה</option>
                <option value="bundle">2 מוצרים ומעלה במחיר מסוים</option>
                <option value="multiToOne">2/3 מוצרים ב-1</option>
              </select>

              {formData.promotion?.type === 'percentage' && (
                <>
                  <label>אחוז הנחה:</label>
                  <input
                    type="number"
                    name="discountPercent"
                    value={formData.discountPercent}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="לדוגמה: 20"
                  />
                </>
              )}

              {formData.promotion?.type === 'bundle' && (
                <>
                  <label>כמות במבצע:</label>
                  <input
                    type="number"
                    value={formData.promotion.bundleQuantity || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        promotion: {
                          ...prev.promotion,
                          bundleQuantity: e.target.value
                        }
                      }))
                    }
                  />
                  <label>מחיר כולל:</label>
                  <input
                    type="number"
                    value={formData.promotion.bundlePrice || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        promotion: {
                          ...prev.promotion,
                          bundlePrice: e.target.value
                        }
                      }))
                    }
                  />
                </>
              )}

              {formData.promotion?.type === 'multiToOne' && (
                <>
                  <label>כמה מוצרים ב-1:</label>
                  <input
                    type="number"
                    value={formData.promotion.multiToOneQuantity || ''}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        promotion: {
                          ...prev.promotion,
                          multiToOneQuantity: e.target.value
                        }
                      }))
                    }
                  />
                </>
              )}
            </>
          )}

          <button onClick={handleSubmit}>הוספת מוצר</button>
        </div>
      </div>
    </div>
  );
}
