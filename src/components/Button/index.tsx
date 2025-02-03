import React from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
  className: string;
  onClick: () => void;
  text: any;
  children?: React.ReactNode;
}

export default function Button({
  className,
  onClick,
  text,
  children,
}: ButtonProps) {
  return (
    <button className={styles[className]} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
