export const getTestHandler = async (
  e: Electron.IpcMainInvokeEvent,
  message: string
): Promise<ITestResponse> => {
  return { message: "pong" };
};
