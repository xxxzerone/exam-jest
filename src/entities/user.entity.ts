import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  static of(firstName: string, lastName: string): Users {
    const user = new Users();
    user.firstName = firstName;
    user.lastName = lastName;

    return user;
  }
}
