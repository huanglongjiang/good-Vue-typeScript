import Vue from 'vue';
//import constant2 from './../vuex/const2'
import goodBreadcrumb from './good-ui/breadBar/'
import goodAbc from './good-ui/abc/'
import goodPagination from './good-ui/pagination/'
import goodTag from './good-ui/tag/'
import goodButton from './good-ui/button/'
import goodButton2 from './good-ui/button2/'
import goodMenu from './good-ui/menu/'
import goodTotal from './good-ui/total/'
import goodBox from './good-ui/table/'
import goodDialog from './good-ui/modelBox/'
import goodInfo from './good-ui/info/'
import goodPage from './good-ui/page/'
import goodKey from './good-ui/key/'
import tdsLabel from './good-ui/td/'
import goodLabel from './good-ui/label/'
import goodConfig from './good-ui/config/'
import goodLogo from './good-ui/logo/'
import goodUpload from './good-ui/upload/'
import goodCheckbox from './good-ui/checkbox'
import goodStatusall from './good-ui/editAll';
import goodStatus from './good-ui/status/'
import goodSwitch from './good-ui/switch/'
/*
import Radio from './good-ui/Radio';
import goodRadio from './good-ui/Radio3';
import productCheckResult from "./good-ui/loading2/productCheckResult";
import goodButton from './good-ui/button/'
import goodInput from './good-ui/input/'
import goodTextarea from './good-ui/textarea/'
import goodWord from './good-ui/word/'
import goodSearch from './good-ui/search/'
import tdsQueue from './good-ui/queue/'
import goodTime from './good-ui/time/'
import goodPaper from './good-ui/paper/'*/


const components = {
	//constant2,
	goodBreadcrumb,
	goodAbc,
	goodPagination,
	goodTag,
	goodButton,
	goodButton2,
	goodMenu,
	goodTotal,
	goodBox,
	goodDialog,
	goodInfo,
	goodPage,
	goodKey,
	tdsLabel,
	goodLabel,
	goodConfig,
	goodLogo,
	goodUpload,
	goodCheckbox,
	goodStatusall,
	goodStatus,
	goodSwitch,
	
	/*
	Radio,
	goodRadio,
	productCheckResult,
	goodInput,
	goodTextarea,
	goodWord,
	goodSearch,
	tdsQueue,
	goodTime,
	goodPaper,
	*/
};
Vue.use(components.goodBreadcrumb)
Vue.use(components.goodAbc)
Vue.use(components.goodPagination)
Vue.use(components.goodTag)
Vue.use(components.goodButton)
Vue.use(components.goodButton2)
Vue.use(components.goodMenu)
Vue.use(components.goodTotal)
Vue.use(components.goodBox)
Vue.use(components.goodDialog)
Vue.use(components.goodInfo)
Vue.use(components.goodPage)
Vue.use(components.goodKey)
Vue.use(components.tdsLabel)
Vue.use(components.goodLabel)
Vue.use(components.goodConfig)
Vue.use(components.goodLogo)
Vue.use(components.goodUpload)
Vue.use(components.goodCheckbox)
Vue.use(components.goodStatusall)
Vue.use(components.goodStatus)
Vue.use(components.goodSwitch)
/*Vue.prototype.constant2 = constant2;
Vue.use(components.Radio)
Vue.use(components.goodRadio)
Vue.use(components.productCheckResult)
Vue.use(components.goodInput)
Vue.use(components.goodInput)
Vue.use(components.goodTextarea)
Vue.use(components.goodWord)
Vue.use(components.goodSearch)
Vue.use(components.tdsQueue)
Vue.use(components.goodTime)
Vue.use(components.goodPaper)
*/


export default components;