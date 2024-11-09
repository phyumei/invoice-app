import { productSidebar } from "./selectors";

const initialRender = () => {
  // open product sidebar
  productSidebar.classList.remove("translate-x-full");
};

export default initialRender;
