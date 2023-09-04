import React from "react";
import {
  DivCard,
  ImgGame,
  TittleGameCard,
  DataCard,
  PriceCard,
  SpanAdd,
  ButtonBuyCard,
} from "./CardStyled";

const Card = ({
  title,
  imgGame,
  priceGame,
  addToCart,
  cartItems,
  setCartItems,
}) => {
  const handleAddToCart = () => {
    const product = {
      title,
      imgGame,
      priceGame,
      price: parseFloat(priceGame),
    };
    addToCart(product);
  };

  // Construye la URL completa de la imagen usando la ruta relativa
  const imageUrl = `${imgGame}`;

  // Busca el elemento correspondiente en el carrito para obtener la cantidad
  const cartItem = cartItems.find((item) => item.title === title);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <>
      <DivCard>
        <div>
          <ImgGame src={imageUrl} alt={title} />
        </div>
        <DataCard>
          <TittleGameCard>{title}</TittleGameCard>

          <ButtonBuyCard onClick={handleAddToCart}>ADD TO CART</ButtonBuyCard>
          <PriceCard>${priceGame}</PriceCard>
          {quantity >= 1 && <SpanAdd>({quantity}) ADDED</SpanAdd>}
        </DataCard>
      </DivCard>
    </>
  );
};

export default Card;
