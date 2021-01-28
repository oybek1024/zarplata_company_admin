import React, { Suspense, useEffect } from 'react'
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
// import {useTranslation} from "react-i18next";
// import {useSelector} from "react-redux";
// import { persistor } from "services/Store";
import Routes from './routes/routes'
import Preloader from './components/preloader/preloader'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<Preloader />}>
        <BrowserRouter>
          <MainLayout>
            {/* <Routes /> */}
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/contact' exact component={Contact} />
            </Switch>
          </MainLayout>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
