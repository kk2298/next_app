import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        required: true,
    },
    video_title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    video_url: {
        type: String,
        default: "",
    },
    tags: {
        type: [String],
        default: [],
    },
    keywords: {
        type: [String],
        default: []
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    },{timestamps: true});

const Product = mongoose.models.product ||  mongoose.model('product', productSchema);
export default Product;