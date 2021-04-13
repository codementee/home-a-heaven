const knex = require('./db'); //this require is for the connection to the database. 

module.exports = {
    getOneByEmail: function(email) {
        return knex('customer').where({
            email
        }).first();
    },
    getfirstName: function(firstName) {
        return knex('customer').where({
            first_name: firstName
        }).first();
    },
    getLastName: function(lastName) {
        return knex('customer').where({
            last_name: lastName
        }).first();
    },
    // getOneByPassword: function(userId) {
    //     return knex('customer').where({
    //         user_id: userId
    //     }).first();
    // },
    getOneById: function(userId) {
        return knex('customer').where({
            user_id: userId
        }).first();
    },
    getOneProductById: function(productId) {
        return knex('product').where({
            product_id: productId
        }).first();
    },
    create: function(user) {
            return knex('customer').insert(user, 'user_id').returning('*').then(user => {
            return user[0];
        });
    },
     async createProduct (productObj, productCategoryObj, subCategoryObj) {
         if(typeof subCategoryObj !== 'undefined') {
             try {
                 const existingCategory = await knex('product_category')
                 .where({ category_name: productCategoryObj.category_name }).first()
                 const existingProduct = await knex('product')
                 .where({ product_name: productObj.product_name }).first()
                 const existingSubCategory = await knex('sub_category')
                 .where({ sub_cat_name: subCategoryObj.sub_cat_name }).first()
                //  let dbSubCategory;
                 if(!existingProduct && !existingSubCategory) {
                     console.log('heo')
                     let dbSubCategory =
                     await knex.insert({
                         sub_cat_name: subCategoryObj.sub_cat_name,
                         cat_id: existingCategory.category_id,
                         created_at: new Date()
                     })
                     .into('sub_category')
                     .returning('*')
                     console.log(dbSubCategory)
                     productObj.subcat_id = dbSubCategory[0].subCat_id;
                    let dbProduct = await knex.insert(productObj, 'product_id')
                    .into('product')
                    .returning("*")
                    return {
                        message: "product added",
                        dbProduct,
                        dbSubCategory,
                        isAdded: true,
                        subCategory: true,
                        product: true
                    }
                 }
                 if(!existingProduct) {
                    // get subCat_id from sub_category table
                    const subCategoryId = await knex.select('subCat_id').from('sub_category')
                    .where({sub_cat_name: productObj.sub_cat_name})
                 
                    productObj.category_name = productCategoryObj.category_name;
                    productObj.subcat_id = subCategoryId[0].subCat_id;
                    let dbProduct = await knex.insert(productObj, 'product_id')
                    .into('product')
                    .returning("*")
                    console.log(dbProduct)
                    return {
                        message: "product added",
                        dbProduct,
                        isAdded: true,
                        product: true
                    }
                 }
                 if(!existingSubCategory) {
                     console.log('helo')
                    productObj.category_name = productCategoryObj.category_name;
                    let dbProduct = await knex.insert(productObj, 'product_id')
                    .into('product')
                    .returning("*")
                    return {
                        message: "product added",
                        dbProduct,
                        isAdded: true,
                        product: true
                    }
                 }
             } catch (error) {
                 console.error(error)
                 return {
                    message: "Something wen wrong",
                    isAdded: false
                }
             }
            }
          else {
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
                    
                productObj.category_name = dbProductCategory[0].category_name;
                let dbProduct = await knex.insert(productObj, 'product_id')
                    .into('product')
                    .returning("*")
                return {
                    message: 'Product added',
                    dbProductCategory,
                    dbProduct,
                    isAdded: true,
                    category: true,
                    product: true
                }
                } else if(!productExist.length){
                    const dbProduct = await knex.insert(productObj, 'product_id')
                        .into('product')
                        .returning("*")
                    return {
                        message: 'Product added',
                        dbProduct,
                        isAdded: true,
                        product: true
                    }
                }
            } catch (error) {
                 console.error(error)
                 return {
                     message: "soemthing went wrong",
                     isAdded: false
                 }
            }
         }
    },
    async getAllUsers () {
        // const allCategories = await knex.select('product_category')
        const allUsers = await knex.select("*").table('customer')
        // console.log(allCategories)
        return allUsers;
    },
    async getAllProducts () {
        const allProducts = await knex.select('*').from('product').orderBy('created_at', 'desc')

        return allProducts;
    },
    async getAllCategories () {
        const allCategories = await knex.select().table('product_category')
        return allCategories;
    },
    async getAllSubCategories (filter) {
        if(filter) {
            const allSubCategories = await knex('product').where({
                sub_cat_name: filter
            })
            return allSubCategories;
        }
        const allSubCategories = await knex.select().table('sub_category')
        // console.log(allCategories)
        return allSubCategories;

    },
    async getAllByCategory (categoryQuery) {
        const allItems = await knex('product').where({
            category_name: categoryQuery
        })
        return allItems;
        // return allCategories;
    },
    async getAllBySort (whichProduct, whichSort, whichColumn) {
        const allItems = await knex.select().table('product').orderBy(whichColumn, whichSort).where({
            category_name: whichProduct
        })
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
        
        // console.log(result)
        return result;
    },
    async searchProduct (searchText) {
        // const result = await knex('product').where('product_name', 'ilike', `%${searchText}%`)
        const result = knex('product')
        if(searchText) {
            result.where('product_name', 'ilike', `%${searchText}%`)
        }
        return result;
    },
    async getOrders() {
        const orders = await knex.from('shipping_detail').innerJoin('item', 'shipping_detail.order_id', 'item.order_id').orderBy('shipping_detail.created_at', 'desc');
        return orders
    },
    async updateProfile(userData) {
        // updating user first and last name
        if(userData.firstName && userData.lastName) {
            const dbResponse = await knex('customer')
                            .where({ user_id: userData.userId })
                            .update({first_name: userData.firstName, last_name: userData.lastName})
                            .returning('*')
            return dbResponse[0];
        }
        // updating userEmail
        if(userData.email) {
            try {
                const dbRespone = await knex('customer')
                .where({ user_id: userData.userId })
                .update({ email: userData.email })
                .returning('*');
                return dbRespone[0];
            } catch (error) {
                if(error.constraint) {
                    console.error(error)
                }
            }
        }
        if(userData.hash) {
            try {
                const dbResponse = await knex('customer')
                .where({ user_id: userData.userId })
                .update({ password: userData.hash })
                .returning('*');
                return dbResponse[0];
            } catch (error) {
                console.error(error)
            }
        }
        if(userData.newPhone) {
            try {
                const dbRespone = await knex('customer')
                .where({user_id: userData.userId})
                .update({ phone: userData.newPhone })
                .returning('*');
                return dbRespone
            } catch(error) {
                console.error(error)
            }
        }
    },
    async deleteProduct(productId) {
        try {
            await knex('product')
            .where('product_id', productId)
            .del()
            return {
                message: "Product deleted!",
                isDeleted: true
            }
        } catch (error) {
            console.error(error)
            return {
                message: "Something went wrong!",
                isDeleted: false
            }
        }
    },
    async updateProduct (productObj, productId) {
        const dbProductResponse = await knex('product')
        .where({product_id: productId})
        .update(productObj)
        .returning("*")

        if(productObj.sub_cat_name) {
            const dbSubCatResponse = await knex('product')
            .where({product_id: productId})
            .update(productObj)
            .returning("*")
        }
        console.log(dbProductResponse)
    }
}

