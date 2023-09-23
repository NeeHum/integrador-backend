import React, { useState } from "react";
import Login from "../auth/Login";
import { Link } from "react-scroll";

import {
  DivNav,
  NavSidebar,
  LogoNav,
  UlSidebar,
  LiSidebar,
  SpanCopy,
  SpanUser,
  ButtonLogOut,
  ButtonSidebar,
} from "./SidebarStyled.js";

import {
  CardBuy,
  DivArticles,
  DivCart,
  DivGralCart,
  DivProducts,
  DivTitleNumber,
  NumberProducts,
  PayCart,
  PriceGame,
  PriceTotal,
  SpanEmptyCart,
  ThankYou,
  TittleCart,
  TittleGame,
} from "./CartStyled";

import {
  RiHome4Line,
  RiPercentLine,
  RiGamepadLine,
  RiShoppingCart2Line,
  RiMenuUnfoldLine,
  RiAccountCircleLine,
  RiDeleteBin6Line,
  RiCloseLine,
} from "react-icons/ri";

import logo from "../../assets/img/logo.png";
import {
  ConteinerDivMobile,
  NavMobile,
  ButtonMobile,
} from "./MobilebarStyled.js";

const Sidebar = ({ cartItems, setCartItems }) => {
  const [open, setOpen] = useState(false);
  const [opencart, setOpencart] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(""); // Nuevo estado
  const [showLogout, setShowLogout] = useState(false); // Nuevo estado

  const handleRemoveFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  const handlePurchase = () => {
    setCartItems([]);
    setShowThanks(true);
    setTimeout(() => {
      setShowThanks(false);
    }, 3000);
  };

  const handleLoginClick = () => {
    if (!isLoggedIn) {
      toggleModal(
        <Login
          setIsLoggedIn={setIsLoggedIn}
          updateUserName={setUserName} // Corrección aquí
          closeModal={closeModal}
        />
      );
    }
  };

  const openModal = (content) => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleModal = (content) => {
    if (showModal) {
      closeModal();
    } else {
      openModal(content);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    setShowLogout(false);
  };

  return (
    <>
      {/* ---Sidebar--- */}
      <DivNav>
        <NavSidebar open={open}>
          <UlSidebar>
            <LogoNav src={logo}></LogoNav>
            <LiSidebar>
              <Link
                to="mainSection"
                smooth={true}
                duration={500}
                style={{
                  padding: "10px 10px 2px 10px",
                  borderRadius: "10px",
                  color: "var(--pink)",
                  cursor: "pointer",
                }}
                activeStyle={{
                  backgroundColor: "var(--pink)",
                  color: "var(--white)",
                }}
              >
                <RiHome4Line />
              </Link>
            </LiSidebar>
            <LiSidebar>
              <Link
                to="salesSection"
                smooth={true}
                duration={500}
                style={{
                  padding: "10px 10px 2px 10px",
                  borderRadius: "10px",
                  color: "var(--pink)",
                  cursor: "pointer",
                }}
                activeStyle={{
                  backgroundColor: "var(--pink)",
                  color: "var(--white)",
                }}
              >
                <RiPercentLine />
              </Link>
            </LiSidebar>
            <LiSidebar>
              <Link
                to="cardsSection"
                smooth={true}
                duration={500}
                style={{
                  padding: "10px 10px 2px 10px",
                  borderRadius: "10px",
                  color: "var(--pink)",
                  cursor: "pointer",
                }}
                activeStyle={{
                  backgroundColor: "var(--pink)",
                  color: "var(--white)",
                }}
              >
                <RiGamepadLine />
              </Link>
            </LiSidebar>

            {/* Renderizamos el botón de inicio de sesión solo si el usuario no ha iniciado sesión */}
            {!isLoggedIn && (
              <LiSidebar>
                <ButtonSidebar onClick={handleLoginClick}>
                  <RiAccountCircleLine />
                </ButtonSidebar>
              </LiSidebar>
            )}

            {/* Mostramos el nombre de usuario si está logueado */}
            {isLoggedIn && <SpanUser>{userName}</SpanUser>}

            {isLoggedIn && !showLogout && (
              <ButtonLogOut onClick={() => setShowLogout(true)}>↩</ButtonLogOut>
            )}

            {showLogout && (
              <>
                <SpanUser>Log Out?</SpanUser>
                <ButtonLogOut onClick={handleLogout}>✔</ButtonLogOut>
              </>
            )}

            <LiSidebar>
              <ButtonSidebar onClick={() => setOpencart(!opencart)}>
                {opencart ? <RiCloseLine /> : <RiShoppingCart2Line />}
              </ButtonSidebar>
            </LiSidebar>
          </UlSidebar>
          <SpanCopy>Buy Games © 2023</SpanCopy>
        </NavSidebar>
      </DivNav>
      {/* ---mobile button menu--- */}
      <ConteinerDivMobile>
        <NavMobile>
          <ButtonMobile>
            {open ? (
              <RiCloseLine onClick={() => setOpen(!open)} />
            ) : (
              <RiMenuUnfoldLine onClick={() => setOpen(!open)} />
            )}
          </ButtonMobile>
        </NavMobile>
      </ConteinerDivMobile>
      {/* ---cart--- */}
      <DivCart opencart={opencart}>
        <DivGralCart>
          <TittleCart>🛒 YOUR CART 🛒</TittleCart>
          <DivProducts>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <CardBuy key={index}>
                  <DivArticles
                    style={{
                      backgroundImage: `url(${item.imgGame})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  >
                    <DivTitleNumber>
                      <TittleGame>{item.title}</TittleGame>
                      {item.quantity > 1 && (
                        <NumberProducts style={{ marginLeft: "5px" }}>
                          ({item.quantity}) ADDED GAMES
                        </NumberProducts>
                      )}
                    </DivTitleNumber>
                    <PriceGame>${item.price}</PriceGame>
                    <RiDeleteBin6Line
                      onClick={() => handleRemoveFromCart(index)}
                      style={{
                        cursor: "pointer",
                        background: "red",
                        padding: "2px",
                        fontSize: "20px",
                        borderRadius: "3px",
                      }}
                    />
                  </DivArticles>
                </CardBuy>
              ))
            ) : (
              <SpanEmptyCart>😭 THE CART IS EMPTY 😭</SpanEmptyCart>
            )}
          </DivProducts>
          <PriceTotal>THE TOTAL PRICE IS: ${calculateTotalPrice()}</PriceTotal>
          <PayCart onClick={handlePurchase}>BUY</PayCart>
        </DivGralCart>
        {showThanks && (
          <ThankYou>
            <h3>THANKS FOR YOUR PURCHASE</h3>
          </ThankYou>
        )}
      </DivCart>
      {/* ---Login component directly--- */}
      {showModal && (
        <Login
          setIsLoggedIn={setIsLoggedIn}
          updateUserName={setUserName}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default Sidebar;
