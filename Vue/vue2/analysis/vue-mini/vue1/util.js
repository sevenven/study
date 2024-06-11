const getVMVal = (vm, exp) => {
  let val = vm.$data,
    expArr = exp.split(".");
  expArr.forEach((key) => (val = val[key]));
  return val;
};

// 设置exp在vm.$data中对应的值
const setVMVal = (vm, exp, newVal) => {
  let val = vm.$data;
  expArr = exp.split(".");
  expArr.forEach((key, index) => {
    if (index < expArr.length - 1) val = val[key];
    else val[key] = newVal;
  });
};
