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

  it('should be able to add a user', () => {
    const users = new Users()

    users.add({ id: 'any_id' })

    expect(users.size()).toBe(1)
  })

  it('should be able to verify if the data structure has users', () => {
    const users = new Users()

    expect(users.hasUsers()).toBe(false)

    users.add({ id: 'any_id' })

    expect(users.hasUsers()).toBe(true)
  })

  it('should be able to iterate over the users object', () => {
    const users = new Users()

    users.add({ id: 'any_id0' })
    users.add({ id: 'any_id1' })
    users.add({ id: 'any_id2' })

    const result = Array.from(users)

    expect(result.length).toBe(3)
    expect(result).toStrictEqual([new User({ id: 'any_id0' }),new User({ id: 'any_id1' }),new User({ id: 'any_id2' })])
  })
})
