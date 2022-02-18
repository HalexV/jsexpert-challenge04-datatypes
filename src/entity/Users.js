import User from './User.js';

/**
 * Inviável o uso do WeakSet pois:
 * 1. O programa necessita de informações sobre se a estrutura de dados possui ou não dados. O WeakSet infelizmente não possui formas de verificar isso.
 * 2. O programa precisa da lista de itens presentes na estrutura de dados. O WeakSet não possui mecanismos de iteração.
 */

class Users {
  #kData = Symbol('kData');
  constructor() {
    this[this.#kData] = new Set()
    return new Proxy(this, {
      ownKeys: () => [],
      get(target, prop, receiver) {
        let value = Reflect.get(...arguments);
        return typeof value == 'function' ? value.bind(target) : value;
      }
    })
  }

  add(userRaw) {
    const user = new User(userRaw);
    this[this.#kData].add(user)
  }

  hasUsers() {
    return this[this.#kData].size > 0    
  }

  size() {
    return this[this.#kData].size
  }

  [Symbol.iterator]() {
    return this[this.#kData][Symbol.iterator]()
  }
}

export default Users;
