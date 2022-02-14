import { describe, expect, it } from '@jest/globals'
import User from '../../src/entity/User.js'

describe('Entity User', () => {
  it('should convert the user object to the string primitive with object id when string conversion is applied', () => {
    const user = new User({id: 'any'})
    
    expect(String(user)).toBe('any')
  })
})
