const {
        getPlacedOrders,
        getAllCategories,
        getPlacedOrdersItems,
        updateStatus,
    } = require('../../db/queries');
const moment = require('moment');
// const { getPlacedOrders } = require('../../db/queries')

const adminOrderController = () => {
    return {
        async index(req, res) {
            const orders = await getPlacedOrders();
            const allItems = await getPlacedOrdersItems();
            // const products = await getAllProducts();
            allItems.forEach(each => {
                console.log(each.item_name)
            })
            
            const categories = await getAllCategories();
            // console.log(allItems)
            res.render('admin-orders', {
                categories,
                allItems,
                orders,
                moment
              });
        },
        async orderStatus (req, res){
            const orderId = req.body.clientStatus.order_id;
            const status = req.body.clientStatus.status;
            const dbStatus = await updateStatus(orderId, status)
            res.json({
                dbStatus
            })
        },
    }
}


module.exports = adminOrderController;