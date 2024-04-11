import { Text, clx } from "@medusajs/ui";
import { getCategoriesList, getCollectionsList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import MedusaCTA from "@modules/layout/components/medusa-cta";

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6);
  const { product_categories } = await getCategoriesList(0, 6);

  return (
    <footer className="border-t border-ui-border-base w-full bg-[#D35400]">
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
          <div>
          <div className="text-large-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3 justify-self-end">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2 pt-10 px-20">
                <span className="text-2xl txt-ui-fg-base poppins-bold">
                  Categories
                </span>
                <ul className="text-large-regular grid grid-cols-1 gap-2">
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return null;
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null;

                    return (
                      <li
                        className="flex flex-col gap-2 text-large-regular"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "text-large-regular"
                          )}
                          href={`/categories/${c.handle}`}
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-13 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2 gap-x-5 pt-10">
                <span className="text-xl text-black poppins-medium">
                  Categories
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-5 text-orange-50 text-large-regular",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="text-orange-50 poppins-regular hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
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
        <div className="flex w-full mb-16 justify-between text-orange-50">
          <Text className="txt-compact-small poppins-regular">
            © {new Date().getFullYear()} Rangoli Sweets. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
