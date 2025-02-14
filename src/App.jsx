import React from "react";
import AllLaunches from "./container/AllLaunches.jsx";

import NotFound from "./container/NotFound";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params';
import { WagmiProvider } from 'wagmi'
import { createAppKit } from '@reown/appkit/react'

import toast, { ToastBar, Toaster } from "react-hot-toast";
import './index.css';

import Faq from "./container/Faq";
import Rules from "./container/Rules";
import Instructions from "./container/Instructions";
import { config, networks, wagmiAdapter } from "./config.jsx";
import Privacy from "./container/Privacy";
import Terms from "./container/Terms";
// const projectId = '4807d388fe495226b7fc14743af2e1d9'
const projectId = '166c810a1a76fedfcbfb4a4c442c40ed'
const metadata = {
  name: 'My Celo App',
  description: 'My Website description',
  url: 'https://blackpump.fun',
  icons: ['https://avatars.blackpump.fun/']
};

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'dark',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  },
  themeVariables: {
    '--w3m-accent': '#000000',
  }
})

const App = () => {
  return (
    <Router>
      <QueryParamProvider>
        <div>
          <WagmiProvider config={config}>
            <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{ duration: 5000 }}
            >
              {(t) => (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => toast.dismiss(t.id)}
                >
                  <ToastBar onClick={() => alert(1)} toast={t} />
                </div>
              )}
            </Toaster>
            <Switch>
              <Route exact path="/">
                <AllLaunches />
              </Route>
              <Route exact path="/dashboard">
                <AllLaunches />
              </Route>
              <Route exact path="/rules">
                <Rules />
              </Route>
              <Route exact path="/instructions">
                <Instructions />
              </Route>
              <Route exact path="/FAQ">
                <Faq />
              </Route>
              <Route exact path="/NotFound">
                <NotFound />
              </Route>
              <Route exact path="/privacy">
                <Privacy />
              </Route>
              <Route exact path="/terms">
                <Terms />
              </Route>
            </Switch>
          </WagmiProvider>
          {/* <Web3Modal
            projectId={projectId}
            ethereumClient={ethereumClient}
          /> */}
        </div>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
