import User from './User.js';

// TODO: Criar um Symbol para a propriedade privada 'kUsers'
class Users {
  #kData = Symbol('data');
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
    // TODO: Como saber se tem informação dentro da estrutura escolhida?
    return false;
  }

  size() {
    return this[this.#kData].size
  }

  // TODO: Me parece que o objeto gerado precisa ser iterável 🤔
}

export default Users;
