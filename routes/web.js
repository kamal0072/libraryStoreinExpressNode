import express from 'express';
import { upload } from '../controllers/BooksController.js';
const router  = express.Router();
import BookController from '../controllers/BooksController.js';

router.get('/', BookController.getAllBooks);
router.post('/',upload.single("image") , BookController.AddBooks);
router.get('/getallbooks', BookController.getBooksByAuthor);
router.get('/edit/:id', BookController.editBook);
router.post('/edit/:id', upload.single("image"), BookController.updateBook);
router.get('/deletebooks/:id', BookController.DeleteBook);
router.get('/getsinglebooks/:id', BookController.getSingleBook);

// router.get('/singlebooks', BookController.getSingleBook);
export default router;