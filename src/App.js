import React, {Suspense} from 'react'
// import { PersistGate } from 'redux-persist/integration/react'
import {BrowserRouter} from 'react-router-dom'
// import {useTranslation} from "react-i18next";
// import {useSelector} from "react-redux";
// import { persistor } from './services/store'
// import Loader from './components/Loader'
import Routes from './routes/routes'
import Preloader from './components/preloader/preloader'
import MainLayout from './layouts/MainLayout'
import UserLayout from './layouts/UserLayout'

function App() {
    const token = false
    return (
        // <PersistGate loading={null} persistor={persistor}>
        <div className='App'>
            <Suspense fallback={<Preloader/>}>
                {/*<Loader/>*/}
                <BrowserRouter>
                    { token ? (
                        <MainLayout>
                            <Routes/>
                        </MainLayout>
                    ) : (
                        <UserLayout>
                            <Routes/>
                        </UserLayout>
                    ) }
                </BrowserRouter>
            </Suspense>
        </div>
        // </PersistGate>
    )
}

export default App
