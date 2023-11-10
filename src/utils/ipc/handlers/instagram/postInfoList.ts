import { BroadcastChannel, Worker } from "node:worker_threads";
import path from "path";

// @ts-ignore
const { VITE_NODE_ENV } = import.meta.env;
const bc = new BroadcastChannel("hello");
export const postInfoHandler = async (
  e: Electron.IpcMainInvokeEvent,
  urls: string[]
) => {
  try {
    const dirName = "insta";

    const workerData = { urls };
    // const worker = new Worker(, {
    //   workerData,
    // });
    new Worker(path.join(__dirname, "post_worker.js"), {
      workerData,
    }).on("message", (message: string) => {
      console.log(message);
    });
  } catch (e) {
    console.error(e);
  }
};
