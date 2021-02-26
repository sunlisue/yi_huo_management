//添加样式工具类

/**
 * 是否显示(上/下架)
 * @param {Number} i 
 */
export function addBrandIsTable(i) {
    switch (i) {
        case 1:
            return "statusPrimary";
        case 2:
            return "statusSuccess";
        default:
            break;
    }
}

/**
 * 是否整栋
 * @param {Number} i 
 */
export function addClassIsTable(i) {
    switch (i) {
        case 1:
            return "statusSuccess";
        case 2:
            return "statusPrimary";
        default:
            break;
    }
}

//是否上下架
export function addClassHotelState(i) {
    switch (i) {
        case 1:
            return "statusSuccess";
        case 2:
            return "statusFail";
        default:
            return "statusOn";
    }
}

//是否网红民宿
export function addClassInfluencerHotel(i) {
    switch (i) {
        case 0:
            return "statusFail";
        case 1:
            return "statusSuccess";
        default:
            return "statusFail";
    }
}

//支付状态
export function addPayClassStatus(i) {
    switch (i) {
        case 1:
            return "statusFail";
        case 7:
            return "statusSuccess";
        case 5:
            return "statusWarning";
        case 2:
            return "statusPrimary";
        default:
            return "statusOn";
    }
}

//性别样式
export function addSexClassStatus(i) {
    switch (i) {
        case 0:
            return "statusWarning";
        case 1:
            return "statusPrimary";
        default:
            return "statusOn";
    }
}
export default {
    addBrandIsTable,
    addClassIsTable,
    addClassHotelState,
    addClassInfluencerHotel,
    addPayClassStatus,
    addSexClassStatus
}