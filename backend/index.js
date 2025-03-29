const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const axios = require('axios'); 
const routes = require('./routes/routes'); 
const connectToCloudinary = require('./config/cloudinary');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  // This Tmp means On Your Local machine file be stored at that directory and will automatically Get 
  tempFileDir : '/tmp/',
}));

app.use("/api/v1", routes);


app.get('/', (req, res) => {
  res.send('Welcome to the HealthCare Home Page!');
});

const PORT = process.env.PORT || 8000;
connectToCloudinary()
dbConnect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error('Database connection failed:', error));
