import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCartPlus, faTimes, faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
// import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'

// library.add(fas)
// library.add(fab)
library.add(faTimes, faSearch, faCartPlus, faStar)

Vue.component('font-awesome-icon', FontAwesomeIcon)
