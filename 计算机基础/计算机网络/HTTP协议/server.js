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
      case "/cookie":
        writeHeads(
          response,
          {},
          {
            "Set-Cookie": [
              "sessionId=seven",
              // "id=seven; expires=Wed, 21 Oct 2015 07:28:00 GMT",
              "id=seven; max-age=2592000",
              "token=token&*$%; max-age=60000; HttpOnly",
            ],
          }
        );
        response.end(
          JSON.stringify({
            setCookie: true,
          })
        );
        break;
    }
  })
  .listen(8888);

console.log("visit: http://127.0.0.1:8888/");
