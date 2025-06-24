import React, { useContext } from 'react';
import './CategoryWithProductsList.css';
import { ProductContext } from '../../Context/ProductContext';
import { GlobalContext } from '../../Context/GlobalContext';
import { LuImagePlus } from 'react-icons/lu';
import { TbPhotoX } from 'react-icons/tb';

export default function CategoryWithProductsList() {
  const { message } = useContext(GlobalContext);
  const {
    categories,
    editCategory,
    setEditCategory,
    deleteCategory,
    updateCategory,
    editData,
    setEditData,
    products,
    selectedProducts,
    setSelectedProducts,
    editingProduct,
    setEditingProduct,
    handleImageChange,
    getFirstFourLetters,
    handleSaveEdit,
    handleEditProduct,
    handleDeleteMultiple,
    handleDeleteProduct,
  } = useContext(ProductContext);

  const groupedProducts = categories.map((category) => ({
    ...category,
    products: products.filter(p => p.category.includes(category.name)),
  }));

  return (
    <div className="category-products-list">
      {groupedProducts.map((category) => (
        <div key={category._id} className="category-section">
          <div className="category-header">
            {editCategory === category._id ? (
              <div className="edit-category">
                <label className='img-label'>
                  {editData.image && <img src={editData.image} alt="קטגוריה" />}
                  <input
                    className='img-input'
                    type="file"
                    onChange={(e) => handleImageChange(e, false)}
                    accept="image/*"
                  />
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
                <div className="category-btn-container">
                  <button onClick={updateCategory}>עדכן</button>
                  <button onClick={() => setEditCategory(null)}>ביטול</button>
                </div>
              </div>
            ) : (
              <div className="view-category">
                {category.image && <img src={category.image} alt="קטגוריה" />}
                <h3>{category.name}</h3>
                <div className="category-btn-container">
                  <button onClick={() => { setEditCategory(category._id); setEditData({ name: category.name, image: category.image }); }}>ערוך</button>
                  <button onClick={() => deleteCategory(category._id)}>מחק</button>
                </div>
              </div>
            )}
          </div>

          <div className="products-list">
            {category.products.length > 0 ? (
              category.products.map((product) => (
                <div className="product" key={product._id}>
                  {editingProduct && editingProduct._id === product._id ? (
                    <div className='product-container'>
                      <div className="product-item">
                        <label className='img-label-product'>
                          {editingProduct.images?.[0] ? (
                            <img src={editingProduct.images[0]} alt="תצוגת מוצר" />
                          ) : (
                            <LuImagePlus className='add-img-icon' />
                          )}
                          <input
                            className='img-input'
                            type="file"
                            onChange={(e) => handleImageChange(e, true)}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <div className="product-item">
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        />
                      </div>
                      <div className="product-item">
                        <textarea
                          value={editingProduct.description}
                          onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                          rows="3"
                        />
                      </div>
                      <div className="product-item">
                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className="product-item">
                        <label>
                          במבצע:
                          <input
                            type="checkbox"
                            checked={editingProduct.onSale || false}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                onSale: e.target.checked,
                                promotion: e.target.checked ? editingProduct.promotion || { type: '' } : {}
                              })
                            }
                          />
                        </label>

                        {editingProduct.onSale && (
                          <>
                            <div>
                              <label>סוג מבצע:</label>
                              <select
                                value={editingProduct.promotion?.type || ''}
                                onChange={(e) =>
                                  setEditingProduct({
                                    ...editingProduct,
                                    promotion: {
                                      ...editingProduct.promotion,
                                      type: e.target.value,
                                    }
                                  })
                                }
                              >
                                <option value="">ללא</option>
                                <option value="percentage">אחוזי הנחה</option>
                                <option value="bundle">2 מוצרים ומעלה במחיר מסוים</option>
                                <option value="multiToOne">2/3 מוצרים ב-1</option>
                              </select>
                            </div>

                            {editingProduct.promotion?.type === 'percentage' && (
                              <div>
                                <label>
                                  אחוז הנחה:
                                  <input
                                    type="number"
                                    value={editingProduct.discountPercent || ''}
                                    onChange={(e) => setEditingProduct({
                                      ...editingProduct,
                                      discountPercent: e.target.value
                                    })}
                                    min="0"
                                    max="100"
                                  />
                                </label>
                              </div>
                            )}

                            {editingProduct.promotion?.type === 'bundle' && (
                              <div>
                                <label>
                                  כמות:
                                  <input
                                    type="number"
                                    value={editingProduct.promotion.bundleQuantity || ''}
                                    onChange={(e) =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        promotion: {
                                          ...editingProduct.promotion,
                                          bundleQuantity: e.target.value
                                        }
                                      })
                                    }
                                  />
                                </label>
                                <label>
                                  מחיר כולל:
                                  <input
                                    type="number"
                                    value={editingProduct.promotion.bundlePrice || ''}
                                    onChange={(e) =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        promotion: {
                                          ...editingProduct.promotion,
                                          bundlePrice: e.target.value
                                        }
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            )}

                            {editingProduct.promotion?.type === 'multiToOne' && (
                              <div>
                                <label>
                                  כמה מוצרים ב-1:
                                  <input
                                    type="number"
                                    value={editingProduct.promotion.multiToOneQuantity || ''}
                                    onChange={(e) =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        promotion: {
                                          ...editingProduct.promotion,
                                          multiToOneQuantity: e.target.value
                                        }
                                      })
                                    }
                                  />
                                </label>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      <div className="product-item buttons">
                        <button onClick={handleSaveEdit}>שמירה</button>
                        <button onClick={() => setEditingProduct(null)}>ביטול</button>
                      </div>
                    </div>
                  ) : (
                    <div className='product-container'>
                      <div className="product-item">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() =>
                            setSelectedProducts((prev) =>
                              prev.includes(product._id)
                                ? prev.filter((pid) => pid !== product._id)
                                : [...prev, product._id]
                            )
                          }
                        />
                      </div>
                      <div className="product-item">
                        <p>{getFirstFourLetters(product._id)}</p>
                      </div>
                      <div className="product-item">
                        <div className='img-label-product'>
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="מוצר" />
                          ) : (
                            <TbPhotoX className='no-photo' />
                          )}
                        </div>
                      </div>
                      <div className="product-item">
                        <p>{product.name}</p>
                      </div>
                      <div className="product-item">
                        <p>{product.description}</p>
                      </div>
                      <div className="product-item">
                        {product.onSale && product.salePrice ? (
                          <div>
                            <span className="sale-price">{product.salePrice} ₪</span>
                            <br />
                            <span className="original-price">{product.price} ₪</span>
                          </div>
                        ) : (
                          <span>{product.price} ₪</span>
                        )}

                        {product.onSale && product.promotion?.type && (
                          <div className="promotion-info">
                            {product.promotion.type === 'percentage' && (
                              <p>הנחה של {product.discountPercent}%</p>
                            )}
                            {product.promotion.type === 'bundle' && (
                              <p>{product.promotion.bundleQuantity} ב-{product.promotion.bundlePrice} ₪</p>
                            )}
                            {product.promotion.type === 'multiToOne' && (
                              <p>{product.promotion.multiToOneQuantity} ב-1</p>
                            )}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                      <div className="product-item buttons">
                        <button onClick={() => handleEditProduct(product)}>עריכה</button>
                        <button onClick={() => handleDeleteProduct(product._id)}>מחיקה</button>
                      </div>
                </div>
              ))
            ) : (
              <p className="no-products-message">אין מוצרים בקטגוריה זו</p>
            )}
          </div>
        </div>
      ))}

      {selectedProducts.length > 0 && (
        <button className="delete-btn" onClick={handleDeleteMultiple}>
          מחיקת מוצרים נבחרים
        </button>
      )}

      {groupedProducts.length === 0 && <p>{message}</p>}
    </div>
  );
}
