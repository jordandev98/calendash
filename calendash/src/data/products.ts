type ProductType = {
    id: string,
    annualId: string,
    name: string,
    price: string,
    annualPrice: string,
    features : string[]
}

export const products: ProductType[] = [
    {
        id: null,
        annualId : null,
        name: "Free",
        price: "Always free" ,
        annualPrice: "Always free",
        features : [
            "Unlimited Appointments Scheduling",
            "Limited to 2 Appointment Type",
            "No Customization Options for Booking Forms",
            "Limited to One Calendar per User",
            "No Shared Calendar"
        ] ,
    },
    {
        id: import.meta.env.VITE_STANDARD_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_STANDARD_PLAN_KEY,
        name: "Pro",
        price: "$6.99" ,
        annualPrice : "$5.99",
        features : [
            "Unlimited Appointments Scheduling",
            "Embedded scheduling on your site",
            "Unlimited Appointments Type",
            "Basic Customization Options for Booking Forms",
            "No shared calendar"
        ] ,
    },
    // {
    //     id: import.meta.env.VITE_STANDARD_PLAN_KEY,
    //     name: "Small Team",
    //     price: "$15.99" ,
    //     annuallyPrice : "$9.99",
    //     features : [
    //         "Unlimited Appointments Scheduling",
    //         "Embedded scheduling on your site",
    //         "Unlimited Appointments Type",
    //         "Advanced Customization Options for Booking Forms",
    //         "3 Shared Calendar"
    //     ] ,
    // },
    {
        id: import.meta.env.VITE_TEAM_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_TEAM_PLAN_KEY,
        name: "Teams",
        price: "$59.99" ,
        annualPrice: "$49.99" ,
        features : [
            "Everything in the Teams plan",
            "Unlimited calendars",
            "Unlimited shared Calendar",
            "Advanced Customization Options for Booking Forms",
        ] ,
    },
]

export const getProductById = (id: string): ProductType=> {
    return products.find(product => product.id === id)
}