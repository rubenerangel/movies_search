"use strict";

var _express = _interopRequireDefault(require("express"));

var _index = _interopRequireDefault(require("./routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 3000;
app.use('/', _index["default"]);
app.get('/', function (req, res) {
  return res.status(200).send({
    message: 'Welcome to the beginning of nothingness.'
  });
});
app.use(function (req, res, next) {
  res.status(404);

  if (req.accepts('json')) {
    res.send({
      error: true,
      message: 'Route Not found'
    });
    return;
  }
});
app.listen(port, function () {
  console.log("App is listening on port ".concat(port));
});