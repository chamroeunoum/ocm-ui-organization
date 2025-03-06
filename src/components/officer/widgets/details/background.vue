<template >
    <div v-if="show" class="birth-information" >
        <Transition name="slide-fade" >
            <div v-if="record != undefined && record != null " class="absolute left-0 right-0 bottom-0 top-0 p-8 mb-6 flex flex-wrap" >
                <div class="font-moul border-b border-gray-200 w-full pb-2 mb-4 " >ប្រវត្តិមន្ត្រីរាជការ</div>
                <n-scrollbar >
                    <div class="body" >
                        <div class="form-panel border border-gray-200 rounded-md m-4  bg-white shadow w-full mx-auto " >
                            <!-- Personal Information -->
                            <div class="w-full p-4 " >
                                <div class="relative w-full mb-4 border-b border-gray-200 pb-2 font-moul " >ក. ព័ត៌មានផ្ទាល់ខ្លួន</div>
                                <table class="w-full" style="border-spacing: 0px; " >
                                    <tbody>
                                        <tr>
                                            <td class="w-48 " >ឈ្មោះជាភាសាខ្មែរ</td>
                                            <td >{{ record.people.lastname + " " + record.people.firstname }}</td>
                                            <td>ភេទ ៖ </td>
                                            <td class="">{{ parseInt( record.people.gender ) == 1 ? 'ប្រុស' : 'ស្រី' }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >ឈ្មោះជាអក្សរពុម្ភឡាតាំង</td>
                                            <td colspan="3" >{{ record.people.enlastname + " " + record.people.enfirstname }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >ថ្ងៃ ខែ ឆ្នាំ កំណើត</td>
                                            <td>{{ ( ( record != null && record.people != undefined && record.people != null && record.people.dob != null  ) ? $toKhmer( dateFormat( new Date(record.people.dob) , 'dd-mm-yyyy' ) ) : '' ) }}</td>
                                            <td class="">ជនជាតិ ៖ ខ្មែរ</td>
                                            <td class="">សញ្ជាតិ ៖ ខ្មែរ</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >ទីកន្លែងកំណើត</td>
                                            <td colspan="3" >{{ ( ( record != null && record.people != undefined && record.people != null && record.people.pob != null  ) ? $toKhmer( record.people.pob ) : '' ) }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >អាសយដ្ឋានបច្ចុប្បន្ន</td>
                                            <td colspan="3" >{{ ( ( record != null && record.people != undefined && record.people != null && record.people.address != null  ) ? $toKhmer( record.people.address ) : '' ) }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >អាសយដ្ឋានអចិន្ត្រៃយ៍</td>
                                            <td colspan="3" >{{ ( ( record != null && record.people != undefined && record.people != null && record.people.current_address != null  ) ? $toKhmer( record.people.current_address ) : '' ) }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >លេខទូរស័ព្ទ</td>
                                            <td >{{ record.people.phone }}</td>
                                            <td class="" >អ៊ីមែល</td>
                                            <td >{{ record.people.email }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >អត្តលេខមន្ត្រី</td>
                                            <td class="" >{{ record.code }}</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >លេខអត្តសញ្ញាណបណ្ណជាតិខ្មែរ</td>
                                            <td>{{ ( ( record != null && record.people != undefined && record.people != null && record.people.nid != null  ) ? record.people.nid : '' ) }}</td>
                                            <td class="">សុពលភាព ៖ 01-01-2019</td>
                                            <td class="">ដល់ថ្ងៃ ៖ 01-01-2029</td>
                                        </tr>
                                        <tr>
                                            <td class="w-48 " >ការសម្បទា</td>
                                            <td>
                                                <n-space item-style="display: flex;" align="center">
                                                    <n-space>
                                                        <n-radio>គ្រប់គ្រាន់</n-radio>
                                                        <n-radio>ពិការភាព</n-radio>
                                                    </n-space>
                                                </n-space>
                                            </td>
                                            <td colspan="2" class="">ដៃឆ្វេង</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <div class="form-panel border border-gray-200 rounded-md m-4  bg-white shadow w-full mx-auto " >
                            <!-- Family Information -->
                            <div class="w-full p-4 " >
                                <div class="relative w-full mb-4 border-b border-gray-200 pb-2 font-moul " >ខ. ព័ត៌មានគ្រួសារ</div>
                                <table class="w-full" style="border-spacing: 0px; " >
                                    <tbody>
                                        <tr>
                                            <td colspan="4" > 
                                                <n-space item-style="display: flex;" align="center">
                                                    <n-space>
                                                        <n-radio>នៅលីវ</n-radio>
                                                        <n-radio>រៀបការហើយ</n-radio>
                                                        <n-radio>ពោះមាយ / មេមាយ</n-radio>
                                                    </n-space>
                                                </n-space>
                                            </td>
                                        </tr>
                                        <!-- Spouse Information -->
                                        <tr>
                                            <td>
                                                <div class="relative w-full my-4 border-b border-gray-200 pb-2 font-btb-black " >ខ.១ ព័ត៌មាន ប្រពន្ធ ឬ ប្ដី</div>
                                                <table class="w-full" style="border-spacing: 0px; " >
                                                    <tbody>
                                                        <tr >
                                                            <td class="w-48 " >លេខសំបុត្រអាពាហ៍ពិពាហ៍</td>
                                                            <td>123456789</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">ឈ្មោះប្រពន្ធ ឬ ប្តី</td>
                                                            <td>ត្រកូល ឈ្មោះ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">ឈ្មោះប្រពន្ធ ឬ ប្តី ជាអក្សរពុម្ភឡាតាំង</td>
                                                            <td>ត្រកូល ឈ្មោះ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">ថ្ងៃខែឆ្នាំកំណើត</td>
                                                            <td>ទឹកថ្លា សែនសុខ ភ្នំពេញ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">អត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</td>
                                                            <td>០១០៩៨៧៦៥៤</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">ទីកន្លែងកំណើត</td>
                                                            <td>ទឹកថ្លា សែនសុខ ភ្នំពេញ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">មុខរបរបច្ចុប្បន្ន</td>
                                                            <td>មន្ត្រីរាជការ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">អាសយដ្ឋានបច្ចុប្បន្ន</td>
                                                            <td>ទឹកថ្លា សែនសុខ ភ្នំពេញ</td>
                                                        </tr>
                                                        <tr >
                                                            <td class="w-48 ">ឈ្មោះអង្គភាព</td>
                                                            <td>ទីស្ដីការគណៈរដ្ឋមន្ត្រី</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Kids Information -->
                                        <tr>
                                            <td>
                                                <div class="relative w-full my-4 border-b border-gray-200 pb-2 font-btb-black " >ខ.២ ព័ត៌មាន កូន</div>
                                                <table class="w-full" style="border-spacing: 0px; " >
                                                    <tbody>
                                                        <tr >
                                                            <td class="w-48 pb-2" >មានកូនចំនួន ៥ នាក់</td>
                                                            <td class="w-48" >កូនស្រីចំនួន ២ នាក់</td>
                                                        </tr>
                                                        <tr >
                                                            <td colspan="2" >
                                                                <table class="w-full" >
                                                                    <tbody>
                                                                        <tr v-for="(o,i) in 5"  :key="i">
                                                                            <td class="w-48 " >{{ $toKhmer( i + 1 ) }}. គោត្តនាម និងនាមខ្លួន</td>
                                                                            <td>ត្រកូល ឈ្មោះ</td>
                                                                            <td>ភេទ ៖ ប្រុស</td>
                                                                            <td>ថ្ងៃខែឆ្នាំកំណើត ៖ ០១ មករា ១៩៩៥</td>
                                                                            <td>មុខរបរ ៖ ធ្វើការ</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <!-- Father and Mother Information -->
                                        <tr>
                                            <td>
                                                <div class="relative w-full my-4 border-b border-gray-200 pb-2 font-btb-black " >ខ.៣ ព័ត៌មាន ឪពុក និងម្ដាយបង្កើត</div>
                                                <table class="w-full" style="border-spacing: 0px; " >
                                                    <tbody>
                                                        <tr >
                                                            <td>
                                                                <div class="relative w-full mb-4 border-b border-gray-200 pb-2 font-btb-black " >ព័ត៌មាន ឪពុក</div>
                                                                <table class="w-full" style="border-spacing: 0px; " >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="w-48 " >ឈ្មោះ</td>
                                                                            <td >ត្រកូល</td>
                                                                            <td>ឈ្មោះ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ឈ្មោះជាអក្សរពុម្ភឡាតាំង</td>
                                                                            <td >ត្រកូល</td>
                                                                            <td>ឈ្មោះ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ថ្ងៃ ខែ ឆ្នាំ កំណើត</td>
                                                                            <td>០១ មករា ១៩៦១</td>
                                                                            <td class="">ជនជាតិ ៖ ខ្មែរ</td>
                                                                            <td class="">សញ្ជាតិ ៖ ខ្មែរ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ទីកន្លែងកំណើត</td>
                                                                            <td colspan="3" >ទីកន្លែងកំណើត</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >អាសយដ្ឋានបច្ចុប្បន្ន</td>
                                                                            <td colspan="3" >ទីលំនៅបច្ចុប្បន្ន</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                            <td>
                                                                <div class="relative w-full mb-4 border-b border-gray-200 pb-2 font-btb-black " >ព័ត៌មាន ម្ដាយ</div>
                                                                <table class="w-full" style="border-spacing: 0px; " >
                                                                    <tbody>
                                                                        <tr>
                                                                            <td class="w-48 " >ឈ្មោះ</td>
                                                                            <td >ត្រកូល</td>
                                                                            <td>ឈ្មោះ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ឈ្មោះជាអក្សរពុម្ភឡាតាំង</td>
                                                                            <td >ត្រកូល</td>
                                                                            <td>ឈ្មោះ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ថ្ងៃ ខែ ឆ្នាំ កំណើត</td>
                                                                            <td>០១ មករា ១៩៦១</td>
                                                                            <td class="">ជនជាតិ ៖ ខ្មែរ</td>
                                                                            <td class="">សញ្ជាតិ ៖ ខ្មែរ</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >ទីកន្លែងកំណើត</td>
                                                                            <td colspan="3" >ទីកន្លែងកំណើត</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td class="w-48 " >អាសយដ្ឋានបច្ចុប្បន្ន</td>
                                                                            <td colspan="3" >ទីលំនៅបច្ចុប្បន្ន</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </n-scrollbar>
            </div>
        </Transition>
        <Transition name="slide-fade" >
            <div v-if="record == undefined || record == null " >មានបញ្ហាក្នុងការបង្ហាញ ព័ត៌មានមន្ត្រី</div>
        </Transition>
    </div>    
</template>
<script >
import { reactive , ref , computed } from 'vue'
import { useStore } from 'vuex'
import { useMessage, useNotification } from 'naive-ui'

import Frame4Corner from '@components/widgets/frame/corner4.vue'
import QrcodeVue from 'qrcode.vue'
import ocmLogoUrl from '@assets/logo.svg'
import dateFormat from 'dateformat'
    export default {
        components: {
            Frame4Corner ,
            QrcodeVue ,
        },
        props: {
            record: {
                type: Object ,
                required: true ,
                default: () => {
                    return reactive({
                        id: 0 ,
                        username: '' ,
                        firstname: '' ,
                        lastname: '' ,
                        nid: '' ,
                        dob: '' ,
                        marry_status: '' ,
                        email: '' ,
                        phone: '' ,
                        person: null ,
                        orgainzations: [] ,
                        positions: [] ,
                        countesies: []
                    })
                },    
            },
            show: {
                type: Boolean ,
                default: false
            },
            onClose: {
                type: Function
            },
        },
        setup(props){
            console.log( props.record )
            console.log( props.show )
            const birthCertificateDob = ref( new Date() )
            const birthCertificate = reactive({
                people_id : props.record.id ,
                birth_number : null ,
                book_number : null ,
                year : null ,
                province_id : null ,
                district_id : null ,
                commune_id : null ,
                firstname : '' ,
                lastname : '' ,
                enfirstname : '' ,
                enlastname : '' ,
                gender : '' ,
                dob: '' ,
                nationality: '' ,
                pob: '' ,
                issued_date : '' ,
                issued_location: '' ,
                signed_name : '' ,
                wedding_certificate_id : 0 ,
                pdf : ''
            })
            return {
                birthCertificate ,
                birthCertificateDob ,
                dateFormat
            }
        }
    }
</script>
<style scoped >
</style>