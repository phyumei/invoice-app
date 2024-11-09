import Swal from "sweetalert2";
import {
  createRecordForm,
  recordList,
  recordNetTotal,
  recordRowTemplate,
  recordTax,
  recordTotal,
} from "./selectors";
import { products } from "./states";
import { v4 as uuidv4 } from "uuid";

export const createRecordFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(createRecordForm);

  const currentProduct = products.find(
    ({ id }) => id == formData.get("product-select"),
  );

  recordList.append(createRecordRow(currentProduct, formData.get("quantity")));

  createRecordForm.reset();
};

export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");
  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");
  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());
  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;

  return recordRow;
};

export const calculateTax = (amount, percentage = 5) => {
  return (amount / 100) * percentage;
};

export const calculateRecordCostTotal = () => {
  let total = 0;
  recordList
    .querySelectorAll(".record-cost")
    .forEach((el) => (total += parseFloat(el.innerText)));
  return total;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure you want to delete?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
      currentRecordRow.remove();

      Swal.fire({
        title: "Deleted!",
        text: "Your record has been deleted.",
        icon: "success",
      });
    }
  });
};

export const recordListHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  }
};

export const recordListObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);
    recordTotal.innerText = total;
    recordTax.innerText = tax;
    recordNetTotal.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordList, observerOptions);
};
