import React, { Suspense } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
// import { store } from './services/store'
// import {useTranslation} from "react-i18next";
import { useSelector } from 'react-redux'
import { persistor } from './services/store'
import Loader from './components/Loader'
import Routes from './routes/routes'
// import Preloader from './components/preloader/preloader'
import MainLayout from './layouts/MainLayout'
import UserLayout from './layouts/UserLayout'

function App() {
  const token =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user'))['access_token']
  const isLoad = useSelector((state) => state.auth.isLoading)
  console.log('loading => ', isLoad)
  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className='App'>
        <Suspense fallback={<Loader />}>
          {isLoad ? <Loader /> : undefined}
          <BrowserRouter>
            {token ? (
              <MainLayout>
                <Routes />
              </MainLayout>
            ) : (
              <UserLayout>
                <Routes />
              </UserLayout>
            )}
          </BrowserRouter>
        </Suspense>
      </div>
    </PersistGate>
  )
}

export default App
