import { action, observable } from 'mobx'
import { useStaticRendering } from 'mobx-react'

const isServer = !process.browser
useStaticRendering(isServer)

class Store {
  @observable cart = []

  constructor(isServer, initialData = {}) {
    this.cart = initialData.cart != null ? initialData.cart : []
  }

  @action storecart = (cart) => {
    this.cart = cart
  }

}

let store = null

export function initializeStore(initialData) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return new Store(isServer, initialData)
  }
  if (store === null) {
    store = new Store(isServer, initialData)
  }
  return store
}