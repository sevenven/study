// 创建 Buffer
const buf1 = Buffer.from('Hello, world!', 'utf8'); // 从字符串创建 Buffer
console.log('Buffer from string:', buf1);
const buf2 = Buffer.from([72, 101, 108, 108, 111]); // 从数组创建 Buffer
console.log('Buffer from array:', buf2);
const buf3 = Buffer.alloc(10); // 创建一个新的 Buffer，大小为 10
console.log('Allocated buffer with size 10:', buf3);
const buf4 = Buffer.allocUnsafe(10); // 创建一个新的未初始化的 Buffer，大小为 10（不安全，可能包含旧数据）
console.log('Uninitialized buffer with size 10:', buf4);

// 写入 Buffer
buf3.write('Node.js', 0, 'utf8'); // 将字符串 'Node.js' 写入 buf3，从偏移量 0 开始，使用 UTF-8 编码
console.log('Written to allocated buffer:', buf3);

// 读取 Buffer
const str = buf1.toString('utf8'); // 将 buf1 解码为字符串，使用 UTF-8 编码
console.log('String from buffer:', str);

const intLE = buf1.readIntLE(0, 5); // 从 buf1 中读取一个小端序的 5 个字节整数，从偏移量 0 开始
console.log('Read little-endian integer:', intLE);

const intBE = buf1.readIntBE(0, 5); // 从 buf1 中读取一个大端序的 5 个字节整数，从偏移量 0 开始
console.log('Read big-endian integer:', intBE);

// 操作 Buffer
const sliceBuf = buf1.slice(0, 5); // 从 buf1 中创建一个新的 Buffer，包含前 5 个字节
console.log('Sliced buffer:', sliceBuf);

const copyBuf = Buffer.alloc(10); // 创建一个新的 Buffer，大小为 10
buf1.copy(copyBuf, 0, 0, 5); // 将 buf1 的前 5 个字节复制到 copyBuf，从偏移量 0 开始
console.log('Copied buffer:', copyBuf);

const concatBuf = Buffer.concat([buf1, buf2]); // 将 buf1 和 buf2 连接成一个新的 Buffer
console.log('Concatenated buffer:', concatBuf);

const compareResult = buf1.compare(buf2); // 比较 buf1 和 buf2
console.log('Comparison result:', compareResult);

const filledBuf = Buffer.alloc(10).fill('A'); // 创建一个新的 Buffer，大小为 10，并用 'A' 填充整个缓冲区
console.log('Filled buffer:', filledBuf);

const includesResult = buf1.includes('world'); // 检查 buf1 是否包含子字符串 'world'
console.log('Includes "world":', includesResult);

const indexOfResult = buf1.indexOf('world'); // 查找子字符串 'world' 在 buf1 中的索引位置
console.log('Index of "world":', indexOfResult);
