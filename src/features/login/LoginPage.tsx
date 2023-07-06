import { FormEvent } from 'react';

export const LoginPage = () => {
  const changeHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login Page');
  };

  return (
    <div className="flex flex-col justify-around items-center gap-24">
      <h1>ADMIN LOGIN</h1>
      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={changeHandler}
      >
        <input
          name="username"
          type="text"
          placeholder="username"
          className="px-3 h-9"
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          className="px-1 h-9"
        />
        <button
          disabled={false}
          className="btn bg-primary rounded-xl w-full"
          type="submit"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
