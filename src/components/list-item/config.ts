import assetsAuction from '../../assets/img/components/assets-auction.png'
import subrogation from '../../assets/img/components/subrogation.png'

// 1：资产拍卖 2：代位权-立案 3：代位权-开庭 4：代位权-涉诉 5：破产 6：涉诉-立案 7：涉诉-开庭 8：涉诉-涉诉
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


export { getPlot }
