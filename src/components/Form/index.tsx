import React, { useState } from 'react';
import Button from 'components/Button';
import styles from '../Button/Button.module.scss';
import './Form.scss';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export function Form({ title, handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="form-container">
      <h3>Email:</h3>
      <div className="input-outline">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите Email"
        />
      </div>
      <h3>Пароль:</h3>
      <div className="input-outline">
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Введите пароль"
        />
      </div>
      <div className="btn-container">
        <Button
          className={styles.choise}
          onClick={() => handleClick(email, pass)}
          text={title}
        />
      </div>
    </div>
  );
}
