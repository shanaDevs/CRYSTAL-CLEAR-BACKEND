import Order from "../models/order.js";
import Products from "../models/products.js";

export async function createOrder(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "User not authenticated",
    });
    return;
  }

  const body = req.body;
  const orderData = {
    orderID: "",
    email: req.user.email,
    name: body.name,
    address: body.address,
    phoneNumber: body.phoneNumber,
    billItems: [],
    total: 0,
  };
  Order.find()
    .sort({
      date: -1,
    })
    .limit(1)
    .then(async (lastBills) => {
      if (lastBills.length == 0) {
        orderData.orderID = "ORD001";
      } else {
        const lastBill = lastBills[0];
        const lastOrderID = lastBill.orderID;
        const lastOrderNumber = lastOrderID.replace("ORD", "");
        const lastOrderNumberInt = parseInt(lastOrderNumber);
        const newOrderNumberInt = lastOrderNumberInt + 1;
        orderData.orderID = "ORD" + String(newOrderNumberInt).padStart(4, "0");
      }

      for (let i = 0; i < body.billItems.length; i++) {
        const product = await Products.findOne({
          productId: body.billItems[i].productId,
        });
        if (product == null) {
          res.status(400).json({
            message: `Product with ID ${body.billItems[i].productId} not found`,
          });
          return;
        }
        orderData.billItems[i] = {
          productId: product.productId,
          productName: product.name,
          image: product.images[0],
          quantity: body.billItems[i].quantity,
          price: product.price,
        };
        orderData.total =
          orderData.total + product.price * body.billItems[i].quantity;
      }
      const order = new Order(orderData);
      order
        .save()
        .then(() => {
          res.status(201).json({
            message: "Order created successfully",
            orderId: orderData.orderId,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Error creating order",
            error: error.message,
          });
        });
    });
}

export function getOrder(req, res) {
  const orderId = req.params.id;

  Order.findOne({ orderID: orderId })
    .then((order) => {
      if (!order) {
        res.status(404).json({
          message: "Order not found",
        });
        return;
      }
      res.status(200).json(order);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error fetching order",
        error: error.message,
      });
    });
}

export function getAllOrders(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "User not authenticated",
    });
    return;
  }
  if (req.user.role == "admin") {
    Order.find()
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error fetching orders",
          error: error.message,
        });
      });
  } else {
    Order.find({ email: req.user.email })
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch((error) => {
        res.status(500).json({
          message: "no order found",
          error: error.message,
        });
      });
  }
}
