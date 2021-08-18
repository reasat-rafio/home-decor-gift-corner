import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useOutsideAlerter } from "../../../../libs/hooks";
import { HIDE_CART_SIDE_MENU, selectDom } from "../../../store/dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { sideBarVarients } from "../../../../libs/animation";
import { REMOVE_ITEM, selectProduct } from "../../../store/product";
import { SanityImg } from "sanity-react-extra";
import { imageUrlBuilder } from "../../../../utils/sanity";
import { Cross, EmptyCart } from "../../../../libs/svgs";
import TextTruncate from "react-text-truncate";

interface ShoppingCartSideBarProps {}

export const CartSideMenu: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const { showCartSideMenu } = useAppSelector(selectDom);
  const { inCartProducts } = useAppSelector(selectProduct);

  // items subtotal
  const [subTotal, setSubTotal] = useState<number>(0);
  //  doing the sum of the items price
  useEffect(() => {
    if (inCartProducts?.length) {
      const _subtotal = inCartProducts.reduce(
        (result: number, { price, quantity }) => result + price * quantity,
        0
      );
      setSubTotal(_subtotal);
    } else {
      setSubTotal(0);
    }
  }, [inCartProducts]);

  // router
  const router = useRouter();

  const ItemOnCLickAction = (slug: string) => {};

  // Removing item from the cart action
  const removeFromTheCartAction = (title: string) => {
    dispatch(REMOVE_ITEM(title));
  };

  // redirectingToCartPageAction
  const redirectingToCartPageAction = () => {};

  // Cart Sidebar ref
  const cartSidebarRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(cartSidebarRef, { dispatch: HIDE_CART_SIDE_MENU });
  return (
    <>
      <div
        className={`fixed h-full w-full right-0 top-0 left-0 bottom-0  transition-all duration-300 ${
          showCartSideMenu ? " z-40 block" : "z-0 hidden"
        }`}
        style={{ background: "rgba(0, 0, 0, 0.7)" }}
      />
      <AnimatePresence exitBeforeEnter>
        {showCartSideMenu && (
          <motion.div
            ref={cartSidebarRef}
            variants={sideBarVarients}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed h-full md:w-96 w-full right-0 top-0 bg-white z-50  flex flex-col`}
          >
            {/* Header */}
            <div className="flex p-5 border-b font-bold text-xl">
              <h2 className="flex-1 section-title">SHOPPING CART</h2>
              <span
                className="cursor-pointer"
                onClick={() => dispatch(HIDE_CART_SIDE_MENU())}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 hover:scale-110 transition-all duration-150 hover:text-yellow"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
            {/* Selected products */}
            <div className="flex-1 border-b px-5 overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thin">
              {inCartProducts?.length ? (
                inCartProducts.map((product, index) => {
                  return (
                    <div
                      className=" text-sm font-title py-3 border-b  flex  justify-center items-center cursor-pointer"
                      key={index}
                    >
                      <SanityImg
                        builder={imageUrlBuilder}
                        image={product.mainImage}
                        alt={product.title}
                        width={100}
                        className="rounded mr-2"
                      />

                      <div
                        className="flex-1 "
                        // onClick={() => ItemOnCLickAction(slug)}
                      >
                        <TextTruncate
                          line={2}
                          element="p"
                          truncateText="…"
                          text={product.title}
                          // textTruncateChild={<a href="#">Read on</a>}
                        />

                        <div className="py-3">
                          <span className="text-gray-400">
                            {product.quantity} x
                          </span>
                          <span className="text-yellow ml-2 font-bold">
                            ৳{product.price}
                          </span>
                        </div>
                      </div>
                      <span
                        className="px-4 "
                        onClick={() => removeFromTheCartAction(product.title)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 hover:scale-110 transition-all duration-150 hover:text-yellow"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center my-10 gap-5">
                  <span>
                    <EmptyCart />
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <h2 className="font-title font-medium text-lg">
                      NO PRODUCTS IN THE CART.
                    </h2>
                    <motion.button
                      onClick={() => {
                        dispatch(HIDE_CART_SIDE_MENU());
                        // router.push("/shop");
                      }}
                      whileHover={{ scale: [1, 1.1, 1, 1.1, 1] }}
                      className="bg-gradient-to-r from-yellow-500 to-yellow-200 text-white rounded-md p-3 font-text text-sm font-bold"
                    >
                      RETURN TO THE SHOP
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
            {/* Footer (Checkout) */}
            <div className="py-4 flex flex-col justify-center gap-2 p-5">
              <div className="flex font-text font-bold">
                <p className="flex-1"> SUBTOTAL:</p>
                <p className="text-lightBlue">৳ {subTotal.toLocaleString()}</p>
              </div>
              <button
                className="p-3 bg-gray rounded-lg text-sm font-text"
                onClick={redirectingToCartPageAction}
              >
                VIEW CART
              </button>
              <button
                className="p-3 font-text bg-yellow text-white rounded-lg  text-sm font-semibold"
                onClick={() => {
                  dispatch(HIDE_CART_SIDE_MENU());
                  //   router.push("/checkout");
                }}
              >
                CHECKOUT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
