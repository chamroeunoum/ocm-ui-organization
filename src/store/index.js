import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import attendant from './modules/attendant'
import organization from './modules/organization'
import position from './modules/position'
import countesy from './modules/countesy'
import task from './modules/task'
import regulator from './modules/regulator'
import search_regulator from './modules/search_regulators'
import folder from './modules/folder'
import officer from './modules/officer'
import regulatorType from './modules/regulator/type'

import people from './modules/people/people'
import certificate from './modules/people/certificate'
import niccertificate from './modules/people/niccertificate'
import birthcertificate from './modules/people/birthcertificate'
import weddingcertificate from './modules/people/weddingcertificate'

// Location
import province from './modules/location/province'
import district from './modules/location/district'
import commune from './modules/location/commune'
import village from './modules/location/village'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // Local computer
    server: 'http://127.0.0.1:8000/api/hradmin' ,
    // Server 103.16.62.69
    // apiServer: 'https://apis.ocm.gov.kh/api/hradmin' ,
    company: {
      name: 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    },
    system: {
      name: 'ប្រព័ន្ធគ្រប់គ្រង រដ្ឋបាល និងធនធានមនុស្ស'
    }
    // branch: '' 
  },
  modules: {
    auth ,
    user ,
    folder ,
    attendant ,
    officer,
    organization ,
    position , 
    countesy ,
    regulator ,
    search_regulator ,
    regulatorType ,
    task ,
    // People
    people,
    certificate ,
    niccertificate ,
    birthcertificate ,
    weddingcertificate ,
    // Province , District , Commune , Village
    province ,
    district ,
    commune ,
    village ,
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})