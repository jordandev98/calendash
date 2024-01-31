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
            "Unlimited events type",
            "No Customization Options for Booking Forms",
            "No Shared Calendar"
        ] ,
    },
    {
        id: import.meta.env.VITE_STANDARD_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_STANDARD_PLAN_KEY,
        name: "Pro",
        price: "$9" ,
        annualPrice : "$8",
        features : [
            "Unlimited Appointments Scheduling",
            "Unlimited events type",
            "Basic Customization Options for Booking Forms",
            "Shared calendar"
        ] ,
    }
]

export const getProductById = (id: string): ProductType=> {
    return products.find(product => product.id === id || product.annualId === id)
}