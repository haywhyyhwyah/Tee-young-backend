const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const upload = require('../config/cloudinary');

// Get all cars
router.get('/cars', carController.getAllCars);

// Get single car by ID
router.get('/cars/:id', carController.getCarById);

// Create a new car (with image upload to Cloudinary)
router.post('/cars', upload.fields([{ name: 'mainImg' }, { name: 'sub1' }, { name: 'sub2' }]), async (req, res) => {
    try {
        const { name, price, year, mileage, description, transmission, fuelType, condition } = req.body;

        // Extract image URLs from multer
        const mainImg = req.files?.mainImg?.[0]?.path || '';
        const sub1 = req.files?.sub1?.[0]?.path || '';
        const sub2 = req.files?.sub2?.[0]?.path || '';

        if (!mainImg) {
            return res.status(400).json({ 
                success: false,
                error: 'Main image is required' 
            });
        }

        // Call the controller to save car to DB
        req.body.mainImg = mainImg;
        req.body.sub1 = sub1;
        req.body.sub2 = sub2;

        await carController.createCar(req, res);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Update a car (with optional image upload)
router.put('/cars/:id', upload.fields([{ name: 'mainImg' }, { name: 'sub1' }, { name: 'sub2' }]), async (req, res) => {
    try {
        // Extract image URLs from multer if they exist
        if (req.files?.mainImg?.[0]?.path) {
            req.body.mainImg = req.files.mainImg[0].path;
        }
        if (req.files?.sub1?.[0]?.path) {
            req.body.sub1 = req.files.sub1[0].path;
        }
        if (req.files?.sub2?.[0]?.path) {
            req.body.sub2 = req.files.sub2[0].path;
        }

        await carController.updateCar(req, res);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
});

// Delete a car
router.delete('/cars/:id', carController.deleteCar);

module.exports = router;
