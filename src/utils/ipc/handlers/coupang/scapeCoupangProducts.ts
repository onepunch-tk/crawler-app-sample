import { Worker } from "node:worker_threads";
import path from "path";
import { mainWindow } from "@/main";
import { CHANNEL_COUPANG_ON_PRODUCTS } from "@utils/ipc/constants";

export const scapeCoupangProducts = async (
  _: Electron.IpcMainInvokeEvent,
  searchInfo: CP_SearchInfo
) => {
  let callBackCount = 0;
  const resultsMap = new Map<number, CP_ProductType[]>();
  try {
    for (let i = 1; i <= searchInfo.pageNumber; i++) {
      new Worker(path.join(__dirname, "product_worker.js"), {
        workerData: { ...searchInfo, pageNumber: i },
      }).on(
        "message",
        ({
          pageNumber,
          products,
        }: {
          pageNumber: number;
          products: CP_ProductType[];
        }) => {
          callBackCount++;
          resultsMap.set(pageNumber, products);
          if (callBackCount === searchInfo.pageNumber) {
            const sortedKeys = Array.from(resultsMap.keys()).sort(
              (a, b) => a - b
            );
            let sortedProducts: CP_ProductType[] = [];
            sortedKeys.forEach((key) => {
              sortedProducts = sortedProducts.concat(resultsMap.get(key));
            });
            mainWindow.webContents.send(CHANNEL_COUPANG_ON_PRODUCTS, {
              ok: true,
              products: sortedProducts,
            } as CoupangProductsResponse);
          }
        }
      );
    }
  } catch (e) {
    console.error(e);
  }
};
