import React from 'react';
import ReactDOM from 'react-dom';
import App from './layouts/containers/app/App';
import {persist, store} from './core/store/store';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.Fragment>
    ,
    document.getElementById('root')
);
