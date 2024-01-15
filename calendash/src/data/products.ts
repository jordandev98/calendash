type ProductType = {
    id: string,
    name: string,
    price: string,
    annuallyPrice: string,
    features : string[]
}

export const products: ProductType[] = [
    {
        id: null,
        name: "Free",
        price: "Always free" ,
        annuallyPrice: "Always free",
        features : [
            "Unlimited Appointments Scheduling",
            "Embedded scheduling on your site",
            "Limited to One Appointment Type",
            "Basic Customization Options for Booking Forms",
            "Limited to One Calendar per User",
            "No Shared Calendar"
        ] ,
    },
    {
        id: import.meta.env.VITE_STANDARD_PLAN_KEY,
        name: "Pro",
        price: "$5.99" ,
        annuallyPrice : "$4.99",
        features : [
            "Unlimited Appointments Scheduling",
            "Embedded scheduling on your site",
            "Unlimited Appointments Type",
            "Advanced Customization Options for Booking Forms",
            "Three calendars per User",
            "No Shared Calendar"
        ] ,
    },
    {
        id: import.meta.env.VITE_PREMIUM_PLAN_KEY,
        name: "Teams",
        price: "$11.99" ,
        annuallyPrice: "$9.99" ,
        features : [
            "Everything in the Pro plan",
            "Unlimited calendars per User",
            "Shared Calendar"
        ] ,
    },
]

export const getProductById = (id: string): ProductType=> {
    return products.find(product => product.id === id)
}