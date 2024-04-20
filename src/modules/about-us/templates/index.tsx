const AboutUs = () => {
    return (
        <div className="bg-orange-50">
            <div className="flex justify-center py-20">
        <div className="max-w-6xl w-full px-4">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm uppercase font-cormorant-garamond-bold tracking-wider text-gray-500">• Our Story •</h3>
              <h1 className="mt-4 text-5xl font-cormorant-garamond-bold text-gray-800">The Legacy Of Rangoli Sweets</h1>
              <p className="mt-6 text-lg text-gray-700">
                When opening Rangoli, we set out to create an elegant Indian restaurant that offered artistic, creative versions of Northern and coastal Indian dishes. Our name, “Rangoli,” is drawn from a popular Indian style of art featuring patterns and designs in rich, jewel-like colors.
                <br />
                Our restaurant is decorated in these vibrant hues, with Sanskrit script gracing the walls. Our interior welcomes you with private dining alcoves and fresh orchids on each table. Our attentive, gracious service invites you to linger and enjoy your dining experience.
              </p>
            </div>
            <div className="flex items-center">
              <img
                alt="The process of making sweets"
                className="w-full h-auto object-cover"
                height="400"
                src="https://res.cloudinary.com/dg0rdc0bd/image/upload/v1711692061/rangoli_awydsf.jpg"
                style={{
                  aspectRatio: "600/400",
                  objectFit: "cover",
                }}
                width="600"
              />
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default AboutUs;
