import { v4 as uuidv4 } from "uuid";
let products = [];

export const getProducts = (req, res) => {
  const { category, page = 1, limit = 5 } = req.query;
  let filtered = products;

  if (category) filtered = filtered.filter(p => p.category === category);
  
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + parseInt(limit));

  res.json({ total: filtered.length, page, data: paginated });
};

export const getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return next({ status: 404, message: "Product not found" });
  res.json(product);
};

export const createProduct = (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: "Product not found" });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProduct = (req, res, next) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return next({ status: 404, message: "Product not found" });
  products.splice(index, 1);
  res.status(204).send();
};

export const searchProducts = (req, res) => {
  const { q } = req.query;
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase())
  );
  res.json(results);
};

export const getStats = (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
};
