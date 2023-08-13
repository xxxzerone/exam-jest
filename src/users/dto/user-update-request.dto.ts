export class UserUpdateRequestDto {
  firstName?: string;
  lastName?: string;

  static of(firstName: string, lastName: string): UserUpdateRequestDto {
    const user = new UserUpdateRequestDto();
    user.firstName = firstName;
    user.lastName = lastName;

    return user;
  }
}
