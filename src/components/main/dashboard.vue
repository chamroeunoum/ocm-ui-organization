<template >
    <Transition name="fade" >
        <div v-if="toggleDashboardWidgets"  class="relative -m-4 p-8" >
            <div class="w-full h-12 leading-10 font-moul text-lg border-b border-gray-200" >សង្ខេបព័ត៌មាន</div>
            <div class="w-full flex flex-wrap justify-center p-2 text-md">
                <!-- <total-account-widget /> -->
                <total-meeting-widget />
            </div>
            <div class="w-full p-2" >
                <total-meeting-by-status-horizontal-flex-widget />
            </div>
            <div class="w-full p-2" >
                <total-meeting-by-type-horizontal-flex-widget />
            </div>
            <Frame4Corner />
        </div>
    </Transition>
</template>
<script >
import { Icon } from '@vicons/utils'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import { DocumentPdf24Regular } from '@vicons/fluent'
import { PersonCircleOutline } from '@vicons/ionicons5'
import { ParentChild } from '@vicons/carbon'
import { FolderOpenOutlined , SupervisedUserCircleRound } from  "@vicons/material"
import { ref , reactive, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { isAdmin } from './../../plugins/authentication'
import Frame4Corner from './../widgets/frame/corner4.vue'
import TotalAccountWidget from './../widgets/dashboard/total/account.vue'
import TotalMeetingWidget from './../widgets/dashboard/meeting/total/total.vue'
import TotalMeetingByStatusWidget from './../widgets/dashboard/meeting/total/bystatus.vue'
import TotalMeetingByStatusHorizontalFlexWidget from './../widgets/dashboard/meeting/total/bystatus-horizontal-flex.vue'
import TotalMeetingByTypeWidget from './../widgets/dashboard/meeting/total/bytype.vue'
import TotalMeetingByTypeHorizontalFlexWidget from './../widgets/dashboard/meeting/total/bytype-horizontal-flex.vue'


export default {
    name: 'Dashboard',
    components: {
        Frame4Corner ,
        TotalAccountWidget ,
        TotalMeetingWidget ,
        TotalMeetingByStatusWidget ,
        TotalMeetingByStatusHorizontalFlexWidget ,
        TotalMeetingByTypeWidget ,
        TotalMeetingByTypeHorizontalFlexWidget
    },
    setup() {
        const router = useRouter()
        const store = useStore()
        const notify = useNotification()

        const toggleDashboardWidgets = ref(false)
        onMounted( () => {
            toggleDashboardWidgets.value = true
        })

        function isBackendManagement(){
            return isAdmin()
        }

        return {
            toggleDashboardWidgets ,
            isBackendManagement
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
</style>