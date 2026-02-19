import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [3, "Title must be at least 3 characters"]
    },
    author: {
        type: String,
        required: [true, "Author is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    description: {
        type: String,
        minlength: [3, "Description must be at least 3 characters"]
    },
    image: String,
}, { timestamps: true });

const BookModel = mongoose.model('Book', bookSchema);
export default BookModel;