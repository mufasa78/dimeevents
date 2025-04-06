import { 
  contactSubmissions, 
  subscribers, 
  type ContactSubmission, 
  type InsertContactSubmission, 
  type Subscriber, 
  type InsertSubscriber 
} from "@shared/schema";

export interface IStorage {
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  subscribe(subscriber: InsertSubscriber): Promise<Subscriber>;
  getSubscribers(): Promise<Subscriber[]>;
}

export class MemStorage implements IStorage {
  private contactSubmissions: Map<number, ContactSubmission>;
  private contactIdCounter: number;
  private subscribers: Map<number, Subscriber>;
  private subscriberIdCounter: number;

  constructor() {
    this.contactSubmissions = new Map();
    this.contactIdCounter = 1;
    this.subscribers = new Map();
    this.subscriberIdCounter = 1;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactIdCounter++;
    const now = new Date();
    const contactSubmission: ContactSubmission = {
      ...submission,
      id,
      createdAt: now
    };
    this.contactSubmissions.set(id, contactSubmission);
    return contactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async subscribe(subscriber: InsertSubscriber): Promise<Subscriber> {
    // Check if email already exists
    const existingSubscriber = Array.from(this.subscribers.values()).find(
      sub => sub.email === subscriber.email
    );
    
    if (existingSubscriber) {
      return existingSubscriber;
    }
    
    const id = this.subscriberIdCounter++;
    const now = new Date();
    const newSubscriber: Subscriber = {
      ...subscriber,
      id,
      createdAt: now
    };
    
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }
}

export const storage = new MemStorage();
