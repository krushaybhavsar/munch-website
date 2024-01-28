import React, { useEffect, useState } from "react";
import "./OrderScreen.css";
import { RestaurantMenu, RestaurantMenuItem, MenuOption } from "../../types";
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import LogoContainer from "../../components/LogoContainer/LogoContainer";
import MenuStep from "../../components/MenuStep/MenuStep";

type OrderScreenProps = {};

const OrderScreen = (props: OrderScreenProps) => {
  const [menu, setMenu] = useState<RestaurantMenu | undefined>(undefined);
  const [restaurantName, setRestaurantName] = useState<string | undefined>(
    undefined
  );
  const [selectedMenuItem, setSelectedMenuItem] = useState<
    RestaurantMenuItem | undefined
  >(undefined);
  const [selectedOptions, setSelectedOptions] = useState<MenuOption[]>([]);
  const [menuLoaded, setMenuLoaded] = useState<boolean>(false);

  useEffect(() => {
    // dummy data
    setTimeout(() => {
      setRestaurantName("Chipotle");
      setMenu({
        id: "chipotle",
        menu: [
          {
            itemId: "1",
            restaurantId: "chipotle",
            name: "Veggie Burrito Bowl",
            basePrice: 8.99,
            options: [
              {
                optionId: "1",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "2",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "3",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "4",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "5",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "6",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "7",
                name: "Sour Cream",
                price: 0,
              },
              {
                optionId: "8",
                name: "Fajita Veggies",
                price: 0,
              },
            ],
          },
          {
            itemId: "2",
            restaurantId: "chipotle",
            name: "Chicken Burrito Bowl",
            basePrice: 9.99,
            options: [
              {
                optionId: "1",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "2",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "3",
                name: "Chicken",
                price: 0,
              },
              {
                optionId: "4",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "5",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "6",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "7",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "8",
                name: "Sour Cream",
                price: 0,
              },
            ],
          },
          {
            itemId: "3",
            restaurantId: "chipotle",
            name: "Burrito",
            basePrice: 7.99,
            options: [
              {
                optionId: "1",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "2",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "3",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "4",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "5",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "6",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "7",
                name: "Sour Cream",
                price: 0,
              },
            ],
          },
        ],
      });
      setMenuLoaded(true);
    }, 1000);
  }, []);

  const handleSelectedMenuItem = (menuItem: RestaurantMenuItem) => {
    if (selectedMenuItem && selectedMenuItem.itemId === menuItem.itemId) {
      setSelectedOptions([]);
      setSelectedMenuItem(undefined);
      return;
    }
    setSelectedOptions([]);
    setSelectedMenuItem(menuItem);
  };

  const handleSelectedOption = (option: MenuOption) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => {
          return selectedOption.optionId !== option.optionId;
        })
      );
      return;
    }
    setSelectedOptions([...selectedOptions, option]);
  };

  return (
    <div className="order-screen">
      <div className="order-screen__header">
        <button
          className="vps-back-arrow-btn noselect"
          onClick={() => {
            localStorage.removeItem("userDataDoc");
            window.location.reload();
          }}
          style={{
            top: "auto",
            left: "24px",
            bottom: "auto",
            right: "auto",
          }}
        >
          <img
            alt="back-arrow"
            className="vps-back-arrow-img"
            src={require("../../assets/arrow-right.png")}
          />
          <p>{"Sign out"}</p>
        </button>

        <div className="order-screen__header__center">
          <LogoContainer
            type="top"
            containerStyle={{
              position: "relative",
              left: "auto",
              top: "auto",
            }}
            logoStyle={{
              width: "42px",
              height: "42px",
            }}
            textStyle={{
              fontSize: "2.7rem",
              fontWeight: 600,
            }}
          />
        </div>
      </div>
      <div className="order-screen-content">
        <div className="os-content__header-container">
          <p className="os-content__header__current-restaurant">
            {"Taking orders for"}
          </p>
          <h1 className="os-content__header__restaurant-title">
            {restaurantName ? restaurantName : ""}
          </h1>
        </div>
        <div className="os-content__menu-steps-container">
          <MenuStep
            stepNumber={1}
            stepDescription="Select a dish"
            enabled={menuLoaded}
          >
            {menu &&
              menu.menu.map((menuItem, index) => {
                return (
                  <div
                    className={
                      "os-content__menu-item noselect" +
                      (selectedMenuItem &&
                      selectedMenuItem.itemId === menuItem.itemId
                        ? " selected"
                        : "")
                    }
                    key={index}
                    onClick={() => handleSelectedMenuItem(menuItem)}
                  >
                    <p className="os-content__menu-item__name">
                      {menuItem.name}
                    </p>
                    <p className="os-content__menu-item__price">
                      {"$" + menuItem.basePrice.toFixed(2)}
                    </p>
                  </div>
                );
              })}
          </MenuStep>
          <MenuStep
            stepNumber={2}
            stepDescription="Customize your dish"
            enabled={menuLoaded && !!selectedMenuItem}
            innerContainerStyle={{
              flexWrap: "wrap",
            }}
          >
            {menu &&
              selectedMenuItem &&
              selectedMenuItem.options.map((option, index) => {
                return (
                  <div
                    className={
                      "os-content__menu-item option noselect" +
                      (selectedOptions.includes(option) ? " selected" : "")
                    }
                    key={index}
                    onClick={() => handleSelectedOption(option)}
                  >
                    <p className="os-content__menu-item__name">{option.name}</p>
                    {option.price > 0 && (
                      <p className="os-content__menu-item__price">
                        {"+ $" + option.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                );
              })}
          </MenuStep>

          <MenuStep
            stepNumber={3}
            stepDescription="Review and Checkout"
            enabled={
              menuLoaded && !!selectedMenuItem && selectedOptions.length > 0
            }
            innerContainerStyle={{
              flexWrap: "wrap",
            }}
          >
            {menu && selectedMenuItem && selectedOptions.length > 0 && (
              <div className="os-content__menu-review-container">
                <div className="os-content__menu-review__header">
                  <p className="os-content__menu-review__header__title">
                    {selectedMenuItem.name}
                  </p>
                  <p className="os-content__menu-review__header__price">
                    {"$" + selectedMenuItem.basePrice.toFixed(2)}
                  </p>
                </div>
                <div className="os-content__menu-review__options">
                  {selectedOptions.map((option, index) => {
                    return (
                      <div
                        className="os-content__menu-review__option"
                        key={index}
                      >
                        <p className="os-content__menu-review__option__name">
                          •&nbsp;{option.name}
                        </p>
                        {option.price > 0 && (
                          <p className="os-content__menu-review__option__price">
                            +&nbsp;{"$" + option.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="os-content__menu-review__total">
                  <p className="os-content__menu-review__total__title">
                    {"Total"}
                  </p>
                  <p className="os-content__menu-review__total__price">
                    {"$" +
                      (
                        selectedMenuItem.basePrice +
                        selectedOptions.reduce((acc, option) => {
                          return acc + option.price;
                        }, 0)
                      ).toFixed(2)}
                  </p>
                </div>
                <CheckoutButton />
              </div>
            )}
          </MenuStep>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
