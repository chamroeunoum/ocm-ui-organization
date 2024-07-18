import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import attendant from './modules/attendant'
import meeting from './modules/meeting'
import organization from './modules/organization'
import type from './modules/type'
import legaldraft from './modules/legaldraft'
import room from './modules/room'
import task from './modules/task'
import regulator from './modules/regulator'
import search_regulator from './modules/search_regulators'
import folder from './modules/folder'
import regulatorType from './modules/regulator/type'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {
    // Local computer
    apiServer: 'http://127.0.0.1:8000/api/meeting' ,
    // apiServer: 'https://edocservice.sctthaicambodia.com/api/meeting' ,
    // Server 103.16.62.69
    // apiServer: 'https://edoc.onetechcambodia.com/api/meeting' ,
    company: {
      name: 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី'
    },
    system: {
      name: 'ប្រព័ន្ធគ្រប់គ្រង កិច្ចប្រជុំគណៈរដ្ឋមន្ត្រី'
    }
    // branch: '' 
  },
  modules: {
    auth ,
    user ,
    folder ,
    attendant ,
    meeting ,
    organization ,
    room ,
    regulator ,
    search_regulator ,
    regulatorType ,
    organization ,
    type ,
    task ,
    legaldraft
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})