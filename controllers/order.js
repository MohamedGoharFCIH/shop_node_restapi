const { body, validationResult } = require('express-validator/check');


const Order = require("../models/order");
const Product = require("../models/product")
const Order_details = require("../models/order_details")


exports.validate = (method) => {
    switch (method) {
        case 'createOrder': {
            return [
                body('products', 'products cannot be Empty').exists().not().isEmpty(),
            ]
        }
    }
}




exports.createOrder = async (req, res, next) => {

    try {
        // Finds the validation errors in this request and wraps them in an object with handy functions

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });

        }

        const { products } = req.body
        products.forEach(async (item) => {

            // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
            const product = await Product.findOne({ where: { id: item.id } });
            if (!product) {
                return res.status(400).json({
                    error: "product " + product.product_name + " not found"
                });
            }

        })

        let totalPrice = products.reduce((prev, cur) => {
            return prev + (cur.quantity * cur.price);
        }, 0);

        console.log("userid", req.userData.userId)
        console.log("totalprice", totalPrice)

        const savedOrder = await Order.create({
            userId: req.userData.userId,
            totalprice: totalPrice
        });



        req.body.products.forEach(async (item) => {

            // Create a dictionary with which to create the orderDetails
            const orderDetails = {
                orderId: savedOrder.id,
                productId: item.id,
                quantity: item.quantity,
            }

            // Create and save a productOrder
            const savedOrderDetails = await Order_details.create(orderDetails);
        });

        return res.status(201).json({ "order": savedOrder })


    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error When creating Order!"
        });
    }


};

exports.getUserOrders = async (req, res, next) => {

    try {


        const allOrders = await Order.findAll({

            // Make sure to include the products
            include: [{
                model: Product,
                as: 'products',
                required: false,
                // Pass in the Product attributes that you want to retrieve
                attributes: ['id', 'price', 'product_name'],
                through: {
                    // This block of code allows you to retrieve the properties of the join table
                    model: Order_details,
                    as: 'order_details',
                    attributes: ['quantity'],
                }
            }],
            where: {
                userId: req.params.userId
            }
        });

        return res.status(200).json({ "all user orders": allOrders })
    } catch (e) {
        return res.status(500).json({ "message": "error on fetch user orders" })
    }
}

exports.acceptOrder = async (req, res, next) => {
    try {

        const order = await Order.findOne({
            where: { id: req.params.id }
        })
        if (!order) {
            return res.status(404).json({ "error": " Order Not found" })
        }
        const acceptedOrder = await Order.update(
            {
                status: "accepted",
            },
            {
                where: { id: req.params.id },
            }
        );

        return res.status(200).json({
            message: "order accepted"
        })
    } catch (e) {
        console.log("error from accept order", e)
        return res.status(500).json({ "message": "something error when accept order" })

    }
}

exports.rejectOrder = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            where: { id: req.params.id }
        })
        if (!order) {
            return res.status(404).json({ "error": " Order Not found" })
        }
        const rejectedOrder = await Order.update(
            {
                status: "rejected",
            },
            {
                where: { id: req.params.id },
            }
        );

        return res.status(200).json({
            message: "order rejected"
        })
    } catch (e) {
        console.log("error from reject order", e)
        return res.status(500).json({ "message": "something error when reject order" })

    }
}

