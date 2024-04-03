import { Suspense } from "react"
import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-20 mx-auto border-b duration-200 bg-orange-400 text-xl border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase text-xl" // Increased text size to xl
            >
              <img src={"https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712083494/Rangoli-B_W_spt3zp.png"} alt="Rangoli Sweets" className="w-auto h-20" />
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base text-xl" // Increased text size to xl
                href="/account"
              >
                Account
              </LocalizedClientLink>
            </div>
            <div className="hover:text-ui-fg-base flex gap-2 text-xl">
            <Suspense
  fallback={
     {/* Applied className to a div */}
      <LocalizedClientLink
        href="/cart"
      >
        Cart (0)
      </LocalizedClientLink>

  }
>
  <CartButton />
</Suspense>
                </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
