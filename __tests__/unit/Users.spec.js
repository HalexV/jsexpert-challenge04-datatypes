import { describe, expect, it } from '@jest/globals'
import User from '../../src/entity/User.js'
import Users from '../../src/entity/Users.js'

describe('Entity Users', () => {
  it('should not be able to recover the private symbols', () => {
    const users = new Users()
   
    expect(Reflect.ownKeys(users)).toStrictEqual([])
    expect(Object.getOwnPropertySymbols(users)).toStrictEqual([])
    expect(Object.getOwnPropertyNames(users)).toStrictEqual([])
  })

  it('should be able to get the size', () => {
    const users = new Users()

    expect(users.size()).toBe(0)
  })
})
