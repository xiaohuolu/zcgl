import request from "../utils/request"
import config from "../config/config"
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const selectDictLabel = (datas, value) => {
  var actions = [];
  Object.keys(datas).some((key) => {
   if (datas[key].dictValue == ('' + value)) {
    actions.push(datas[key].dictLabel);
    return true;
   }
  })
  return actions.join('');
 }

 

module.exports = {
  formatTime: formatTime,
  selectDictLabel,
}
