import { Injectable } from '@nestjs/common';
import { User } from './users.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class UserRepository {
  private users: Map<string, User> = new Map();
  private initialized = false;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    if (this.initialized) return;

    try {
      const dataPath = path.join(process.cwd(), 'data.json');
      const rawData = await fs.readFile(dataPath, 'utf8');
      const users: User[] = JSON.parse(rawData);

      users.forEach((user) => {
        this.users.set(user.id, user);
      });

      this.initialized = true;
    } catch (error) {
      console.error('Failed to load user data:', error);
      throw new Error('Failed to initialize user repository');
    }
  }

  async findById(id: string): Promise<User | null> {
    await this.initializeData();
    return this.users.get(id) || null;
  }
}
