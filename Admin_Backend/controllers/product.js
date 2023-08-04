import { Product } from "../models/product.js";




//Add_Product
export const addProduct = async (req, res, next) => {
    try {
        const { title, description, image, price } = req.body;
        const isProductPresent = await Product.findOne({ title });
        if (isProductPresent) {
            res.status(404).json({
                success: false,
                message: "Product With This name is Already Exist"
            })
        }
        await Product.create({
            title, description, image, price, user: req.user
        })

        res.status(201).json({
            success: true,
            message: "Product Added Successfully"
        })


    } catch (error) {
        console.log('error:', error)

    }
}


//users_ALl_products
export const myAllProduct = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const products = await Product.find({ user: userId });

        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.log('error:', error)

    }
}



//Update_Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product doesn't exist",
            })
        }
        const { title, description, image, price } = req.body

        await Product.updateOne({ _id: id }, { title: title, description: description, image: image, price: price })
        res.status(200).json({
            success: true,
            message: "Product Got Updated Successfully",

        })
    } catch (error) {
        console.log('error:', error)

    }
}


//Delete_Product
export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params
        console.log(id)
        const product = await Product.findById(id);

        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product doesn't exist",
            })
        }
        await Product.deleteOne({ _id: id }) //here id is required to give
        res.status(200).json({
            success: true,
            message: "Product Got deleted Successfully",

        })
    } catch (error) {
        console.log('error:', error)

    }
}


//ALl_present_Products

export const getPresentProduct = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        console.log('error:', error)

    }
}