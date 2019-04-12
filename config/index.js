import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV } = publicRuntimeConfig

console.log('process.env.NODE_ENV = = ', NODE_ENV)
export const server = NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://foodiebee.herokuapp.com';