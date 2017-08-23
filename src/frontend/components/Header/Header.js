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
                <button onClick={this.onYearBtnClick.bind(this)}>2016</button>
                <button onClick={this.onYearBtnClick.bind(this)}>2017</button>
                <button onClick={this.onYearBtnClick.bind(this)}>2018</button>
                <button onClick={this.onYearBtnClick.bind(this)}>2019</button>
                <p>{year} год</p>
                {
                    fetching ?
                        <p>Загрузка...</p>
                        :
                        <p>У тебя {photos.length} фото.</p>
                }
            </div>
        );
    }
};

Header.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.string.isRequired,
    getPhotos: PropTypes.func.isRequired
};