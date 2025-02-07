import React, { useState } from 'react';
import Button from 'components/Button';
import './styles.scss';
import { Input } from 'components/Form/Input';

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}

export function Form({ title, handleClick }: FormProps) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <div className="form-container">
      <Input
        title="Email"
        type="email"
        value={email}
        handler={(e) => setEmail(e.target.value)}
        text="Введите Email"
      />
      <Input
        title="Пароль"
        type="password"
        value={pass}
        handler={(e) => setPass(e.target.value)}
        text="Введите пароль"
      />
      <div className="btn-container">
        <Button
          className="choise"
          onClick={() => handleClick(email, pass)}
          text={title}
        />
      </div>
    </div>
  );
}
