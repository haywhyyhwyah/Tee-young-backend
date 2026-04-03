require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const upload = require('../config/cloudinary');
const carRoutes = require('../routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://tee-young-autos.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Server is running!');
});


app.use('/api', carRoutes);


app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        res.json({
            success: true,
            url: req.file.path,
            message: 'File uploaded successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});







// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });


module.exports = app;