const Router = require('koa-router');
const router = new Router({
	prefix: ''
});

const site = require('../controllers/site');
const captcha = require('../tools/captcha');

router.all('/*', async function(ctx, next){
	console.log('enter site.js');
	ctx.set('X-XSS-Protection', 0);
	ctx.set('X-Frame-Options', 'DENY');
	// ctx.set(`Content-Security-Policy`, `script-src 'self' 'sha256-nIk3U+a69DO8a0GCyK2V/qcQHQ1Y/hkEZjg9CpNxEgQ='`)
	await next();
});

router.get('/', site.index);
router.get('/post/:id', site.post);
router.post('/post/addComment', site.addComment);
router.get('/ajax/addComment', site.addComment);
router.get('/captcha', captcha.captcha);

module.exports = router;
