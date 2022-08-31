const express = require('express');
const check_auth = require("../middleware/check-auth")

const orderController = require('../controllers/order');

const router = express.Router();



router.post('/create',
    check_auth.checkAuth,
    orderController.validate('createOrder'),
    orderController.createOrder
);
router.get('/userorders/:userId',
    orderController.getUserOrders
);


router.put('/accept/:id',
    orderController.acceptOrder
);

router.put('/reject/:id',
    orderController.rejectOrder
);



module.exports = router;