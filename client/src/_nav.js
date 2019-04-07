export default {
  items: [
    {
      name: 'Dashboard',
      url: '/caterer/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Basics',
      url: '/caterer/basics',
      icon: 'icon-home',
      children: [
        {
          name: 'Name & Address',
          url: '/caterer/basics/nameaddress',
          icon: '',
        },
        {
          name: 'Website',
          url: '/caterer/basics/website',
          icon: '',
        },
        {
          name: 'Cuisine',
          url: '/caterer/basics/cuisine',
          icon: '',
        },
        {
          name: 'Occasion',
          url: '/caterer/basics/occasion',
          icon: '',
        },
        {
          name: 'Account Confirmation',
          url: '/caterer/basics/validateemail',
          icon: '',
        },
      ]
    },
    {
      name: 'Services & Hours',
      url: '/caterer/services',
      icon: 'icon-clock',
      children: [
        {
          name: 'Pickup',
          url: '/caterer/services/pickup',
          icon: '',
        },
        {
          name: 'Delivery',
          url: '/caterer/services/delivery',
          icon: '',
        },
        {
          name: 'Minimum Spending',
          url: '/caterer/services/minspending',
          icon: '',
        },
        {
          name: 'Opening Hours',
          url: '/caterer/services/openinghours',
          icon: '',
        },
        {
          name: 'Order for Later',
          url: '/caterer/services/orderlater',
          icon: '',
        },
      ]
    },
    {
      name: 'Orders & Menu',
      url: '/caterer/ordersmenu',
      icon: 'icon-book-open',
      children: [
        {
          name: 'Receive Order',
          url: '/caterer/ordersmenu/receiveorder',
          icon: '',
        },
        {
          name: 'Menu Setup',
          url: '/caterer/ordersmenu/menusetup',
          icon: '',
        },
        
      ]
    },
    {
      name: 'Payment',
      url: '/caterer/payment',
      icon: 'icon-credit-card',
      children: [
        {
          name: 'Online Payment',
          url: '/caterer/payment/onlinepayment',
          icon: '',
        },
      ]
    },
    {
      name: 'Reports',
      url: '/caterer/reports',
      icon: 'icon-chart',
      children: [
        {
          name: 'Order',
          url: '/caterer/reports/order',
          icon: '',
        },
        {
          name: 'Sales',
          url: '/caterer/reports/sales',
          icon: '',
        },
        {
          name: 'Customer',
          url: '/caterer/reports/customer',
          icon: '',
        },
        {
          name: 'Review',
          url: '/caterer/reports/review',
          icon: '',
        },
      ]
    },
    /*{
      title: true,
      name: 'Theme',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Colors',
      url: '/caterer/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/caterer/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Components',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Base',
      url: '/caterer/base',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Breadcrumbs',
          url: '/caterer/base/breadcrumbs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Cards',
          url: '/caterer/base/cards',
          icon: 'icon-puzzle',
        },
        {
          name: 'Carousels',
          url: '/caterer/base/carousels',
          icon: 'icon-puzzle',
        },
        {
          name: 'Collapses',
          url: '/caterer/base/collapses',
          icon: 'icon-puzzle',
        },
        {
          name: 'Dropdowns',
          url: '/caterer/base/dropdowns',
          icon: 'icon-puzzle',
        },
        {
          name: 'Forms',
          url: '/caterer/base/forms',
          icon: 'icon-puzzle',
        },
        {
          name: 'Jumbotrons',
          url: '/caterer/base/jumbotrons',
          icon: 'icon-puzzle',
        },
        {
          name: 'List groups',
          url: '/caterer/base/list-groups',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navbars',
          url: '/caterer/base/navbars',
          icon: 'icon-puzzle',
        },
        {
          name: 'Navs',
          url: '/caterer/base/navs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Paginations',
          url: '/caterer/base/paginations',
          icon: 'icon-puzzle',
        },
        {
          name: 'Popovers',
          url: '/caterer/base/popovers',
          icon: 'icon-puzzle',
        },
        {
          name: 'Progress Bar',
          url: '/caterer/base/progress-bar',
          icon: 'icon-puzzle',
        },
        {
          name: 'Switches',
          url: '/caterer/base/switches',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tables',
          url: '/caterer/base/tables',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tabs',
          url: '/caterer/base/tabs',
          icon: 'icon-puzzle',
        },
        {
          name: 'Tooltips',
          url: '/caterer/base/tooltips',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Buttons',
      url: '/caterer/buttons',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Buttons',
          url: '/caterer/buttons/buttons',
          icon: 'icon-cursor',
        },
        {
          name: 'Button dropdowns',
          url: '/caterer/buttons/button-dropdowns',
          icon: 'icon-cursor',
        },
        {
          name: 'Button groups',
          url: '/caterer/buttons/button-groups',
          icon: 'icon-cursor',
        },
        {
          name: 'Brand Buttons',
          url: '/caterer/buttons/brand-buttons',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Charts',
      url: '/caterer/charts',
      icon: 'icon-pie-chart',
    },
    {
      name: 'Icons',
      url: '/caterer/icons',
      icon: 'icon-star',
      children: [
        {
          name: 'CoreUI Icons',
          url: '/caterer/icons/coreui-icons',
          icon: 'icon-star',
          badge: {
            variant: 'info',
            text: 'NEW',
          },
        },
        {
          name: 'Flags',
          url: '/caterer/icons/flags',
          icon: 'icon-star',
        },
        {
          name: 'Font Awesome',
          url: '/caterer/icons/font-awesome',
          icon: 'icon-star',
          badge: {
            variant: 'secondary',
            text: '4.7',
          },
        },
        {
          name: 'Simple Line Icons',
          url: '/caterer/icons/simple-line-icons',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Notifications',
      url: '/caterer/notifications',
      icon: 'icon-bell',
      children: [
        {
          name: 'Alerts',
          url: '/caterer/notifications/alerts',
          icon: 'icon-bell',
        },
        {
          name: 'Badges',
          url: '/caterer/notifications/badges',
          icon: 'icon-bell',
        },
        {
          name: 'Modals',
          url: '/caterer/notifications/modals',
          icon: 'icon-bell',
        },
      ],
    },
    {
      name: 'Widgets',
      url: '/caterer/widgets',
      icon: 'icon-calculator',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Extras',
    },
    {
      name: 'Pages',
      url: '/pages',
      icon: 'icon-star',
      children: [
        {
          name: 'Login',
          url: '/login',
          icon: 'icon-star',
        },
        {
          name: 'Register',
          url: '/register',
          icon: 'icon-star',
        },
        {
          name: 'Error 404',
          url: '/404',
          icon: 'icon-star',
        },
        {
          name: 'Error 500',
          url: '/500',
          icon: 'icon-star',
        },
      ],
    },
    {
      name: 'Disabled',
      url: '/dashboard',
      icon: 'icon-ban',
      attributes: { disabled: true },
    },
    {
      name: 'Download CoreUI',
      url: 'https://coreui.io/react/',
      icon: 'icon-cloud-download',
      class: 'mt-auto',
      variant: 'success',
      attributes: { target: '_blank', rel: "noopener" },
    },
    {
      name: 'Try CoreUI PRO',
      url: 'https://coreui.io/pro/react/',
      icon: 'icon-layers',
      variant: 'danger',
      attributes: { target: '_blank', rel: "noopener" },
    },*/
  ],
};
