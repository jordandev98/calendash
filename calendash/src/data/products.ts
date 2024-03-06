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
            "One Calendar",
            "Google agenda"
        ] ,
    },
    {
        id: import.meta.env.VITE_PRO_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_PRO_PLAN_KEY,
        name: "Pro",
        price: "$24" ,
        annualPrice : "$20",
        features : [
            "Everything in free plan",
            "Teams",
            "5 sharable calendars",
            "Priority support",
        ] ,
    },
    {
        id: import.meta.env.VITE_ENTERPRISE_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_ENTERPRISE_PLAN_KEY,
        name: "Enterprise",
        price: "$60" ,
        annualPrice : "$50",
        features : [
            "Everything in pro plan",
            "Unlimited sharable calendars",
        ] ,
    }
]

export const getProductById = (id: string): ProductType=> {
    return products.find(product => product.id === id || product.annualId === id)
}