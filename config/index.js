import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV, STIRPE_CLIENT_KEY } = publicRuntimeConfig

export const server = NODE_ENV === 'development' ? 'http://localhost:5000' : 'https://foodiebee.eu';
export const STIRPE_KEY=STIRPE_CLIENT_KEY;