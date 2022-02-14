class User {
  constructor({ id }) {
    this.id = id;
  }
  
  [Symbol.toPrimitive]() {
    return `${this.id}`
  }
}

export default User;
