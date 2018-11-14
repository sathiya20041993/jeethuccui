import { NbMenuItem } from '@nebular/theme';

export const ADMIN_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Admin',
    icon: 'nb-gear',
    children: [

      {
        title: 'Center Configuration',
        link: '/pages/center/view',
      }, {
        title: 'Add Courses',
        link: '/pages/courses/create',
      } 
      , {
        title: 'Add Counselor',
        link: '/pages/counselor/create',
      }
    ],
  },

  {
    title: 'Pending Certificate',
    icon: 'nb-paper-plane',
    link: '/pages/pending-certificate'
  },
  // {
  //   title: 'Dashboard',
  //   icon: 'nb-home',
  //   link: '/pages/dashboard',
  //   home: true,
  // },

  {
    title: 'Reports',
    icon: 'nb-compose',
    children: [
      {
        title: 'Collection',
        link: '/pages/reports/collection',
      },
      {
        title: 'Due',
        link: '/pages/reports/due',
      },
      {
        title: 'Pending Certificate',
        link: '/pages/reports/pendingCertificates',
      },
      {
        title: 'Student Courses',
        link: '/pages/reports/students',
      },
      {
        title: 'Course',
        link: '/pages/reports/courses',
      }

    ],
  },

];




export const COUNSELOR_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Student Admission',
    icon: 'nb-person',
    link: '/pages/student'
  },
  {
    title: 'Student List',
    icon: 'nb-person',
    link: '/pages/student/list'
  },
  {
    title: 'Fee Payment',
    icon: 'nb-play',
    link: '/pages/student/pay'
  },
  {
    title: 'Indent Certificate',
    icon: 'nb-sunny-circled',
    link: '/pages/indent'
  },
  {
    title: 'Reports',
    icon: 'nb-compose',
    children: [
      {
        title: 'Collection',
        link: '/pages/reports/collection',
      },
      {
        title: 'Due',
        link: '/pages/reports/due',
      },
     
      {
        title: 'Student Courses',
        link: '/pages/reports/students',
      },
      {
        title: 'Course',
        link: '/pages/reports/courses',
      }

    ],
  },

];