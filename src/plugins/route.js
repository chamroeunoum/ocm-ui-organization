import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './authentication'

import LoginComponent from './../layouts/login/index.vue'
import WelcomeComponent from './../layouts/welcome/index.vue'
import SmartWhiteboardComponent from './../layouts/welcome/smartwhiteboard.vue'
import TVSony43Component from './../layouts/welcome/tvsony43.vue'
import TVComponent from './../layouts/welcome/tv.vue'

import UserComponent from './../components/user/index.vue'
import UserProfileComponent from './../components/user/profile.vue'
import PasswordChangeComponent from './../components/user/password_change.vue'

import DashboardComponent from './../layouts/dashboard/index.vue'
import DashboardWidget from './../components/main/dashboard.vue'

/**
 * Folder Section
 */
import FolderComponent from './../components/folder/index.vue'
import FolderListComponent from './../components/folder/thumb.vue'
import FolderDetailComponent from './../components/folder/detail.vue'
import FolderRegulatorComponent from './../components/folder/regulator.vue'
/**
 * Regulators
 */
import RegulatorComponent from './../components/regulator/index.vue'
import RegulatorListComponent from './../components/regulator/list.vue'
/**
 * Global Regulator
 */
import GlobalSharedRegulatorComponent from './../components/regulator/globalshare/index.vue'

/**
 * Attendant Shift
 */
import AttendantShiftComponent from './../components/attendant/shift/index.vue'
import AttendantShiftListComponent from './../components/attendant/shift/list.vue'
import AttendantShiftDayComponent from './../components/attendant/shift/today.vue'

/**
 * Attendant without Shift
 */
import AttendantNoShiftComponent from './../components/attendant/noshift/index.vue'
import AttendantNoShiftListComponent from './../components/attendant/noshift/list.vue'
import AttendantNoShiftDayComponent from './../components/attendant/noshift/today.vue'
/**
 * Meeting
 */
import MeetingComponent from './../components/meeting/index.vue'
import MeetingListComponent from './../components/meeting/list.vue'

/**
 * Task
 */
import TaskComponent from './../components/task/index.vue'
import TaskListComponent from './../components/task/list.vue'

/**
 * Task
 */
import ReportComponent from './../components/report/index.vue'
import ReportListComponent from './../components/report/list.vue'
import ReporByOrganizationComponent from './../components/report/totalbyorganization.vue'
import ReporByLeaderComponent from './../components/report/totalbyleader.vue'


/**
 * Error
 */
import Page404 from './../components/errors/404.vue'

export const getRoutes = () => {
    if( isAuth() ){
        return [
            { 
                path: '', 
                name: "EmptyURI" ,
                redirect: to => {
                    return '/dashboard'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/dashboard'
                }
            },
            // {
            //     name: 'Login',
            //     path: '/login',
            //     component: LoginComponent ,
            //     meta: {
            //         // transition: 'fade'
            //     }
            // },
            {
                name: 'Attendant',
                path: '/attendants' ,
                redirect: to => {
                    return '/attendants/noshift'
                }
            },
            // {
            // name: 'AttendantShift',
            // path: '/attendants/shift',
            // component: AttendantShiftComponent ,
            //     meta: { 
            //         transition: 'slide-right' ,
            //         requiresAuth: true,
            //         is_admin : true
            //     },
            //     children: [
            //         {
            //             name: "AttendantShiftList" ,
            //             path: '' ,
            //             component: AttendantShiftDayComponent
            //         },
            //         {
            //             name: "AttendantShiftMonth" ,
            //             path: 'month' ,
            //             component: AttendantShiftListComponent
            //         },
            //         {
            //             name: "AttendantShiftDay" ,
            //             path: 'today' ,
            //             component: AttendantShiftDayComponent
            //         }
            //     ]
            // },
            {
                name: 'AttendantNoShift',
                path: '/attendants/noshift',
                component: AttendantNoShiftComponent ,
                    meta: { 
                        transition: 'slide-right' ,
                        requiresAuth: true,
                        is_admin : true
                    },
                    children: [
                        {
                            name: "AttendantNoShiftList" ,
                            path: '' ,
                            component: AttendantNoShiftDayComponent
                        },
                        {
                            name: "AttendantNoShiftMonth" ,
                            path: 'month' ,
                            component: AttendantNoShiftListComponent
                        },
                        {
                            name: "AttendantNoShiftDay" ,
                            path: 'today' ,
                            component: AttendantNoShiftDayComponent
                        }
                    ]
                },
            {
                name: 'Meeting',
                path: '/meetings',
                component: MeetingComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "MeetingList" ,
                        path: '' ,
                        component: MeetingListComponent
                    }
                ]
            },
            {
                name: 'Task',
                path: '/tasks',
                component: TaskComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "TaskList" ,
                        path: '' ,
                        component: TaskListComponent
                    }
                ]
            },
            {
                name: 'Folder' ,
                path: '/folders',
                component: FolderComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "FolderList" ,
                        path: '' ,
                        component: FolderListComponent
                    },
                    {
                        name: "FolderDetail" ,
                        path: ':id/detail' ,
                        component: FolderDetailComponent
                    },
                    {
                        name: "FolderRegulators" ,
                        path: ':id/regulators' ,
                        component: FolderRegulatorComponent
                    },
                ]
            },
              {
                  name: 'Regulator' ,
                  path: '/regulators',
                  component: RegulatorComponent ,
                  meta: { 
                      transition: 'slide-right' ,
                      requiresAuth: true,
                      is_admin : true
                  },
                  children: [
                      {
                          name: "RegulatorList" ,
                          path: '' ,
                          component: RegulatorListComponent
                      }
                  ]
              },
              {
                  name: "GlobalSharedRegulator" ,
                  path: '/globalshare/:serial' ,
                  component: GlobalSharedRegulatorComponent ,
                  meta: { 
                      transition: 'slide-right' ,
                      requiresAuth: false,
                      is_admin : false
                  }
              },
            {
                name: 'Report',
                path: '/reports',
                component: ReportComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "ReportList" ,
                        path: '' ,
                        component: ReportListComponent
                    },
                    {
                        name: "ReporByOrganization" ,
                        path: 'totalbyorganization' ,
                        component: ReporByOrganizationComponent
                    },
                    {
                        name: "ReporByLeader" ,
                        path: 'totalbyleader' ,
                        component: ReporByLeaderComponent
                    },
                ]
            },
            /**
             * Authenticated routes
             */
            {
                name: 'Dashboard',
                path: '/dashboard',
                component: DashboardComponent ,
                meta: {
                    // transition: 'fade'
                },
                children:[
                    {
                        name: "DashboardWidget" ,
                        path: '' ,
                        component: DashboardWidget
                    }
                ]
            },
            {
                name: "UserProfile" ,
                path: '/profile' ,
                component: UserProfileComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: "UserPasswordChange" ,
                path: '/password/change' ,
                component: PasswordChangeComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'Welcome',
                path: '/welcome',
                component: WelcomeComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'TV',
                path: '/tv',
                component: TVComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'SMARTWHITEBOARD',
                path: '/smartwhiteboard',
                component: SmartWhiteboardComponent ,
                meta: {
                    // transition: 'fade'
                }
            },
            {
                name: 'TVSONY43',
                path: '/tvsony43',
                component: TVSony43Component ,
                meta: {
                    // transition: 'fade'
                }
            },
            // will match everything and put it under `$route.params.pathMatch`
            { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
        ]
    }
    return [
        { 
            path: '', 
            name: "EmptyURI" ,
            redirect: to => {
                return '/welcome'
            }
        },
        { 
            path: '/', 
            name: "RootURI" ,
            redirect: to => {
                return '/welcome'
            }
        },
        {
            name: 'Login',
            path: '/login',
            component: LoginComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'Welcome',
            path: '/welcome',
            component: WelcomeComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'TV',
            path: '/tv',
            component: TVComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'SMARTWHITEBOARD',
            path: '/smartwhiteboard',
            component: SmartWhiteboardComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'TVSONY43',
            path: '/tvsony43',
            component: TVSony43Component ,
            meta: {
                // transition: 'fade'
            }
        },
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
}