import express from 'express'
import dotenv from 'dotenv'
import connectDB from './DB/connectDB.js';
import {join} from "path";
import web from './routes/web.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();  
//database
const databaseURL = process.env.DATABASE_URL || "mongodb://localhost:27017";
const DbName = process.env.DbName || "Library"
connectDB(databaseURL , DbName)

// middleware to insert data in db
app.use(express.urlencoded({extended : true}));
// app.use(methodOverride("_method"));

// loading static files 
app.use(express.static(join(process.cwd(), 'public')));
//static files
app.use('/', express.static(join(process.cwd(), "public")))
app.use('/edit', express.static(join(process.cwd(), "public")))
app.use('/getsinglebooks', express.static(join(process.cwd(), "public")))

// template engine 
app.set('view engine' , 'ejs');
//base routes for bookstore
app.use('/', web);

app.listen(PORT , ()=>{
    console.log(`server listening on port  : http://localhost:${PORT}`)
})