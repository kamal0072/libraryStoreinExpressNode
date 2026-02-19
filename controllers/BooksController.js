import multer from "multer";
import BookModel from "../models/book.js"
import path from "path"
import { title } from "process";
// Multer setup
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
export let upload = multer({ storage })


class BookController {
    static getAllBooks = async (req, res) => {
        try {
            const searchbooktitle = req.query.searchbooktitle || "";

            const filter1 = {};
            if (searchbooktitle) {
                filter1.title = { $regex: searchbooktitle, $options: "i" }; // case insensitive
            };
            const Allbooks1 = await BookModel.find(filter1);


            const searchAuthor = req.query.author || "";
            const filter = {};
            if (searchAuthor) {
                filter.author = { $regex: searchAuthor, $options: "i" }; // case insensitive
            };

            const Allbooks = await BookModel.find(filter);
            // get distinct authors for dropdown
            const authors = await BookModel.distinct("author");
            res.render('index.ejs', { title: 'My book store', books: Allbooks, Allbooks1, searchbooktitle, authors, searchAuthor });
        } catch (error) {
            console.log(error.message)
        }
    };

    static AddBooks = async (req, res) => {
        // console.log(req.file);
        try {
            const { title, author, price, description, image } = req.body;
            const book = new BookModel({
                title: title,
                author: author,
                price: price,
                description: description,
                image: req.file ? req.file.filename : ""
            });
            await book.save();
            res.redirect('/');
        } catch (error) {
            const books = await BookModel.find();
            const err = Object.values(error.errors).map((val) => val.message);
            // console.log(errors)
            // res.send(errors);
            // res.render('edits.ejs', { "title": "Add Book", "e": errors });
            // const books = await BookModel.find();
            res.render('index.ejs', { title: 'My book store', errors: err, books: books });
        }
    };

    static editBook = async (req, res) => {
        try {
            const result = await BookModel.findById(req.params.id);
            res.render('edits.ejs', { "title": "Edit Book", book: result })
        } catch (err) {
            console.log(err.message);
        }
    };

    static updateBook = async (req, res) => {
        try {
            const updatedData = {
                title: req.body.title,
                author: req.body.author,
                price: req.body.price,
                description: req.body.description
            };
            if (req.file) {
                updatedData.image = req.file.filename
            }
            const result = await BookModel.findByIdAndUpdate(req.params.id, updatedData, { new: true });
            console.log("Updated books : ", result);
            // result.save();
        } catch (err) {
            console.log(err)
        }
        res.redirect('/');
    };

    static DeleteBook = async (req, res) => {
        console.log("Delete Book : ", req.params.id)
        try {
            const deleteBook = await BookModel.findByIdAndDelete(req.params.id);
            // console.log("Deleted Book : ", deleteBook);
            res.redirect('/');
        } catch (error) {
            console.log(error.message);
        }
    };
    // get single book by id
    static getSingleBook = async (req, res) => {
        const id = await req.params.id;
        try {
            const singleBook = await BookModel.findById(id);
            res.render('singlebook.ejs', { "title": "Single Book", book: singleBook })
        } catch (error) {
            console.log(error.message)
        };
    };

    // controller for only all Books
    static getBooksByAuthor = async (req, res) => {
        const searchTitle = req.query.title || "";
        let filter = {};
        if (searchTitle) {
            filter.title = { $regex: searchTitle, $options: "i" };
        } 
        // if (searchTitle==="") {
        // };
        const allbooks = await BookModel.find(filter);

        console.log(searchTitle);

        res.render("getAllBooks.ejs", { title: 'My book store', books: allbooks, searchTitle });
    };

};

export default BookController;