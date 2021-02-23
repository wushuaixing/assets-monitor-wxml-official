import assetsAuction from '../../assets/img/components/assets-auction.png'
import subrogation from '../../assets/img/components/subrogation.png'

// 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-涉诉 5：破产立案 6：破产公告 7：涉诉-立案 8：涉诉-开庭 9：涉诉-涉诉
const getPlot = (type: number) => {
  switch (type) {
    case 1: return assetsAuction;
    case 2: return subrogation;
    case 3: return subrogation;
    case 4: return subrogation;
    case 5: return subrogation;
    case 6: return subrogation;
    case 7: return subrogation;
    case 8: return subrogation;
    default: return assetsAuction;
  }
};

const getTitleTag = (type: number, bankruptcyType: number) => {
  let title = '资产拍卖';
  switch (type) {
    case 1: title = '资产拍卖'; break;
    case 2: title = '代位权-立案'; break;
    case 3: title = '代位权-开庭'; break;
    case 4: title = '代位权-文书'; break;
    case 5: title = bankruptcyType === 1 ? '破产重整立案' : '破产重整公告'; break;
    case 6: title = '涉诉-立案'; break;
    case 7: title = '涉诉-开庭'; break;
    case 8: title = '涉诉-立案'; break;
  }
  return title
};


export { getPlot, getTitleTag}
