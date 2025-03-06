import { createRouter, createWebHashHistory } from 'vue-router'
import { isAdmin, isAuth } from './authentication'

import LoginComponent from './../layouts/login/index.vue'
import WelcomeComponent from './../layouts/welcome/index.vue'

import UserComponent from './../components/user/index.vue'
import UserProfileComponent from './../components/user/profile.vue'
import PasswordChangeComponent from './../components/user/password_change.vue'

import DashboardComponent from './../layouts/dashboard/index.vue'
import DashboardWidget from './../components/main/dashboard.vue'

/**
 * Card Officer
 */
import DetailCardComponent from './../layouts/staff/card.vue'

/**
 * Officer Components
 */
import OfficerCrud from './../components/officer/index.vue'
import OfficerThumbnailCrud from './../components/officer/listing/thumbnail.vue'
/**
 * Check in and out
 */
import QrCheckinAndCheckoutComponent from './../layouts/checkinout/check.vue'
import QrCheckinAndCheckoutSuccessComponent from './../layouts/checkinout/success.vue'

/**
 * Folder Section
 */
import FolderComponent from './../components/folder/index.vue'
import FolderThumbnailComponent from './../components/folder/crud/lists/thumbnail.vue'
// import FolderTableComponent from './../components/folder/crud/lists/table.vue'
/**
 * Regulators
 */
import RegulatorComponent from './../components/regulator/index.vue'
import RegulatorThumbnailComponent from './../components/regulator/crud/lists/thumbnail.vue'
/**
 * Global Regulator
 */
// import GlobalSharedRegulatorComponent from './../components/regulator/globalshare/index.vue'

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
 * Task
 */
import TaskComponent from './../components/task/index.vue'
import TaskListComponent from './../components/task/list.vue'

/**
 * Task
 */
import CardComponent from './../components/card/index.vue'
import CardThumbnailComponent from './../components/card/crud/lists/thumbnail.vue'
import CardInfoComponent from './../components/card/crud/lists/card.vue'


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
                    // return '/dashboard'
                    return '/cards'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    // return '/dashboard'
                    return '/cards'
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
            {
            name: 'AttendantShift',
            path: '/attendants',
            component: AttendantShiftComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "AttendantShiftList" ,
                        path: '' ,
                        component: AttendantShiftDayComponent
                    },
                    {
                        name: "AttendantShiftList" ,
                        path: 'shift' ,
                        component: AttendantShiftDayComponent
                    },
                    {
                        name: "AttendantShiftMonth" ,
                        path: 'month' ,
                        component: AttendantShiftListComponent
                    },
                    {
                        name: "AttendantShiftDay" ,
                        path: 'today' ,
                        component: AttendantShiftDayComponent
                    }
                ]
            },
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
                name: 'Card',
                path: '/cards',
                component: CardComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "CardInfoComponent" ,
                        path: '' ,
                        component: CardInfoComponent
                    }
                ]
            },
            {
                name: 'Officer' ,
                path: '/officer',
                component: OfficerCrud ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "OfficerTable" ,
                        path: '' ,
                        component: OfficerThumbnailCrud // UserTableCrud
                    },
                    {
                        name: "OfficerThumbnail" ,
                        path: 'thumbnail' ,
                        component: OfficerThumbnailCrud
                    },
                    {
                        name: "OfficerThumbnailFilter" ,
                        path: 'thumbnail/:ids' ,
                        component: OfficerThumbnailCrud
                    },
                    // {
                    //     name: "PeopleExportCrud" ,
                    //     path: 'export' ,
                    //     component: PeopleExportCrud
                    // },
                    // {
                    //     name: "PeopleList" ,
                    //     path: '' ,
                    //     component: PeopleListCrud
                    // },
                    // {
                    //     name: "PeopleDetail" ,
                    //     path: ':id/detail' ,
                    //     component: PeopleDetail
                    // },
                    // {
                    //     name: "PeopleCreate" ,
                    //     path: 'create' ,
                    //     component: PeopleCreateCrud
                    // },
                    // {
                    //     name: "PeopleUpdate" ,
                    //     path: 'update' ,
                    //     component: PeopleUpdateCrud
                    // }
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
                        name: "FolderThumbnailComponent" ,
                        path: '' ,
                        component: FolderThumbnailComponent
                    }
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
                        name: "RegulatorThumbnailComponent" ,
                        path: '' ,
                        component: RegulatorThumbnailComponent
                    }
                ]
            },
            // {
            //     name: "GlobalSharedRegulator" ,
            //     path: '/globalshare/:serial' ,
            //     component: GlobalSharedRegulatorComponent ,
            //     meta: { 
            //         transition: 'slide-right' ,
            //         requiresAuth: false,
            //         is_admin : false
            //     }
            // },
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
                name: 'OfficerCard',
                path: '/officer/card/:id',
                component: DetailCardComponent ,
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
                return '/login'
            }
        },
        { 
            path: '/', 
            name: "RootURI" ,
            redirect: to => {
                return '/login'
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
            name: 'OfficerCard',
            path: '/officer/card/:id',
            component: DetailCardComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutComponent',
            path: '/officer/checkinout/:id',
            component: QrCheckinAndCheckoutComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        {
            name: 'QrCheckinAndCheckoutComponent',
            path: '/officer/attendant/check/:id/success',
            component: QrCheckinAndCheckoutSuccessComponent ,
            meta: {
                // transition: 'fade'
            }
        },
        // will match everything and put it under `$route.params.pathMatch`
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 }
    ]
}