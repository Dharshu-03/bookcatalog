const Book = require("../models/Book");

exports.createBook = async (req, res) => {
    try {
        const { title, genre, author, price, inStock } = req.body;

        if (!title || !genre || !author || !price) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        const book = await Book.create({
            title,
            genre,
            author,
            price,
            inStock
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBooks = async (req, res) => {
    const books = await Book.find();
    res.status(200).json(books);
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};