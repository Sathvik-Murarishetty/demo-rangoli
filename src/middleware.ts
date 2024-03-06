import Medusa from "@medusajs/medusa-js"
import { Region } from "@medusajs/medusa"
import { notFound } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

const BACKEND_URL = "https://discord-backend-production-3cac.up.railway.app"
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
// ========================================================================================
const regionMapCache = {
  regionMap: new Map<string, Region>(),
  regionMapUpdated: Date.now(),
}

async function getRegionMap() {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
    !regionMap.keys().next().value ||
    regionMapUpdated < Date.now() - 3600 * 1000
  ) {
    // Fetch regions from Medusa. We can't use the JS client here because middleware is running on Edge and the client needs a Node environment.
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      next: {
        revalidate: 3600,
        tags: ["regions"],
      },
    }).then((res) => res.json())

    if (!regions) {
      notFound()
    }

    // Create a map of country codes to regions.
    regions.forEach((region: Region) => {
      region.countries.forEach((c) => {
        regionMapCache.regionMap.set(c.iso_2, region)
      })
    })

    regionMapCache.regionMapUpdated = Date.now()
  }

  return regionMapCache.regionMap
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
async function getCountryCode(
  request: NextRequest,
  regionMap: Map<string, Region | number>
) {
  try {
    let countryCode

    const vercelCountryCode = request.headers
      .get("x-vercel-ip-country")
      ?.toLowerCase()

    const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
      countryCode = urlCountryCode
    } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
      countryCode = vercelCountryCode
    } else if (regionMap.has(DEFAULT_REGION)) {
      countryCode = DEFAULT_REGION
    } else if (regionMap.keys().next().value) {
      countryCode = regionMap.keys().next().value
    }

    return countryCode
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?"
      )
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isOnboarding = searchParams.get("onboarding") === "true"
  const cartId = searchParams.get("cart_id")
  const checkoutStep = searchParams.get("step")
  const onboardingCookie = request.cookies.get("_medusa_onboarding")
  const cartIdCookie = request.cookies.get("_medusa_cart_id")

  const regionMap = await getRegionMap()

  const countryCode = regionMap && (await getCountryCode(request, regionMap))

  const urlHasCountryCode =
    countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

  // check if one of the country codes is in the url
  if (
    urlHasCountryCode &&
    (!isOnboarding || onboardingCookie) &&
    (!cartId || cartIdCookie)
  ) {
    return NextResponse.next()
  }

  const redirectPath =
    request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

  const queryString = request.nextUrl.search ? request.nextUrl.search : ""

  let redirectUrl = request.nextUrl.href

  let response = NextResponse.redirect(redirectUrl, 307)

  // If no country code is set, we redirect to the relevant region.
  if (!urlHasCountryCode && countryCode) {
    redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
  }

  // If a cart_id is in the params, we set it as a cookie and redirect to the address step.
  if (cartId && !checkoutStep) {
    redirectUrl = `${redirectUrl}&step=address`
    response = NextResponse.redirect(`${redirectUrl}`, 307)
    response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
  }

  // Set a cookie to indicate that we're onboarding. This is used to show the onboarding flow.
  if (isOnboarding) {
    response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
}
// ========================================================================================
// const regionMapCache = {
//  regionMap: new Map<string, Region>(),
//  regionMapUpdated: Date.now(),
// }

// const d = new Date();
// let time = d.getTime() - 3600* 1000;

// const medusa = new Medusa({ baseUrl: "https://discord-backend-production-3cac.up.railway.app/store/regions", maxRetries: 3 })
// medusa.regions.list().then(({ regions, count, limit, offset }) => { console.log(regions.length);})
/*
async function getRegionMap() {
 try {
  const { regionMap, regionMapUpdated } = regionMapCache

  if (
   !regionMap.keys().next().value ||
   regionMapUpdated < time
  ) {
   const response = await fetch(`${BACKEND_URL}/store/regions`, {
    next: {
     revalidate: 3600,
     tags: ["regions"],
    },
   });

   if (!response.ok) {
    throw new Error(`Failed to fetch regions. Status: ${response.status}`);
   }

   const { regions } = await response.json();

   if (!regions) {
    throw new Error("No regions found in the response");
   }

  // Create a map of country codes to regions.
  regions.forEach((region: Region) => {
   region.countries.forEach((c) => {
    regionMapCache.regionMap.set(c.iso_2, region)
   })
  })

  regionMapCache.regionMapUpdated = Date.now()
 }

 return regionMapCache.regionMap;
 } catch (error) {
  console.error("Error fetching regions:", error);
  throw error; // Propagate the error to the caller
 }
}

/**
 * Fetches regions from Medusa and sets the region cookie.
 * @param request
 * @param response
 */
/*
async function getCountryCode(
 request: NextRequest,
 regionMap: Map<string, Region | number>
) {
 try {
  let countryCode

  const vercelCountryCode = request.headers
   .get("x-vercel-ip-country")
   ?.toLowerCase()

  const urlCountryCode = request.nextUrl.pathname.split("/")[1]?.toLowerCase()

  if (urlCountryCode && regionMap.has(urlCountryCode)) {
   countryCode = urlCountryCode
  } else if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
   countryCode = vercelCountryCode
  } else if (regionMap.has(DEFAULT_REGION)) {
   countryCode = DEFAULT_REGION
  } else if (regionMap.keys().next().value) {
   countryCode = regionMap.keys().next().value
  }

  return countryCode
 } catch (error) {
  if (process.env.NODE_ENV === "development") {
   console.error(
    "Middleware.ts: Error getting the country code. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?"
   )
  }
 }
}

/**
 * Middleware to handle region selection and onboarding status.
 */

// export async function middleware() {
 // const searchParams = request.nextUrl.searchParams
 // const isOnboarding = searchParams.get("onboarding") === "true"
 // const cartId = searchParams.get("cart_id")
 // const checkoutStep = searchParams.get("step")
 // const onboardingCookie = request.cookies.get("_medusa_onboarding")
 // const cartIdCookie = request.cookies.get("_medusa_cart_id")

 // const regionMap = await getRegionMap()

 // const countryCode = regionMap && (await getCountryCode(request, regionMap))

 // const urlHasCountryCode =
  // countryCode && request.nextUrl.pathname.split("/")[1].includes(countryCode)

 // check if one of the country codes is in the url
 // if (
 //  urlHasCountryCode &&
 //  (!isOnboarding || onboardingCookie) &&
 //  (!cartId || cartIdCookie)
 // ) {
 //  return NextResponse.next()
 // }

 // const redirectPath =
 //  request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname

 // const queryString = request.nextUrl.search ? request.nextUrl.search : ""

 // let redirectUrl = request.nextUrl.href

 // let response = NextResponse.redirect(redirectUrl, 307)

 // // If no country code is set, we redirect to the relevant region.
 // if (!urlHasCountryCode && countryCode) {
 //  redirectUrl = `${request.nextUrl.origin}/${countryCode}${redirectPath}${queryString}`
 //  response = NextResponse.redirect(`${redirectUrl}`, 307)
 // }

 // // If a cart_id is in the params, we set it as a cookie and redirect to the address step.
 // if (cartId && !checkoutStep) {
 //  redirectUrl = `${redirectUrl}&step=address`
 //  response = NextResponse.redirect(`${redirectUrl}`, 307)
 //  response.cookies.set("_medusa_cart_id", cartId, { maxAge: 60 * 60 * 24 })
 // }

 // // Set a cookie to indicate that we're onboarding. This is used to show the onboarding flow.
 // if (isOnboarding) {
 //  response.cookies.set("_medusa_onboarding", "true", { maxAge: 60 * 60 * 24 })
 // }

 // return response

 // comments by komali for testing
 // const pathname = request.nextUrl.pathname;
    
        // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
        // // If you have one
        // if (
        //     [
        //         '/favicon.ico',
        //         // Your other files in `public`
        //     ].includes(pathname)
        // )
//   console.log("test working");
//  return {redirectUrl:"/"}
// }
// export async function middleware(request: NextRequest) {
//   return NextResponse.redirect('https://www.google.com/');
// }

// export const config = {
//  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
// }
