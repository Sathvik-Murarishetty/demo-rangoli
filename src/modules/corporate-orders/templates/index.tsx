import React from 'react';

const Corporateorder = () => {
    return (
        <div className="bg-orange-50">
            <h1 className="pt-4 text-4xl flex justify-center text-gray-800">
                The
            </h1>
            <span className="text-[#D35400] taste text-6xl flex justify-center">
                Tastemakers
            </span>
            <h1 className="text-4xl flex justify-center text-gray-800">
                of California
            </h1>
            <div className="flex justify-center pb-20 pt-10">
                <div className="max-w-6xl w-full px-4">
                    <div className="grid grid-cols-1 gap-8">
                        <div>
                            <p className="mt-6 text-lg text-gray-700">
                                At our Indian sweet shop in Santa Clara, California, we celebrate the timeless tradition of expressing love and appreciation through sweets. Each treat from our shop is more than just a delicacy. It is a symbol of joy and cultural heritage. We use only the finest ingredients and a perfect blend of traditional recipes and modern techniques to create sweets that are not just delicious, but also meaningful. Whether it is celebrating a special occasion or sharing a piece of our culture, our sweets are crafted to bring people together and make every moment sweeter.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="pt-4 text-5xl flex justify-center text-gray-800">How it Works</h1>
            <div className="flex justify-center py-20">
                <div className="max-w-6xl w-full px-4">
                    <div className="flex justify-center">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Grid Item 1 */}
                            <div className="max-w-sm">
                                <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713609643/send_uo6ose.png" alt="Image 1" className="w-auto h-20" />
                                <h2 className="text-2xl font-bold mt-4">1. SUBMIT YOUR SPECIFICATIONS</h2>
                                <p className="mt-2 text-lg text-gray-700"> Provide us with details including the quantity, size, color, and type of packaging required for your gift hampers.</p>
                            </div>
                            {/* Grid Item 2 */}
                            <div className="max-w-sm">
                                <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713609643/quote_sumpay.png" alt="Image 2" className="w-auto h-20" />
                                <h2 className="text-2xl font-bold mt-4">2. RECEIVE A CUSTOM QUOTE</h2>
                                <p className="mt-2 text-lg text-gray-700">We will review your specifications and respond promptly with a personalized quote.</p>
                            </div>
                            {/* Grid Item 3 */}
                            <div className="max-w-sm">
                                <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713609642/order-place_gs1idy.png" alt="Image 3" className="w-auto h-20" />
                                <h2 className="text-2xl font-bold mt-4">3. CONFIRM YOUR ORDER</h2>
                                <p className="mt-2 text-lg text-gray-700">Once you are satisfied with the details and the quote, confirm your order to proceed.</p>
                            </div>
                            {/* Grid Item 4 */}
                            <div className="max-w-sm">
                                <img src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1713609642/box_jyk32c.png" alt="Image 4" className="w-auto h-20" />
                                <h2 className="text-2xl font-bold mt-4">4. HASSLE-FREE DELIVERY</h2>
                                <p className="mt-2 text-lg text-gray-700">Your gift hampers will be delivered directly to you or to your specified recipients, anywhere without limitations.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Corporateorder;
