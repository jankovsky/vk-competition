import React, { PropTypes, Component } from 'react';
import './Header.sass';

export default class Header extends Component {
    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText);
    }
    render () {
        const { year, photos, fetching } = this.props;
        return (
            <div className="b-header">
                <h2 className="b-header__head">Header</h2>
            </div>
        );
    }
};

Header.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.string.isRequired,
    getPhotos: PropTypes.func.isRequired
};