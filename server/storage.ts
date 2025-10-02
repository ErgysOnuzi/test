// Storage implementation for Replit Auth integration
import {
  users,
  type User,
  type UpsertUser,
} from "../shared/schema";
import { dbPromise } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations - MANDATORY for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  // Other operations can be added here
}

export class DatabaseStorage implements IStorage {
  // User operations - MANDATORY for Replit Auth

  async getUser(id: string): Promise<User | undefined> {
    const db = await dbPromise;
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const db = await dbPromise;
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    if (!user) {
      throw new Error('Failed to create or update user');
    }
    return user;
  }

  // Other operations
}

// Export a singleton instance
export const storage = new DatabaseStorage();