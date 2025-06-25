import React, { useState, createContext,useEffect, useContext,useCallback } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalContext";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
const [formData, setFormData] = useState({
  name: "",
  images: [],
  description: "",
  category: "",
  price: 0,
  isAvailable: true,
  stock: "",
  sold: "0",
  color: "",
  rating: "",
  onSale: false,
  discountPercent: 0,
promotion: {
  type: '',
  bundleQuantity: '',
  bundlePrice: '',
  multiToOneQuantity: '',
}
});
  const [showManageCategory, setShowManageCategory] = useState(false);
  const [productsChange, setProductsChange] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
      const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: "", image: "" });
    const [editCategory, setEditCategory] = useState(null);
    const [editData, setEditData] = useState({ name: "", image: "" });

  const {
    setIsLoading,
    setStatus,
    message,
    setMessage,
    showConfirmDialog,
    showNotification,
  } = useContext(GlobalContext);

// -----------------הבאת מוצרים מהשרת-------------------
const handleProducts = async () => {
  try {
    setIsLoading(true);
    const response = await axios.get("https://yossi-shop.onrender.com/Products/");
    
    // Avoid unnecessary re-renders
    if (JSON.stringify(products) !== JSON.stringify(response.data)) {
      setProducts(response.data);
    }
    
    setMessage(response.data.length > 0 ? "" : "אין מוצרים קיימים");
    setStatus("success");
  } catch (err) {
    console.error("Error fetching products:", err);
    setProducts([]);
    setStatus("");
    setMessage("תקלה בשרת, נסה שוב בבקשה.");
  } finally {
    setIsLoading(false);
    console.log("finally!");
  }
};

// --------------עדכון קטגוריה-------------------
const updateCategory = async () => {
  if (!editData.name.trim()) {
    showNotification("נא להזין שם לקטגוריה", "error");
    return;
  }

  try {
    setIsLoading(true);

    // שמירה של השם הישן כדי לעדכן את המוצרים
    const oldCategory = categories.find(c => c._id === editCategory)?.name;

    const updatedCategory = {
      name: editData.name,
      image: editData.image,
    };

    // עדכון הקטגוריה
    await axios.put(`https://yossi-shop.onrender.com/Category/${editCategory}`, updatedCategory);


    // עדכון שם הקטגוריה בכל המוצרים שקשורים אליה
    await axios.put(`https://yossi-shop.onrender.com/Category/updateCategoryName`, {
      oldName: oldCategory,
      newName: editData.name,
    });

    showNotification("הקטגוריה עודכנה בהצלחה", "success");
    setEditCategory(null);
    handleCategory(); // רענון הקטגוריות
    handleProducts(); // רענון המוצרים
  } catch (err) {
    console.error(err);
    showNotification("שגיאה בעדכון הקטגוריה", "error");
  } finally {
    setIsLoading(false);
  }
};


  // ---------------------------הבאת קטגוריות מהשרת---------------------
  const handleCategory = async() =>{
    try{
      setIsLoading(true);
    const resp = await axios.get("https://yossi-shop.onrender.com/Category");
    setCategories(resp.data);
    setMessage(resp.data.length > 0 ? "" : "אין קטגוריות מוגדרות")
    setStatus("success");
    }
    catch(err){
console.log(err);
setMessage('יש תקלה בשרת, נסה שוב בבקשה');
setStatus("");
    }
    finally{
      setIsLoading(false);

    }
  }

// ------------------------שינוים בטופס הוספת מוצר----------------
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    
      // ------------------------------שינוי תמונת מוצר----------------------
      const handleImageChange = (event, isEditing = false) => {
        const files = event.target.files;
        if (files.length > 0) {
          const promises = Array.from(files).map(file => {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve(reader.result);
              };
              reader.readAsDataURL(file);
            });
          });

          Promise.all(promises).then(base64Images => {
            if (isEditing) {
              setEditingProduct(prev => ({
                ...prev,
                images: [...(prev.images || []), ...base64Images],
              }));
            } else {
              setFormData(prev => ({
                ...prev,
                images: [...(prev.images || []), ...base64Images],
              }));
            }
          });
        }
      };
      
      
    
      // ----------------------------הוספת מוצר---------------------
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          setIsLoading(true);
          const response = await axios.post("https://yossi-shop.onrender.com/Products/add/", formData);
          console.log("Success:", response.data);
          setMessage("המוצר נוסף בהצלחה!");
          handleAddProduct();
          setProductsChange(true);
          setStatus("success");
        } catch (error) {
          console.error("Error:", error);
          setMessage("שגיאה בהוספת המוצר");
          setStatus("");
        }
        finally{
          setIsLoading(false);
        navigate('/')
        }
      };
  




  // -----------------------קיצור id---------------------
  function getFirstFourLetters(index) {
    return index.slice(0, 4);
  }
// ----------------------פתיחת וסגירת חלון הוספת מוצר------------------
  const handleAddProduct = () => {
    setShowAddProduct((prev) => !prev);
    setFormData({
      name: "",
    images: [],
    description: "",
    category: "",
    price: "",
    isAvailable: true,
    stock: "",
    sold: "0",
    color: "",
    rating: "",
    });
    handleProducts();
  };
 

  const handleShowCategoryManage = () => {
    setShowManageCategory((prev) => !prev);
  };


  

// ----------------- מחיקת מוצר -----------------
const handleDeleteProduct = (id) => {
  showConfirmDialog("האם אתה בטוח שברצונך למחוק מוצר זה?", async () => {
    try {
      setIsLoading(true);
      await axios.delete(`https://yossi-shop.onrender.com/Products/delete/${id}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      showNotification("המוצר נמחק בהצלחה!");
      setMessage('המוצר נמחק בהצלחה');
      setStatus('success')
    } catch (err) {
      showNotification("שגיאה במחיקת המוצר!", false);
      setMessage("שגיאה במחיקת המוצר!", false);
      setStatus('');
    } finally {
      setIsLoading(false);
    }
  });
};

const handleDeleteMultiple = () => {
  showConfirmDialog("האם אתה בטוח שברצונך למחוק את כל המוצרים שנבחרו?", async () => {
    try {
      setIsLoading(true);
      await axios.post("https://yossi-shop.onrender.com/Products/delete-multiple", { productIds: selectedProducts });
      setProducts((prev) => prev.filter((product) => !selectedProducts.includes(product._id)));
      setSelectedProducts([]);
      showNotification("המוצרים נמחקו בהצלחה!");
      setMessage('המוצרים נמחקו בהצלחה')
    } catch (err) {
      showNotification("שגיאה במחיקת המוצרים!", false);
      setMessage("שגיאה במחיקת המוצרים!", false);
    } finally {
      setIsLoading(false);
    }
  });
};

  // -------פתיחת העריכה-----------
  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  // ---------------שמירת העריכה----------------
  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      let updatedProduct = { ...editingProduct };

      // חישוב מחיר מבצע בצד לקוח גם
  if (updatedProduct.promotion?.type === 'bundle') {
  updatedProduct.promotion.bundleQuantity = Number(updatedProduct.promotion.bundleQuantity || 0);
  updatedProduct.promotion.bundlePrice = Number(updatedProduct.promotion.bundlePrice || 0);
}
if (updatedProduct.promotion?.type === 'multiToOne') {
  updatedProduct.promotion.multiToOneQuantity = Number(updatedProduct.promotion.multiToOneQuantity || 0);
}
      if (updatedProduct.onSale && updatedProduct.discountPercent > 0) {
        const discountAmount = (updatedProduct.price * updatedProduct.discountPercent) / 100;
        updatedProduct.salePrice = Math.round((updatedProduct.price - discountAmount) * 100) / 100;
      } else {
        updatedProduct.salePrice = undefined;
      }
  
      await axios.put(`https://yossi-shop.onrender.com/Products/${editingProduct._id}`, updatedProduct);
  
      setProducts(
        products.map((product) =>
          product._id === editingProduct._id ? updatedProduct : product
        )
      );
      setEditingProduct(null);
      setMessage("המוצר עודכן בהצלחה");
      setStatus("success");
    } catch (err) {
      setStatus("");
      setMessage("שגיאה בעריכת המוצר", false);
    } finally {
      setIsLoading(false);
    }
  };
  

    const handleImageCategoryChange = (e, isEdit = false) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (isEdit) {
          setEditData({ ...editData, image: reader.result });
        } else {
          setNewCategory({ ...newCategory, image: reader.result });
        }
      };
    };
  
    const addCategory = async () => {
  if (!newCategory.name.trim()) {
    setMessage('חובה להזין שם לקטגוריה!');
    setStatus('');
    return;
  }

  if (!newCategory.image) {
    setMessage('חובה להוסיף תמונה לקטגוריה!');
    setStatus('');
    return;
  }

  try {
    setIsLoading(true);
    const res = await axios.post("https://yossi-shop.onrender.com/Category/add", newCategory);
    setCategories([...categories, res.data.category]);
    setNewCategory({ name: "", image: "" });
    setMessage('הקטגוריה נוספה בהצלחה');
    setStatus("success");
  } catch (err) {
    console.error("שגיאה בהוספת קטגוריה:", err);
    setMessage('משהו השתבש, נסה שוב.');
    setStatus("");
  } finally {
    setIsLoading(false);
  }
};

    const deleteCategory = async (id) => {
      try {
        setIsLoading(true);
        await axios.delete(`https://yossi-shop.onrender.com/Category/delete/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        setMessage('הקטגוריה נמחקה בהצלחה')
      } catch (err) {
        setMessage("שגיאה במחיקת קטגוריה:");
      }
      finally{
        setIsLoading(false);
      
      }
    };


  useEffect(() => {
    handleProducts();
    handleCategory();
  }, [productsChange]);
  

  const valued = {
    setSelectedProducts,
    handleAddProduct,
    addCategory,
    updateCategory,
    getFirstFourLetters,
    handleSaveEdit,
    handleEditProduct,
    handleDeleteMultiple,
    handleDeleteProduct,
    handleChange,
    handleImageChange,
    handleImageCategoryChange,
    handleSubmit,
    handleShowCategoryManage,
    showManageCategory,
    productsChange,
    formData,
    setFormData,
    showAddProduct,
    products,
    message,
    selectedProducts,
    editingProduct,
    setEditingProduct,
    setNewCategory,
    newCategory,
    categories,
    setEditCategory,
    editCategory,
    setEditData,
    editData,
    deleteCategory,
    handleCategory,
  };

  return (
    <ProductContext.Provider value={valued}>
      {children}
    </ProductContext.Provider>
  );
};
