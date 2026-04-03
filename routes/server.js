const upload = require('./fileUpload');

app.post('/api/upload', upload.single('image'), (req, res) => {
    // 'req.file.path' is the Cloudinary URL!
    res.json({ url: req.file.path });
});