import React from 'react';
import './styles.scss';
import Button from 'components/Button';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  active: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
}

export function Modal({ active, closeModal, children }: ModalProps) {
  if (!active) return null;

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={handleClickOutside}
    >
      <div className="modal-content">
        <Button
          className="closeModal"
          onClick={closeModal}
          text={<AiOutlineClose />}
        />
        {children}
      </div>
    </div>
  );
}
