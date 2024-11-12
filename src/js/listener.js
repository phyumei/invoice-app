import {
  checkoutHandler,
  closeSidebarBtnHandler,
  manageInventoryBtnHandler,
} from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordListHandler } from "./record";
import {
  addNewProductBtn,
  checkout,
  closeSidebarBtn,
  createRecordForm,
  manageInventoryBtn,
  recordList,
} from "./selectors";

const listener = () => {
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
  closeSidebarBtn.addEventListener("click", closeSidebarBtnHandler);
  addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
  createRecordForm.addEventListener("submit", createRecordFormHandler);
  recordList.addEventListener("click", recordListHandler);
  checkout.addEventListener("click", checkoutHandler);
};

export default listener;
