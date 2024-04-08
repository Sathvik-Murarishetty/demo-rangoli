import { Suspense } from "react"
import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
 const regions = await listRegions().then((regions) => regions)

 return (
  <div className="sticky top-0 inset-x-0 z-50 group">
   <header className="relative h-20 mx-auto duration-200 bg-orange-50 text-[#D35400] text-xl border-ui-border-base">
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
       <img src={"https://res.cloudinary.com/dg0rdc0bd/image/upload/v1712603343/Rangoli-O_B_0.2_ea6rqm.png"} alt="Rangoli Sweets" className="w-auto h-20" />
      </LocalizedClientLink>
     </div>

     <div className="flex items-center gap-x-10 h-full flex-1 basis-0 justify-end">
      <div className="hidden small:flex items-center gap-x-10 h-full">
               <div className="text-xl"> {/* Apply text-xl class to the div */}
        <LocalizedClientLink
         className="font-bold text-[#D35400] hover:text-black"
         href="/store"
        >
         Store
        </LocalizedClientLink>
       </div>
       <div className="text-xl"> {/* Apply text-xl class to the div */}
        <LocalizedClientLink
         className="font-bold text-[#D35400] hover:text-black"
         href="/account"
        >
         Account
        </LocalizedClientLink>
       </div>
       <Suspense
       fallback={
        <div className="text-xl"> {/* Apply text-xl class to the div */}
         <LocalizedClientLink className="text-[#D35400] hover:text-black flex gap-2" href="/cart">
  <span style={{ fontSize: '20px' }}>Cart (0)</span>
</LocalizedClientLink>
        </div>
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
