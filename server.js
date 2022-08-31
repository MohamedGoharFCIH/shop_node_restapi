const sequelize = require("./database/db")
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const cors = require('cors')
const userRoutes = require('./routes/users');
const orderRoutes = require("./routes/orders")


const User = require("./models/user")
const Product = require("./models/product")
const Order = require("./models/order")
const Order_details = require("./models/order_details")

Order.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
});
User.hasMany(Order, { as: "orders" });



Order.belongsToMany(Product, {
    through: Order_details,
    as: "products",
    foreignKey: "orderId",
});
Product.belongsToMany(Order, {
    through: Order_details,
    as: "orders",
    foreignKey: "productId",
});


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator())

app.use(cors());

app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
    res.send('hello Server running on localhost: 3000');
});

app.get('*', (req, res) => {
    res.send('Error 404 ...! Page Not Found');
});


sequelize.sync()
    .then(() => {
        // app.listen(3000, () => {
        //     console.log("server running on localhost:3000")
        // });

        // console.log('Connection has been established successfully and databases models created.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });

module.exports = app.listen(3000)

