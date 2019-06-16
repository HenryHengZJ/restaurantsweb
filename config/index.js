import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV, STIRPE_CLIENT_KEY } = publicRuntimeConfig

console.log('process.env.NODE_ENV = = ', NODE_ENV)
console.log('process.env.STIRPE_CLIENT_KEY = = ', STIRPE_CLIENT_KEY)
export const server = NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://foodiebee.eu';
export const STIRPE_KEY=STIRPE_CLIENT_KEY;