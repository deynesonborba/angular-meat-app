export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string){}

    matches(another: User): boolean {
      return another !== undefined && another.email === this.email && another.password === this.password
    }
}
export const users : {[key: string] : User} = {
  "deyneson@email.com": new User('deyneson@email.com', 'Deyneson', '1'),
  "karine@email.com": new User('karine@email.com', 'Karine', '123')
}
