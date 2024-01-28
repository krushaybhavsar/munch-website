import React, { useEffect, useState } from "react";
import "./OrderScreen.css";
import {
  RestaurantMenu,
  RestaurantMenuItem,
  MenuOption,
  Order,
  ListingInfo,
} from "../../types";
import CheckoutButton from "../CheckoutButton/CheckoutButton";
import LogoContainer from "../../components/LogoContainer/LogoContainer";
import MenuStep from "../../components/MenuStep/MenuStep";

type OrderScreenProps = {};

const OrderScreen = (props: OrderScreenProps) => {
  const [menu, setMenu] = useState<RestaurantMenu | undefined>(undefined);
  const [restaurantName, setRestaurantName] = useState<string | undefined>(
    undefined
  );
  const [order, setOrder] = useState<RestaurantMenuItem[]>([]);
  const [listingInfo, setListingInfo] = useState<ListingInfo | undefined>(
    undefined
  );
  const [menuLoaded, setMenuLoaded] = useState<boolean>(false);

  useEffect(() => {
    // dummy data
    setTimeout(() => {
      setListingInfo({
        orderEnd: new Date("2020-04-20T12:00:00"),
        pickupStart: new Date("2020-04-20T12:30:00"),
        pickupEnd: new Date("2020-04-20T13:00:00"),
        orderStart: new Date("2020-04-20T12:00:00"),
        restaurantId: "chipotle",
        pickupLocation: "1234 Main St, San Jose, CA 95112",
      });
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
                optionId: "11",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "12",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "13",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "14",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "15",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "16",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "17",
                name: "Sour Cream",
                price: 0,
              },
              {
                optionId: "18",
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
                optionId: "21",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "22",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "23",
                name: "Chicken",
                price: 0,
              },
              {
                optionId: "24",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "25",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "26",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "27",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "28",
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
                optionId: "31",
                name: "Rice",
                price: 0,
              },
              {
                optionId: "32",
                name: "Beans",
                price: 0,
              },
              {
                optionId: "33",
                name: "Lettuce",
                price: 0,
              },
              {
                optionId: "34",
                name: "Salsa",
                price: 0,
              },
              {
                optionId: "35",
                name: "Guacamole",
                price: 0.99,
              },
              {
                optionId: "36",
                name: "Cheese",
                price: 0,
              },
              {
                optionId: "37",
                name: "Sour Cream",
                price: 0,
              },
            ],
          },
          {
            itemId: "4",
            restaurantId: "chipotle",
            name: "Hibiscus Lemonade",
            basePrice: 2.99,
            options: [],
          },
        ],
      });
      setMenuLoaded(true);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log(order);
  }, [order]);

  const handleSelectedMenuItem = (menuItem: RestaurantMenuItem) => {
    const orderMenuItem = order.find((orderMenuItem) => {
      return orderMenuItem.itemId === menuItem.itemId;
    });
    if (orderMenuItem) {
      // remove menuItem
      setOrder(
        order.filter((orderMenuItem) => {
          return orderMenuItem.itemId !== menuItem.itemId;
        })
      );
      return;
    }
    const newMenuItem: RestaurantMenuItem = {
      ...menuItem,
      options: [],
    };
    setOrder([...order, newMenuItem]);
  };

  const handleSelectedOption = (
    menuItem: RestaurantMenuItem,
    option: MenuOption
  ) => {
    const orderMenuItem = order.find((orderMenuItem) => {
      return orderMenuItem.itemId === menuItem.itemId;
    });
    if (!orderMenuItem) {
      return;
    }
    const orderOption = orderMenuItem.options.find((orderOption) => {
      return orderOption.optionId === option.optionId;
    });
    if (orderOption) {
      // remove option
      orderMenuItem.options = orderMenuItem.options.filter((orderOption) => {
        return orderOption.optionId !== option.optionId;
      });
    } else {
      // add option
      orderMenuItem.options.push(option);
    }
    setOrder([...order]);
  };

  const optionIsSelected = (
    menuItem: RestaurantMenuItem,
    option: MenuOption
  ) => {
    // match by itemId and optionId
    const orderMenuItem = order.find((orderMenuItem) => {
      return orderMenuItem.itemId === menuItem.itemId;
    });
    if (!orderMenuItem) {
      return false;
    }
    const orderOption = orderMenuItem.options.find((orderOption) => {
      return orderOption.optionId === option.optionId;
    });
    if (!orderOption) {
      return false;
    }
    return true;
  };

  const renderOptionsSection = (menuItem: RestaurantMenuItem) => {
    return menuItem.options.map((option, index) => (
      <div
        className={
          "os-content__menu-item option noselect" +
          (optionIsSelected(menuItem, option) ? " selected" : "")
        }
        key={index}
        onClick={() => handleSelectedOption(menuItem, option)}
      >
        <p className="os-content__menu-item__name">{option.name}</p>
        {option.price > 0 && (
          <p className="os-content__menu-item__price">
            {"+ $" + option.price.toFixed(2)}
          </p>
        )}
      </div>
    ));
  };

  const calculateTotal = (): number => {
    let total = 0;
    order.forEach((menuItem) => {
      total += menuItem.basePrice;
      menuItem.options.forEach((option) => {
        total += option.price;
      });
    });
    return total;
  };

  const findMenuItemFromOrderItemId = (
    orderItemId: string
  ): RestaurantMenuItem | undefined => {
    return menu?.menu.find((menuItem) => {
      return menuItem.itemId === orderItemId;
    });
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
                      (order.find(
                        (orderItem) => orderItem.itemId == menuItem.itemId
                      )
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

          {menu &&
            order.map((orderItem, index) => (
              <div key={orderItem.itemId} style={{ width: "100%" }}>
                {menu &&
                  findMenuItemFromOrderItemId(orderItem.itemId)!.options
                    .length > 0 && (
                    <MenuStep
                      stepNumber={2}
                      stepDescription={"Customize your "}
                      boldedDescription={orderItem.name}
                      enabled={menuLoaded}
                      innerContainerStyle={{
                        flexWrap: "wrap",
                      }}
                    >
                      {renderOptionsSection(
                        findMenuItemFromOrderItemId(orderItem.itemId)!
                      )}
                    </MenuStep>
                  )}
              </div>
            ))}

          <MenuStep
            stepNumber={3}
            stepDescription="Review and Checkout"
            enabled={menuLoaded && order.length > 0}
            innerContainerStyle={{
              flexWrap: "wrap",
            }}
          >
            {menu && order.length > 0 && (
              <div className="os-content__menu-review-container">
                {order.map((menuItem) => (
                  <div
                    key={menuItem.itemId}
                    style={{ width: "100%", margin: "4px 0" }}
                  >
                    <div className="os-content__menu-review__header">
                      <p className="os-content__menu-review__header__title">
                        {menuItem.name}
                      </p>
                      <p className="os-content__menu-review__header__price">
                        {"$" + menuItem.basePrice.toFixed(2)}
                      </p>
                    </div>
                    <div className="os-content__menu-review__options">
                      {order.includes(menuItem) &&
                        order[order.indexOf(menuItem)].options.map((option) => {
                          return (
                            <div
                              className="os-content__menu-review__option"
                              key={option.optionId}
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
                  </div>
                ))}
                <div className="os-content__menu-review__total">
                  <p className="os-content__menu-review__total__title">
                    <b>{"TOTAL"}</b>
                  </p>
                  <p className="os-content__menu-review__total__price">
                    <b> {"$" + calculateTotal().toFixed(2)}</b>
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
