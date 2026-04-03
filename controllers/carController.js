const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: cars.length,
            data: cars,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};


exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ 
                success: false,
                error: 'Car not found' 
            });
        }
        res.json({
            success: true,
            data: car,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};


exports.createCar = async (req, res) => {
    try {
        const { name, price, year, mileage, description, transmission, fuelType, condition, mainImg, sub1, sub2 } = req.body;


        if (!name || !price || !year || !mainImg) {
            return res.status(400).json({ 
                success: false,
                error: 'Please provide name, price, year, and mainImg' 
            });
        }

        const car = new Car({
            name,
            price,
            year,
            mileage,
            description,
            transmission,
            fuelType,
            condition,
            mainImg,
            sub1,
            sub2,
        });

        await car.save();

        res.status(201).json({
            success: true,
            message: 'Car created successfully',
            data: car,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};


exports.updateCar = async (req, res) => {
    try {
        const { name, price, year, mileage, description, transmission, fuelType, condition, mainImg, sub1, sub2 } = req.body;

        let car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ 
                success: false,
                error: 'Car not found' 
            });
        }


        if (name) car.name = name;
        if (price) car.price = price;
        if (year) car.year = year;
        if (mileage) car.mileage = mileage;
        if (description) car.description = description;
        if (transmission) car.transmission = transmission;
        if (fuelType) car.fuelType = fuelType;
        if (condition) car.condition = condition;
        if (mainImg) car.mainImg = mainImg;
        if (sub1) car.sub1 = sub1;
        if (sub2) car.sub2 = sub2;

        await car.save();

        res.json({
            success: true,
            message: 'Car updated successfully',
            data: car,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};


exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) {
            return res.status(404).json({ 
                success: false,
                error: 'Car not found' 
            });
        }

        res.json({
            success: true,
            message: 'Car deleted successfully',
            data: car,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            error: error.message 
        });
    }
};
