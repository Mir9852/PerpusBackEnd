import { Book } from '../models';

export async function getAll(req, res) {
 try {
  const books = await Book.findAll();
  res.json(books);
 } catch (error) {
  res.status(500).json({ error: error.message });
 } 
}

export async function create(req, res) {
  try {
  const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}