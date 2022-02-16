import {describe, expect, it } from '@jest/globals'
import CryptoService from '../../src/service/CryptoService.js'

describe('CryptoService', () => {
  
  describe('async *list', () => {
    it('should finish when the repository throws', async () => {
      const repositoryStub = {
        list: async () => {throw new Error()}
      }
      const service = new CryptoService({repository: repositoryStub})

      const cryptoGenerator = service.list()

      const result = await cryptoGenerator.next()

      expect(result.done).toBe(true)
    })

  })
  
})
