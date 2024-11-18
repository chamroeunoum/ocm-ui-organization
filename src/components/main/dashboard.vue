<template >
    <div class="ocm-dashboard relative " >
        <div class="dashboard-panel mt-12">
            <Transition name="slide-fade" >
                <div v-if="userWidget.helper" 
                    class="p-2" >
                    <n-tooltip trigger="hover" >
                        <template #trigger >
                            <div class="dashboard-item font-moul " >
                                <svg 
                                    class="w-20 mb-4 text-blue-500"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z" fill="currentColor"></path><path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" fill="currentColor"></path></svg>
                                {{ $toKhmer( userWidget.total ) }}
                            </div>
                        </template>
                        ចំនួនសរុបនៃគណនី
                    </n-tooltip>
                </div>
            </Transition>
            <Transition name="slide-fade" >
                <div v-if="userWidget.helper" 
                    class="p-2" >
                    <n-tooltip v-if="regulatorWidget.helper" trigger="hover" >
                        <template #trigger >
                            <div class="dashboard-item font-moul " >
                                <svg 
                                    class="w-20 mb-4 text-red-500"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path></svg>
                                {{  $toKhmer( regulatorWidget.total ) }}
                            </div>
                        </template>
                        ចំនួនសរុបនៃឯកសារគតិយុត្ត
                    </n-tooltip>
                </div>
            </Transition>
        </div>
        <!-- <Transition name="slide-fade" >
            <div class="fixed left-0 top-0 right-0 bg-white flex flex-wrap border-b border-gray-200 p-2 h-12 " >
                <svg class="w-8 h-8" 
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4a446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96a446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263c70.3-70.3 163.7-109 263-109c99.4 0 192.8 38.7 263 109c70.3 70.3 109 163.7 109 263c0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2a55.95 55.95 0 0 0 79.2 0a55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z" fill="currentColor"></path></svg>
                <div class="h-8 leading-9 ml-1 font-pvh " >សង្ខេបព័ត៌មាន</div>
            </div>
        </Transition> -->
        <window-bar :title="model.title" :icon="4" />
    </div>
</template>
<script >
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { ref , reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isAdmin } from '@plugins/authentication'
import WindowBar from '@components/widgets/WindowBar.vue'

/**
 * Dashboard 
 */


export default {
    name: 'Dashboard',
    components: {
        WindowBar
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        const notify = useNotification()

        const model = reactive({
            name: 'dashboard' ,
            title: 'សង្ខេបព័ត៌មាន' 
        })
        const userWidget = reactive({
            total: 0 ,
            helper: false
        })
        onMounted( () => {
            store.dispatch( 'user/total' ).then( res => {
                userWidget.total = res.data.result.total
                userWidget.helper = true
            }).catch( err => {
                console.log( err )
            })
        })

        const regulatorWidget = reactive({
            total: 0 ,
            helper: false
        })
        onMounted( () => {
            store.dispatch( 'regulator/total' ).then( res => {
                regulatorWidget.total = res.data.result.total
                regulatorWidget.helper = true
            }).catch( err => {
                console.log( err )
            })
        })

        function isBackendManagement(){
            return isAdmin()
        }

        return {
            isBackendManagement ,
            userWidget ,
            regulatorWidget ,
            model
        }
    }
}
</script>
<style scoped>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.5s;
}
.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

.dashboard-panel {
    @apply p-4 flex flex-wrap justify-center items-center ;
}
.dashboard-panel .dashboard-item {
    @apply rounded-md hover:shadow p-4 duration-300 border border-gray-200 hover:border-gray-300 m-2 text-lg text-gray-600;
}
</style>