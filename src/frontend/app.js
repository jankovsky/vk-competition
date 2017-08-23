import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';

import { AppContainer } from 'react-hot-loader';

import AppComponent from './components/AppComponent/AppComponent';

injectTapEventPlugin();

const store = configureStore();

const render = (Component) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <MuiThemeProvider>
                    <Component />
                </MuiThemeProvider>
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );
};

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/AppComponent/AppComponent', () => {
        render(AppComponent)
    });
}

render(AppComponent);