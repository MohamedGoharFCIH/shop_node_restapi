const sequelize = require("./database/db")

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



sequelize.sync().then(() => {
    console.log('Connection has been established successfully and databases models created.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});



