import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css'
import Button from 'components/Button/Button';
import styles from 'components/Button/Button.module.css'
import { AiOutlineClose } from "react-icons/ai";


export function Modal({ active, closeModal, children }) {
    if (!active) return null;

    return (
        <div className={active ? "modal active" : "modal"}>
            <div className="modal-content">
                <Button className={styles.closeModal} onClick={closeModal} text={<AiOutlineClose />}/>
                {children}
            </div>
        </div>
    );
}

Modal.propTypes = {
    active: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node
};
