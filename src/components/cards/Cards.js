import React, { useState, useEffect } from 'react';
import Card from './Card';
import { DivArticlesCards, ListGames } from './CardsStyled';
import { ButtonCategories, LiCategories, UlCategories } from '../main/MainStyled';

const Cards = ({ cartItems, setCartItems }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Realiza una solicitud HTTP GET para obtener los productos desde el servidor
    fetch('https://backend-integradorbackend.vercel.app/api/productos') // Reemplaza con la URL de tu servidor backend
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  const addToCart = (product) => {
    // Verifica si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex((item) => item.title === product.title);

    if (existingItemIndex !== -1) {
      // Si el producto ya existe en el carrito, actualiza la cantidad en lugar de agregar un nuevo tarjeta
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no existe en el carrito, agrega una nueva tarjeta
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }
  };

  const cardsFiltradas = productos.filter(
    (producto) =>
      producto.categoria.id === categoriaSeleccionada || categoriaSeleccionada === ''
  );

  return (
    <>
      <ListGames>
        <div>
          <UlCategories>
            <LiCategories>
              <ButtonCategories onClick={() => setCategoriaSeleccionada('')}>
                ALL
              </ButtonCategories>
            </LiCategories>
            <LiCategories>
              <ButtonCategories onClick={() => setCategoriaSeleccionada('FPS')}>
                FPS
              </ButtonCategories>
            </LiCategories>
            <LiCategories>
              <ButtonCategories onClick={() => setCategoriaSeleccionada('OpenWorld')}>
                OPEN WORLD
              </ButtonCategories>
            </LiCategories>
            <LiCategories>
              <ButtonCategories onClick={() => setCategoriaSeleccionada('Adventure')}>
                ADVENTURE
              </ButtonCategories>
            </LiCategories>
          </UlCategories>
        </div>

        <DivArticlesCards>
          {cardsFiltradas.map((producto) => (
            <Card
              key={producto.id}
              title={producto.titulo}
              imgGame={producto.imagen}
              priceGame={producto.precio}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
              categoriaSeleccionada={categoriaSeleccionada}
            />
          ))}
        </DivArticlesCards>
      </ListGames>
    </>
  );
};

export default Cards;
