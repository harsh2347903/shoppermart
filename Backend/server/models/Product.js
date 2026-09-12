const mongoose = require('mongoose');
// Nested schemas mirror public/data.json. _id:false keeps the product document simple.
const reviewSchema = new mongoose.Schema({ rating: Number, comment: String, date: Date, reviewerName: String, reviewerEmail: String }, { _id: false });
const dimensionSchema = new mongoose.Schema({ width: Number, height: Number, depth: Number }, { _id: false });
const metaSchema = new mongoose.Schema({ createdAt: Date, updatedAt: Date, barcode: String, qrCode: String }, { _id: false });
const productSchema = new mongoose.Schema({
  sourceId: { type: Number, unique: true, sparse: true }, // original DummyJSON id; MongoDB uses _id
  title: { type: String, required: true, trim: true }, description: { type: String, required: true },
  category: { type: String, required: true, trim: true }, price: { type: Number, required: true, min: 0 },
  discountPercentage: { type: Number, default: 0 }, rating: { type: Number, default: 0, min: 0, max: 5 }, stock: { type: Number, default: 0, min: 0 },
  tags: [String], brand: String, sku: String, weight: Number, dimensions: dimensionSchema,
  warrantyInformation: String, shippingInformation: String, availabilityStatus: String,
  reviews: [reviewSchema], returnPolicy: String, minimumOrderQuantity: Number,
  meta: metaSchema, images: [String], thumbnail: String
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
