import { Fragment, useState } from "react";

export function App() {
  const [message, setMessage] = useState("");
  const getTestHandler = async () => {
    const { message: returnMessage } = await electron.testApi.getTest("");
    setMessage(returnMessage);
  };
  return (
    <Fragment>
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-primary-dark">💖 Hello World!</h1>
          <p className="text-secondary-dark">
            Welcome to your Electron application.
          </p>
          <p className="text-disabled-dark">
            Welcome to your Electron application.
          </p>
          <button className="mx-3 rounded-xl btn-dark p-5">Test Btn</button>
          <button className="rounded-xl btn-dark p-5" disabled>
            Test disabled Btn
          </button>
          <button className="mx-3 rounded-xl btn-dark border-1px p-5">
            border Btn
          </button>
          <button className="m-3 rounded-xl btn-dark shadow-box-dark p-5">
            Shadow Btn
          </button>
          <button className="m-3 rounded-xl accent-btn-vio shadow-box-dark p-5">
            Shadow Btn
          </button>
          <button className="m-3 rounded-xl accent-btn-teal shadow-box-dark p-5">
            Shadow Btn
          </button>
        </div>
        <div className="h-[100vh] bg-neutral-50">
          <h1 className="text-primary">💖 Hello World!</h1>
          <p className="text-secondary">
            Welcome to your Electron application.
          </p>
          <p className="text-disabled">Welcome to your Electron application.</p>
          <button className="mx-3 rounded-xl btn-light p-5">Test Btn</button>
          <button className="rounded-xl btn-light p-5" disabled>
            Test disabled Btn
          </button>
          <button className="mx-3 rounded-xl btn-light border-1px p-5">
            border Btn
          </button>
          <button className="m-3 rounded-xl btn-light shadow-box p-5">
            Shadow Btn
          </button>
          <button className="m-3 rounded-xl accent-btn-vio shadow-box p-5">
            Shadow Btn
          </button>
          <button
            className="m-3 rounded-xl accent-btn-vio text-primary shadow-box p-5"
            disabled
          >
            Shadow Btn
          </button>
          <button className="m-3 rounded-xl accent-btn-teal shadow-box p-5">
            Shadow Btn
          </button>
          <button
            className="m-3 rounded-xl accent-btn-teal shadow-box p-5"
            disabled
          >
            Shadow Btn
          </button>
        </div>
      </div>
    </Fragment>
  );
}
