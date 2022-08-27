require('dotenv').config()
const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const path = require('path')


//MIDDLEWARES
app.use(express.static('frontend/dist'))
app.use(express.json())
//************************************************************/


//ROUTES

//CUSTOMERS
app.post('/api/customers', async (req, res) => {
    const existingCustomer = await prisma.customer.findUnique({
        where: { id: req.body.id }
    })
    if (existingCustomer) {
        return res.send(existingCustomer)
    }
    else {
        const newCustomer = await prisma.customer.create({
            data: req.body
        })
        if (newCustomer) { return res.status(201).send(newCustomer) }
    }
    res.sendStatus(500)
})

app.patch('/api/customers/:customerId', async (req, res) => {
    const updatedCustomer = await prisma.customer.update({
        where: { id: req.params.customerId },
        data: req.body
    })
    res.send(updatedCustomer)
})
//*************************************************************/

//ORDERS
app.get('/api/orders/:customerId', async (req, res) => {
    const orders = await prisma.order.findMany({
        where: { customerId: req.params.customerId },
        include: { product: true },
        orderBy: { dateOrdered: 'desc' }
    })
    if (orders.length) { res.send(orders) }
    else res.sendStatus(404)
})

app.post('/api/orders', async (req, res) => {
    let order = await prisma.order.create({
        data: req.body
    })
    if (order) {
        order = await prisma.order.findUnique({ where: { id: order.id }, include: { product: true } })
        await prisma.cartItem.delete({
            where: {
                customerId_productId: {
                    customerId: req.body.customerId,
                    productId: req.body.productId
                }
            }
        })
        await prisma.product.update({
            where: { id: req.body.productId },
            data: {
                stock: { decrement: req.body.quantity }
            }
        })
        res.status(201).send(order)
    }
})
//************************************************************/

//CATEGORIES
app.get('/api/categories', async (req, res) => {
    const categories = await prisma.category.findMany()
    if (categories.length) { res.send(categories) }
    else { res.sendStatus(404) }

})
//************************************************************/

//PRODUCTS
app.get('/api/products', async (req, res) => {
    const products = await prisma.product.findMany()
    if (products.length) { res.send(products) }
    else { res.sendStatus(404) }
})

app.get('/api/products/:productId', async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { id: parseInt(req.params.productId) }
    })
    if (product) { res.send(product) }
    else { res.sendStatus(404) }

})
//************************************************************/

//CART ITEMS
app.get('/api/cartItems/:customerId', async (req, res) => {
    const cartItems = await prisma.cartItem.findMany({
        where: { customerId: req.params.customerId },
        include: {
            product: true
        },
        orderBy: { dateAdded: 'desc' }
    })
    if (cartItems.length) { res.send(cartItems) }
    else { res.sendStatus(404) }
})

async function getItemInCart(customerId, productId) {
    return await prisma.cartItem.findUnique({
        where: {
            customerId_productId: {
                customerId,
                productId
            }
        },
        include: {
            product: true
        }
    })
}

app.post('/api/cartItems/', async (req, res) => {
    const customerId = req.body.customerId
    const productId = req.body.productId
    const existingItem = await prisma.cartItem.findUnique({
        where: {
            customerId_productId: {
                customerId,
                productId
            }
        }
    })
    if (existingItem) { return res.sendStatus(409) }
    else {
        let newItem = await prisma.cartItem.create({
            data: req.body
        })
        if (newItem) {
            newItem = await getItemInCart(customerId, productId)
            return res.status(201).send(newItem)
        }
    }
    res.sendStatus(500)
})

app.patch('/api/cartItems/:customerId/:productId', async (req, res) => {
    const customerId = req.params.customerId
    const productId = parseInt(req.params.productId)
    let updatedItem = await prisma.cartItem.update({
        where: {
            customerId_productId: {
                customerId,
                productId
            }
        },
        data: {
            quantity: req.body.quantity
        }
    })
    if (updatedItem) {
        updatedItem = await getItemInCart(customerId, productId)
        res.send(updatedItem)
    }
    else { res.sendStatus(500) }
})

app.delete('/api/cartItems/:customerId/:productId', async (req, res) => {
    const deletedItem = await prisma.cartItem.delete({
        where: {
            customerId_productId: {
                customerId: req.params.customerId,
                productId: parseInt(req.params.productId)
            }
        }
    })
    if (deletedItem) { res.sendStatus(200) }
    else { res.sendStatus(500) }
})
//************************************************************/

//CATCH ALL
app.all('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'))
})
//************************************************************/


const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server listening on port ${port}`))