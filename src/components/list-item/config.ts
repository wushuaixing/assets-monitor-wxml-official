import assetsAuction from '../../assets/img/components/assets-auction.png'

const getPlot = (type: string) => {
  switch (type) {
    case 'assetsAuction': return assetsAuction; break;
    default: return assetsAuction;
  }
};

export { getPlot }
