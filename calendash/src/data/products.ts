type ProductType = {
    id: string,
    name: string,
    price: number,
}

export const products: ProductType[] = [
    {id: null, name: "FREE FOREVER", price: "Always free"},
    {id: import.meta.env.VITE_STANDARD_PLAN_KEY, name: "Standard plan", price: "$5.99"},
    {id: import.meta.env.VITE_PREMIUM_PLAN_KEY, name: "Premium plan", price: "$10.99"}
]
