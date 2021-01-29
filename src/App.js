import React, { Suspense } from 'react'
// import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
// import {useTranslation} from "react-i18next";
// import {useSelector} from "react-redux";
// import { persistor } from './services/store'
import Routes from './routes/routes'
import Preloader from './components/preloader/preloader'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    // <PersistGate loading={null} persistor={persistor}>
      <div className='App'>
        <Suspense fallback={<Preloader />}>
          <BrowserRouter>
            <MainLayout>
              <Routes />
            </MainLayout>
          </BrowserRouter>
        </Suspense>
      </div>
    // </PersistGate>
  )
}

export default App
