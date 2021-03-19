import request from '../request/index';

// 当前机构统计信息
export async function currentOrganizationApi() {
  return request.get('/yc/index/information/overview/currentOrganization');
}

// 资产分类统计
export async function assetApi() {
  return request.get('/yc/wechat/index/information/asset');
}

// 风险分类统计
export async function riskApi() {
  return request.get('/yc/wechat/index/information/risk');
}



// html文书还原
export async function htmlApi() {
  // return request.get('/yc/wechat/index/information/risk');
  return  {data}
}

let img = `<p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i1/2066132243/TB2ss2ipXXXXXX.XFXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i4/2066132243/TB2_Oj5pXXXXXX0XXXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i1/2066132243/TB2X2bDpXXXXXXPXpXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i2/2066132243/TB2Ji_fpXXXXXaEXFXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i4/2066132243/TB2gSLzpXXXXXaWXpXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i4/2066132243/TB20srPpXXXXXcgXXXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i2/2066132243/TB2CI2NpXXXXXb1XXXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i2/2066132243/TB2F.zspXXXXXcdXpXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i4/2066132243/TB2edbrpXXXXXcGXpXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i1/2066132243/TB2i7ngpXXXXXamXFXXXXXXXXXX_!!0-paimai.jpg\"></p><p>&nbsp;<img src=\"https://img.alicdn.com/imgextra/i4/2066132243/TB2nPTtpXXXXXcXXpXXXXXXXXXX_!!0-paimai.jpg\"></p><div class=\"video-img\">\n        <div class=\"sf-pic-slide clearfix\">\n                                                \n                                                <div class=\"slide-bigpic\">\n                        <img src=\"//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png\" data-ks-lazyload=\"//img.alicdn.com/bao/uploaded/i2/TB1IfWVKFXXXXXNapXXeSvQ8VXX_960x960.jpg\">\n                    </div>\n                                                                <div class=\"slide-bigpic\">\n                        <img src=\"//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png\" data-ks-lazyload=\"//img.alicdn.com/bao/uploaded/i1/2066132243/TB2TEfSpXXXXXa4XXXXXXXXXXXX_!!0-paimai.jpg_960x960.jpg\">\n                    </div>\n                                    </div>\n    </div>`

const  data4 ={
  htmlText:`<!DOCTYPE HTML PUBLIC -//W3C//DTD HTML 4.0 Transitional//EN'><HTML><HEAD><TITLE></TITLE></HEAD><BODY><div style='TEXT-ALIGN: center; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 0cm; FONT-FAMILY: 黑体; FONT-SIZE: 18pt;'>安徽省芜湖市镜湖区人民法院</div><div style='TEXT-ALIGN: center; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 0cm; FONT-FAMILY: 黑体; FONT-SIZE: 18pt;'>民 事 判 决 书</div><div style='TEXT-ALIGN: right; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 0cm;  FONT-FAMILY: 宋体;FONT-SIZE: 15pt; '>(2020)皖0202民初3146号</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>原告：奇瑞徽银汽车金融股份有限公司，住所地安徽省芜湖市皖江财富广场，统一信用代码91340200686899339P。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>法定代表人：曹运文，总经理。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>委托诉讼代理人：吴瑞，女，该公司员工。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>委托诉讼代理人：伍永璐，女，该公司员工。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>被告：杨平正，男，1987年12月15日出生，苗族，住贵州省丹寨县。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>被告：吴阿闹，女，1985年6月27日出生，苗族，住贵州省丹寨县。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>原告奇瑞徽银汽车金融股份有限公司与被告杨平正、吴阿闹金融借款合同纠纷一案，本院于2020年5月1日立案后，依法适用简易程序，公开开庭进行审理。原告奇瑞徽银汽车金融股份有限公司的委托诉讼代理人吴瑞到庭参加诉讼，被告杨平正、吴阿闹经本院传票传唤，无正当理由拒不到庭参加诉讼，本院依法缺席审理。本案现已审理终结。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>原告奇瑞徽银汽车金融股份有限公司提出诉讼请求：1、请求判令被告杨平正、吴阿闹偿还贷款本金25311.72元，利息3622.68元、罚息3439.95元、复利733.75元，共计33108.10元（以上利息计算至2020年4月7日，罚息、复利计算至2020年4月7日），自2020年4月8日起至实际履行之日止以尚欠本金为基数继续按照合同约定利率计算罚息、以尚欠利息为基数继续按照合同约定利率计算复利；2、请求判令原告有权对抵押物（贵Ｈ×××**，车架号LZWADAGB1FB381938）折价、拍卖或变卖所得价款享有优先受偿权；3、本案诉讼费用由被告承担。事实与理由：2015年6月26日，被告与原告签订了合同。合同约定：借款人（被告）向贷款人（原告）借款57600元用于购买汽车；贷款以浮动利率计算，当前贷款年利率15.38%；贷款期限为60期；还款方式为按月等额本息。借款人自愿以购置的车辆作为抵押物为本合同项下债务提供担保；合同签订后，被告于2015年7月2日就所购买的车辆（车牌号贵Ｈ×××**，车架号LZWADAGB1FB381938）以原告为抵押权人办理了车辆抵押登记。原告于2015年7月3日依约发放了贷款。合同履行过程中，被告仅还款39期，共计人民币54012.18元，其中本金32288.28元、利息21671.2元、罚息24.49元、复利9.3元，暂存户金额18.91元，后一直未按期还款。截至2020年4月7日，被告尚积欠贷款本金25311.72元、利息3622.68元、罚息3439.95元、复利752.66元。现按合同约定扣除暂存户金额18.91元后，被告尚积欠贷款本金25311.72元、利息3622.68元、罚息3439.95元、复利733.75元，共计人民币33108.10元。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>被告杨平正、吴阿闹未作答辩。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>本院查明的事实同原告诉称。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>上述事实，有原告奇瑞徽银汽车金融股份有限公司提供的合同、放款凭证、《机动车抵押登记证书》、《欠款明细》、被告身份证复印件、奇瑞徽银汽车金融股份有限公司营业执照、法定代表人身份证明书等证据证实，本院予以认定。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>本院认为，2015年6月26日，被告杨平正、吴阿闹与原告奇瑞徽银汽车金融股份有限公司签订的合同依法成立，合法有效，对双方当事人均具有法律约束力。原告奇瑞徽银汽车金融股份有限公司按合同约定履行了发放贷款的义务，但被告杨平正、吴阿闹未能按照合同约定履行按期还款义务，已构成违约，依法应当承担偿还借款本息以及相应的违约责任。原告奇瑞徽银汽车金融股份有限公司诉请要求被告杨平正、吴阿闹清偿所欠借款本息，符合法律规定和合同约定，本院予以支持。此后的罚息、复利按合同约定计算。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>原、被告双方在案涉合同中约定，被告杨平正、吴阿闹自愿以购置的车辆作为抵押物为合同项下债务提供担保，且双方依法办理了案涉车辆的抵押权登记，故原告奇瑞徽银汽车金融股份有限公司有权就被告杨平正、吴阿闹所有的抵押物（车牌号贵Ｈ×××**，车架号LZWADAGB1FB381938）进行协议折价或以拍卖、变卖所得的价款优先受偿。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>综上，根据《中华人民共和国合同法》第六十条第一款、第一百零七条、第一百九十六条、第二百零七条，《中华人民共和国物权法》第一百九十五条,《中华人民共和国担保法》第三十三条，《中华人民共和国民事诉讼法》第一百四十四条的规定，判决如下：</div>${img}<div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>一、被告杨平正、吴阿闹于本判决生效后十日内支付原告奇瑞徽银汽车金融股份有限公司贷款本金25311.72元、利息3622.68元、罚息3439.95元、复利733.75元，共计人民币33108.10元，并自2020年4月8日起至实际清偿之日止按合同约定的利率支付罚息（以所欠本金25311.72元为基数）、复利（以所欠利息3622.68元为基数）。</div><div id='2'  style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>二、原告奇瑞徽银汽车金融股份有限公司对抵押车辆（车牌号贵Ｈ×××**，车架号LZWADAGB1FB381938）的折价、拍卖、变卖所得价款享有优先受偿权。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>如果未按本判决指定的期间履行给付金钱义务，应当依照《中华人民共和国民事诉讼法》第二百五十三条之规定，加倍支付迟延履行期间的债务利息。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>案件受理费减半收取为314.0元，由被告杨平正、吴阿闹共同负担。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>如不服本判决，可以在判决书送达之日起十五日内，向本院递交上诉状，并按对方当事人的人数或者代表人的人数提出副本，上诉于安徽省芜湖市中级人民法院。</div><div style='TEXT-ALIGN: right; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 36pt 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>审判员　　胡年明</div><div style='TEXT-ALIGN: right; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 36pt 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>二〇二〇年五月二十六日</div><div id='7'  style='TEXT-ALIGN: right; LINE-HEIGHT: 25pt; MARGIN: 0.5pt 36pt 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>书记员　　黄文昊</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>附本案适用的相关法律条文:</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>《中华人民共和国合同法》</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第六十条第一款当事人应当按照约定全面履行自己的义务。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第一百零七条当事人一方不履行合同义务或者履行合同义务不符合约定的，应当承担继续履行、采取补救措施或者赔偿损失等违约责任。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第一百九十六条借款合同是借款人向贷款人借款，到期返还借款并支付利息的合同。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第二百零七条借款人未按照约定的期限返还借款的，应当按照约定或者国家有关规定支付逾期利息。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>《中华人民共和国物权法》</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第一百九十五条债务人不履行到期债务或者发生当事人约定的实现抵押权的情形，抵押权人可以与抵押人协议以抵押财产折价或者以拍卖、变卖该抵押财产所得的价款优先受偿。协议损害其他债权人利益的，其他债权人可以在知道或者应当知道撤销事由之日起一年内请求人民法院撤销该协议。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>抵押权人与抵押人未就抵押权实现方式达成协议的，抵押权人可以请求人民法院拍卖、变卖抵押财产。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>抵押财产折价或者变卖的，应当参照市场价格。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>《中华人民共和国担保法》</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第三十三条本法所称抵押，是指债务人或者第三人不转移对本法第三十四条所列财产的占有，将该财产作为债权的担保。债务人不履行债务时，债权人有权依照本法规定以该财产折价或者拍卖、变卖该财产的价款优先受偿。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>前款规定的债务人或者第三人为抵押人，债权人为抵押权人，提供担保的财产为抵押物。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>《中华人民共和国民事诉讼法》</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第一百四十四条被告经传票传唤，无正当理由拒不到庭的，或者未经法庭许可中途退庭的，可以缺席判决。</div><div style='LINE-HEIGHT: 25pt; TEXT-INDENT: 30pt; MARGIN: 0.5pt 0cm;FONT-FAMILY: 宋体; FONT-SIZE: 15pt;'>第二百五十三条被执行人未按判决、裁定和其他法律文书指定的期间履行给付金钱义务的，应当加倍支付迟延履行期间的债务利息。被执行人未按判决、裁定和其他法律文书指定的期间履行其他义务的，应当支付迟延履行金。</div></BODY></HTML>"
title: "奇瑞徽银汽车金融股份有限公司与杨平正、吴阿闹金融借款合同纠纷一审民事判决书"
url: "http://wenshuapp.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=ececb154993346c4ad24ac2b00b29376"`
}

const  data = {
  htmlText: `<div style="font-size: 18pt; font-family: 黑体; text-align: center; margin: 0.5pt 0cm; line-height: 25pt">↵ 浙江省宁波市鄞州区人民法院</div>↵<div style="font-size: 18pt; font-family: 黑体; text-align: center; margin: 0.5pt 0cm; line-height: 25pt">↵ 民 事 裁 定 书</div>↵<div id='1'  style="font-size: 15pt; font-family: 宋体; text-align: right; margin: 0.5pt 0cm; line-height: 25pt">↵ （2018）浙0212民初15247号</div>↵<div id='2'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 原告：汪增良，男，1961年5月9日出生汉族，公司员工，住建德市。</div>↵<div id='2'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 法定代理人：杨发花（系汪增良妻子），1962年7月7日出生</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 汉族，无固定职业，住建德市。</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 委托诉讼代理人：杨宇艇，浙江宇邦律师事务所律师。</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 委托诉讼代理人：郁超群，浙江宇邦律师事务所律师。</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 被告：章智慧，男，1989年1月1日出生汉族，无固定职业，住宁波市鄞州区。</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 被告：中国人民财产保险股份有限公司宁波市鄞州中心支公司（统一社会信用代码为9133021284442011X1）。住所地：宁波市鄞州区诚信路**。</div>↵<div style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 代表人：邱禾萍，该公司总经理。</div>↵<div id='2'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 原告汪增良与被告章智慧、刘修奎、中国人民财产保险股份有限公司宁波市鄞州中心支公司机动车交通事故责任纠纷一案，本院于2018年10月25日立案受理。审理中，原告申请撤回对被告刘修奎的起诉，并于2019年1月4日向本院申请撤回起诉。</div>↵<div id='5'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 经审查，本院认为，当事人有权在法律规定范围内处分自己的民事权利和诉讼权利，原告的申请符合法律规定，本院予以准许。依照《中华人民共和国民事诉讼法》第十三条第二款、第一百四十五条第一款、第一百五十四条第一款第（五）项的规定，裁定如下：</div>↵<div id='2'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 准许原告汪增良撤回起诉。</div>↵<div id='2'  style="font-size: 15pt; font-family: 宋体; margin: 0.5pt 0cm; line-height: 25pt; text-indent: 30pt">↵ 案件受理费50元，减半收取25元，由原告汪增良负担。</div>↵<div style="font-size: 15pt; font-family: 宋体; text-align: right; margin: 0.5pt 36pt 0.5pt 0cm; line-height: 25pt">↵ 审 判 员　　卢　宁</div>↵<div style="font-size: 15pt; font-family: 宋体; text-align: right; margin: 0.5pt 36pt 0.5pt 0cm; line-height: 25pt">↵ 二〇一九年一月四日</div>↵<div id='7'  style="font-size: 15pt; font-family: 宋体; text-align: right; margin: 0.5pt 36pt 0.5pt 0cm; line-height: 25pt">↵ 代书记员　　史朦朦</div>↵`
}


const data3  = {
  htmlText: `<div style="font-size: 18pt; font-family: 黑体; text-align: center; margin: 0.5pt 0cm; line-height: 25pt">↵ 浙江省宁波市鄞州区人民法院</div>↵<div style="font-size: 18pt; font-family: 黑体; text-align: center; margin: 0.5pt 0cm; line-height: 25pt">↵ 民 事 裁 定 书</div>${img}`
}

const  data5  ={
  htmlText:`<p><table style="width: 517.5pt;border-collapse: collapse;"><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 31.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的名称</td><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">芜湖市芜湖县湾沚镇机械工业开发区芜湖中法机械商贸城E2幢15室</td></tr><tr><td rowspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 46.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">权证情况</td><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 18.0pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">法院执行裁定书</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 18.0pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">2015镜执字第01712号</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房屋所有权证</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房地权证芜县字第2012004403号</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">土地使用权证</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">芜国用（2012）第000654号</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的所有人</td><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">戴秀明</td></tr><tr><td rowspan="7" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 126.75pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的现状</td><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房屋用途</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">商业</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">土地性质</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">出让</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 17.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">土地用途</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 17.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">商业</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">租赁情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">无出租</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">过户情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">能够落户</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">钥&nbsp;&nbsp;匙</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">有</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 38.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">经营情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 38.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">空置</td></tr><tr><td rowspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 56.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">权利限制情况</td><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 24.75pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">1、<span><font face="Times New Roman">&nbsp;&nbsp;</font></span>被芜湖市镜湖区人民法院查封</td></tr><tr><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">2、<span><font face="Times New Roman">&nbsp;&nbsp;</font></span>抵押于扬子银行芜湖县支行</td></tr><tr><td rowspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 63.0pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">提供的文件</td><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">1、《过户裁定书》；2、《协助执行通知书》；</td></tr><tr><td colspan="3" style="border: 0.5pt solid #000000;border-image: none;width: 227.25pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">3、《拍卖成交确认书》4、其他<u>请填写。</u></td></tr><tr><td rowspan="7" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 235.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的物介绍</td><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 38.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">建筑总面积</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 38.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">109.96平方米</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 41.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">公摊总面积</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 41.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">&nbsp;</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 40.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">土地总面积</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 40.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">&nbsp;</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 31.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房产年龄</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">2009年</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 31.5pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">装修情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 31.5pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">简装</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 26.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">周边配套</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 26.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">交通较便捷、人流量较大、与芜湖县工业园区隔工业大道相邻</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 26.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">其他介绍</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 26.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">卷帘门，彩铝窗室内地面铺地砖，装饰吊顶，内墙为白色乳胶漆粉刷，二层地面铺复合地板，水电等设施配套齐全</td></tr><tr><td rowspan="16" style="border: 0.5pt solid #000000;border-image: none;width: 92.25pt;height: 372.0pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的物估值</td><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 47.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">标的评估总价</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 47.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">610387.96元</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 47.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房产评估总价</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 47.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">&nbsp;</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 47.25pt;color: #000000;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">房产外评估总价</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 47.25pt;color: #808080;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">&nbsp;</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 42.0pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">费用总价</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 42.0pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">xxx元（请填写阿拉伯数字）<br>此项为税费及物管等其他费用的总和</td></tr><tr><td rowspan="11" style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 174.0pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">税费情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">1、买方税费</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">契税：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">印花税：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">交易费：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">测绘费：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 18.0pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">权属登记费及取证费：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">2、卖方税费</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">印花税：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">交易费：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 15.75pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">营业税：</td></tr><tr><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">个人所得税：</td></tr><tr><td style="border: 0.5pt solid #000000;border-image: none;width: 93.75pt;height: 14.25pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">其他费用情况</td><td colspan="2" style="border: 0.5pt solid #000000;border-image: none;width: 79.5pt;height: 14.25pt;color: #dd0806;font-size: 12.0pt;font-style: normal;font-weight: 400;vertical-align: middle;white-space: normal;">物业费、取暖费、水电煤费、其他费用</td></tr></table></p><div class="video-img">

        <div class="sf-pic-slide clearfix">



                                                <div class="slide-bigpic">

                        <img src="//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png" data-ks-lazyload="//img.alicdn.com/bao/uploaded/i1/TB1B7J9OXXXXXalXFXXzYKl.XXX_960x960.jpg">

                    </div>

                                                                <div class="slide-bigpic">

                        <img src="//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png" data-ks-lazyload="//img.alicdn.com/bao/uploaded/i1/2347754587/TB2klSCahRzc1FjSZFPXXcGAFXa_!!0-paimai.jpg_960x960.jpg">

                    </div>

                                                                <div class="slide-bigpic">

                        <img src="//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png" data-ks-lazyload="//img.alicdn.com/bao/uploaded/i3/2347754587/TB278jCbxmJ.eBjy0FhXXbBdFXa_!!0-paimai.jpg_960x960.jpg">

                    </div>

                                                                <div class="slide-bigpic">

                        <img src="//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png" data-ks-lazyload="//img.alicdn.com/bao/uploaded/i2/2347754587/TB2sGvMbCOI.eBjSspmXXatOVXa_!!0-paimai.jpg_960x960.jpg">

                    </div>

                                                                <div class="slide-bigpic">

                        <img src="//img.alicdn.com/tps/i2/TB1SN33GVXXXXarapXX0deX8pXX-900-600.png" data-ks-lazyload="//img.alicdn.com/bao/uploaded/i3/2347754587/TB2ukHPbxuI.eBjy0FdXXXgbVXa_!!0-paimai.jpg_960x960.jpg">

                    </div>

                                    </div>

    </div>
`
}

