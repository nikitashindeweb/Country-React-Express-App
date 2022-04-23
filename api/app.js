var express = require("express");
var app = express();
var cors = require('cors');
const multer = require('multer');
app.use(
  cors()
)

// Create storarge for uplaoding file
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../storage/images');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('flag');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**
 * Uplaod file API
 * Route /upload
 */
app.post('/upload', function (request, response) {

  upload(request, response, function (err) {
    if (err) {
      return response.send({ status: 0, data: 'Error in file upload!' });
    }
    return response.send({
      status: 1,
      file: `images/${request.file.filename}`
    });
  });
});

app.listen(8080, function () {
  console.log("Working on port 8080");
});