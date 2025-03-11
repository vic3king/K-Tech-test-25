import { IsEmail, IsString } from 'class-validator';

interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export class CreateUserDto implements Partial<User> {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
