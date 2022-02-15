import User from './User.js';

// TODO: Criar um Symbol para a propriedade privada 'kUsers'
class Users {
  static #kData = Symbol('data');
  constructor() {
    this[Users.#kData] = new Map()
    return new Proxy(this, {
      ownKeys: () => []
    })
  }

  add(userRaw) {
    const user = new User(userRaw);
    // TODO: inserir valor na estrutura escolhida.
  }

  hasUsers() {
    // TODO: Como saber se tem informação dentro da estrutura escolhida?
    return false;
  }

  size() {
    return this[Users.#kData].size
  }

  // TODO: Me parece que o objeto gerado precisa ser iterável 🤔
}

export default Users;
