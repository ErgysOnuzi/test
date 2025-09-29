var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/inMemoryStorage.ts
var inMemoryStorage_exports = {};
__export(inMemoryStorage_exports, {
  inMemoryStorage: () => inMemoryStorage
});
import { readFileSync } from "fs";
import { resolve } from "path";
var InMemoryStorage, inMemoryStorage;
var init_inMemoryStorage = __esm({
  "server/inMemoryStorage.ts"() {
    "use strict";
    InMemoryStorage = class {
      constructor() {
        this.menuItems = [];
        this.galleryItems = [];
        this.events = [];
        this.feedback = [];
        this.eventBookings = [];
        this.nextMenuId = 1;
        this.nextGalleryId = 1;
        this.nextEventId = 1;
        this.nextFeedbackId = 1;
        this.nextBookingId = 1;
        this.initializeData();
      }
      initializeData() {
        this.loadMenuData();
        this.loadGalleryData();
        this.loadSampleEvents();
      }
      loadSampleEvents() {
        this.events = [
          {
            id: 1,
            title_de: "Italienische Weinverkostung",
            title_en: "Italian Wine Tasting Evening",
            description_de: "Entdecken Sie die besten italienischen Weine aus Toskana, Piemont und Venetien. Ein unvergesslicher Abend mit Weinexperten, begleitet von authentischen italienischen Appetizern.",
            description_en: "Discover the finest Italian wines from Tuscany, Piedmont, and Veneto. An unforgettable evening with wine experts, accompanied by authentic Italian appetizers and live music.",
            event_date: "2025-10-15T19:00:00",
            price: 45,
            max_attendees: 25,
            current_attendees: 12,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          },
          {
            id: 2,
            title_de: "Pasta-Kochkurs mit Chef Antonio",
            title_en: "Pasta Making Workshop with Chef Antonio",
            description_de: "Lernen Sie die Geheimnisse der handgemachten Pasta direkt von unserem Chefkoch Antonio. Inklusive 3-G\xE4nge-Men\xFC und italienischem Wein.",
            description_en: "Learn the secrets of handmade pasta directly from our head chef Antonio. Includes hands-on pasta making, 3-course meal, and Italian wine pairing.",
            event_date: "2025-10-22T18:30:00",
            price: 65,
            max_attendees: 16,
            current_attendees: 8,
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          }
        ];
        this.nextEventId = 3;
        console.log(`\u2705 Loaded ${this.events.length} sample events`);
      }
      loadMenuData() {
        try {
          const menuPath = resolve(
            process.cwd(),
            "attached_assets/menu_items_1758762047242.json"
          );
          const menuData = JSON.parse(readFileSync(menuPath, "utf8"));
          this.menuItems = menuData.map((item) => ({
            id: item.id,
            title: item.title,
            titleDe: item.title_de || item.title,
            titleEn: item.title_en || item.title,
            description: item.description,
            descriptionDe: item.description_de || item.description,
            descriptionEn: item.description_en || item.description,
            price: item.price,
            category: item.category,
            categoryDe: item.category_de || item.category,
            categoryEn: item.category_en || item.category,
            isAvailable: item.is_available ?? true,
            allergens: item.allergens || "",
            imageUrl: item.image_url ?? null
          }));
          this.nextMenuId = (this.menuItems.length ? Math.max(...this.menuItems.map((item) => item.id)) : 0) + 1;
          console.log(`\u2705 Loaded ${this.menuItems.length} authentic menu items`);
        } catch (error) {
          console.log("\u26A0\uFE0F Could not load menu data, using empty menu:", error);
          this.menuItems = [];
        }
      }
      generateIntelligentMetadata(filename, index2) {
        const lower = filename.toLowerCase();
        let category = "restaurant";
        let title = "";
        let description = "";
        let altText = "";
        if (lower.includes("food") || lower.includes("dish") || lower.includes("pizza") || lower.includes("pasta")) {
          category = "food";
          title = `Authentic Italian Cuisine`;
          description = `Fresh, handcrafted Italian dishes prepared with traditional recipes at La Cantina Berlin`;
          altText = `Delicious Italian food served at La Cantina Berlin restaurant`;
        } else if (lower.includes("interior") || lower.includes("dining") || lower.includes("table")) {
          category = "interior";
          title = `Warm Italian Atmosphere`;
          description = `Cozy dining area with authentic Italian ambiance and traditional decor`;
          altText = `Interior view of La Cantina Berlin dining room with warm atmosphere`;
        } else if (lower.includes("bar") || lower.includes("wine") || lower.includes("drink")) {
          category = "bar";
          title = `Italian Wine & Bar`;
          description = `Extensive selection of Italian wines and traditional aperitivos`;
          altText = `Bar area at La Cantina Berlin with Italian wines and drinks`;
        } else if (lower.includes("kitchen") || lower.includes("chef")) {
          category = "kitchen";
          title = `Authentic Italian Kitchen`;
          description = `Traditional Italian cooking methods and fresh ingredients`;
          altText = `Kitchen at La Cantina Berlin where authentic Italian dishes are prepared`;
        } else if (lower.includes("exterior") || lower.includes("outside") || lower.includes("front")) {
          category = "exterior";
          title = `La Cantina Berlin Entrance`;
          description = `Welcoming exterior of our authentic Italian restaurant in Berlin`;
          altText = `Exterior view of La Cantina Berlin restaurant`;
        } else {
          const atmosphereTypes = [
            {
              title: "Cozy Italian Dining",
              desc: "Intimate dining space with warm lighting and traditional Italian charm",
              alt: "Cozy dining atmosphere at La Cantina Berlin"
            },
            {
              title: "Authentic Restaurant Interior",
              desc: "Traditional Italian restaurant design with rustic elements and warm colors",
              alt: "Authentic interior design at La Cantina Berlin"
            },
            {
              title: "Italian Culinary Experience",
              desc: "Experience the taste of Italy in the heart of Berlin",
              alt: "Italian dining experience at La Cantina Berlin"
            },
            {
              title: "Traditional Italian Ambiance",
              desc: "Classic Italian restaurant atmosphere with attention to authentic details",
              alt: "Traditional Italian restaurant ambiance in Berlin"
            },
            {
              title: "Warm Restaurant Setting",
              desc: "Inviting space where families and friends gather for authentic Italian meals",
              alt: "Warm and inviting atmosphere at La Cantina Berlin"
            }
          ];
          const typeIndex = index2 % atmosphereTypes.length;
          const type = atmosphereTypes[typeIndex];
          title = type?.title || `Restaurant Photo ${index2 + 1}`;
          description = type?.desc || `Authentic Italian restaurant atmosphere at La Cantina Berlin`;
          altText = type?.alt || `La Cantina Berlin restaurant photo ${index2 + 1}`;
          category = "atmosphere";
        }
        return { title, description, altText, category };
      }
      loadGalleryData() {
        try {
          import("fs").then(({ readdirSync }) => {
            const galleryPath = resolve(process.cwd(), "public/uploads/gallery");
            const imageFiles = readdirSync(galleryPath).filter(
              (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
            );
            this.galleryItems = imageFiles.map((filename, index2) => {
              const metadata = this.generateIntelligentMetadata(filename, index2);
              return {
                id: index2 + 1,
                title: metadata.title,
                description: metadata.description,
                imageUrl: `/uploads/gallery/${filename}`,
                category: metadata.category,
                altText: metadata.altText,
                uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
                isVisible: true,
                sortOrder: index2
              };
            });
            this.nextGalleryId = this.galleryItems.length + 1;
            console.log(
              `\u2705 Loaded ${this.galleryItems.length} gallery images from uploads folder`
            );
          }).catch(() => {
            this.loadGalleryDataSync();
          });
        } catch {
          console.log("\u26A0\uFE0F Could not load gallery data, trying sync method");
          this.loadGalleryDataSync();
        }
      }
      loadGalleryDataSync() {
        try {
          const { readdirSync } = __require("fs");
          const galleryPath = resolve(process.cwd(), "public/uploads/gallery");
          const imageFiles = readdirSync(galleryPath).filter(
            (file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
          );
          this.galleryItems = imageFiles.map((filename, index2) => {
            const metadata = this.generateIntelligentMetadata(filename, index2);
            return {
              id: index2 + 1,
              title: metadata.title,
              description: metadata.description,
              imageUrl: `/uploads/gallery/${filename}`,
              category: metadata.category,
              altText: metadata.altText,
              uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
              isVisible: true,
              sortOrder: index2
            };
          });
          this.nextGalleryId = this.galleryItems.length + 1;
          console.log(
            `\u2705 Loaded ${this.galleryItems.length} gallery images with intelligent metadata`
          );
        } catch (error) {
          console.log("\u26A0\uFE0F Could not load gallery data, using empty gallery:", error);
          this.galleryItems = [];
        }
      }
      // Menu operations
      getAllMenuItems() {
        return this.menuItems;
      }
      getMenuItemById(id) {
        return this.menuItems.find((item) => item.id === id);
      }
      createMenuItem(data) {
        const newItem = {
          id: this.nextMenuId++,
          ...data
        };
        this.menuItems.push(newItem);
        return newItem;
      }
      updateMenuItem(id, data) {
        const index2 = this.menuItems.findIndex((item) => item.id === id);
        if (index2 === -1) return null;
        const definedOnly = Object.fromEntries(
          Object.entries(data).filter(([, v]) => v !== void 0)
        );
        const existing = this.menuItems[index2];
        const updated = { ...existing, ...definedOnly, id };
        this.menuItems[index2] = updated;
        return updated;
      }
      deleteMenuItem(id) {
        const index2 = this.menuItems.findIndex((item) => item.id === id);
        if (index2 === -1) return false;
        this.menuItems.splice(index2, 1);
        return true;
      }
      // Gallery operations
      getAllGalleryItems() {
        return this.galleryItems.filter((item) => item.isVisible);
      }
      getGalleryItemById(id) {
        return this.galleryItems.find((item) => item.id === id);
      }
      createGalleryItem(data) {
        const newItem = {
          id: this.nextGalleryId++,
          ...data
        };
        this.galleryItems.push(newItem);
        return newItem;
      }
      updateGalleryItem(id, data) {
        const index2 = this.galleryItems.findIndex((item) => item.id === id);
        if (index2 === -1) return null;
        const definedOnly = Object.fromEntries(
          Object.entries(data).filter(([, v]) => v !== void 0)
        );
        const existing = this.galleryItems[index2];
        const updated = { ...existing, ...definedOnly, id };
        this.galleryItems[index2] = updated;
        return updated;
      }
      deleteGalleryItem(id) {
        const index2 = this.galleryItems.findIndex((item) => item.id === id);
        if (index2 === -1) return false;
        this.galleryItems.splice(index2, 1);
        return true;
      }
      // Event operations
      getAllEvents() {
        return this.events;
      }
      getEventById(id) {
        return this.events.find((event) => event.id === id);
      }
      createEvent(data) {
        const newEvent = {
          id: this.nextEventId++,
          ...data
        };
        this.events.push(newEvent);
        return newEvent;
      }
      updateEvent(id, data) {
        const index2 = this.events.findIndex((event) => event.id === id);
        if (index2 === -1) return null;
        this.events[index2] = { ...this.events[index2], ...data, id };
        return this.events[index2] || null;
      }
      deleteEvent(id) {
        const index2 = this.events.findIndex((event) => event.id === id);
        if (index2 === -1) return false;
        this.events.splice(index2, 1);
        return true;
      }
      // Feedback operations
      getAllFeedback() {
        return this.feedback;
      }
      getFeedbackById(id) {
        return this.feedback.find((f) => f.id === id);
      }
      createFeedback(data) {
        const newFeedback = {
          id: this.nextFeedbackId++,
          ...data
        };
        this.feedback.push(newFeedback);
        return newFeedback;
      }
      updateFeedback(id, data) {
        const index2 = this.feedback.findIndex((f) => f.id === id);
        if (index2 === -1) return null;
        this.feedback[index2] = { ...this.feedback[index2], ...data, id };
        return this.feedback[index2] || null;
      }
      deleteFeedback(id) {
        const index2 = this.feedback.findIndex((f) => f.id === id);
        if (index2 === -1) return false;
        this.feedback.splice(index2, 1);
        return true;
      }
      // Event Booking operations
      getAllEventBookings() {
        return this.eventBookings;
      }
      getEventBookingById(id) {
        return this.eventBookings.find((b) => b.id === id);
      }
      getBookingsForEvent(eventId) {
        return this.eventBookings.filter((b) => b.eventId === eventId);
      }
      createEventBooking(data) {
        const newBooking = {
          id: this.nextBookingId++,
          ...data
        };
        this.eventBookings.push(newBooking);
        return newBooking;
      }
      updateEventBooking(id, data) {
        const index2 = this.eventBookings.findIndex((b) => b.id === id);
        if (index2 === -1) return null;
        this.eventBookings[index2] = { ...this.eventBookings[index2], ...data, id };
        return this.eventBookings[index2] || null;
      }
      deleteEventBooking(id) {
        const index2 = this.eventBookings.findIndex((b) => b.id === id);
        if (index2 === -1) return false;
        this.eventBookings.splice(index2, 1);
        return true;
      }
      // Helper method to get booking statistics for events
      getEventBookingStats(eventId) {
        const bookings = this.getBookingsForEvent(eventId);
        const totalGuests = bookings.reduce((sum, b) => sum + b.guests, 0);
        const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);
        return {
          totalBookings: bookings.length,
          totalGuests,
          totalRevenue,
          confirmedBookings: bookings.filter((b) => b.status === "confirmed").length
        };
      }
    };
    inMemoryStorage = new InMemoryStorage();
  }
});

// server/index.ts
import express9 from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  adminUsers: () => adminUsers,
  contactMessages: () => contactMessages,
  eventBookings: () => eventBookings,
  eventBookingsRelations: () => eventBookingsRelations,
  events: () => events,
  eventsRelations: () => eventsRelations,
  feedbacks: () => feedbacks,
  feedbacksRelations: () => feedbacksRelations,
  gallery: () => gallery,
  menuItems: () => menuItems,
  reservations: () => reservations,
  reservationsRelations: () => reservationsRelations,
  sessions: () => sessions,
  users: () => users
});
import {
  pgTable,
  serial,
  text,
  real,
  integer,
  boolean,
  timestamp,
  varchar,
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
var sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull()
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  category: text("category").notNull(),
  isAvailable: boolean("is_available").default(true),
  titleDe: text("title_de"),
  titleEn: text("title_en"),
  descriptionDe: text("description_de"),
  descriptionEn: text("description_en"),
  categoryDe: text("category_de"),
  categoryEn: text("category_en"),
  allergens: text("allergens"),
  imageUrl: text("image_url"),
  // Image URL for the dish
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  date: text("date").notNull(),
  // Store as text to match current format
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  status: text("status").default("pending"),
  // pending, confirmed, cancelled, completed
  notes: text("notes"),
  // Additional notes for special requests
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var gallery = pgTable("gallery", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  description: text("description"),
  alt: text("alt"),
  // Alt text for accessibility
  category: text("category"),
  // interior, food, events, etc.
  isActive: boolean("is_active").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  titleDe: text("title_de"),
  titleEn: text("title_en"),
  descriptionDe: text("description_de"),
  descriptionEn: text("description_en"),
  date: text("date"),
  // Event date
  startTime: text("start_time"),
  // Event start time
  endTime: text("end_time"),
  // Event end time
  capacity: integer("capacity"),
  // Maximum attendees
  currentBookings: integer("current_bookings").default(0),
  price: real("price"),
  // Event price per person
  imageUrl: text("image_url"),
  // Event promotional image
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  // Optional phone number
  subject: text("subject"),
  // Message subject
  message: text("message").notNull(),
  status: text("status").default("new"),
  // new, read, replied, archived
  priority: text("priority").default("normal"),
  // low, normal, high
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  // 1-5 stars
  comment: text("comment").notNull(),
  status: text("status").default("pending"),
  // pending, approved, rejected
  isPublic: boolean("is_public").default(false),
  // Whether to display publicly
  reservationId: integer("reservation_id"),
  // Link to reservation if applicable
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var eventBookings = pgTable("event_bookings", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  guests: integer("guests").default(1),
  totalPrice: real("total_price"),
  status: text("status").default("pending"),
  // pending, confirmed, cancelled
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").default("staff"),
  // admin, manager, staff
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var feedbacksRelations = relations(feedbacks, ({ one }) => ({
  reservation: one(reservations, {
    fields: [feedbacks.reservationId],
    references: [reservations.id]
  })
}));
var reservationsRelations = relations(reservations, ({ many }) => ({
  feedbacks: many(feedbacks)
}));
var eventsRelations = relations(events, ({ many }) => ({
  bookings: many(eventBookings)
}));
var eventBookingsRelations = relations(eventBookings, ({ one }) => ({
  event: one(events, {
    fields: [eventBookings.eventId],
    references: [events.id]
  })
}));

// server/db.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/routes/menu.ts
init_inMemoryStorage();
import express2 from "express";

// server/routes/admin.ts
import express from "express";
import { createHash, randomBytes } from "crypto";
import jwt from "jsonwebtoken";
var router = express.Router();
var JWT_SECRET = process.env.JWT_SECRET || "development-secret-change-in-production";
var ADMIN_EMAIL = "ergysonuzi12@gmail.com";
var ADMIN_USERNAME = "ergysonuzi";
var ADMIN_PASSWORD_HASH = createHash("sha256").update("Xharie123").digest("hex");
var activeSessions = /* @__PURE__ */ new Map();
var generateSessionToken = () => {
  return jwt.sign(
    {
      role: "admin",
      authenticated: true,
      timestamp: Date.now()
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};
var generateCSRFToken = () => {
  const secret = randomBytes(32).toString("hex");
  const nonce = randomBytes(32).toString("hex");
  const hmac = createHash("sha256").update(secret + nonce).digest("hex");
  const token = `${nonce}.${hmac}`;
  return { token, secret };
};
var requireAuth = (req, res, next) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (!sessionCookie) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const decoded = jwt.verify(sessionCookie, JWT_SECRET);
    if (decoded.role === "admin" && decoded.authenticated === true) {
      next();
    } else {
      res.status(401).json({ error: "Invalid session" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid session" });
  }
};
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const passwordHash = createHash("sha256").update(password).digest("hex");
    const isValidCredentials = (identifier === ADMIN_EMAIL || identifier === ADMIN_USERNAME) && passwordHash === ADMIN_PASSWORD_HASH;
    if (isValidCredentials) {
      const sessionToken = generateSessionToken();
      activeSessions.set(sessionToken, {
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        loginTime: Date.now()
      });
      const { token: csrfToken, secret: csrfSecret } = generateCSRFToken();
      console.log(`\u{1F510} Admin logged in: ${identifier}`);
      res.cookie("la_cantina_admin_session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1e3,
        // 2 hours
        signed: false
        // We use JWT signing instead
      });
      res.cookie("la_cantina_csrf_secret", csrfSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1e3
        // 2 hours
      });
      const referer = req.headers.referer || "";
      const localeMatch = referer.match(/\/([a-z]{2})\/admin\/login/);
      const locale = localeMatch ? localeMatch[1] : "de";
      const dashboardUrl = `/${locale}/admin/dashboard`;
      res.json({
        success: true,
        message: "Login successful",
        redirectTo: dashboardUrl,
        csrfToken,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      });
    } else {
      console.log(`\u{1F6AB} Failed login attempt: ${identifier}`);
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});
router.post("/logout", async (req, res) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (sessionCookie) {
      res.clearCookie("la_cantina_admin_session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      res.clearCookie("la_cantina_csrf_secret", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
      });
      console.log(`\u{1F510} Admin logged out`);
    }
    res.json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    console.error("Error during admin logout:", error);
    res.status(500).json({ error: "Logout failed" });
  }
});
router.get("/session", async (req, res) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (!sessionCookie) {
      res.json({
        authenticated: false,
        user: null
      });
      return;
    }
    const decoded = jwt.verify(sessionCookie, JWT_SECRET);
    if (decoded.role === "admin" && decoded.authenticated === true) {
      res.json({
        authenticated: true,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      });
    } else {
      res.json({
        authenticated: false,
        user: null
      });
    }
  } catch (error) {
    console.error("Error checking admin session:", error);
    res.json({
      authenticated: false,
      user: null
    });
  }
});
router.get("/csrf", async (req, res) => {
  try {
    const { token: csrfToken, secret: csrfSecret } = generateCSRFToken();
    res.cookie("la_cantina_csrf_secret", csrfSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 2 * 60 * 60 * 1e3
      // 2 hours
    });
    res.json({ csrfToken });
  } catch (error) {
    console.error("Error generating CSRF token:", error);
    res.status(500).json({ error: "Failed to generate CSRF token" });
  }
});
router.get("/bookings", requireAuth, async (req, res) => {
  try {
    const { inMemoryStorage: inMemoryStorage2 } = await Promise.resolve().then(() => (init_inMemoryStorage(), inMemoryStorage_exports));
    const bookings = inMemoryStorage2.getAllEventBookings();
    console.log(`\u{1F4CA} Admin fetched ${bookings.length} event bookings`);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
router.patch("/bookings/:id/status", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["confirmed", "cancelled", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be confirmed, cancelled, or pending" });
    }
    const { inMemoryStorage: inMemoryStorage2 } = await Promise.resolve().then(() => (init_inMemoryStorage(), inMemoryStorage_exports));
    const booking = inMemoryStorage2.getEventBookingById(parseInt(id));
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const previousStatus = booking.status;
    const updatedBooking = inMemoryStorage2.updateEventBooking(parseInt(id), { status });
    if (!updatedBooking) {
      return res.status(500).json({ error: "Failed to update booking" });
    }
    const event = inMemoryStorage2.getEventById(booking.eventId);
    if (event) {
      let capacityChange = 0;
      if (previousStatus === "confirmed" && status === "cancelled") {
        capacityChange = -booking.guests;
      } else if ((previousStatus === "cancelled" || previousStatus === "pending") && status === "confirmed") {
        const availableSpots = event.max_attendees - event.current_attendees;
        if (booking.guests > availableSpots) {
          return res.status(400).json({
            error: `Cannot confirm booking: Only ${availableSpots} spots available, but ${booking.guests} requested`
          });
        }
        capacityChange = booking.guests;
      } else if (previousStatus === "pending" && status === "cancelled") {
        capacityChange = 0;
      }
      if (capacityChange !== 0) {
        const newAttendeeCount = Math.max(0, event.current_attendees + capacityChange);
        inMemoryStorage2.updateEvent(booking.eventId, {
          current_attendees: newAttendeeCount
        });
        console.log(`\u{1F4CA} Updated event ${booking.eventId} capacity: ${capacityChange > 0 ? "+" : ""}${capacityChange} guests (${event.current_attendees} \u2192 ${newAttendeeCount})`);
      }
    }
    console.log(`\u{1F4DD} Admin updated booking ${id}: ${previousStatus} \u2192 ${status}`);
    res.json({
      success: true,
      booking: updatedBooking,
      message: `Booking ${status} successfully`
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Failed to update booking status" });
  }
});
router.delete("/bookings/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { inMemoryStorage: inMemoryStorage2 } = await Promise.resolve().then(() => (init_inMemoryStorage(), inMemoryStorage_exports));
    const booking = inMemoryStorage2.getEventBookingById(parseInt(id));
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.status === "confirmed") {
      const event = inMemoryStorage2.getEventById(booking.eventId);
      if (event) {
        const newAttendeeCount = Math.max(0, event.current_attendees - booking.guests);
        inMemoryStorage2.updateEvent(booking.eventId, {
          current_attendees: newAttendeeCount
        });
        console.log(`\u{1F4CA} Freed ${booking.guests} spots from event ${booking.eventId} (${event.current_attendees} \u2192 ${newAttendeeCount})`);
      }
    }
    const deleted = inMemoryStorage2.deleteEventBooking(parseInt(id));
    if (!deleted) {
      return res.status(500).json({ error: "Failed to delete booking" });
    }
    console.log(`\u{1F5D1}\uFE0F Admin deleted booking ${id} for ${booking.name}`);
    res.json({
      success: true,
      message: "Booking deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking" });
  }
});
setInterval(() => {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1e3;
  for (const [token, session] of activeSessions.entries()) {
    if (now - session.loginTime > oneDayMs) {
      activeSessions.delete(token);
    }
  }
}, 60 * 60 * 1e3);
var admin_default = router;

// server/routes/menu.ts
var router2 = express2.Router();
router2.get("/", async (req, res) => {
  try {
    const items = inMemoryStorage.getAllMenuItems();
    console.log(`\u{1F4CB} Fetched ${items.length} menu items`);
    res.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ error: "Failed to fetch menu items" });
  }
});
router2.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = inMemoryStorage.getMenuItemById(parseInt(id));
    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return res.status(500).json({ error: "Failed to fetch menu item" });
  }
});
router2.post("/", requireAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      category,
      isAvailable = true,
      titleDe,
      titleEn,
      descriptionDe,
      descriptionEn,
      categoryDe,
      categoryEn,
      allergens = "",
      imageUrl = null
    } = req.body;
    if (!title || !price || !category) {
      return res.status(400).json({ error: "Title, price, and category are required" });
    }
    const newItem = inMemoryStorage.createMenuItem({
      title,
      titleDe: titleDe || title,
      titleEn: titleEn || title,
      description: description || "",
      descriptionDe: descriptionDe || description || "",
      descriptionEn: descriptionEn || description || "",
      price: parseFloat(price),
      category,
      categoryDe: categoryDe || category,
      categoryEn: categoryEn || category,
      isAvailable,
      allergens,
      imageUrl
    });
    console.log(`\u{1F4CB} Created menu item: ${newItem.title}`);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return res.status(500).json({ error: "Failed to create menu item" });
  }
});
router2.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedItem = inMemoryStorage.updateMenuItem(parseInt(id), updateData);
    if (!updatedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log(`\u{1F4CB} Updated menu item: ${updatedItem.title}`);
    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return res.status(500).json({ error: "Failed to update menu item" });
  }
});
router2.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = inMemoryStorage.deleteMenuItem(parseInt(id));
    if (!deleted) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log(`\u{1F4CB} Deleted menu item ID: ${id}`);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return res.status(500).json({ error: "Failed to delete menu item" });
  }
});
var menu_default = router2;

// server/routes/gallery.ts
init_inMemoryStorage();
import express3 from "express";
var router3 = express3.Router();
router3.get("/", async (req, res) => {
  try {
    const images = inMemoryStorage.getAllGalleryItems();
    console.log(`\u{1F5BC}\uFE0F Fetched ${images.length} gallery images`);
    res.json(images);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});
router3.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = inMemoryStorage.getGalleryItemById(parseInt(id));
    if (!image) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    res.json(image);
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    return res.status(500).json({ error: "Failed to fetch gallery image" });
  }
});
router3.post("/", requireAuth, async (req, res) => {
  try {
    const {
      imageUrl,
      description = "",
      altText = "",
      category = "atmosphere",
      isVisible = true,
      sortOrder = 0
    } = req.body;
    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }
    const newImage = inMemoryStorage.createGalleryItem({
      title: altText || `Image ${Date.now()}`,
      description,
      imageUrl,
      category,
      altText,
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      isVisible,
      sortOrder
    });
    console.log(`\u{1F5BC}\uFE0F Created gallery image: ${newImage.title}`);
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return res.status(500).json({ error: "Failed to create gallery image" });
  }
});
router3.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedImage = inMemoryStorage.updateGalleryItem(parseInt(id), updateData);
    if (!updatedImage) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    console.log(`\u{1F5BC}\uFE0F Updated gallery image: ${updatedImage.title}`);
    res.json(updatedImage);
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return res.status(500).json({ error: "Failed to update gallery image" });
  }
});
router3.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = inMemoryStorage.deleteGalleryItem(parseInt(id));
    if (!deleted) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    console.log(`\u{1F5BC}\uFE0F Deleted gallery image ID: ${id}`);
    res.json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return res.status(500).json({ error: "Failed to delete gallery image" });
  }
});
router3.patch("/:id/toggle", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const image = inMemoryStorage.getGalleryItemById(parseInt(id));
    if (!image) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    const updatedImage = inMemoryStorage.updateGalleryItem(parseInt(id), {
      isVisible: !image.isVisible
    });
    console.log(`\u{1F5BC}\uFE0F Toggled gallery image visibility: ${updatedImage?.title}`);
    res.json({
      success: true,
      message: `Gallery image ${updatedImage?.isVisible ? "shown" : "hidden"} successfully`
    });
  } catch (error) {
    console.error("Error toggling gallery image visibility:", error);
    return res.status(500).json({ error: "Failed to update gallery image visibility" });
  }
});
var gallery_default = router3;

// server/routes/reservations.ts
import express4 from "express";
import { eq } from "drizzle-orm";
var router4 = express4.Router();
router4.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequests
    } = req.body;
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [reservation] = await db.insert(reservations).values({
      name,
      email: email || "",
      phone,
      date,
      time,
      guests: parseInt(guests),
      notes: specialRequests || "",
      status: "pending"
    }).returning();
    if (!reservation) {
      return res.status(500).json({ error: "Failed to create reservation" });
    }
    const transformedReservation = {
      id: reservation.id,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes,
      status: reservation.status,
      createdAt: reservation.createdAt
    };
    console.log(`\u{1F4C5} New reservation created: ${reservation.id}`);
    return res.status(201).json({
      success: true,
      reservation: transformedReservation,
      message: "Reservation created successfully"
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return res.status(500).json({ error: "Failed to create reservation" });
  }
});
router4.get("/", requireAuth, async (req, res) => {
  try {
    const allReservations = await db.select().from(reservations);
    const transformedReservations = allReservations.map((reservation) => ({
      id: reservation.id,
      name: reservation.name,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      notes: reservation.notes,
      status: reservation.status,
      createdAt: reservation.createdAt
    }));
    console.log(`\u{1F4C5} Fetched ${transformedReservations.length} reservations`);
    return res.json(transformedReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return res.status(500).json({ error: "Failed to fetch reservations" });
  }
});
router4.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      notes,
      status
    } = req.body;
    const updateData = {};
    if (name !== void 0) updateData.name = name;
    if (email !== void 0) updateData.email = email;
    if (phone !== void 0) updateData.phone = phone;
    if (date !== void 0) updateData.date = date;
    if (time !== void 0) updateData.time = time;
    if (guests !== void 0) updateData.guests = parseInt(guests);
    if (notes !== void 0) updateData.notes = notes;
    if (status !== void 0) updateData.status = status;
    const [updatedReservation] = await db.update(reservations).set(updateData).where(eq(reservations.id, parseInt(id))).returning();
    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    const transformedReservation = {
      id: updatedReservation.id,
      name: updatedReservation.name,
      email: updatedReservation.email,
      phone: updatedReservation.phone,
      date: updatedReservation.date,
      time: updatedReservation.time,
      guests: updatedReservation.guests,
      notes: updatedReservation.notes,
      status: updatedReservation.status,
      createdAt: updatedReservation.createdAt
    };
    console.log(`\u{1F4C5} Updated reservation: ${updatedReservation.name} - ${updatedReservation.status}`);
    return res.json({
      success: true,
      reservation: transformedReservation,
      message: "Reservation updated successfully"
    });
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.status(500).json({ error: "Failed to update reservation" });
  }
});
router4.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedReservation] = await db.delete(reservations).where(eq(reservations.id, parseInt(id))).returning();
    if (!deletedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    console.log(`\u{1F5D1}\uFE0F Deleted reservation: ${deletedReservation.name}`);
    return res.json({
      success: true,
      message: "Reservation deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    return res.status(500).json({ error: "Failed to delete reservation" });
  }
});
router4.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be: pending, confirmed, cancelled, or completed" });
    }
    const [updatedReservation] = await db.update(reservations).set({ status }).where(eq(reservations.id, parseInt(id))).returning();
    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    const transformedReservation = {
      id: updatedReservation.id,
      name: updatedReservation.name,
      email: updatedReservation.email,
      phone: updatedReservation.phone,
      date: updatedReservation.date,
      time: updatedReservation.time,
      guests: updatedReservation.guests,
      notes: updatedReservation.notes,
      status: updatedReservation.status,
      createdAt: updatedReservation.createdAt
    };
    console.log(`\u{1F504} Updated reservation status: ${updatedReservation.name} -> ${status}`);
    return res.json({
      success: true,
      reservation: transformedReservation,
      message: `Reservation ${status} successfully`
    });
  } catch (error) {
    console.error("Error updating reservation status:", error);
    return res.status(500).json({ error: "Failed to update reservation status" });
  }
});
var reservations_default = router4;

// server/routes/events.ts
init_inMemoryStorage();
import express5 from "express";
var router5 = express5.Router();
router5.get("/", async (req, res) => {
  try {
    const events2 = inMemoryStorage.getAllEvents();
    console.log(`\u{1F389} Fetched ${events2.length} events`);
    return res.json(events2);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
});
router5.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const event = inMemoryStorage.getEventById(parseInt(id));
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Failed to fetch event" });
  }
});
router5.post("/", requireAuth, async (req, res) => {
  try {
    const {
      title_de,
      title_en,
      description_de = "",
      description_en = "",
      event_date,
      price = 0,
      max_attendees = 10,
      current_attendees = 0
    } = req.body;
    if (!title_de || !title_en || !event_date) {
      return res.status(400).json({ error: "German title, English title, and event date are required" });
    }
    const newEvent = inMemoryStorage.createEvent({
      title_de,
      title_en,
      description_de,
      description_en,
      event_date,
      price: parseFloat(price),
      max_attendees: parseInt(max_attendees),
      current_attendees: parseInt(current_attendees),
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`\u{1F389} Created event: ${newEvent.title_en}`);
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
});
router5.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedEvent = inMemoryStorage.updateEvent(parseInt(id), updateData);
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    console.log(`\u{1F389} Updated event: ${updatedEvent.title_en}`);
    return res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Failed to update event" });
  }
});
router5.post("/:id/book", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, guests, specialRequests } = req.body;
    if (!name || !email || !phone || !guests) {
      return res.status(400).json({ error: "Name, email, phone, and number of guests are required" });
    }
    const event = inMemoryStorage.getEventById(parseInt(id));
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const availableSpots = event.max_attendees - event.current_attendees;
    if (guests > availableSpots) {
      return res.status(400).json({
        error: `Only ${availableSpots} spots available, but ${guests} requested`
      });
    }
    const booking = inMemoryStorage.createEventBooking({
      eventId: parseInt(id),
      name,
      email,
      phone,
      guests: parseInt(guests),
      specialRequests: specialRequests || "",
      totalAmount: event.price * parseInt(guests),
      status: "pending",
      created_at: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`\u{1F389} Event booking created: ${name} for ${guests} guests at ${event.title_en}`);
    return res.status(201).json({
      success: true,
      booking,
      message: "Booking submitted successfully! Your reservation is pending confirmation by our staff. You will receive a confirmation email shortly.",
      status: "pending"
    });
  } catch (error) {
    console.error("Error creating event booking:", error);
    return res.status(500).json({ error: "Failed to create booking" });
  }
});
router5.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = inMemoryStorage.deleteEvent(parseInt(id));
    if (!deleted) {
      return res.status(404).json({ error: "Event not found" });
    }
    console.log(`\u{1F389} Deleted event ID: ${id}`);
    return res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Failed to delete event" });
  }
});
var events_default = router5;

// server/routes/contact.ts
import express6 from "express";
var router6 = express6.Router();
router6.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const [submission] = await db.insert(contactMessages).values({
      name,
      email,
      subject,
      message,
      createdAt: /* @__PURE__ */ new Date()
    }).returning();
    if (!submission) {
      return res.status(500).json({ error: "Failed to create contact submission" });
    }
    console.log(`\u{1F4E7} New contact submission: ${submission.id}`);
    return res.status(201).json({
      success: true,
      id: submission.id,
      message: "Contact form submitted successfully"
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return res.status(500).json({ error: "Failed to submit contact form" });
  }
});
router6.get("/", requireAuth, async (req, res) => {
  try {
    const submissions = await db.select().from(contactMessages);
    console.log(`\u{1F4E7} Fetched ${submissions.length} contact submissions`);
    return res.json(submissions);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});
var contact_default = router6;

// server/routes/feedback.ts
init_inMemoryStorage();
import express7 from "express";
var router7 = express7.Router();
router7.get("/", requireAuth, async (req, res) => {
  try {
    const feedback = inMemoryStorage.getAllFeedback();
    console.log(`\u2B50 Fetched ${feedback.length} feedback submissions`);
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
});
router7.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = inMemoryStorage.getFeedbackById(parseInt(id));
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
});
router7.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      rating,
      experience,
      suggestions = ""
    } = req.body;
    if (!name || !email || !rating || !experience) {
      return res.status(400).json({ error: "Name, email, rating, and experience are required" });
    }
    const newFeedback = inMemoryStorage.createFeedback({
      name,
      email,
      rating: parseInt(rating),
      experience,
      suggestions,
      created_at: (/* @__PURE__ */ new Date()).toISOString(),
      approved: false
    });
    console.log(`\u2B50 New feedback submitted: ${newFeedback.name} (${newFeedback.rating} stars)`);
    res.status(201).json({
      success: true,
      feedback: newFeedback,
      message: "Feedback submitted successfully"
    });
  } catch (error) {
    console.error("Error creating feedback:", error);
    return res.status(500).json({ error: "Failed to submit feedback" });
  }
});
router7.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedFeedback = inMemoryStorage.updateFeedback(parseInt(id), updateData);
    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    console.log(`\u2B50 Updated feedback: ${updatedFeedback.name}`);
    res.json(updatedFeedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    return res.status(500).json({ error: "Failed to update feedback" });
  }
});
router7.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const success = inMemoryStorage.deleteFeedback(parseInt(id));
    if (!success) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    console.log(`\u2B50 Deleted feedback: ${id}`);
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return res.status(500).json({ error: "Failed to delete feedback" });
  }
});
router7.patch("/:id/approve", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const updatedFeedback = inMemoryStorage.updateFeedback(parseInt(id), { approved: !!approved });
    if (!updatedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    console.log(`\u2B50 ${approved ? "Approved" : "Rejected"} feedback: ${updatedFeedback.name}`);
    res.json(updatedFeedback);
  } catch (error) {
    console.error("Error updating feedback approval:", error);
    return res.status(500).json({ error: "Failed to update feedback approval" });
  }
});
var feedback_default = router7;

// server/routes/google-reviews.ts
import express8 from "express";
var router8 = express8.Router();
router8.get("/", async (req, res) => {
  try {
    const placeId = "ChIJu3mKd0lOqEcRb5l8dZ2N-9o";
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn("\u26A0\uFE0F Google Places API key not configured");
      return res.status(503).json({ error: "Google Reviews service not configured" });
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}&reviews_sort=newest`
    );
    if (!response.ok) {
      throw new Error(`Google API error: ${response.status}`);
    }
    const data = await response.json();
    if (data.status !== "OK") {
      throw new Error(`Google API status: ${data.status}`);
    }
    const reviews = data.result.reviews?.map((review, index2) => ({
      id: `google_${index2}`,
      name: review.author_name,
      rating: review.rating,
      date: new Date(review.time * 1e3).toISOString().split("T")[0],
      // Convert timestamp to date
      source: "Google",
      review: review.text,
      profilePhoto: review.profile_photo_url,
      relativeTime: review.relative_time_description
    })) || [];
    console.log(`\u{1F4E7} Fetched ${reviews.length} Google reviews`);
    res.json({
      reviews,
      businessInfo: {
        name: data.result.name,
        rating: data.result.rating,
        totalReviews: data.result.user_ratings_total
      }
    });
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return res.status(500).json({ error: "Failed to fetch Google reviews" });
  }
});
var google_reviews_default = router8;

// server/index.ts
config();
var app = express9();
var PORT = parseInt(process.env.PORT || "5000");
app.use((req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;
  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const logLevel = statusCode >= 400 ? "ERROR" : "INFO";
    console.log(`[${logLevel}] ${method} ${url} ${statusCode} - ${duration}ms - ${ip}`);
    if (duration > 1e3) {
      console.warn(`\u26A0\uFE0F SLOW REQUEST: ${method} ${url} took ${duration}ms`);
    }
  });
  next();
});
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") && req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
      return;
    }
    next();
  });
  app.use((req, res, next) => {
    res.set({
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'"
    });
    next();
  });
}
app.use(cors({
  origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL || true : true,
  credentials: true
}));
app.use(cookieParser());
app.use(express9.json({ limit: "10mb" }));
app.use(express9.urlencoded({ extended: true, limit: "10mb" }));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var distPath = path.join(__dirname, "../dist");
app.use(express9.static(distPath, {
  maxAge: process.env.NODE_ENV === "production" ? "1d" : 0,
  etag: false,
  lastModified: false
}));
function initializeServer() {
  app.get("/health", (req, res) => {
    const healthData = {
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      environment: process.env.NODE_ENV || "development",
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      pid: process.pid
    };
    res.json(healthData);
  });
  app.get("/ready", (req, res) => {
    res.status(200).send("Ready");
  });
  app.get("/health/db", async (req, res) => {
    try {
      await db.$client.query("SELECT 1");
      res.json({
        status: "ok",
        database: "connected",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (error) {
      console.error("Database health check failed:", error);
      res.status(503).json({
        status: "error",
        database: "disconnected",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  });
  app.use("/api/menu", menu_default);
  app.use("/api/gallery", gallery_default);
  app.use("/api/reservations", reservations_default);
  app.use("/api/events", events_default);
  app.use("/api/contact", contact_default);
  app.use("/api/feedback", feedback_default);
  app.use("/api/admin", admin_default);
  app.use("/api/google-reviews", google_reviews_default);
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/") || req.path === "/health") {
      return next();
    }
    if (req.path.includes(".")) {
      return res.status(404).send("Not found");
    }
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        console.error("Error serving index.html:", err);
        res.status(500).send("Server error");
      }
    });
  });
  app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).json({
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
    });
  });
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`\u{1F680} Express server running on port ${PORT}`);
    console.log(`\u{1F4CA} Health check: http://localhost:${PORT}/health`);
    console.log(`\u{1F310} Frontend: Serving React app from ${distPath}`);
    console.log(`\u26A1 Ready for autoscaling with graceful shutdown`);
  });
  process.on("SIGTERM", () => {
    console.log("\u{1F504} SIGTERM received, shutting down gracefully...");
    server.close(() => {
      console.log("\u2705 Process terminated");
      process.exit(0);
    });
  });
  process.on("SIGINT", () => {
    console.log("\u{1F504} SIGINT received, shutting down gracefully...");
    server.close(() => {
      console.log("\u2705 Process terminated");
      process.exit(0);
    });
  });
}
initializeServer();
var index_default = app;
export {
  index_default as default
};
