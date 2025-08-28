import Products from "../models/products.js";

export function createProduct(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "User not authenticated",
    });
    return;
  }
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "User not authorized",
    });
    return;
  }

  const product = new Products(req.body);
  product.save()
    .then(() => {
      res.status(201).json({
        message: "Product created successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error creating product",
        error: error,
      });
    });
}

export function getProducts(req, res) {
    Products.find()
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error fetching products",
                error: error,
            });
        });
}

export function deleteProduct(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "User not authenticated",
    });
    return;
  }
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "User not authorized",
    });
    return;
  }

  const productId = req.params.productId;
  Products.findOneAndDelete({ 
    productId: productId })
    .then(() => {
      res.status(200).json({
        message: "Product deleted successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error deleting product",
        error: error,
      });
    });

}

export function updateProduct(req, res) {
    if (req.user == null) {
        res.status(403).json({
            message: "User not authenticated",
        });
        return;
    }
    if (req.user.role !== "admin") {
        res.status(403).json({
            message: "User not authorized",
        });
        return;
    }

    const productId = req.params.productId;
    const updatedData = req.body;

        Products.findOneAndUpdate({ productId: productId }, updatedData)
            .then(() => {
                res.status(200).json({
                    message: "Product updated successfully",
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: "Error updating product",
                    error: error,
                });
            });
    }
