import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/main',
    title: 'HOME',
    icon: 'mdi mdi-home-variant',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/starter',
    title: 'Dashboard',
    icon: 'mdi mdi-gauge',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/',
    title: 'MAIN MENUS',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/goodtime/component/manageinterst',
    title: 'Manage Interest',
    icon: 'mdi mdi-table-edit',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/component/event',
    title: 'Add Event',
    icon: 'mdi mdi-calendar-clock',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/component/chatroom',
    title: 'Chat Room',
    icon: 'mdi mdi-qqchat',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/goodtime/component/feedback',
    title: 'Feedbacks',
    icon: 'mdi mdi-comment-multiple-outline',
    class: '',
    extralink: false,
    submenu: []
  }
];
