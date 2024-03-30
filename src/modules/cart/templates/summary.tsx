import { getCustomer } from "@lib/data";
import { useState, useEffect } from "react";
import { Button, Heading } from "@medusajs/ui";
import CartTotals from "@modules/common/components/cart-totals";
import Divider from "@modules/common/components/divider";
import { CartWithCheckoutStep } from "types/global";
import DiscountCode from "@modules/checkout/components/discount-code";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

type SummaryProps = {
  cart: CartWithCheckoutStep;
};

const Summary = ({ cart }: SummaryProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const customer = await getCustomer();
        setIsLoggedIn(!!customer); // Set isLoggedIn to true if customer exists, otherwise false
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, []); // Run this effect only once, when the component mounts

  const handleCheckout = () => {
    if (isLoggedIn) {
      console.log("User is logged in. Proceeding to checkout...");
      // Implement code to proceed to checkout
    } else {
      console.log("User is not logged in. Redirecting to login page...");
      // Implement code to redirect to the login page
      // For example:
      window.location.href = "/account";
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="text-[2rem] leading-[2.75rem]">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals data={cart} />
      {isLoggedIn ? (
        <LocalizedClientLink href={"/checkout?step=" + cart.checkout_step}>
          <Button className="w-full h-10" onClick={handleCheckout}>
            Go to checkout
          </Button>
        </LocalizedClientLink>
      ) : (
        <LocalizedClientLink href="/account">
          <Button className="w-full h-10" onClick={handleCheckout}>
            Login to proceed
          </Button>
        </LocalizedClientLink>
      )}
    </div>
  );
};

export default Summary;
