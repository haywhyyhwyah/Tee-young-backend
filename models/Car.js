const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        mileage: {
            type: String,
            default: 'N/A',
        },
        description: {
            type: String,
            default: '',
        },
        transmission: {
            type: String,
            enum: ['Manual', 'Automatic'],
            default: 'Automatic',
        },
        fuelType: {
            type: String,
            enum: ['Petrol', 'Diesel', 'Hybrid', 'Electric'],
            default: 'Petrol',
        },
        condition: {
            type: String,
            enum: ['New', 'Excellent', 'Good', 'Fair'],
            default: 'Good',
        },
        // Image storage - URLs from Cloudinary
        mainImg: {
            type: String,
            required: true,
        },
        sub1: {
            type: String,
            default: '',
        },
        sub2: {
            type: String,
            default: '',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Car', carSchema);
