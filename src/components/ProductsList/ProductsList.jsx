import React, { useContext } from 'react'
import './ProductsList.css';
import { ProductContext } from '../../Context/ProductContext';
import { GlobalContext } from '../../Context/GlobalContext';
import { TbPhotoX } from 'react-icons/tb';
export default function ProductsList() {
  const { message } = useContext(GlobalContext);
    const {
        editingProduct,
        setEditingProduct,
        handleImageChange,
        setSelectedProducts,
        products,
        selectedProducts,
        getFirstFourLetters,
        handleSaveEdit,
        handleEditProduct,
        handleDeleteMultiple,
        handleDeleteProduct,
    } = useContext(ProductContext);

    console.log(products[0]);


  return (
          <div className="products-list">
        <div className="titles">
          <div className="title"><h4>בחר</h4></div>
          <div className="title"><h4>מספר מזהה</h4></div>
          <div className="title"><h4>תמונה</h4></div>
          <div className="title"><h4>שם המוצר</h4></div>
          <div className="title"><h4>תיאור</h4></div>
          <div className="title"><h4>מחיר</h4></div>
          <div className="title"><h4>פעולות</h4></div>
        </div>
        {products.length > 0 ? (
          products.map((product) => (
            <div className='product' key={product._id}>
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

              {editingProduct && editingProduct._id === product._id ? (
                <>
                  <div className="product-item">
                    <label className='img-label-product'>
                      {editingProduct.images ? (
                        <img src={editingProduct.images[0]} alt="Product Preview" />
                      ) : (
                        <LuImagePlus className='add-img-icon' />
                      )}
                        </label>
                      <input
                        className='img-input'
                        type="file"
                        onChange={(e) => handleImageChange(e, true)}
                        accept="image/*"
                      />
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
                    {/* מבצע */}
                    <label>
                      במבצע:
                      <input
                        type="checkbox"
                        checked={editingProduct.onSale || false}
                        onChange={(e) => setEditingProduct({ ...editingProduct, onSale: e.target.checked })}
                      />
                    </label>

                    {/* אחוז הנחה */}
                    {editingProduct.onSale && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <label>
                          אחוז הנחה:
                          <input
                            type="number"
                            value={editingProduct.discountPercent || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, discountPercent: e.target.value })}
                            min="0"
                            max="100"
                            placeholder="לדוגמה: 20"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="product-item buttons">
                    <button onClick={handleSaveEdit}>שמירה</button>
                    <button onClick={() => setEditingProduct(null)}>ביטול</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="product-item">
                    <div className='img-label-product'>
                      {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt="product img" />
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
                      <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'green', fontWeight: 'bold' }}>{product.salePrice} ₪</span><br />
                        <span style={{ textDecoration: 'line-through', color: 'gray', fontSize: '14px' }}>
                          {product.price} ₪
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontWeight: 'bold' }}>{product.price} ₪</span>
                    )}
                  </div>

                  <div className="product-item buttons">
                    <button onClick={() => handleEditProduct(product)}>עריכה</button>
                    <button onClick={() => handleDeleteProduct(product._id)}>מחיקה</button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-products-message">{message}</div>
        )}
        {selectedProducts.length > 0 && (
          <button className="delete-btn" onClick={handleDeleteMultiple}>
            מחיקת מוצרים נבחרים
          </button>
        )}
      </div>
  )
}
