var fs = require("fs");
var crypto = require("crypto");

var utils = crypto.createHash("sha512");

let buf = Buffer.alloc(8543519);

fs.open("./npmlog-6.0.2.tgz", "r+", function (err, fd) {
  if (err) {
    return console.log("error ", err);
  }
  fs.read(fd, buf, 0, buf.length, 0, function (err2) {
    if (err2) {
      return console.log("error ", err2);
    }
    utils.update(buf);
    var d = utils.digest("Base64");
    return console.log(d);
  });
});
