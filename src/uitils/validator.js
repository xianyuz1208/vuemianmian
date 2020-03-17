export const checkPhone = (rule, value, callback) => {
  let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error("请输入正确的手机格式"));
  }
};
export const checkMailbox = (rule, value, callback) => {
  let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value) == true) {
    callback();
  } else {
    callback(new Error("请输入正确的邮箱格式"));
  }
};