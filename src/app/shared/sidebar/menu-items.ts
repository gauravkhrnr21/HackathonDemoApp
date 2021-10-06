import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  // {
  //   path: '/hackapp/',
  //   title: 'Personal',
  //   icon: 'mdi mdi-dots-horizontal',
  //   class: 'nav-small-cap',
  //   extralink: true,
  //   submenu: []
  // },
  
  {
    path: '/goodtime/starter',
    title: 'Dashboard',
    icon: 'mdi mdi-gauge',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/component/groupsearch',
    title: 'Search Interest',
    icon: 'fa fa-thumbs-up',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/component/feedback',
    title: 'Feedbacks',
    icon: 'fa fa-comments',
    class: '',
    extralink: false,
    submenu: []
  }
];
