import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

/* MDB Bootstrap */
import * as mdb from 'mdb-ui-kit'
import 'mdb-ui-kit/css/mdb.min.css'
window.mdb = mdb
/* Font Awesome */
import '@fortawesome/fontawesome-free/css/all.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
