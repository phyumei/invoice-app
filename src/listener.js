import { closeSidebarBtnHandler, manageInventoryBtnHandler } from "./handlers";
import { addNewProductBtnHandler } from "./inventory";
import { addNewProductBtn, closeSidebarBtn, manageInventoryBtn } from "./selectors";

const listener = () => {
  manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
    closeSidebarBtn.addEventListener("click", closeSidebarBtnHandler);
    addNewProductBtn.addEventListener("click", addNewProductBtnHandler)
};

export default listener;
