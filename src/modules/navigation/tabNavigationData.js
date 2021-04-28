import HomeScreen from '../home/HomeViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconPosition = require('../../../assets/images/drawer/position.png');
const iconShow = require('../../../assets/images/drawer/show.png');
const iconDetect = require('../../../assets/images/drawer/detect.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: '主页',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: '位置',
    component: CalendarScreen,
    icon: iconPosition,
  },
  {
    name: '展示',
    component: GridsScreen,
    icon: iconShow,
  },
  {
    name: '识别',
    component: PagesScreen,
    icon: iconDetect,
  },
  // {
  //   name: 'Components',
  //   component: ComponentsScreen,
  //   icon: iconComponents,
  // },
];

export default tabNavigationData;
