//全局过滤器

//品牌状态是否显示
exports.filterBrandState = val => {
  switch (val) {
      case 1:
          return "未显示";
      case 2:
          return "已显示";
      default:
          break;
  }
}

//软文页审核状态过滤
exports.filterState = val => {
  switch (val) {
      case 0:
          return "审核中";
      case 1:
          return "通过";
      case 2:
          return "未通过";
      default:
          break;
  }
}

//民宿审核状态过滤
exports.filterAudit = val => {
  switch (val) {
      case 1:
          return "未审核";
      case 2:
          return "通过";
      case 3:
          return "未通过";
      default:
          break;
  }
}

//软文推荐状态
exports.filterReco = val => {
  switch (val) {
      case 0:
          return "未推荐";
      case 1:
          return "已推荐";
      default:
          break;
  }
}

//订单状态
exports.filterOrder = val => {
  switch (val) {
      case 1:
          return "待支付";
      case 2:
          return "待发货";
      case 3:
          return "申请退款中";
      case 4:
          return "已退款";
      case 5:
          return "已发货";
      case 6:
          return "已完成";
      case 7:
          return "已取消";
      case 8:
          return "删除";
      case 9:
          return "取消退款";
      case 10:
          return "换货申请中";
      case 11:
          return "申请换货失败";
      case 12:
          return "申请换货成功";
      case 14:
          return "待评论";
      default:
          break;
  }
}

//性别
exports.filterSex = val => {
  switch (val) {
      case 0:
          return "女";
      case 1:
          return "男";
      default:
          break;
  }
}

//退款状态
exports.filterRefund = val => {
  switch (val) {
      case 0:
          return "未处理";
      case 1:
          return "同意退款";
      case 2:
          return "不同意退款";
      case 3:
          return "已取";
      default:
          break;
  }
}

//是否合作方的提现  
exports.filterIsCompany = val => {
  switch (val) {
      case 1:
          return "是";
      case 2:
          return "否";
      default:
          break;
  }
}

//提现渠道
exports.filterChannel = val => {
  switch (val) {
      case 1:
          return "小程序";
      case 2:
          return "App";
      default:
          break;
  }
}

//提现状态
exports.filterWithDrawType = val => {
  switch (val) {
      case 1:
          return "成功";
      case 2:
          return "失败";
      case 3:
          return "申请中";
      default:
          break;
  }
}

//提现类型
exports.filterWithDrawManner = val => {
  switch (val) {
      case 1:
          return "支付宝";
      case 2:
          return "微信";
      default:
          break;
  }
}

//是否店家
exports.filterIsShopkeeper = val => {
  switch (val) {
      case 1:
          return "是";
      case 2:
          return "否";
      default:
          break;
  }
}

//实名认证的状态
exports.filterIsCertification = val => {
  switch (val) {
      case 0:
          return "未认证";
      case 1:
          return "审核成功";
      case 2:
          return "待审核";
      case 3:
          return "审核失败";
      default:
          break;
  }
}

//员工级别
exports.filterStafUrank = val => {
  switch (val) {
      case 0:
          return "最大权限";
      case 1:
          return "普通权限";
      default:
          break;
  }
}

//是否加入筛选条件
exports.filterJoinScreen = val => {
  switch (val) {
      case 0:
          return "未加入";
      case 1:
          return "加入";
      default:
          break;
  }
}

//是否整栋
exports.filterIsTable = val => {
      switch (val) {
          case 1:
              return "整栋";
          case 2:
              return "单间";
          default:
              break;
      }
  }
  //是否上下架
exports.filterHotelState = val => {
  switch (val) {
      case 1:
          return "上架中";
      case 2:
          return "已下架";
      default:
          return "未上架";
  }
}

//过滤禁用时间
exports.filterForbiddenTime = val => {
  if (!val) {
      return "";
  }
  if (val.indexOf('NaN') > -1) {
      return "";
  }
  if (val.indexOf(';') > -1) {
      let arr = val.split(';');
      return `从${arr[0]}至${arr[1]}`;
  }
  return val;
}

//网红民宿
exports.filterInfluencerHotel = val => {
  switch (val) {
      case 0:
          return "否";
      case 1:
          return "是";
      default:
          return "否";
  }
}

//氧吧分类
exports.filterOxygenType = val => {
  switch (val) {
      case 1:
          return "城市氧吧";
      case 2:
          return "景区氧吧";
      default:
          return "未知";
  }
}

exports.filterCheckInOutTime = val => {
  if (!val) {
      return '';
  }
  let timeArr = val.split(';');
  return `${timeArr[0]}-${timeArr[1]}`
}

//推送平台
exports.filterPushState = val => {
  switch (val) {
      case 1:
          return "全平台";
      case 2:
          return "IOS平台";
      case 3:
          return "Android平台";
      default:
          break;
  }
}
// 支付状态
exports.oType = val => {
  switch (val) {
      case 0:
          return "未选择";
      case 1:
          return "未支付";
      case 2:
          return "待发货";
	  case 3:
	      return "申请退款中";
	  case 4:
	      return "已退款";
	  case 5:
	      return "已发货";
	  case 6:
	      return "已完成";
	  case 7:
	      return "已取消";
	  case 14:
	      return "确认收货";
      default:
          break;
  }
}
// 订单类型
exports.oDistribution = val => {
  switch (val) {
	  case 0:
	      return "未选择";
      case 1:
          return "分销账单";
      case 2:
          return "普通账单";
      default:
          break;
  }
}
// 订单状态
exports.rHOType = val => {
  switch (val) {
      case 1:
          return "未支付";
      case 2:
          return "待发货";
	  case 3:
	      return "申请退款中";
	  case 4:
	      return "已退款";
	  case 5:
	      return "已发货";
	  case 6:
	      return "已完成";
	  case 7:
	      return "已取消";
	  case 8:
	      return "删除";
	  case 9:
	      return "取消退款";
	  case 10:
	      return "换货申请中";
	  case 11:
	      return "申请换货失败";
	  case 12:
	      return "申请换货成功";
	  case 14:
	      return "待评论";
      default:
          return "未知";
  }
}