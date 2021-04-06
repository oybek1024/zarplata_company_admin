import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { store } from "./redux/store";
import {Provider} from "react-redux";
import '@/locales/i18n'
import 'antd/dist/antd.css';




const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      // refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
})
ReactDOM.render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactQueryCacheProvider>,
  document.getElementById('root')
)
