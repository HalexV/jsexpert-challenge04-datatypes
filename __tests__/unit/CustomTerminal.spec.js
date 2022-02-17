import {describe, expect, it } from '@jest/globals'
import CustomTerminal from '../../src/util/CustomTerminal.js'

describe('CustomTerminal', () => {
  
  describe('dataSize', () => {
    it('should return the size of the data structure', () => {
      const customTerminal = new CustomTerminal()

      expect(customTerminal.dataSize()).toBe(0)
    })
  })

  describe('addDataToPrint', () => {
    it('should be able to add data to the structure data', () => {
      const customTerminal = new CustomTerminal()

      const fakeData = [
        {
          id: 1,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        },
        {
          id: 2,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        },
        {
          id: 3,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        }
      ]

      customTerminal.addDataToPrint(fakeData)

      expect(customTerminal.dataSize()).toBe(3)
    })
  })
  
  describe('getDataById', () => {
    it('should be able to get a data by id', () => {
      const customTerminal = new CustomTerminal()

      const fakeData = [
        {
          id: 1,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        },
        {
          id: 2,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        },
        {
          id: 3,
          any1: 'any1',
          any2: 'any2',
          any3: 'any3'
        }
      ]

      customTerminal.addDataToPrint(fakeData)

      const result = customTerminal.getDataById(2)

      expect(result).toStrictEqual(fakeData[1])
    })
  })
  
  
})
