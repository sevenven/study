```
export default () => {
    const add = (a, b) => a*b; // lazy parsing
    // const add = ((a, b) => a*b); // eager parsing
    const num1 = 1;
    const num2 = 2;
    add(num1, num2);
}
```