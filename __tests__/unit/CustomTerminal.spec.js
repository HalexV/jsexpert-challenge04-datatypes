import {describe, expect, it } from '@jest/globals'
import CustomTerminal from '../../src/util/CustomTerminal.js'

describe('CustomTerminal', () => {
  
  describe('dataSize', () => {
    it('should return the size of the data structure', () => {
      const customTerminal = new CustomTerminal()

      expect(customTerminal.dataSize()).toBe(0)
    })
  })
  
  
})
