// config.js
/**
 * 小程序后端接口配置文件
 */
// const host = "http://114.215.40.116:29908"
const host = "http://euan.nx.cn:29908"
// const host = "http://euan.nx.cn:29001"
// const host = "https://218.203.155.208:3002"
// const host = "https://www.nxgloa.com:3002"

var config = {

  // 下面的地址配合 Server 工作
  host,

  //登录
  login: `${host}/login`,

  //获取用户信息
  getUserInfo: `${host}/getUserInfo`,

  //获取字典
  dictData: `${host}/api/system/dictData`,

  //资产列表
  getInfoList: `${host}/api/assets/info/list`,

  //获取资产信息
  getInfo: `${host}/api/assets/info/getInfo`,

  //修改资产明细
  infoEdit: `${host}/api/assets/info/edit`,


  //获取资产盘点汇总表格信息
  getReviewAssetsRecordCount: `${host}/api/assets/summary/getReviewAssetsRecordCount`,


  //获取盘点信息
  getSummaryList: `${host}/api/assets/summary/getSummaryList`,


  //获取盘点审核列表
  getSummaryReview: `${host}/api/assets/summary/getSummaryReview`,


  //修改盘点信息
  saveSummaryReview: `${host}/api/assets/summary/saveSummaryReview`,

 
  //保存盘点记录
  saveAssetsRecord: `${host}/api/assets/record/saveAssetsRecord`,


  //查询资产记录列表
  getAssetsRecordList: `${host}/api/assets/record/getAssetsRecordList`,

  //获取资产汇总详情
  getAssetsRecordCount: `${host}/api/assets/summary/getAssetsRecordCount`,

  //根据资产id获取盘点记录
  getRecordByAssetsInfoId: `${host}/api/assets/info/getRecordByAssetsInfoId`,


  // 获取当前用户未审核结束的盘点信息
  getAssetsSummaryByUser: `${host}/api/assets/summary/getAssetsSummaryByUser`,

  //  盘点选择物资
  getAssetsInfoLevel: `${host}/api/assets/info/getAssetsInfoLevel`,

  //  保存汇盘点汇总信息
  addAssetsSummary: `${host}/api/assets/summary/addAssetsSummary`,

    //  退出登录
    logout: `${host}/logout`,


};
//对外把对象config返回
module.exports = config