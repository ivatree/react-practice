import React from 'react';

interface InputProps {
  title: string;
  type: string;
  value: string;
  handler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
}

export function Input({ title, type, value, handler, text }: InputProps) {
  return (
    <div className="form-container">
      <h3>{title}</h3>
      <div className="input-outline">
        <input
          type={type}
          value={value}
          onChange={handler}
          placeholder={text}
        />
      </div>
    </div>
  );
}
