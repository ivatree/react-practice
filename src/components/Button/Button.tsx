import React from 'react';
import PropTypes from 'prop-types';
import './Button.module.css'

interface ButtonProps {
    className: string;
    onClick: () => void;
    text: any;
    children?: React.ReactNode;
  }

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    className: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default function Button({className, onClick, text, children }: ButtonProps) {
    return (
        <button className={className} onClick={onClick}>
            {text}
            {children}
        </button>
    );
};