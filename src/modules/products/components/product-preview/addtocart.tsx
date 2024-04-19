"use client"

import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@medusajs/ui"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import { addToCart } from "@modules/cart/actions"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/option-select"

import MobileActions from "../mobile-actions"

type ProductActionsProps = {
    product: PricedProduct
    region: Region
    disabled?: boolean
}

export default function ProductActions({
    product,
    region,
    disabled,
}: ProductActionsProps) {
    const [options, setOptions] = useState<Record<string, string>>({})
    const [isAdding, setIsAdding] = useState(false)

    const countryCode = useParams().countryCode as string

    const variants = product.variants

    // initialize the option state with the first variant's options
    useEffect(() => {
        if (variants.length > 0) {
            const firstVariantOptions: Record<string, string> = {}
            for (const option of variants[0].options || []) {
                Object.assign(firstVariantOptions, { [option.option_id]: option.value })
            }
            setOptions(firstVariantOptions)
        }
    }, [variants])

    // memoized function to check if the current options are a valid variant
    const variant = useMemo(() => {
        return variants[0]; // Return the first variant
    }, [variants])

    // check if the selected variant is in stock
    const inStock = useMemo(() => {
        if (variant && !variant.inventory_quantity) {
            return false
        }

        if (variant && variant.allow_backorder === false) {
            return true
        }
    }, [variant])

    const actionsRef = useRef<HTMLDivElement>(null)

    const inView = useIntersection(actionsRef, "0px")

    // add the selected variant to the cart
    const handleAddToCart = async () => {
        if (!variant?.id) return null

        setIsAdding(true)

        await addToCart({
            variantId: variant.id,
            quantity: 1,
            countryCode,
        })

        setIsAdding(false)
    }

    return (
        <>
            <div className="flex flex-col gap-y-2" ref={actionsRef}>
                <div>
                    {variants.length > 1 && (
                        <div className="flex flex-col gap-y-4">
                            {(product.options || []).map((option) => {
                                return (
                                    <div key={option.id}>
                                        <OptionSelect
                                            option={option}
                                            current={options[option.id]}
                                            updateOption={() => { }}
                                            title={option.title}
                                            data-testid="product-options"
                                        />
                                    </div>
                                )
                            })}
                            <Divider />
                        </div>
                    )}
                </div>

                <Button
                    onClick={handleAddToCart}
                    disabled={!inStock || !variant  || isAdding}
                    variant="primary"
                    className="w-full h-10"
                    isLoading={isAdding}
                    data-testid="add-product-button"
                >
                    {!variant
                        ? "Select variant"
                        : !inStock
                            ? "Out of stock"
                            : "Add to cart"}
                </Button>
            </div>
        </>
    )
}
