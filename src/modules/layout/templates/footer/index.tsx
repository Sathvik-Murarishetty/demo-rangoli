import { Text, clx } from "@medusajs/ui";
import { getCategoriesList, getCollectionsList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6);
  const { product_categories } = await getCategoriesList(0, 6);

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#D35400] mb-0">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-y-3 xsmall:flex-row items-start justify-between py-10">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-black hover:text-ui-fg-base uppercase poppins-semibold p-0"
            >
              <img src={"https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712690817/Rangoli-B_W-removebg-preview_dl2jac.png"} alt="Rangoli Sweets" className="w-auto h-20" />
            </LocalizedClientLink>
            <span className="text-large-regular text-orange-50 poppins-regular">
              <br />  1584 Halford Ave, <br />Santa Clara, CA - 95051 <br /> (408) 244-1160
            </span>
          </div>
          <div className="flex gap-x-10 pr-10">
            <div className="flex flex-col gap-y-2 pt-10">
              <span className="text-xl txt-ui-fg-base poppins-medium">Categories</span>
              <ul className="grid grid-cols-1 gap-y-2 text-orange-50 text-large-regular">
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Sweets
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Snacks
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Namkeen
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Bengali Sweets
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Bakery
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base"
                  >
                    Beverages
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-y-2 pt-10">
              <span className="text-xl txt-ui-fg-base poppins-medium">Rangoli Sweets</span>
              <ul className="grid grid-cols-1 gap-y-2 text-orange-50 text-large-regular">
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base poppins-regular"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base poppins-regular"
                  >
                    Customer Care
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-ui-fg-base poppins-regular"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full pl-10 mb-8">
          <div className="flex">
            <span className="text-large-regular text-orange-50 poppins-regular">
              PAYMENT OPTIONS:
            </span>
            <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713561678/visa_wmsud6.svg" alt="Payment Option 1" className="h-10 mx-2" />
            <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713561678/mastercard_f5tjh5.svg" alt="Payment Option 2" className="h-10 mx-2" />
            <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713561678/amex_k7p377.svg" alt="Payment Option 3" className="h-10 mx-2" />
            <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713561678/paypal_efm9e1.svg" alt="Payment Option 4" className="h-10 mx-2" />
          </div>
        </div>
      <div className="flex w-full pl-10 pb-16 justify-between text-orange-50">
        <Text className="txt-compact-small poppins-regular">
          © {new Date().getFullYear()} Rangoli Sweets. All rights reserved.
        </Text>
      </div>
    </footer>
  );
}
