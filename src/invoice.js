import initialRender from "./initialRender";
import listener from "./listener";

class Invoice {
  init() {
    console.log("Invoice app start");
    initialRender();
    listener();
  }
}

export default Invoice;