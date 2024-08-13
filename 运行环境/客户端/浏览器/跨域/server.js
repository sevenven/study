// 服务器
const http = require("http");
const url = require("url");

function writeHeads(
  response,
  {
    allowOrigin = "http://127.0.0.1:8887",
    allowMethods = "*",
    allowHeaders = "",
    allowCredentials = true,
    maxAge = 0,
  } = {},
  moreHeaders = {}
) {
  response.writeHead(200, {
    /* 指定允许跨域请求的域名
     * * 不允许携带cookie
     * 指定域名
     */
    "Access-Control-Allow-Origin": allowOrigin,
    /* 指定允许请求的方法类型
     * * 默认值
     * [GET|POST|HEAD|PUT|DELETE] 可选值-具体的方法类型
     */
    "Access-Control-Allow-Methods": allowMethods,
    /* 指定允许请求的方法类型
     * * 默认值
     * [GET|POST|PUT|DELETE] 可选值
     */
    // 是否允许请求携带认证信息（cookies）-该值只能是true,否则不返回
    "Access-Control-Allow-Credentials": allowCredentials,
    // -------------复杂请求专属---------------
    // 允许的请求头字段
    "Access-Control-Allow-Headers": allowHeaders,
    // 预检结果缓存时间-单位：秒
    "Access-Control-Max-Age": maxAge,
    ...moreHeaders,
  });
}

http
  .createServer(function (request, response) {
    const _ur = url.parse(request.url, true);
    switch (_ur.pathname) {
      // JSONP解决跨域
      case "/jsonp":
        const funName = _ur.query.callback;
        const res = {
          data: "jsonp ok",
        };
        response.writeHead(200, { "content-type": "application/javascript" });
        response.end(`${funName}(${JSON.stringify(res)})`);
        break;

      // CORS解决跨域-简单请求
      case "/":
        response.writeHead(302, {
          Location: "/get",
        });
        response.end();
        break;
      case "/get":
        writeHeads(response);
        response.end(
          JSON.stringify({
            data: "get ok",
          })
        );
        break;
      case "/getCookie":
        writeHeads(
          response,
          {
            // allowOrigin: "*",
          },
          {
            "content-type": "application/json",
            "Set-Cookie": [
              "id=seven; max-age=6000",
              "token=ajsdkjsbedjsbekjsbfjhbsfhjsf; max-age=60000; HttpOnly",
            ],
          }
        );
        response.end(
          JSON.stringify({
            data: "cookie ok",
          })
        );
        break;
      // CORS解决跨域-复杂请求
      case "/postJson":
        writeHeads(
          response,
          {
            allowHeaders: "content-type",
            maxAge: 1800,
          },
          {
            "content-type": "application/json",
          }
        );
        response.end(
          JSON.stringify({
            data: "postJson ok",
          })
        );
        break;
      case "/postJsonCookie":
        writeHeads(
          response,
          {
            allowHeaders: "content-type",
            maxAge: 1800,
          },
          {
            "content-type": "application/json",
            "Set-Cookie": [
              "id=seven",
              "token=ajsdkjsbedjsbekjsbfjhbsfhjsf; max-age=60000; HttpOnly",
            ],
          }
        );
        response.end(
          JSON.stringify({
            data: "cookie ok",
          })
        );
        break;
      case "/getHeader":
        writeHeads(
          response,
          {
            allowHeaders: ["coustom-header", "another-coustom-header"],
            maxAge: 1800,
          },
          {
            "content-type": "application/json",
          }
        );
        response.end(
          JSON.stringify({
            data: "header ok",
          })
        );
        break;
      // CORS解决跨域-nginx
      case "/getNginx":
        response.writeHead(200);
        response.end(
          JSON.stringify({
            data: "getNginx ok",
          })
        );
        break;
    }
  })
  .listen(8888);

console.log("visit: http://127.0.0.1:8888/");
