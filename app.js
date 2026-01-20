require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products.router');
const app = express();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('<h2>Store API</h2><a href="/api/v1/products">Products Route</a>');
});

app.use('/api/v1/products', productsRouter);


app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;



const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();