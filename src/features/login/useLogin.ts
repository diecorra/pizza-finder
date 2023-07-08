import { ChangeEvent, useState } from 'react';

export function useLogin() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const isValid = formData.username.length && formData.password.length;

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  return {
    formData,
    isValid,
    changeHandler,
  };
}
