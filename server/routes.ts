import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema, insertSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const result = await storage.createContactSubmission(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        console.error("Error creating contact submission:", error);
        res.status(500).json({ success: false, error: "Failed to submit contact form" });
      }
    }
  });

  // Newsletter subscription
  app.post("/api/subscribe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertSubscriberSchema.parse(req.body);
      const result = await storage.subscribe(validatedData);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, error: validationError.message });
      } else {
        console.error("Error creating subscription:", error);
        res.status(500).json({ success: false, error: "Failed to subscribe to newsletter" });
      }
    }
  });

  // Get all contact submissions (could be used in an admin dashboard)
  app.get("/api/contact", async (_req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json({ success: true, data: submissions });
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ success: false, error: "Failed to fetch contact submissions" });
    }
  });

  // Get all subscribers (could be used in an admin dashboard)
  app.get("/api/subscribers", async (_req: Request, res: Response) => {
    try {
      const subscribers = await storage.getSubscribers();
      res.json({ success: true, data: subscribers });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      res.status(500).json({ success: false, error: "Failed to fetch subscribers" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
