const Multer = require("multer");

const upload = new Multer({
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB,
  },
  fileFilter(_, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error("Please upload .jpg, .jpeg, .png"));
    }

    callback(undefined, true);
  },
});

module.exports = upload;
