
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_DEV, STIRPE_CLIENT_KEY } = publicRuntimeConfig

export const server = NODE_DEV === 'development' ? 'http://localhost:5000' : 'https://restaurantsweb.herokuapp.com';
export const STIRPE_KEY=STIRPE_CLIENT_KEY;