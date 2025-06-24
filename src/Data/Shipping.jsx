const ordersData = [
    {
      id: 1,
      customerName: "דוד כהן",
      phone: "052-1234567",
      status: "בהכנה",
      address: "רחוב הרצל 12, תל אביב",
      orderDate: "2025-02-02",
      deliveryDate: "2025-02-03",
      totalAmount: 150.50,
      items: [
        { name: "פיצה מרגריטה", quantity: 2, price: 50 },
        { name: "קולה 1.5 ליטר", quantity: 1, price: 10.5 }
      ],
      paymentMethod: "אשראי"
    },
    {
      id: 2,
      customerName: "רונית לוי",
      phone: "054-9876543",
      status: "נשלח",
      address: "רחוב בן גוריון 5, חיפה",
      orderDate: "2025-02-01",
      deliveryDate: "2025-02-02",
      totalAmount: 220.00,
      items: [
        { name: "המבורגר קלאסי", quantity: 3, price: 60 },
        { name: "צ'יפס גדול", quantity: 2, price: 20 }
      ],
      paymentMethod: "מזומן"
    },
    {
      id: 3,
      customerName: "משה ישראלי",
      phone: "050-5554433",
      status: "ממתין לאישור",
      address: "שדרות ירושלים 10, באר שבע",
      orderDate: "2025-02-02",
      deliveryDate: null,
      totalAmount: 89.90,
      items: [
        { name: "סושי רול סלמון", quantity: 2, price: 40 },
        { name: "רוטב סויה", quantity: 1, price: 9.90 }
      ],
      paymentMethod: "ביט"
    }
  ];
  
  export default ordersData;
  