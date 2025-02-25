// 创建 Buffer
const buf1 = Buffer.from('Hello, world!', 'utf8');
console.log('Buffer from string:', buf1);

const buf2 = Buffer.from([72, 101, 108, 108, 111]);
console.log('Buffer from array:', buf2);

const buf3 = Buffer.alloc(10);
console.log('Allocated buffer with size 10:', buf3);

const buf4 = Buffer.allocUnsafe(10);
console.log('Uninitialized buffer with size 10:', buf4);

// 写入 Buffer
buf3.write('Node.js', 0, 'utf8');
console.log('Written to allocated buffer:', buf3);

// 读取 Buffer
const str = buf1.toString('utf8');
console.log('String from buffer:', str);

const intLE = buf1.readIntLE(0, 5);
console.log('Read little-endian integer:', intLE);

const intBE = buf1.readIntBE(0, 5);
console.log('Read big-endian integer:', intBE);

// 操作 Buffer
const sliceBuf = buf1.slice(0, 5);
console.log('Sliced buffer:', sliceBuf);

const copyBuf = Buffer.alloc(10);
buf1.copy(copyBuf, 0, 0, 5);
console.log('Copied buffer:', copyBuf);

const concatBuf = Buffer.concat([buf1, buf2]);
console.log('Concatenated buffer:', concatBuf);

const compareResult = buf1.compare(buf2);
console.log('Comparison result:', compareResult);

const filledBuf = Buffer.alloc(10).fill('A');
console.log('Filled buffer:', filledBuf);

const includesResult = buf1.includes('world');
console.log('Includes "world":', includesResult);

const indexOfResult = buf1.indexOf('world');
console.log('Index of "world":', indexOfResult);
