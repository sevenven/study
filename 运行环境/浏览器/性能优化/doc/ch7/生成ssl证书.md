```
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048

openssl rsa -passin pass:x -in server.pass.key -out server.key 

openssl req -new -key server.key -out server.csr 

openssl x509 -req -sha256 -days 3650 -in server.csr -signkey server.key -out server.crt 
```


https://www.yuque.com/dangxianyuyudaoniu/kclb/2020

认准一手QQ：qq2116037761

慕课永久VIP