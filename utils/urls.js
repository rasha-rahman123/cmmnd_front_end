export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_1C5A1322F5C3B842'

export const STRIKE_PK = process.env.NEXT_PUBBLIC_STRIPE_PK || 'pk_test_51HuhwnB1B5U3wDBANrdnBiru1YnPFlnFhrHE1MzHZuMo0I44wspeYSN7De6zveSxJAmwMJ6QVrCIlAhjrjfFfaX7005I1bb942'

export const fromImageToUrl = (image) => {
    if (!image){
        return "/vercel.svg"
    }
    if(image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`
    }

    return image.url
}