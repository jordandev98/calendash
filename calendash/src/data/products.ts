type ProductType = {
    id: string,
    annualId: string,
    name: Record<string, string>, // Use a dictionary for localized names
    price: Record<string, string>, // Use a dictionary for localized prices
    annualPrice: Record<string, string>, // Use a dictionary for localized prices
    features: Record<string, string[]> // Use a dictionary for localized features
}

export const products: ProductType[] = [
    {
        id: null,
        annualId: null,
        name: {
            en: "Free",
            fr: "Gratuit", // Example localized name in French
            // Add other language translations as needed
        },
        price: {
            en: "Always free",
            fr: "Toujours gratuit", // Example localized price in French
            // Add other language translations as needed
        },
        annualPrice: {
            en: "Always free",
            fr: "Toujours gratuit", // Example localized price in French
            // Add other language translations as needed
        },
        features: {
            en: [
                "Unlimited Appointments Scheduling",
                "Unlimited events type",
                "One Calendar",
                "Google agenda"
            ],
            fr: [
                "Planification illimitée des rendez-vous",
                "Types d'événements illimités",
                "Un calendrier",
                "Agenda Google"
            ],
            // Add other language translations as needed
        },
    },
    {
        id: import.meta.env.VITE_PRO_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_PRO_PLAN_KEY,
        name: {
            en: "Pro",
            fr: "Pro", // Example localized name in French
            // Add other language translations as needed
        },
        price: {
            en: "$36",
            fr: "$36", // Example localized price in French
            // Add other language translations as needed
        },
        annualPrice : {
            en: "$30",
            fr: "$30", // Example localized price in French
            // Add other language translations as needed
        },
        features: {
            en: [
                "Everything in free plan",
                "5 sharable calendars",
                "Priority support",
                "Email notifications",
            ],
            fr: [
                "Tout dans le plan gratuit",
                "5 calendriers partagées",
                "Support prioritaire",
                "Envoie de rappels par email"
            ],
            // Add other language translations as needed
        },
    },
    {
        id: import.meta.env.VITE_ENTERPRISE_PLAN_KEY,
        annualId :import.meta.env.VITE_ANNUAL_ENTERPRISE_PLAN_KEY,
        name: {
            en: "Enterprise",
            fr: "Entreprise", // Example localized name in French
            // Add other language translations as needed
        },
        price: {
            en: "$90",
            fr: "$90", // Example localized price in French
            // Add other language translations as needed
        },
        annualPrice : {
            en: "$75",
            fr: "$75", // Example localized price in French
            // Add other language translations as needed
        },
        features: {
            en: [
                "Everything in pro plan",
                "Unlimited sharable calendars",
            ],
            fr: [
                "Tout dans le plan PRO",
                "Calendrier partagé illimité",
            ],
            // Add other language translations as needed
        },
    }
]

export const getProductById = (id: string): ProductType=> {
    return products.find(product => product.id === id || product.annualId === id)
}