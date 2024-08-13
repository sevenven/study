const Koa = require('koa');
const app = new Koa();
const http = require('http');
const https = require('https');
const fs = require('fs');

const koaStatic = require('koa-static');
app.use(koaStatic('./static', {
	hidden: true,
	maxage: 365*24*3600*1000
}));
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const Pug = require('koa-pug');
/*const pug = */new Pug({
	app,
	viewPath: './views',
	noCache: process.env.NODE_ENV === 'development'
});

const routes = ['site', 'user'];
routes.forEach((route) => {
	app.use(require(`./routes/${route}`).routes());
});

http.createServer(app.callback()).listen(80, function(){
	console.log('App http is listening on port 80');
});
https.createServer({
	key: fs.readFileSync('./cert/private.key'),
	cert: fs.readFileSync('./cert/fullchain.crt')
}, app.callback()).listen(443, function(){
	console.log('App https is listening on port 443');
});
