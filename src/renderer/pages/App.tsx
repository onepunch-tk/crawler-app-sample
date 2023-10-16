import { Fragment, useState } from "react";

export function App() {
  const [message, setMessage] = useState("");
  const getTestHandler = async () => {
    const { message: returnMessage } = await electron.testApi.getTest("");
    setMessage(returnMessage);
  };
  return (
    <Fragment>
      <h1 className="text-gray-500 dark:text-gray-300">💖 Hello World!</h1>
      <p className="text-gray-500 dark:text-gray-300">
        Welcome to your Electron application.
      </p>
      <button
        onClick={getTestHandler}
        className="text-gray-500 dark:text-gray-300"
      >
        Get Test
      </button>
      <span className="text-gray-500 dark:text-gray-300">{message}</span>
    </Fragment>
  );
}
