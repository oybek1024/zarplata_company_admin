import React from 'react'
import ReactDOM from 'react-dom'
import './index.less'
import App from './App'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { store } from "./services/store";
import {Provider} from "react-redux";

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
