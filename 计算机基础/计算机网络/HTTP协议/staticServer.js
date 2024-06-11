const http = require("http");
const fs = require("fs");
const url = require("url");
const zlib = require("zlib");

http
  .createServer(function (request, response) {
    const _ur = url.parse(request.url, true);

    switch (_ur.pathname) {
      // 请求index.html
      case "/":
        //  or 301
        response.writeHead(302, {
          Location: "/newIndex",
        });
        response.end();
        break;
      case "/newIndex":
        response.writeHead(200, {
          "content-type": "text/html",
          "content-encoding": "gzip",
          "cache-control": "no-store",
          // "content-security-policy":
          //   "script-src 'self'; form-action 'self'; report-uri /report",
        });
        // response.end(fs.readFileSync("index.html", "utf8"));
        response.end(zlib.gzipSync(fs.readFileSync("index.html")));
        break;
      case "/js/jquery-1.11.3.js":
        const lastModified = request.headers["if-modified-since"];
        const etag = request.headers["if-none-match"];

        const modified = "1717314205590",
          tag = "!@#$";
        if (lastModified !== modified || etag !== tag) {
          response.writeHead(200, {
            "content-type": "text/javascript",
            "cache-control": "max-age=60000, no-cache",
            "last-modified": modified,
            Etag: tag,
          });
          response.end(fs.readFileSync("js/jquery-1.11.3.js", "utf8"));
        } else {
          response.writeHead(304, {
            "content-type": "text/javascript",
            /*
             * max-age 单位：秒
             * no-cache 可以在客户端存储资源 但每次都必须去服务端做资源验证，服务端决定是[获取新的资源|200]还是[使用客户端缓存|304]也就是所谓的协商缓存。
             * no-store 永远都不要在[客户端|代理服务器]存储资源，永远都去原始服务器去获取资源。
             */
            "cache-control": "max-age=60000, no-cache",
            "last-modified": modified,
            Etag: tag,
          });
          response.end();
        }
        break;
      default:
        response.writeHead(200, {
          "Content-Type": "image/webp",
          Connection: "keep-alive", // [keep-alive|close]
        });
        response.end(fs.readFileSync("images/bixiong.webp"));
        break;
    }
  })
  .listen(8887);

console.log("visit: http://127.0.0.1:8887/");
