import {
  newProductName,
  newProductPrice,
  productCardTemplate,
  productList,
  productSelect,
} from "./selectors";
import { v4 as uuidv4 } from "uuid";
import { products } from "./states";

export const addNewProductBtnHandler = () => {
  const createId = uuidv4();

  productList.append(
    createProductCard(
      createId,
      newProductName.value,
      newProductPrice.valueAsNumber,
    ),
  );
  productSelect.append(
    new Option(
      `${newProductName.value} - ${newProductPrice.valueAsNumber}`,
      createId,
    ),
  );

  products.push({
    id: createId,
    name: newProductName.value,
    price: newProductPrice.valueAsNumber,
  });

  newProductName.value = null;
  newProductPrice.value = null;
};

export const productRender = (products) => {
  products.forEach(({ id, name, price }) => {
    productList.append(createProductCard(id, name, price));
    productSelect.append(new Option(`${name} - ${price}`, id));
  });
};

export const createProductCard = (id, name, price) => {
  const productCard = productCardTemplate.content.cloneNode(true);
  const currentProductCard = productCard.querySelector(".product-card");
  const productName = productCard.querySelector(".product-name");
  const productPrice = productCard.querySelector(".product-price");

  currentProductCard.id = id;
  productName.innerText = name;
  productPrice.innerText = price;

  return productCard;
};
