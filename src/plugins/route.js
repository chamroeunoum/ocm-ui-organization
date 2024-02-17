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
 * Attendant
 */
import AttendantComponent from './../components/attendant/index.vue'
import AttendantListComponent from './../components/attendant/list.vue'
import AttendantDayComponent from './../components/attendant/today.vue'
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
                    return '/meetings'
                }
            },
            { 
                path: '/', 
                name: "RootURI" ,
                redirect: to => {
                    return '/meetings'
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
            path: '/attendants',
            component: AttendantComponent ,
                meta: { 
                    transition: 'slide-right' ,
                    requiresAuth: true,
                    is_admin : true
                },
                children: [
                    {
                        name: "AttendantList" ,
                        path: '' ,
                        component: AttendantListComponent
                    },
                    {
                        name: "AttendantMonth" ,
                        path: 'month' ,
                        component: AttendantListComponent
                    },
                    {
                        name: "AttendantDay" ,
                        path: 'today' ,
                        component: AttendantDayComponent
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