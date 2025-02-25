const crypto = require('crypto'); // 引入加密模块
const fs = require('fs'); // 引入文件系统模块

// 1. 哈希算法
const hash = crypto.createHash('sha256'); // 创建 SHA-256 哈希对象
hash.update('Some data to hash'); // 更新哈希对象的内容
console.log('Hash:', hash.digest('hex')); // 计算并输出哈希值（十六进制格式）

// 2. HMAC（基于哈希的消息认证码）
const hmac = crypto.createHmac('sha256', 'secret-key'); // 创建 HMAC 对象，使用 SHA-256 和密钥
hmac.update('Some data to authenticate'); // 更新 HMAC 对象的内容
console.log('HMAC:', hmac.digest('hex')); // 计算并输出 HMAC 值（十六进制格式）

// 3. 密码学签名和验证
const sign = crypto.createSign('SHA256'); // 创建签名对象，使用 SHA-256
sign.update('Some data to sign'); // 更新签名对象的内容
sign.end(); // 结束签名对象的输入
const privateKey = fs.readFileSync('private.pem', 'utf8'); // 读取私钥文件
const signature = sign.sign(privateKey, 'hex'); // 使用私钥生成签名（十六进制格式）
console.log('Signature:', signature); // 输出签名

const verify = crypto.createVerify('SHA256'); // 创建验证对象，使用 SHA-256
verify.update('Some data to sign'); // 更新验证对象的内容
verify.end(); // 结束验证对象的输入
const publicKey = fs.readFileSync('public.pem', 'utf8'); // 读取公钥文件
const verified = verify.verify(publicKey, signature, 'hex'); // 使用公钥验证签名
console.log('Verified:', verified); // 输出验证结果（true 或 false）

// 4. 加密和解密
const algorithm = 'aes-256-cbc'; // 定义加密算法
const key = crypto.randomBytes(32); // 生成 32 字节的随机密钥
const iv = crypto.randomBytes(16); // 生成 16 字节的随机初始化向量

// 加密
const cipher = crypto.createCipheriv(algorithm, key, iv); // 创建加密对象
let encrypted = cipher.update('Some data to encrypt', 'utf8', 'hex'); // 加密数据
encrypted += cipher.final('hex'); // 结束加密并输出结果（十六进制格式）
console.log('Encrypted:', encrypted); // 输出加密后的数据

// 解密
const decipher = crypto.createDecipheriv(algorithm, key, iv); // 创建解密对象
let decrypted = decipher.update(encrypted, 'hex', 'utf8'); // 解密数据
decrypted += decipher.final('utf8'); // 结束解密并输出结果（UTF-8 格式）
console.log('Decrypted:', decrypted); // 输出解密后的数据

// 5. 密钥派生函数 - pbkdf2
const password = 'password'; // 定义密码
const salt = crypto.randomBytes(16); // 生成 16 字节的随机盐
const iterations = 1000; // 定义迭代次数
const keylen = 64; // 定义派生密钥的长度
const digest = 'sha512'; // 定义哈希算法

crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
	if (err) throw err; // 如果出错，抛出异常
	console.log('Derived Key (pbkdf2):', derivedKey.toString('hex')); // 输出派生密钥（十六进制格式）
});

// 6. 密钥派生函数 - scrypt
crypto.scrypt(password, salt, keylen, (err, derivedKey) => {
	if (err) throw err; // 如果出错，抛出异常
	console.log('Derived Key (scrypt):', derivedKey.toString('hex')); // 输出派生密钥（十六进制格式）
});
