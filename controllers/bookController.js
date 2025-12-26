const { Book } = require('../models');

exports.getAll = async (req, res) => {
 try {
  const books = await Book.findAll();
  res.json(books);
 } catch (error) {
  res.status(500).json({ error: error.message });
 } 
};

exports.create = async (req, res) => {
  try {
  const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};