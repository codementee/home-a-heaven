const knex = require('./db'); //this require is for the connection to the database. 

module.exports = {
    getOneByEmail: function(email) {
        return knex('customer').where({
            email: email
        }).first();
    },
    getOneByPassword: function(password) {
        return knex('customer').where({
            password: password
        }).first();
    },
    create: function(user) {
            return knex('customer').insert(user, 'user_id').returning('*').then(user => {
            return user[0];
        });
    },
     async createProduct (productObj, productCategoryObj) {
         try {
                const categoryExist = await knex('product_category').where({
                    category_name: productCategoryObj.category_name
                })
                const productExist = await knex('product').where({
                    product_name: productObj.product_name
                })


                if(!categoryExist.length && !productExist.length) {
                    let dbProductCategory =
                     await knex.insert(productCategoryObj, 'category_id')
                     .into('product_category')
                     .returning('*');
                let cat;
                 productObj.category_name = dbProductCategory[0].category_name;
                  await knex.insert(productObj, 'product_id')
                     .into('product')

                } else if(!productExist.length){
                    await knex.insert(productObj, 'product_id')
                         .into('product')
                }
                if(categoryExist.length && productExist.length) {
                    return {message: 'Product and Category already exist'}
                } else if(productExist.length) {
                    return {message: 'Product already exist'}
                } else {
                    return {message: 'Product added'}
                }

         } catch (error) {
                // console.log(error)
         }
    },
    async getAllUsers () {
        // const allCategories = await knex.select('product_category')
        const allUsers = await knex.select().table('customer')
        // console.log(allCategories)
        return allUsers;
    },
    getAllProducts () {
        const allProducts = knex.select('*').from('product')
        .then(result => {
            return result;
        })
        return allProducts;
    },
    async getAllCategories () {
        // const allCategories = await knex.select('product_category')
        const allCategories = await knex.select().table('product_category')
        // console.log(allCategories)
        return allCategories;
    },
    async getAllByCategory (categoryQuery) {
        // const allCategories = await knex.select('product_category')
        // const allCategories = await knex.select().table('product_category')
        const allItems = await knex('product').where({
            category_name: categoryQuery
        })
        // console.log(allItems)
        return allItems;
        // return allCategories;
    },
    async getAllBySort (whichProduct, whichSort, whichColumn) {
        console.log(whichSort, whichColumn, whichProduct)
        const allItems = await knex.select().table('product').orderBy(whichColumn, whichSort).where({
            category_name: whichProduct
        })
        // console.log(allItems)
        return allItems;
    },
    async createOrder (order) {
        const shippingDetail = await knex('shipping_detail').insert(order, 'order_id').returning("*");
        return shippingDetail;
    },
    async createItem (itemObj) {
        return knex('item').insert(itemObj, 'item_id').then(ids => {
           return ids[0];
        });
    },
    async orders (customerId) {
        const customerOrders = await knex('shipping_detail').where('customer_id', customerId).returning('*')
        return customerOrders
    },
    async getItem (itemId) {
            const items = await knex('item').where('item_id', itemId).returning('*')
        return items;
    },
    async getCustOrdersItems(customerId) {
        const allItems = await knex('item').orderBy('created_at', 'desc').where({
            customer_id: customerId
        })
        // console.log(allItems)
        return allItems;
    },
    async getPlacedOrders() {
        const allItems = await knex('shipping_detail').orderBy('created_at', 'desc')
        return allItems;
    },
    async getPlacedOrdersItems() {
        const allItems = await knex('item').orderBy('created_at', 'desc')
        return allItems;
    },
    async updateStatus(orderId, status) {
        const result = await knex('shipping_detail').where({order_id: orderId}).update('order_status', status)
        
        console.log(result)
        return result;
    },
    async searchProduct (searchText) {
        // const result = await knex('product').where('product_name', 'ilike', `%${searchText}%`)
        const result = knex('product')
        if(searchText) {
            result.where('product_name', 'ilike', `%${searchText}%`)
        }
        // if(searchText) {
        //     result.where('category_name', 'ilike', `%${searchText}%`)
        // }
        // console.log(result)
        return result;
    }
}

