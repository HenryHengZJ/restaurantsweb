import React from 'react';
import DefaultLayout from './containers/DefaultLayout';

const Dashboard = React.lazy(() => import('./views/Dashboard'));

const NameAddress = React.lazy(() => import('./views/Basics/NameAddress'));
const Website = React.lazy(() => import('./views/Basics/Website'));
const Cuisine = React.lazy(() => import('./views/Basics/Cuisine'));
const Occasion = React.lazy(() => import('./views/Basics/Occasion'));
const ValidateEmail = React.lazy(() => import('./views/Basics/ValidateEmail'));

const Pickup = React.lazy(() => import('./views/Services/Pickup'));
const Delivery = React.lazy(() => import('./views/Services/Delivery'));
const MinSpending = React.lazy(() => import('./views/Services/MinSpending'));
const OpeningHours = React.lazy(() => import('./views/Services/OpeningHours'));
const OrderLater = React.lazy(() => import('./views/Services/OrderLater'));

const ReceiveOrder = React.lazy(() => import('./views/OrdersMenu/ReceiveOrder'));
const MenuSetup = React.lazy(() => import('./views/OrdersMenu/MenuSetup'));

const OnlinePayment = React.lazy(() => import('./views/Payment/OnlinePayment'));

const Order = React.lazy(() => import('./views/Reports/Order'));
const Sales = React.lazy(() => import('./views/Reports/Sales'));
const Customer = React.lazy(() => import('./views/Reports/Customer'));
const Review = React.lazy(() => import('./views/Reports/Review'));

const Profile = React.lazy(() => import('./views/Account/Profile'));

/*const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));*/

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/caterer', exact: true, name: 'Caterer Dashboard', component: DefaultLayout },
  { path: '/caterer/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/caterer/basics', exact: true, name: 'Basics', component: NameAddress },
  { path: '/caterer/basics/nameaddress', name: 'Name & Address', component: NameAddress },
  { path: '/caterer/basics/website', name: 'Website', component: Website },
  { path: '/caterer/basics/cuisine', name: 'Cuisine', component: Cuisine },
  { path: '/caterer/basics/occasion', name: 'Occasion', component: Occasion },
  { path: '/caterer/basics/validateemail', name: 'Account Confirmation', component: ValidateEmail },
  { path: '/caterer/services', exact: true, name: 'Pickup', component: Pickup },
  { path: '/caterer/services/pickup', name: 'Pickup', component: Pickup },
  { path: '/caterer/services/delivery', name: 'Delivery', component: Delivery },
  { path: '/caterer/services/minspending', name: 'Minimum Spending', component: MinSpending },
  { path: '/caterer/services/openinghours', name: 'Opening Hours', component: OpeningHours },
  { path: '/caterer/services/orderlater', name: 'Order for Later', component: OrderLater },
  { path: '/caterer/ordersmenu', exact: true, name: 'Orders & Menu', component: ReceiveOrder },
  { path: '/caterer/ordersmenu/receiveorder', name: 'Receive Order', component: ReceiveOrder },
  { path: '/caterer/ordersmenu/menusetup', name: 'Menu Setup', component: MenuSetup },
  { path: '/caterer/payment', exact: true, name: 'Payment', component: OnlinePayment },
  { path: '/caterer/payment/onlinepayment', name: 'Online Payment', component: OnlinePayment },
  { path: '/caterer/reports', exact: true, name: 'Reports', component: Order },
  { path: '/caterer/reports/order', name: 'Order', component: Order },
  { path: '/caterer/reports/sales', name: 'Sales', component: Sales },
  { path: '/caterer/reports/customer', name: 'Customer', component: Customer },
  { path: '/caterer/reports/review', name: 'Review', component: Review },
 /* { path: '/caterer/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/caterer/theme/colors', name: 'Colors', component: Colors },
  { path: '/caterer/theme/typography', name: 'Typography', component: Typography },
  { path: '/caterer/base', exact: true, name: 'Base', component: Cards },
  { path: '/caterer/base/cards', name: 'Cards', component: Cards },
  { path: '/caterer/base/forms', name: 'Forms', component: Forms },
  { path: '/caterer/base/switches', name: 'Switches', component: Switches },
  { path: '/caterer/base/tables', name: 'Tables', component: Tables },
  { path: '/caterer/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/caterer/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/caterer/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/caterer/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/caterer/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/caterer/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/caterer/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/caterer/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/caterer/base/navs', name: 'Navs', component: Navs },
  { path: '/caterer/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/caterer/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/caterer/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/caterer/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/caterer/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/caterer/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/caterer/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/caterer/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/caterer/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/caterer/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/caterer/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/caterer/icons/flags', name: 'Flags', component: Flags },
  { path: '/caterer/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/caterer/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/caterer/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/caterer/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/caterer/notifications/badges', name: 'Badges', component: Badges },
  { path: '/caterer/notifications/modals', name: 'Modals', component: Modals },
  { path: '/caterer/widgets', name: 'Widgets', component: Widgets },
  { path: '/caterer/charts', name: 'Charts', component: Charts },
  { path: '/caterer/users', exact: true,  name: 'Users', component: Users },
  { path: '/caterer/users/:id', exact: true, name: 'User Details', component: User },*/
  { path: '/caterer/account/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;
