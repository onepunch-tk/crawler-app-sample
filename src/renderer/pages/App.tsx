import { Fragment, useState } from "react";

export function App() {
  const [message, setMessage] = useState("");
  const getTestHandler = async () => {
    const { message: returnMessage } = await electron.testApi.getTest("");
    setMessage(returnMessage);
  };
  return (
    <Fragment>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      <button onClick={getTestHandler}>Get Test</button>
      <span>{message}</span>
      <div className="m-4 rounded-xl accent-bg-purple flex-box-col center-axis w-32 h-32 shadow-box-light dark:shadow-box-dark">
        <span className="text-gray-950 font-bold">hahahah</span>
      </div>
      <div className="rounded-xl accent-bg-teal flex center-axis w-32 h-32 shadow-box-light dark:shadow-box-dark">
        <span className="text-gray-950 font-bold">hahahah</span>
      </div>
      <div className="m-4 rounded-xl section-bg-light dark:section-bg-dark flex center-axis w-32 h-32 shadow-box-light dark:shadow-box-dark">
        <span className="font-bold">hahahah</span>
      </div>
      <div className="m-4 rounded-xl section__sub-bg-light dark:section__sub-bg-dark flex center-axis w-32 h-32 shadow-box-light dark:shadow-box-dark">
        <span className="font-bold">hahahah</span>
      </div>
    </Fragment>
  );
}
