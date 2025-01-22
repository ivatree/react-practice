import React from 'react';
import PropTypes from 'prop-types';
import './Button.module.css'

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.object.isRequired
};

export default function Button({className, onClick, text }) {
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
};