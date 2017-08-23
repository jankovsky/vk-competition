import React from 'react';
import HeaderComponent from '../Header/Header';
import AppDescComponent from '../AppDescription/AppDescription';
import FooterComponent from '../Footer/Footer';
import LoginForm from '../LoginForm/LoginForm';
import { connect } from 'react-redux';
import * as headerActions from '../../actions/HeaderActions';
import { bindActionCreators } from 'redux';

import './AppComponent.sass';

class AppComponent extends React.Component {
    render () {
        const {header, user} = this.props;
        const {getPhotos} = this.props.headerActions;
        return (
            <div className="b-app">
                <h1>Привет2 {user.name} !</h1>
                <HeaderComponent year={header.year} photos={header.photos} getPhotos={getPhotos} fetching={header.fetching} />
                <AppDescComponent />
                <LoginForm />
                <FooterComponent />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        header: state.header
    }
}

function mapDispatchToProps(dispatch) {
    return {
        headerActions: bindActionCreators(headerActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);