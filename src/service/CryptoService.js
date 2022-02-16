import Crypto from '../entity/Crypto.js';
import CryptoRepository from '../repository/CryptoRepository.js';

class CryptoService {
  constructor({ repository } = {}) {
    this.repository = repository || new CryptoRepository();
  }
  async *list() {
    // TODO: implementar generator que chama a repository fazendo a paginação
    let data = null
    let page = 1
    let response = null

    while(1){
      try {
        response = await this.repository.list(++page)
        data = response.data

        yield new Crypto(data)
      } catch (error) {
        console.error(error)
        break
      }
    }
  }
}

export default CryptoService;
