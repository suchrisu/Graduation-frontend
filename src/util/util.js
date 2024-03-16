import { ElLoading } from "element-plus"
import { md5 } from "js-md5"

//防抖
export function debounce(fn) {
  console.log(1)
  let t = null //只会执行一次
  debugger

  return function () {
    if (t) {
      clearTimeout(t)
    }
    t = setTimeout(() => {
      console.log(temp) //可以获取
      // console.log(arguments[0]) //undefined
      fn.apply(this, arguments)
      //在这个回调函数里面的argument是这个回调函数的参数，因为没有参数所以undefined，可以通过外面的函数赋值来进行访问
      //也可以改变成箭头函数,箭头函数的this是指向定义函数的那一层的，所以访问到的arguments是上一层函数的arguments
    }, 1000)
  }
}
//节流
export function throttle(fn, delay = 200) {
  let timer = null
  console.log(fn)
  debugger
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      debugger
      fn.apply(this, arguments)
      timer = null
    })
  }
}
//下拉动画
export function animation(obj, target, fn1) {
  // console.log(fn1);
  // fn是一个回调函数，在定时器结束的时候添加
  // 每次开定时器之前先清除掉定时器
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    // 步长计算公式  越来越小
    // 步长取整
    var step = (target - obj.scrollTop) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.scrollTop >= target) {
      clearInterval(obj.timer)
      // 如果fn1存在，调用fn
      if (fn1) {
        fn1()
      }
    } else {
      // 每30毫秒就将新的值给obj.left
      obj.scrollTop = obj.scrollTop + step
    }
  }, 10)
}

//判断文件类型
export function judgeFileType(file) {
  if (file == null || file == '') {
    alert('请选择要上传的图片!')
    return false
  }
  if (file.lastIndexOf('.') == -1) {
    //如果不存在"."
    alert('路径不正确!')
    return false
  }
  var AllImgExt = '.jpg|.jpeg|.gif|.bmp|.png|'
  var extName = file.substring(file.lastIndexOf('.')).toLowerCase() //（把路径中的所有字母全部转换为小写）
  if (AllImgExt.indexOf(extName + '|') == -1) {
    ErrMsg =
      '该文件类型不允许上传。请上传 ' +
      AllImgExt +
      ' 类型的文件，当前文件类型为' +
      extName
    alert(ErrMsg)
    return false
  }
}

//文件类型
export function fileType() {
  return {
    'application/msword': 'word',
    'application/pdf': 'pdf',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.ms-excel': 'excel',
    'aplication/zip': 'zpi',
  }
}

export function getTime() {
  let now = new Date(new Date().getTime())
  //返回2020-1-1格式
  var year = now.getFullYear() //取得4位数的年份
  var month = now.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate() //返回日期月份中的天数（1到31）
  var hour = now.getHours() //返回日期中的小时数（0到23）
  var minute = now.getMinutes() //返回日期中的分钟数（0到59）
  var second = now.getSeconds() //返回日期中的秒数（0到59）
  //返回2020-01-01格式
  minute = minute + ''
  minute = minute.length == 1 ? '0' + minute : minute
  month = month + ''
  month = month.length == 1 ? '0' + month : month
  hour = hour + ''
  hour = hour.length == 1 ? '0' + hour : hour
  date = date + ''
  date = date.length == 1 ? '0' + date : date
  second = second + ''
  second = second.length == 1 ? '0' + second : second
  return (
    year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  )
}

export function sessionStorageSet(key, value) {
  if (typeof value === 'object') {
    var valueTemp = deepClone(value)
    sessionStorage.setItem(key, JSON.stringify(valueTemp))
    return;
  }
  sessionStorage.setItem(key, value)
}

export function sessionStorageGet(key) {
  const value = sessionStorage.getItem(key) || ''
  try {
    const val = JSON.parse(value)
    if ('number' === typeof val) {
      return value
    } else {
      return val
    }
  } catch (e) {
    return value
  }
}

export function sessionStorageRemove(key) {
  sessionStorage.removeItem(key)
}

export function sessionStorageClearAll() {
  sessionStorage.clear()
}



export function loadingWindow(){
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  return loading;
}
// export function loadingWindow() {
//   const loading = {
//     lock: true,
//     text: 'Loading',
//     spinner: 'el-icon-loading',
//     background: 'rgba(0, 0, 0, 0.7)',
//   }
//   return loading
// }

export function getDate() {
  let now = new Date(new Date().getTime())
  //返回2020-1-1格式
  var year = now.getFullYear() //取得4位数的年份
  var month = now.getMonth() + 1 //取得日期中的月份，其中0表示1月，11表示12月
  var date = now.getDate() //返回日期月份中的天数（1到31）
  //返回2020-01-01格式
  month = month + ''
  month = month.length == 1 ? '0' + month : month
  date = date + ''
  date = date.length == 1 ? '0' + date : date
  return year + '-' + month + '-' + date
}

export function toMd5(input){
  return md5(input+"sususu");
}

//使用递归的方式实现数组、对象的深拷贝
export function deepClone (obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
      for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
              //判断ojb子元素是否为对象，如果是，递归复制
              if (obj[key] && typeof obj[key] === "object") {
                  objClone[key] = deepClone(obj[key]);
              } else {
                  //如果不是，简单复制
                  objClone[key] = obj[key];
              }
          }
      }
  }
  return objClone;
};   
