import request from "../../utils/request"
import config from "../../config/config"
import * as echarts from '../../ec-canvas/echarts';
let barChart = null;
let barChart2 = null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    dateData: '请选择',
    more: false,
    height:'400',
    deptPicker: [],
    deptIndex: 0,
    purchaseTime:'',
    params:{},
    deptId:'',
    ec1: {
      disableTouch: true,
      lazyLoad: true
    },

    ec3: {
      disableTouch: true,
      lazyLoad: true
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getAssetsRecordCount() {
    request._post(config.getAssetsRecordCount,{deptId:this.data.deptId,params:this.data.params} , res => {

      console.log(res)
      if( Object.keys(res.data.data).length==0){
        wx.showToast({
          title: '未查到此数据',
          icon:'none',
          duration:2000
        })
        this.setData({
          params:{}
        })
      }else{
        this.setData({
          data: res.data.data
        })
        this.getChartTestData()
      }

    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      dateData: e.detail.value
    })
  },
  dictData(dict) {
    request._post(config.dictData, {
      dictType: dict
    }, res => {
      let picker = []
      res.data.data.forEach(item => {
        picker.push({ dictLabel: item.dictLabel, dictValue: item.dictValue })
      })
      picker.unshift({dictLabel: '请选择', dictValue: ''})
    
        this.setData({
          deptPicker: picker
        })
   
      
    }, err => {
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
        duration: 2000
      })
    })
  },
  deptPickerChange(e) {
    let dictValue = e.detail.value;
    this.setData({
      deptIndex: dictValue
    })
    console.log(this.data.deptIndex)

  },
  purchaseTime(e){
    let purchaseTime = e.detail.value
 
    this.setData({
      purchaseTime: purchaseTime
    })
  },
  searchBtn(){
    let params={}
     let  deptId = this.data.deptPicker[this.data.deptIndex].dictValue
      
    //  params.deptId = this.data.deptPicker[this.data.deptIndex].dictValue
     params.purchaseTime = this.data.purchaseTime

     this.setData({
      deptId:deptId,
      params:params
     })

     this.getAssetsRecordCount()
  },
  resetBtn(){
    this.setData({
      dateData:'请选择',
      deptIndex:0
    })
    this.getAssetsRecordCount()
  },
  onLoad: function (options) {
    this.dictData('dict_dept')
    this.getAssetsRecordCount()
  },
  seeMore() {
    this.setData({
      more:true
    })
    this.getAssetsRecordCount()
  },

  //初始化图表
  init_echarts1: function (chartData) {
    this.chart1Componnet = this.selectComponent('#mychart1'); //去获取echarts    这里的id就是echarts的id
    this.chart1Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      barChart = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      barChart.setOption(this.getBarOption1(chartData));
      return barChart; //一定要return出去
    });
  },

  //柱状图
  init_echarts3: function (chartData) {
    this.chart3Componnet = this.selectComponent('#mychart3'); //去获取echarts    这里的id就是echarts的id
    this.chart3Componnet.init((canvas, width, height, dpr) => {
      // 初始化图表 
      barChart2 = echarts.init(canvas, null, { //echarts会继承父元素的宽高
        width: width,
        height: height,
        devicePixelRatio: dpr // 像素
      });
      barChart2.setOption(this.getBarOption2(chartData));
      return barChart2; //一定要return出去
    });
  },

  //柱状图配置
  getBarOption1: function (chartData) {
    var option = {

      grid: {
        left: '0%',
        right: '15%',
        bottom: '0',
        top: "0",
        containLabel: true
      },
      //坐标轴触发，。   'item'  , 'axis' ,'none'
      tooltip: {
        // 悬停指示
        trigger: "item",
        // formatter: "{b}: {c}%"
      },

      xAxis: {
        show: false,
        // max: 100,
        min: 0,
      },
      yAxis: {
        data: chartData.yData,
        axisTick: {       //x轴刻度线
          show: false
        },
        splitLine: {     //网格线
          show: false
        },
        axisLine: {    //坐标轴线
          show: false
        }

      },
      series: chartData.seriesData
    }
    return option
  },

  //柱状图配置 2
  getBarOption2: function (chartData) {
    var option = {
      // title: {
      //   left: 'center',
      //   text: chartData.title,
      // },
      grid: {
        left: '3%',
        right: '4%',
        containLabel: true
      },
      //坐标轴触发，。   'item'  , 'axis' ,'none'
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   bottom: 10,
      //   data: chartData.legendData
      // },
      xAxis: [{
        data: chartData.xData1,

      }],
      yAxis: {
        axisTick: {       //x轴刻度线
          show: false
        },
        splitLine: {     //网格线
          show: false
        },
        axisLine: {    //坐标轴线
          show: false
        }
      },
      series: [{
        type: 'bar',
        itemStyle:{
          normal:{
            label:{
              show:true,
              position:'top'
            }
          }
        },
        // label: {
        //   show: true,
        //   position: 'top'
        // },
        // name: chartData.legendData,
        data: chartData.seriesData
      }]
    }
    return option
  },

  //图表假数据
  getChartTestData(more = false) {

    let yData = [];
    let xData = [];
    let yData1 = [];
    let xData1 = [];

    if(this.data.data.assetsTypeList){
      this.data.data.assetsTypeList.forEach(item => {
        xData.push(item.number)
        yData.push(item.typeName)
      })
    
    }
    
    if(this.data.data.assetsStatusList){
      this.data.data.assetsStatusList.forEach(item => {
        yData1.push(item.number)
        xData1.push(item.status)
      })
    }
  
    
  

    if (!this.data.more) {
      if (yData.length > 3) {
        yData.length = 3
      }
      if (xData.length > 3) {
        xData.length = 3
      }
    } else{
      this.setData({
        height:yData.length*120
      },()=>{
    
      })
    }


    var dataArr = [{
      name: '种类统计',
      type: 'bar',
      data: xData,
      barWidth: 15,//柱图宽度
      itemStyle: {
        barBorderRadius: [50, 50, 50, 50] // 统一设置四个角的圆角大小
      },

      //标签
      label: {
        normal: {
          show: true,
          position: 'right',
        },
      },
      itemStyle: {
        barBorderRadius: [50, 0, 0, 50], // 统一设置四个角的圆角大小
        normal: {
          //这里是重点
          color: function (params) {
            //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
            var colorList = ['#00F4FF', '#0092FF', '#0061FE', '#002099', '#000682'];
            return colorList[params.dataIndex]
          }
        }
      }
    },
    ]

    var chartData = {
      // title: '某地区蒸发量和降水量',
      // legendData: ['蒸发量', '降水量'],
      xData: xData,
      yData: yData,
      seriesData: dataArr
    };
    this.init_echarts1(chartData)


    var chartData3 = {
      title: '状态统计',
      xData1: xData1,
      seriesData: yData1
    };

    this.init_echarts3(chartData3)

  },
})