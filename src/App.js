import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react'; // recupera dados persistidos


import { Provider } from 'react-redux';
//import { BrowserRouter as Router } from 'react-router-dom';
import { Router } from 'react-router';
import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

// persistor obtem dados do store
import { store, persistor } from './store'; // implementação de integração com redux

import GlobalStyle from './styles/global';
//import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



//forceRefresh={ true }
function App() {
    return (

            <Provider store={ store }>
                <PersistGate persistor={ persistor }>
                    <Router history={ history } >
                       <Routes />
                        <GlobalStyle />
                        <ToastContainer autoClose={ 3000 } />
                    </Router>
                </PersistGate>
            </Provider>

    );
}
export default App;
