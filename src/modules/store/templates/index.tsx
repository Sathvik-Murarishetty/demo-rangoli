import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="bg-orange-50">
  <div className="flex justify-center py-10">
    <div className="flex flex-col small:flex-row small:items-start py-6 content-container">
      <RefinementList sortBy={sortBy || "created_at"} />
      <div>
  <div className="flex justify-center">
    <h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800 mb-5">Shop by Category</h1>
  </div>
  <section style={{ position: 'relative', width: '80%', height: 'auto', overflow: 'hidden', marginBottom: '20px', margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-80 mx-auto md:w-full">
    <div className="relative aspect-w-1 aspect-h-1">
      <a href="/collections/sweets">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431826/istockphoto-1054228718-612x612_uumpun.jpg" alt="Sweets" className="w-full h-full object-cover rounded-md shadow-md" />
      </a>
      <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Sweets</p>
    </div>
    <div className="relative aspect-w-1 aspect-h-1">
      <a href="/collections/tea-time-snacks">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431983/istockphoto-1225269816-612x612_nlbybj.jpg" alt="Snacks" className="w-full h-full object-cover rounded-md shadow-md" />
      </a>
      <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Snacks</p>
    </div>
    <div className="relative aspect-w-1 aspect-h-1">
      <a href="/collections/namkeen">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712432028/spicy_cashew_tr4vej.jpg" alt="Namkeen" className="w-full h-full object-cover rounded-md shadow-md" />
      </a>
      <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Namkeen</p>
    </div>
    <div className="relative aspect-w-1 aspect-h-1">
      <a href="/collections/cakes">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431886/cake-1971552_1280_a35lgw.jpg" alt="Cakes" className="w-full h-full object-cover rounded-md shadow-md" />
      </a>
      <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Cakes</p>
    </div>
    <div className="relative aspect-w-1 aspect-h-1">
      <a href="/collections/beverages">
        <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/c_fill,w_400,h_400/v1712431927/pexels-photo-14509267_g7s4u7.jpg" alt="Beverages" className="w-full h-full object-cover rounded-md shadow-md" />
      </a>
      <p className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-50 text-white text-center py-2 rounded-b-md">Beverages</p>
    </div>
  </div>
</section>

</div>
    </div>
  </div>
      <div className = "pl-20 pr-20">
<div className="w-full mx-auto">
    <div className="mb-8 text-2xl-semi">
      <h1>All products</h1>
    </div>
    <Suspense fallback={<SkeletonProductGrid />}>
      <PaginatedProducts
        sortBy={sortBy || "created_at"}
        page={pageNumber}
        countryCode={countryCode}
      />
    </Suspense>
  </div>
        </div>
</div>
  )
}

export default StoreTemplate
