require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

// Initialize S3 Client
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Upload Function
const uploadToS3 = (folderName) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.S3_BUCKET_NAME,
            acl: "private", // or "public-read" if you want it accessible
            key: function (req, file, cb) {
                cb(null, `${folderName}/${file.originalname}`); // Save inside the specified folder
            }
        })
    });
};

module.exports = uploadToS3;
