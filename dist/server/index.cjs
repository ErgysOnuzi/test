"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc4) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc4 = __getOwnPropDesc(from, key)) || desc4.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server/index.ts
var index_exports = {};
__export(index_exports, {
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_express13 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_cookie_parser = __toESM(require("cookie-parser"), 1);
var import_dotenv = require("dotenv");
var import_path2 = __toESM(require("path"), 1);
var import_url = require("url");

// server/boot-guard.ts
var REQUIRED_SECRETS = [
  "DATABASE_URL",
  "PGHOST",
  "PGPORT",
  "PGUSER",
  "PGPASSWORD",
  "PGDATABASE",
  "SESSION_SECRET",
  "JWT_SECRET",
  "ADMIN_EMAIL",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "GOOGLE_API_KEY",
  "GOOGLE_PLACES_API_KEY",
  "GOOGLE_PLACE_ID"
];
function validateEnvironment() {
  console.log("\u{1F50D} Boot Guard: Validating environment variables...");
  const missing = [];
  const present = [];
  for (const secret of REQUIRED_SECRETS) {
    if (!process.env[secret] || process.env[secret]?.trim() === "") {
      missing.push(secret);
    } else {
      present.push(secret);
    }
  }
  console.log(`\u2705 Present (${present.length}/${REQUIRED_SECRETS.length}):`, present.join(", "));
  if (missing.length > 0) {
    console.error("\u274C Boot Guard: Missing required environment variables:");
    missing.forEach((secret) => {
      console.error(`   - ${secret}`);
    });
    console.error("\n\u{1F6A8} Exiting with code 1. Please add missing secrets to Replit Secrets.");
    process.exit(1);
  }
  console.log("\u2705 Boot Guard: All required environment variables are present");
}

// server/db.ts
var import_serverless = require("@neondatabase/serverless");
var import_neon_serverless = require("drizzle-orm/neon-serverless");
var import_ws = __toESM(require("ws"), 1);

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
var import_pg_core = require("drizzle-orm/pg-core");
var import_drizzle_orm = require("drizzle-orm");
var sessions = (0, import_pg_core.pgTable)(
  "sessions",
  {
    sid: (0, import_pg_core.varchar)("sid").primaryKey(),
    sess: (0, import_pg_core.jsonb)("sess").notNull(),
    expire: (0, import_pg_core.timestamp)("expire").notNull()
  },
  (table) => [(0, import_pg_core.index)("IDX_session_expire").on(table.expire)]
);
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.varchar)("id").primaryKey().default(import_drizzle_orm.sql`gen_random_uuid()`),
  email: (0, import_pg_core.varchar)("email").unique(),
  firstName: (0, import_pg_core.varchar)("first_name"),
  lastName: (0, import_pg_core.varchar)("last_name"),
  profileImageUrl: (0, import_pg_core.varchar)("profile_image_url"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var menuItems = (0, import_pg_core.pgTable)("menu_items", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  title: (0, import_pg_core.text)("title").notNull(),
  description: (0, import_pg_core.text)("description"),
  price: (0, import_pg_core.real)("price").notNull(),
  category: (0, import_pg_core.text)("category").notNull(),
  isAvailable: (0, import_pg_core.boolean)("is_available").default(true),
  titleDe: (0, import_pg_core.text)("title_de"),
  titleEn: (0, import_pg_core.text)("title_en"),
  descriptionDe: (0, import_pg_core.text)("description_de"),
  descriptionEn: (0, import_pg_core.text)("description_en"),
  categoryDe: (0, import_pg_core.text)("category_de"),
  categoryEn: (0, import_pg_core.text)("category_en"),
  allergens: (0, import_pg_core.text)("allergens"),
  imageUrl: (0, import_pg_core.text)("image_url"),
  // Image URL for the dish
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var reservations = (0, import_pg_core.pgTable)("reservations", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  name: (0, import_pg_core.text)("name").notNull(),
  phone: (0, import_pg_core.text)("phone").notNull(),
  email: (0, import_pg_core.text)("email"),
  date: (0, import_pg_core.text)("date").notNull(),
  // Store as text to match current format
  time: (0, import_pg_core.text)("time").notNull(),
  guests: (0, import_pg_core.integer)("guests").notNull(),
  status: (0, import_pg_core.text)("status").default("pending"),
  // pending, confirmed, cancelled, completed
  notes: (0, import_pg_core.text)("notes"),
  // Additional notes for special requests
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var gallery = (0, import_pg_core.pgTable)("gallery", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  imageUrl: (0, import_pg_core.text)("image_url").notNull(),
  description: (0, import_pg_core.text)("description"),
  alt: (0, import_pg_core.text)("alt"),
  // Alt text for accessibility
  category: (0, import_pg_core.text)("category"),
  // interior, food, events, etc.
  isActive: (0, import_pg_core.boolean)("is_active").default(true),
  sortOrder: (0, import_pg_core.integer)("sort_order").default(0),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var events = (0, import_pg_core.pgTable)("events", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  title: (0, import_pg_core.text)("title").notNull(),
  description: (0, import_pg_core.text)("description"),
  titleDe: (0, import_pg_core.text)("title_de"),
  titleEn: (0, import_pg_core.text)("title_en"),
  descriptionDe: (0, import_pg_core.text)("description_de"),
  descriptionEn: (0, import_pg_core.text)("description_en"),
  date: (0, import_pg_core.text)("date"),
  // Event date
  startTime: (0, import_pg_core.text)("start_time"),
  // Event start time
  endTime: (0, import_pg_core.text)("end_time"),
  // Event end time
  capacity: (0, import_pg_core.integer)("capacity"),
  // Maximum attendees
  currentBookings: (0, import_pg_core.integer)("current_bookings").default(0),
  price: (0, import_pg_core.real)("price"),
  // Event price per person
  imageUrl: (0, import_pg_core.text)("image_url"),
  // Event promotional image
  isActive: (0, import_pg_core.boolean)("is_active").default(true),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var contactMessages = (0, import_pg_core.pgTable)("contact_messages", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  name: (0, import_pg_core.text)("name").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  phone: (0, import_pg_core.text)("phone"),
  // Optional phone number
  subject: (0, import_pg_core.text)("subject"),
  // Message subject
  message: (0, import_pg_core.text)("message").notNull(),
  status: (0, import_pg_core.text)("status").default("new"),
  // new, read, replied, archived
  priority: (0, import_pg_core.text)("priority").default("normal"),
  // low, normal, high
  reply: (0, import_pg_core.text)("reply"),
  // Admin reply to the message
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var feedbacks = (0, import_pg_core.pgTable)("feedbacks", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  name: (0, import_pg_core.text)("name").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  rating: (0, import_pg_core.integer)("rating").notNull(),
  // 1-5 stars
  comment: (0, import_pg_core.text)("comment").notNull(),
  status: (0, import_pg_core.text)("status").default("pending"),
  // pending, approved, rejected
  isPublic: (0, import_pg_core.boolean)("is_public").default(false),
  // Whether to display publicly
  reservationId: (0, import_pg_core.integer)("reservation_id"),
  // Link to reservation if applicable
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var eventBookings = (0, import_pg_core.pgTable)("event_bookings", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  eventId: (0, import_pg_core.integer)("event_id").notNull(),
  name: (0, import_pg_core.text)("name").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  phone: (0, import_pg_core.text)("phone"),
  guests: (0, import_pg_core.integer)("guests").default(1),
  totalPrice: (0, import_pg_core.real)("total_price"),
  status: (0, import_pg_core.text)("status").default("pending"),
  // pending, confirmed, cancelled
  specialRequests: (0, import_pg_core.text)("special_requests"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var adminUsers = (0, import_pg_core.pgTable)("admin_users", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  username: (0, import_pg_core.text)("username").notNull(),
  email: (0, import_pg_core.text)("email").notNull(),
  passwordHash: (0, import_pg_core.text)("password_hash").notNull(),
  role: (0, import_pg_core.text)("role").default("staff"),
  // admin, manager, staff
  isActive: (0, import_pg_core.boolean)("is_active").default(true),
  lastLogin: (0, import_pg_core.timestamp)("last_login"),
  createdAt: (0, import_pg_core.timestamp)("created_at").defaultNow(),
  updatedAt: (0, import_pg_core.timestamp)("updated_at").defaultNow()
});
var feedbacksRelations = (0, import_drizzle_orm.relations)(feedbacks, ({ one }) => ({
  reservation: one(reservations, {
    fields: [feedbacks.reservationId],
    references: [reservations.id]
  })
}));
var reservationsRelations = (0, import_drizzle_orm.relations)(reservations, ({ many }) => ({
  feedbacks: many(feedbacks)
}));
var eventsRelations = (0, import_drizzle_orm.relations)(events, ({ many }) => ({
  bookings: many(eventBookings)
}));
var eventBookingsRelations = (0, import_drizzle_orm.relations)(eventBookings, ({ one }) => ({
  event: one(events, {
    fields: [eventBookings.eventId],
    references: [events.id]
  })
}));

// server/db.ts
import_serverless.neonConfig.webSocketConstructor = import_ws.default;
if (!process.env.DATABASE_URL) {
  console.error("\u274C DATABASE_URL environment variable is missing");
  console.error("Available env vars:", Object.keys(process.env).filter((key) => key.includes("DATABASE") || key.includes("PG")));
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database? Check deployment environment variables."
  );
}
var pool = new import_serverless.Pool({ connectionString: process.env.DATABASE_URL });
var db = (0, import_neon_serverless.drizzle)({ client: pool, schema: schema_exports });

// server/routes/health.ts
var import_express = __toESM(require("express"), 1);
var import_drizzle_orm2 = require("drizzle-orm");
var router = import_express.default.Router();
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});
router.get("/ready", async (req, res) => {
  const readiness = { db: "fail" };
  try {
    await db.execute(import_drizzle_orm2.sql`SELECT 1`);
    readiness.db = "ok";
    const hasStorageConfig = process.env.STORAGE_ENDPOINT && process.env.STORAGE_ACCESS_KEY && process.env.STORAGE_SECRET_KEY && process.env.STORAGE_BUCKET;
    if (hasStorageConfig) {
      readiness.storage = "ok";
    }
    if (readiness.db === "ok") {
      res.json(readiness);
    } else {
      res.status(500).json(readiness);
    }
  } catch (error) {
    readiness.error = error instanceof Error ? error.message : "Unknown error";
    console.error("\u274C Readiness check failed:", error);
    res.status(500).json(readiness);
  }
});
router.get("/version", (req, res) => {
  const version = {
    git: process.env.GIT_SHA || "dev-build",
    builtAt: process.env.BUILD_TIMESTAMP || (/* @__PURE__ */ new Date()).toISOString()
  };
  res.json(version);
});
var health_default = router;

// server/routes/ssr.ts
var import_express2 = __toESM(require("express"), 1);

// server/ssr.tsx
var import_react25 = __toESM(require("react"), 1);
var import_server = require("react-dom/server");
var import_react_router_dom13 = require("react-router-dom");
var import_react_query = require("@tanstack/react-query");

// src/App.tsx
var import_react24 = __toESM(require("react"), 1);
var import_react_router_dom12 = require("react-router-dom");

// src/components/SimpleLayout.tsx
var import_react = __toESM(require("react"), 1);
var import_react_router_dom = require("react-router-dom");
function SimpleLayout() {
  const { locale } = (0, import_react_router_dom.useParams)();
  const location = (0, import_react_router_dom.useLocation)();
  const currentLocale = locale || "de";
  const [isMenuOpen, setIsMenuOpen] = (0, import_react.useState)(false);
  const isGerman = currentLocale === "de";
  const navigation = [
    { name: isGerman ? "Startseite" : "Home", href: "", key: "home" },
    { name: isGerman ? "Speisekarte" : "Menu", href: "menu", key: "menu" },
    { name: isGerman ? "Galerie" : "Gallery", href: "gallery", key: "gallery" },
    { name: isGerman ? "Reservierungen" : "Reservations", href: "reservations", key: "reservations" },
    { name: isGerman ? "Veranstaltungen" : "Events", href: "events", key: "events" },
    { name: isGerman ? "Kontakt" : "Contact", href: "contact", key: "contact" },
    { name: isGerman ? "Feedback" : "Feedback", href: "feedback", key: "feedback" },
    { name: isGerman ? "Rechtliches" : "Legal", href: "legal", key: "legal" },
    { name: "Blog", href: "blog", key: "blog" },
    { name: "Instagram", href: "instagram", key: "instagram" }
  ];
  const pathWithoutLocale = location.pathname.replace(`/${currentLocale}`, "") || "";
  (0, import_react.useEffect)(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: "min-h-screen flex flex-col bg-background" }, /* @__PURE__ */ import_react.default.createElement("header", { className: "bg-background/90 backdrop-blur-sm border-b sticky top-0 z-50" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center justify-between h-16" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex-shrink-0" }, /* @__PURE__ */ import_react.default.createElement(
    import_react_router_dom.Link,
    {
      to: `/${currentLocale}`,
      className: "block"
    },
    /* @__PURE__ */ import_react.default.createElement("h1", { className: "text-2xl font-serif font-bold text-primary" }, "La Cantina"),
    /* @__PURE__ */ import_react.default.createElement("p", { className: "text-xs text-foreground/70 font-script" }, "Berlin")
  )), /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react.default.createElement(
    import_react_router_dom.Link,
    {
      to: `/de${pathWithoutLocale}`,
      className: `px-2 py-1 text-sm transition-colors ${currentLocale === "de" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`
    },
    "DE"
  ), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-muted-foreground" }, "|"), /* @__PURE__ */ import_react.default.createElement(
    import_react_router_dom.Link,
    {
      to: `/en${pathWithoutLocale}`,
      className: `px-2 py-1 text-sm transition-colors ${currentLocale === "en" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`
    },
    "EN"
  )), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      onClick: () => setIsMenuOpen(!isMenuOpen),
      className: "p-2 text-foreground hover:text-primary transition-all duration-200 rounded-md hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20",
      "aria-label": isMenuOpen ? "Close navigation menu" : "Open navigation menu",
      "aria-haspopup": "menu",
      "aria-expanded": isMenuOpen,
      role: "button",
      onKeyDown: (e) => {
        if (e.key === "Escape" && isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: "relative w-6 h-6 flex flex-col justify-center items-center" }, /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: `block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : "translate-y-0"}`
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: `block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100 translate-y-1"}`
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: `block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-2"}`
      }
    ))
  ))), isMenuOpen && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: "fixed inset-0 bg-black/20 backdrop-blur-sm z-40",
      onClick: () => setIsMenuOpen(false),
      "aria-hidden": "true"
    }
  ), /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: `absolute top-full right-0 z-50 bg-background border border-border/50 shadow-xl rounded-lg min-w-64 max-w-sm w-full sm:w-auto max-h-[80vh] ${// Mobile: Full width panel with height limit
      "sm:max-w-sm"}`,
      role: "menu",
      "aria-orientation": "vertical",
      onKeyDown: (e) => {
        if (e.key === "Escape") {
          setIsMenuOpen(false);
        }
      }
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 overflow-y-auto max-h-[70vh]" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid gap-2" }, navigation.map((item) => /* @__PURE__ */ import_react.default.createElement(
      import_react_router_dom.Link,
      {
        key: item.key,
        to: `/${currentLocale}/${item.href}`,
        className: `block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${pathWithoutLocale === `/${item.href}` || item.href === "" && pathWithoutLocale === "" ? "text-primary bg-primary/10 border border-primary/20" : "text-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10"}`,
        onClick: () => setIsMenuOpen(false),
        role: "menuitem"
      },
      item.name
    )))),
    /* @__PURE__ */ import_react.default.createElement("div", { className: "p-4 border-t border-border/50 bg-background/95 backdrop-blur-sm rounded-b-lg" }, /* @__PURE__ */ import_react.default.createElement(
      import_react_router_dom.Link,
      {
        to: `/${currentLocale}/reservations`,
        onClick: () => setIsMenuOpen(false)
      },
      /* @__PURE__ */ import_react.default.createElement("button", { className: "w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-lg font-medium transition-colors" }, isGerman ? "Tisch Reservieren" : "Make Reservation")
    ))
  )))), isMenuOpen && /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: "fixed inset-0 z-30",
      onClick: () => setIsMenuOpen(false),
      "aria-hidden": "true"
    }
  ), /* @__PURE__ */ import_react.default.createElement("main", { className: "flex-1" }, /* @__PURE__ */ import_react.default.createElement(import_react_router_dom.Outlet, null)), /* @__PURE__ */ import_react.default.createElement("footer", { className: "bg-card border-t" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, /* @__PURE__ */ import_react.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8" }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h3", { className: "text-lg font-serif font-semibold text-primary mb-4" }, "La Cantina Berlin"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground mb-2" }, "Bleibtreustra\xDFe 49"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground mb-2" }, "10623 Berlin"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground" }, "Deutschland")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { className: "font-semibold mb-4" }, isGerman ? "Kontakt" : "Contact"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground mb-2" }, "+49 30 881 6562"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground" }, "info@lacantina-berlin.de")), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("h4", { className: "font-semibold mb-4" }, isGerman ? "\xD6ffnungszeiten" : "Opening Hours"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground mb-2" }, isGerman ? "Montag - Samstag: 15:00 - 23:00" : "Monday - Saturday: 15:00 - 23:00"), /* @__PURE__ */ import_react.default.createElement("p", { className: "text-muted-foreground" }, isGerman ? "Sonntag: Geschlossen" : "Sunday: Closed"))), /* @__PURE__ */ import_react.default.createElement("div", { className: "border-t mt-8 pt-8 text-center text-muted-foreground" }, /* @__PURE__ */ import_react.default.createElement("p", null, "\xA9 2025 La Cantina Berlin. ", isGerman ? "Alle Rechte vorbehalten." : "All rights reserved.")))));
}

// src/pages/HomePage.tsx
var import_react3 = __toESM(require("react"), 1);
var import_react_router_dom3 = require("react-router-dom");

// src/components/Hero.tsx
var import_react2 = __toESM(require("react"), 1);
var import_react_router_dom2 = require("react-router-dom");
function Hero() {
  const { locale } = (0, import_react_router_dom2.useParams)();
  const currentLocale = locale || "de";
  const isGerman = currentLocale === "de";
  return /* @__PURE__ */ import_react2.default.createElement("section", { className: "relative h-screen flex items-center justify-center overflow-hidden" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "absolute inset-0" }, /* @__PURE__ */ import_react2.default.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070",
      alt: "Elegant restaurant interior with warm lighting and traditional Italian atmosphere",
      className: "absolute inset-0 w-full h-full object-cover object-center"
    }
  ), /* @__PURE__ */ import_react2.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react2.default.createElement("h1", { className: "hero-title font-serif font-bold mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl" }, isGerman ? "Ristorante La Cantina Bleibtreu" : "La Cantina Berlin"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-xl md:text-2xl mb-4 font-script" }, isGerman ? "Authentische italienische K\xFCche in Berlin" : "Authentic Italian Cuisine near Ku'damm"), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto" }, isGerman ? "Erleben Sie traditionelle Aromen im Herzen Berlins. Seit M\xE4rz 2025 mit frischer Energie und unserem Motto: bleiben, genie\xDFen, verweilen." : "Experience traditional flavors in the heart of Berlin. Since March 2025 with fresh energy and our philosophy: stay, enjoy, linger."), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" }, /* @__PURE__ */ import_react2.default.createElement(import_react_router_dom2.Link, { to: `/${currentLocale}/reservations` }, /* @__PURE__ */ import_react2.default.createElement("button", { className: "px-8 py-3 text-lg border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 rounded-md font-medium" }, isGerman ? "Tisch Reservieren" : "Make Reservation")), /* @__PURE__ */ import_react2.default.createElement(import_react_router_dom2.Link, { to: `/${currentLocale}/menu` }, /* @__PURE__ */ import_react2.default.createElement("button", { className: "border-white/80 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-8 py-3 text-lg border-2 hover:border-white rounded-md font-medium transition-colors duration-200" }, isGerman ? "Speisekarte Ansehen" : "View Menu")))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-6 h-10 border-2 border-white rounded-full flex justify-center" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-1 h-3 bg-white rounded-full mt-2" }))));
}

// src/pages/HomePage.tsx
function HomePage() {
  const { locale } = (0, import_react_router_dom3.useParams)();
  const currentLocale = locale || "de";
  const isGerman = currentLocale === "de";
  return /* @__PURE__ */ import_react3.default.createElement(import_react3.default.Fragment, null, /* @__PURE__ */ import_react3.default.createElement(Hero, null), /* @__PURE__ */ import_react3.default.createElement("section", { className: "py-16 bg-background" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ import_react3.default.createElement("h2", { className: "text-3xl md:text-4xl font-serif font-bold text-foreground mb-6" }, isGerman ? "Das Original!" : "The Original!"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto" }, isGerman ? "Es gibt viele Cantinas in Berlin \u2013 aber es gibt nur ein Ristorante La Cantina Bleibtreu. Seit M\xE4rz 2025 hat unser traditionelles Restaurant ein neues Kapitel mit frischer Energie, einem neuen Team und unserer Philosophie begonnen: bleiben, genie\xDFen, verweilen." : "There are many cantinas in Berlin \u2013 but there is only one Ristorante La Cantina Bleibtreu. Since March 2025, our traditional restaurant has started a new chapter with fresh energy, a new team, and our philosophy: stay, enjoy, linger.")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-center p-6 bg-card rounded-lg border" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-4xl mb-4" }, "\u{1F35D}"), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-xl font-serif font-semibold text-foreground mb-3" }, isGerman ? "Hausgemachte Pasta" : "Homemade Pasta"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-muted-foreground" }, isGerman ? "T\xE4glich frisch zubereitete Pasta mit Leidenschaft und traditionellen italienischen Rezepten, genau wie in Italien" : "Fresh pasta prepared daily with passion and traditional Italian recipes, just like in Italy")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-center p-6 bg-card rounded-lg border" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-4xl mb-4" }, "\u{1F41F}"), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-xl font-serif font-semibold text-foreground mb-3" }, isGerman ? "Frischer Mittelmeerfisch" : "Fresh Mediterranean Fish"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-muted-foreground" }, isGerman ? "Frisch gefangener Mittelmeerfisch, zubereitet mit authentischen italienischen Techniken und feinsten Zutaten" : "Fresh-caught Mediterranean fish prepared with authentic Italian techniques and finest ingredients")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-center p-6 bg-card rounded-lg border" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-4xl mb-4" }, "\u{1F525}"), /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-xl font-serif font-semibold text-foreground mb-3" }, isGerman ? "Flambiert am Tisch" : "Tableside Flamb\xE9ed"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-muted-foreground" }, isGerman ? "Erleben Sie unser charakteristisches Rinderfilet, das direkt an Ihrem Tisch flambiert wird \u2013 f\xFCr ein unvergessliches Erlebnis" : "Experience our signature beef tenderloin flamb\xE9ed at your table for an unforgettable dining experience"))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-center bg-card rounded-lg p-8 border" }, /* @__PURE__ */ import_react3.default.createElement("h3", { className: "text-2xl font-serif font-semibold text-primary mb-4" }, isGerman ? "Unser Versprechen" : "Our Promise"), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-lg text-muted-foreground" }, isGerman ? "Ristorante La Cantina Bleibtreu ist mehr als ein Name. Es ist ein Versprechen: Wer einmal da war, kommt wieder." : "Ristorante La Cantina Bleibtreu is more than a name. It is a promise: whoever has been there once, comes back.")))));
}

// src/pages/TestPage.tsx
var import_react4 = __toESM(require("react"), 1);
function TestPage() {
  return /* @__PURE__ */ import_react4.default.createElement("div", { style: { padding: "50px", textAlign: "center" } }, /* @__PURE__ */ import_react4.default.createElement("h1", { style: { fontSize: "32px", color: "#333" } }, "\u{1F389} Vite + React Migration Successful!"), /* @__PURE__ */ import_react4.default.createElement("p", { style: { fontSize: "18px", color: "#666" } }, "La Cantina Berlin is now running on Vite + React + Express"), /* @__PURE__ */ import_react4.default.createElement("div", { style: { marginTop: "20px" } }, /* @__PURE__ */ import_react4.default.createElement("p", null, "\u2705 Frontend: Vite + React (Port 5000)"), /* @__PURE__ */ import_react4.default.createElement("p", null, "\u2705 Backend: Express API (Port 3001)"), /* @__PURE__ */ import_react4.default.createElement("p", null, "\u2705 Database: PostgreSQL with Drizzle ORM")));
}

// src/pages/MenuPage.tsx
var import_react6 = __toESM(require("react"), 1);
var import_react_router_dom4 = require("react-router-dom");

// src/i18n/translations.ts
var translations = {
  de: {
    // Navigation
    nav: {
      home: "Startseite",
      menu: "Speisekarte",
      gallery: "Galerie",
      reservations: "Reservierungen",
      events: "Veranstaltungen",
      contact: "Kontakt",
      feedback: "Feedback",
      legal: "Rechtliches",
      admin: "Admin"
    },
    // Common UI elements
    common: {
      loading: "Wird geladen...",
      error: "Fehler:",
      tryAgain: "Erneut versuchen",
      refresh: "Aktualisieren",
      submit: "Absenden",
      cancel: "Abbrechen",
      save: "Speichern",
      delete: "L\xF6schen",
      edit: "Bearbeiten",
      close: "Schlie\xDFen",
      search: "Suchen",
      filter: "Filtern",
      clearFilter: "Filter zur\xFCcksetzen",
      showMore: "Mehr anzeigen",
      showLess: "Weniger anzeigen",
      readMore: "Mehr lesen",
      seeAll: "Alle anzeigen",
      backToTop: "Nach oben"
    },
    // Pages
    pages: {
      menu: {
        title: "Speisekarte",
        loading: "Speisekarte wird geladen...",
        error: "Fehler beim Laden der Speisekarte",
        noItems: "Keine Gerichte verf\xFCgbar",
        filterByCategory: "Nach Kategorie filtern",
        allCategories: "Alle Kategorien",
        searchPlaceholder: "Gerichte suchen...",
        priceRange: "Preisbereich",
        dietaryOptions: "Ern\xE4hrungsoptionen",
        vegetarian: "Vegetarisch",
        vegan: "Vegan",
        glutenFree: "Glutenfrei",
        spicy: "Scharf"
      },
      gallery: {
        title: "Galerie",
        loading: "Bilder werden geladen...",
        error: "Fehler beim Laden der Galerie",
        noImages: "Keine Bilder verf\xFCgbar",
        categories: {
          all: "Alle",
          food: "Gerichte",
          interior: "Innenr\xE4ume",
          exterior: "Au\xDFenbereich",
          events: "Veranstaltungen",
          staff: "Team"
        }
      },
      events: {
        title: "Veranstaltungen",
        loading: "Veranstaltungen werden geladen...",
        error: "Fehler beim Laden der Veranstaltungen",
        noEvents: "Keine bevorstehenden Veranstaltungen",
        heroTitle: "Besondere Veranstaltungen",
        heroSubtitle: "Begleiten Sie uns bei exklusiven kulinarischen Erlebnissen und italienischen Kulturfesten",
        limitedSeating: "Begrenzte Pl\xE4tze",
        authenticExperiences: "Authentische Erlebnisse",
        upcomingEvents: "Bevorstehende Veranstaltungen",
        bookNow: "Jetzt buchen",
        soldOut: "Ausverkauft",
        spotsLeft: "verf\xFCgbar",
        ofSpots: "von",
        spots: "Pl\xE4tzen",
        perPerson: "pro Person",
        almostFull: "Fast ausverkauft!",
        available: "Verf\xFCgbar",
        capacity: "Kapazit\xE4t",
        beFirstToJoin: "Seien Sie der Erste!",
        reserveSpot: "Platz reservieren",
        price: "Preis",
        date: "Datum",
        time: "Uhrzeit",
        duration: "Dauer",
        attendees: "Teilnehmer"
      },
      reservations: {
        title: "Reservierung",
        subtitle: "Reservieren Sie Ihren Tisch",
        form: {
          name: "Vollst\xE4ndiger Name",
          email: "E-Mail-Adresse",
          phone: "Telefonnummer",
          date: "Datum",
          time: "Uhrzeit",
          guests: "Anzahl G\xE4ste",
          specialRequests: "Besondere W\xFCnsche",
          submit: "Reservierung senden",
          submitting: "Wird gesendet..."
        },
        validation: {
          nameRequired: "Name ist erforderlich",
          emailRequired: "E-Mail ist erforderlich",
          emailInvalid: "Ung\xFCltige E-Mail-Adresse",
          phoneRequired: "Telefonnummer ist erforderlich",
          dateRequired: "Datum ist erforderlich",
          timeRequired: "Uhrzeit ist erforderlich",
          guestsRequired: "Anzahl G\xE4ste ist erforderlich"
        },
        success: "Ihre Reservierung wurde erfolgreich gesendet!",
        error: "Fehler beim Senden der Reservierung. Bitte versuchen Sie es erneut."
      },
      contact: {
        title: "Kontakt",
        subtitle: "Kontaktieren Sie uns",
        address: "Adresse",
        phone: "Telefon",
        email: "E-Mail",
        hours: "\xD6ffnungszeiten",
        form: {
          name: "Name",
          email: "E-Mail",
          subject: "Betreff",
          message: "Nachricht",
          submit: "Nachricht senden",
          submitting: "Wird gesendet..."
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Teilen Sie Ihre Erfahrungen mit uns",
        form: {
          name: "Name",
          email: "E-Mail",
          rating: "Bewertung",
          comment: "Kommentar",
          submit: "Feedback senden"
        },
        ratings: {
          excellent: "Ausgezeichnet",
          good: "Gut",
          fair: "In Ordnung",
          poor: "Schlecht"
        }
      }
    },
    // Instagram
    instagram: {
      title: "Neueste von Instagram",
      followUs: "Folgen Sie uns f\xFCr weitere Updates",
      loadingPosts: "Beitr\xE4ge werden geladen...",
      errorLoading: "Instagram-Beitr\xE4ge konnten nicht geladen werden",
      noPosts: "Keine Instagram-Beitr\xE4ge verf\xFCgbar",
      refreshPosts: "Beitr\xE4ge aktualisieren"
    },
    // Footer
    footer: {
      hours: "\xD6ffnungszeiten",
      contact: "Kontakt",
      followUs: "Folgen Sie uns",
      quickLinks: "Schnelle Links",
      aboutUs: "\xDCber uns",
      privacyPolicy: "Datenschutz",
      termsOfService: "AGB",
      rights: "Alle Rechte vorbehalten"
    }
  },
  en: {
    // Navigation
    nav: {
      home: "Home",
      menu: "Menu",
      gallery: "Gallery",
      reservations: "Reservations",
      events: "Events",
      contact: "Contact",
      feedback: "Feedback",
      legal: "Legal",
      admin: "Admin"
    },
    // Common UI elements
    common: {
      loading: "Loading...",
      error: "Error:",
      tryAgain: "Try Again",
      refresh: "Refresh",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      search: "Search",
      filter: "Filter",
      clearFilter: "Clear Filter",
      showMore: "Show More",
      showLess: "Show Less",
      readMore: "Read More",
      seeAll: "See All",
      backToTop: "Back to Top"
    },
    // Pages
    pages: {
      menu: {
        title: "Menu",
        loading: "Loading menu items...",
        error: "Error loading menu",
        noItems: "No menu items available",
        filterByCategory: "Filter by Category",
        allCategories: "All Categories",
        searchPlaceholder: "Search dishes...",
        priceRange: "Price Range",
        dietaryOptions: "Dietary Options",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
        glutenFree: "Gluten Free",
        spicy: "Spicy"
      },
      gallery: {
        title: "Gallery",
        loading: "Loading images...",
        error: "Error loading gallery",
        noImages: "No images available",
        categories: {
          all: "All",
          food: "Food",
          interior: "Interior",
          exterior: "Exterior",
          events: "Events",
          staff: "Staff"
        }
      },
      events: {
        title: "Events",
        loading: "Loading events...",
        error: "Error loading events",
        noEvents: "No upcoming events",
        heroTitle: "Special Events",
        heroSubtitle: "Join us for exclusive culinary experiences and Italian cultural celebrations",
        limitedSeating: "Limited Seating",
        authenticExperiences: "Authentic Experiences",
        upcomingEvents: "Upcoming Events",
        bookNow: "Book Now",
        soldOut: "Sold Out",
        spotsLeft: "left",
        ofSpots: "of",
        spots: "spots",
        perPerson: "per person",
        almostFull: "Almost Full!",
        available: "Available",
        capacity: "Capacity",
        beFirstToJoin: "Be the first to join!",
        reserveSpot: "Reserve Spot",
        price: "Price",
        date: "Date",
        time: "Time",
        duration: "Duration",
        attendees: "Attendees"
      },
      reservations: {
        title: "Reservations",
        subtitle: "Reserve Your Table",
        form: {
          name: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          date: "Date",
          time: "Time",
          guests: "Number of Guests",
          specialRequests: "Special Requests",
          submit: "Submit Reservation",
          submitting: "Submitting..."
        },
        validation: {
          nameRequired: "Name is required",
          emailRequired: "Email is required",
          emailInvalid: "Invalid email address",
          phoneRequired: "Phone number is required",
          dateRequired: "Date is required",
          timeRequired: "Time is required",
          guestsRequired: "Number of guests is required"
        },
        success: "Your reservation has been submitted successfully!",
        error: "Error submitting reservation. Please try again."
      },
      contact: {
        title: "Contact",
        subtitle: "Get in Touch",
        address: "Address",
        phone: "Phone",
        email: "Email",
        hours: "Opening Hours",
        form: {
          name: "Name",
          email: "Email",
          subject: "Subject",
          message: "Message",
          submit: "Send Message",
          submitting: "Sending..."
        }
      },
      feedback: {
        title: "Feedback",
        subtitle: "Share Your Experience",
        form: {
          name: "Name",
          email: "Email",
          rating: "Rating",
          comment: "Comment",
          submit: "Submit Feedback"
        },
        ratings: {
          excellent: "Excellent",
          good: "Good",
          fair: "Fair",
          poor: "Poor"
        }
      }
    },
    // Instagram
    instagram: {
      title: "Latest from Instagram",
      followUs: "Follow us for more updates",
      loadingPosts: "Loading posts...",
      errorLoading: "Unable to load Instagram posts",
      noPosts: "No Instagram posts available",
      refreshPosts: "Refresh posts"
    },
    // Footer
    footer: {
      hours: "Opening Hours",
      contact: "Contact",
      followUs: "Follow Us",
      quickLinks: "Quick Links",
      aboutUs: "About Us",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      rights: "All rights reserved"
    }
  }
};
function getTranslation(locale, keyPath) {
  const keys = keyPath.split(".");
  let current = translations[locale] || translations.de;
  for (const key of keys) {
    current = current[key];
    if (current === void 0) {
      let fallback = translations.de;
      for (const fallbackKey of keys) {
        fallback = fallback[fallbackKey];
        if (fallback === void 0) {
          return keyPath;
        }
      }
      return fallback;
    }
  }
  return current || keyPath;
}
function useTranslation(locale) {
  return {
    t: (key) => getTranslation(locale, key),
    locale
  };
}

// src/components/MenuWithFilters.tsx
var import_react5 = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");
var translations2 = {
  en: {
    title: "Our Menu",
    available: "Available",
    unavailable: "Currently Unavailable",
    allergens: "Allergens",
    all: "All",
    food: "Food",
    drinks: "Drinks",
    allFood: "All Food",
    allDrinks: "All Drinks",
    alcoholic: "Alcoholic",
    nonAlcoholic: "Non-Alcoholic",
    appetizers: "Appetizers",
    soup: "Soup",
    salads: "Salads",
    pasta: "Pasta",
    pizza: "Pizza",
    fish: "Fish",
    meat: "Meat",
    desserts: "Desserts",
    other: "Other",
    noItems: "No items found in this category.",
    selectOther: "Please select a different category.",
    menuOverview: "Our Menu at a Glance",
    foodItems: "Food Items",
    beverages: "Beverages",
    menuDescription: "Discover our authentic Italian cuisine",
    loading: "Loading delicious items..."
  },
  de: {
    title: "Unsere Speisekarte",
    available: "Verf\xFCgbar",
    unavailable: "Derzeit nicht verf\xFCgbar",
    allergens: "Allergene",
    all: "Alles",
    food: "Speisen",
    drinks: "Getr\xE4nke",
    allFood: "Alle Speisen",
    allDrinks: "Alle Getr\xE4nke",
    alcoholic: "Alkoholisch",
    nonAlcoholic: "Alkoholfrei",
    appetizers: "Vorspeisen",
    soup: "Suppen",
    salads: "Salate",
    pasta: "Pasta",
    pizza: "Pizza",
    fish: "Fisch",
    meat: "Fleisch",
    desserts: "Desserts",
    other: "Sonstiges",
    noItems: "Keine Artikel in dieser Kategorie gefunden.",
    selectOther: "Bitte w\xE4hlen Sie eine andere Kategorie aus.",
    menuOverview: "Unsere Speisekarte im \xDCberblick",
    foodItems: "Speisen",
    beverages: "Getr\xE4nke",
    menuDescription: "Entdecken Sie unsere authentische italienische K\xFCche",
    loading: "Leckere Artikel werden geladen..."
  }
};
function MenuWithFilters({
  menuItems: menuItems2,
  locale
}) {
  const t = translations2[locale] || translations2.en;
  const mainSections = ["Food", "Drinks"];
  const [selectedSection, setSelectedSection] = (0, import_react5.useState)("Food");
  const [selectedFoodType, setSelectedFoodType] = (0, import_react5.useState)("All Food");
  const [selectedDrinkType, setSelectedDrinkType] = (0, import_react5.useState)("All Drinks");
  const [isPending, startTransition] = (0, import_react5.useTransition)();
  const [currentlyLoading, setCurrentlyLoading] = (0, import_react5.useState)("");
  const isDrink = (item) => {
    const category = (locale === "de" ? item.categoryDe || item.category : item.categoryEn || item.category).toLowerCase();
    return category.includes("bevande") || category.includes("drink") || category.includes("getr\xE4nk") || category.includes("wine") || category.includes("wein") || category.includes("beer") || category.includes("bier") || category.includes("cocktail") || category.includes("coffee") || category.includes("tea") || category.includes("kaffee") || category.includes("tee");
  };
  const isAlcoholic = (item) => {
    const category = (locale === "de" ? item.categoryDe || item.category : item.categoryEn || item.category).toLowerCase();
    const title = (locale === "de" ? item.titleDe || item.title : item.titleEn || item.title).toLowerCase();
    const description = (locale === "de" ? item.descriptionDe || item.description : item.descriptionEn || item.description).toLowerCase();
    const alcoholicKeywords = [
      "wine",
      "wein",
      "beer",
      "bier",
      "cocktail",
      "prosecco",
      "champagne",
      "whisky",
      "vodka",
      "gin",
      "rum",
      "liqueur",
      "lik\xF6r",
      "aperitif",
      "digestif"
    ];
    return alcoholicKeywords.some(
      (keyword) => category.includes(keyword) || title.includes(keyword) || description.includes(keyword)
    );
  };
  const getFoodType = (item) => {
    const category = (locale === "de" ? item.categoryDe || item.category : item.categoryEn || item.category).toLowerCase();
    const title = (locale === "de" ? item.titleDe || item.title : item.titleEn || item.title).toLowerCase();
    const description = (locale === "de" ? item.descriptionDe || item.description : item.descriptionEn || item.description).toLowerCase();
    if (category.includes("pesce") || category.includes("fish") || category.includes("fisch") || title.includes("salmon") || title.includes("lachs") || title.includes("tuna") || title.includes("thun") || title.includes("shrimp") || title.includes("garnele") || title.includes("seafood") || title.includes("meeresfr\xFCchte")) {
      return "Fish";
    }
    if (category.includes("carne") || category.includes("meat") || category.includes("fleisch") || title.includes("beef") || title.includes("rindfleisch") || title.includes("chicken") || title.includes("h\xE4hnchen") || title.includes("pork") || title.includes("schwein") || title.includes("lamb") || title.includes("lamm") || title.includes("steak") || title.includes("osso buco") || title.includes("brasato")) {
      return "Meat";
    }
    if (category.includes("pizza") || title.includes("pizza")) {
      return "Pizza";
    }
    if (category.includes("primi") || category.includes("pasta") || title.includes("spaghetti") || title.includes("tagliatelle") || title.includes("penne") || title.includes("risotto") || title.includes("gnocchi")) {
      return "Pasta";
    }
    if (category.includes("zuppa") || category.includes("soup") || category.includes("suppe") || title.includes("minestrone") || title.includes("broth") || title.includes("br\xFChe")) {
      return "Soup";
    }
    if (category.includes("antipasti") || category.includes("antipasto") || category.includes("appetizer") || category.includes("vorspeise") || title.includes("bruschetta") || title.includes("carpaccio")) {
      return "Appetizers";
    }
    if (category.includes("dolci") || category.includes("dessert") || category.includes("nachspeise") || title.includes("tiramisu") || title.includes("panna cotta") || title.includes("gelato") || title.includes("cannoli") || title.includes("semifreddo")) {
      return "Desserts";
    }
    if (category.includes("insalata") || category.includes("salad") || category.includes("salat") || title.includes("rucola") || title.includes("arugula") || title.includes("caprese")) {
      return "Salads";
    }
    return "Other";
  };
  const foodItems = menuItems2.filter((item) => !isDrink(item));
  const drinkItems = menuItems2.filter((item) => isDrink(item));
  const alcoholicDrinks = drinkItems.filter((item) => isAlcoholic(item));
  const nonAlcoholicDrinks = drinkItems.filter((item) => !isAlcoholic(item));
  const foodByType = {
    Appetizers: foodItems.filter((item) => getFoodType(item) === "Appetizers"),
    Soup: foodItems.filter((item) => getFoodType(item) === "Soup"),
    Salads: foodItems.filter((item) => getFoodType(item) === "Salads"),
    Pasta: foodItems.filter((item) => getFoodType(item) === "Pasta"),
    Pizza: foodItems.filter((item) => getFoodType(item) === "Pizza"),
    Fish: foodItems.filter((item) => getFoodType(item) === "Fish"),
    Meat: foodItems.filter((item) => getFoodType(item) === "Meat"),
    Desserts: foodItems.filter((item) => getFoodType(item) === "Desserts"),
    Other: foodItems.filter((item) => getFoodType(item) === "Other")
  };
  const availableFoodTypes = [
    "All Food",
    ...Object.keys(foodByType).filter(
      (type) => foodByType[type].length > 0
    )
  ];
  const getItemsToDisplay = () => {
    switch (selectedSection) {
      case "Food":
        if (selectedFoodType === "All Food") return foodItems;
        return foodByType[selectedFoodType] || [];
      case "Drinks":
        if (selectedDrinkType === "Alcoholic") return alcoholicDrinks;
        if (selectedDrinkType === "Non-Alcoholic") return nonAlcoholicDrinks;
        return drinkItems;
      default:
        return menuItems2;
    }
  };
  const itemsToDisplay = getItemsToDisplay();
  const getFoodIcon = (type) => {
    switch (type) {
      case "Fish":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Fish, { className: "w-4 h-4" });
      case "Meat":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Beef, { className: "w-4 h-4" });
      case "Soup":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Soup, { className: "w-4 h-4" });
      case "Pizza":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Pizza, { className: "w-4 h-4" });
      case "Desserts":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.IceCream, { className: "w-4 h-4" });
      case "Salads":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Salad, { className: "w-4 h-4" });
      case "Pasta":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.ChefHat, { className: "w-4 h-4" });
      case "Appetizers":
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Sparkles, { className: "w-4 h-4" });
      default:
        return /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Utensils, { className: "w-4 h-4" });
    }
  };
  const handleSectionChange = (section) => {
    setCurrentlyLoading(section);
    startTransition(() => {
      setSelectedSection(section);
      setSelectedFoodType("All Food");
      setSelectedDrinkType("All Drinks");
      setTimeout(() => setCurrentlyLoading(""), 150);
    });
  };
  const handleFoodTypeChange = (foodType) => {
    setCurrentlyLoading(foodType);
    startTransition(() => {
      setSelectedFoodType(foodType);
      setTimeout(() => setCurrentlyLoading(""), 150);
    });
  };
  const handleDrinkTypeChange = (drinkType) => {
    setCurrentlyLoading(drinkType);
    startTransition(() => {
      setSelectedDrinkType(drinkType);
      setTimeout(() => setCurrentlyLoading(""), 150);
    });
  };
  const LoadingSkeleton = () => /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" }, [...Array(6)].map((_, i) => /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      key: i,
      className: "bg-card rounded-3xl shadow-lg border border-border/30 p-6 animate-pulse"
    },
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-2 flex-1 pr-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-6 bg-muted rounded w-3/4" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-4 bg-muted rounded w-1/2" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-8 w-20 bg-muted rounded-full" })),
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-2 mb-4" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-4 bg-muted rounded w-full" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-4 bg-muted rounded w-2/3" })),
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-6 w-16 bg-muted rounded-full" }), /* @__PURE__ */ import_react5.default.createElement("div", { className: "h-6 w-20 bg-muted rounded-full" }))
  )));
  const renderMenuItem = (item) => {
    const title = locale === "de" ? item.titleDe || item.title : item.titleEn || item.title;
    const description = locale === "de" ? item.descriptionDe || item.description : item.descriptionEn || item.description;
    return /* @__PURE__ */ import_react5.default.createElement(
      "div",
      {
        key: item.id,
        className: "group bg-card rounded-3xl shadow-lg border border-border/30 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 hover:border-primary/20 relative overflow-hidden",
        "data-testid": `menu-item-${item.id}`
      },
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
      /* @__PURE__ */ import_react5.default.createElement("div", { className: "relative z-10" }, item.imageUrl && /* @__PURE__ */ import_react5.default.createElement("div", { className: "mb-4 relative overflow-hidden rounded-2xl" }, /* @__PURE__ */ import_react5.default.createElement(
        "img",
        {
          src: item.imageUrl,
          alt: title,
          className: "w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ), /* @__PURE__ */ import_react5.default.createElement("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "text-xl font-serif font-bold text-foreground pr-4 leading-tight group-hover:text-primary transition-colors duration-300" }, title), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-2xl font-bold text-primary bg-primary/10 px-3 py-1 rounded-full" }, "\u20AC", item.price.toFixed(2)))), description && /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground mb-4 text-sm leading-relaxed" }, description), /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-between items-center flex-wrap gap-2" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react5.default.createElement(
        "span",
        {
          className: `inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${item.isAvailable ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-100 text-red-700 border border-red-200"}`
        },
        item.isAvailable ? "\u2713 " + t.available : "\u2717 " + t.unavailable
      )), item.allergens && /* @__PURE__ */ import_react5.default.createElement("div", { className: "bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs border border-amber-200" }, /* @__PURE__ */ import_react5.default.createElement("span", { className: "font-medium" }, t.allergens, ":"), " ", item.allergens)))
    );
  };
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "min-h-screen bg-gradient-to-br from-background via-background to-primary/5" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "container mx-auto px-6 py-6" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "max-w-7xl mx-auto text-center" }, /* @__PURE__ */ import_react5.default.createElement("h1", { className: "text-5xl font-serif text-primary font-bold mb-2" }, t.title), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto" }, t.menuDescription)))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "container mx-auto px-6 py-12" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "max-w-7xl mx-auto" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-center mb-12" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "bg-card/80 backdrop-blur-sm rounded-3xl p-4 border border-border shadow-2xl" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex" }, mainSections.map((section) => /* @__PURE__ */ import_react5.default.createElement(
    "button",
    {
      key: section,
      onClick: () => handleSectionChange(section),
      disabled: isPending && currentlyLoading === section,
      className: `px-12 py-4 rounded-2xl font-bold transition-all duration-400 flex items-center gap-3 text-lg ${selectedSection === section ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-xl scale-110 transform" : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:scale-105"} ${isPending && currentlyLoading === section ? "opacity-75" : ""}`,
      "data-testid": `section-${section.toLowerCase()}`
    },
    isPending && currentlyLoading === section ? /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Loader2, { className: "w-6 h-6 animate-spin" }) : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, section === "Food" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Utensils, { className: "w-6 h-6" }), section === "Drinks" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Wine, { className: "w-6 h-6" }), section === "All" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.ChefHat, { className: "w-6 h-6" })),
    section === "Food" ? t.food : section === "Drinks" ? t.drinks : t.all
  ))))), selectedSection === "Food" && /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-center mb-12" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex flex-wrap gap-4 justify-center max-w-6xl bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/30" }, availableFoodTypes.map((foodType) => /* @__PURE__ */ import_react5.default.createElement(
    "button",
    {
      key: foodType,
      onClick: () => handleFoodTypeChange(foodType),
      disabled: isPending && currentlyLoading === foodType,
      className: `px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 text-sm ${selectedFoodType === foodType ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary" : "bg-card text-muted-foreground border border-border hover:text-foreground hover:shadow-md hover:scale-105"} ${isPending && currentlyLoading === foodType ? "opacity-75" : ""}`,
      "data-testid": `food-type-${foodType.toLowerCase().replace(/\s+/g, "-")}`
    },
    isPending && currentlyLoading === foodType ? /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Loader2, { className: "w-4 h-4 animate-spin" }) : getFoodIcon(foodType),
    t[foodType.toLowerCase().replace(/\s+/g, "")] || foodType,
    /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-xs bg-primary/20 px-2 py-0.5 rounded-full font-bold" }, foodType === "All Food" ? foodItems.length : foodByType[foodType]?.length || 0)
  )))), selectedSection === "Drinks" && /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex justify-center mb-12" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex flex-wrap gap-4 justify-center bg-card/50 backdrop-blur-sm rounded-3xl p-6 border border-border/30" }, ["All Drinks", "Alcoholic", "Non-Alcoholic"].map(
    (drinkType) => /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        key: drinkType,
        onClick: () => handleDrinkTypeChange(drinkType),
        disabled: isPending && currentlyLoading === drinkType,
        className: `px-8 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${selectedDrinkType === drinkType ? "bg-secondary text-secondary-foreground shadow-lg scale-105 border-2 border-secondary" : "bg-card text-muted-foreground border border-border hover:text-foreground hover:shadow-md hover:scale-105"} ${isPending && currentlyLoading === drinkType ? "opacity-75" : ""}`,
        "data-testid": `drink-type-${drinkType.toLowerCase().replace(/\s+/g, "-")}`
      },
      isPending && currentlyLoading === drinkType ? /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Loader2, { className: "w-5 h-5 animate-spin" }) : /* @__PURE__ */ import_react5.default.createElement(import_react5.default.Fragment, null, drinkType === "Alcoholic" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Wine, { className: "w-5 h-5" }), drinkType === "Non-Alcoholic" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Coffee, { className: "w-5 h-5" }), drinkType === "All Drinks" && /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Utensils, { className: "w-5 h-5" })),
      drinkType === "All Drinks" ? t.allDrinks : drinkType === "Alcoholic" ? t.alcoholic : t.nonAlcoholic,
      /* @__PURE__ */ import_react5.default.createElement("span", { className: "text-xs bg-primary/20 px-2 py-0.5 rounded-full font-bold" }, drinkType === "All Drinks" ? drinkItems.length : drinkType === "Alcoholic" ? alcoholicDrinks.length : nonAlcoholicDrinks.length)
    )
  ))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-12" }, isPending && currentlyLoading ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center py-8" }, /* @__PURE__ */ import_react5.default.createElement(import_lucide_react.Loader2, { className: "w-8 h-8 animate-spin text-primary mx-auto mb-4" }), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground text-lg" }, t.loading)), /* @__PURE__ */ import_react5.default.createElement(LoadingSkeleton, null)) : itemsToDisplay.length === 0 ? /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center py-24 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/30" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-8xl mb-6" }, "\u{1F37D}\uFE0F"), /* @__PURE__ */ import_react5.default.createElement("h3", { className: "text-2xl font-bold text-foreground mb-3" }, t.noItems), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground text-lg" }, t.selectOther)) : /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" }, itemsToDisplay.map(renderMenuItem))), /* @__PURE__ */ import_react5.default.createElement("div", { className: "mt-20 bg-gradient-to-r from-card/80 via-card/90 to-card/80 backdrop-blur-sm rounded-3xl p-10 border border-border/50 shadow-2xl" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center mb-10" }, /* @__PURE__ */ import_react5.default.createElement("h3", { className: "text-3xl font-serif font-bold text-foreground mb-2" }, t.menuOverview), /* @__PURE__ */ import_react5.default.createElement("div", { className: "w-24 h-1 bg-primary rounded-full mx-auto" })), /* @__PURE__ */ import_react5.default.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-8" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-primary/20 hover:scale-105 transition-transform duration-300" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-4xl mb-2" }, "\u{1F37D}\uFE0F"), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "text-4xl font-bold text-primary mb-2" }, foodItems.length), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground font-semibold" }, t.foodItems)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-3xl border border-secondary/20 hover:scale-105 transition-transform duration-300" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-4xl mb-2" }, "\u{1F964}"), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "text-4xl font-bold text-secondary mb-2" }, drinkItems.length), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground font-semibold" }, t.beverages)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border border-emerald-200 hover:scale-105 transition-transform duration-300" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-4xl mb-2" }, "\u{1F377}"), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "text-4xl font-bold text-emerald-600 mb-2" }, alcoholicDrinks.length), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground font-semibold" }, t.alcoholic)), /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl border border-blue-200 hover:scale-105 transition-transform duration-300" }, /* @__PURE__ */ import_react5.default.createElement("div", { className: "text-4xl mb-2" }, "\u2615"), /* @__PURE__ */ import_react5.default.createElement("h4", { className: "text-4xl font-bold text-blue-600 mb-2" }, nonAlcoholicDrinks.length), /* @__PURE__ */ import_react5.default.createElement("p", { className: "text-muted-foreground font-semibold" }, t.nonAlcoholic)))))));
}

// src/pages/MenuPage.tsx
function MenuPage() {
  const { locale = "de" } = (0, import_react_router_dom4.useParams)();
  const { t } = useTranslation(locale);
  const [menuItems2, setMenuItems] = (0, import_react6.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(true);
  const [error, setError] = (0, import_react6.useState)(null);
  (0, import_react6.useEffect)(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) throw new Error("Failed to fetch menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" }, /* @__PURE__ */ import_react6.default.createElement("h1", { className: "text-4xl font-serif font-bold text-foreground mb-6" }, t("pages.menu.title")), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-muted-foreground" }, t("pages.menu.loading")));
  }
  if (error) {
    return /* @__PURE__ */ import_react6.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" }, /* @__PURE__ */ import_react6.default.createElement("h1", { className: "text-4xl font-serif font-bold text-foreground mb-6" }, t("pages.menu.title")), /* @__PURE__ */ import_react6.default.createElement("p", { className: "text-destructive" }, t("common.error"), " ", error));
  }
  return /* @__PURE__ */ import_react6.default.createElement(MenuWithFilters, { menuItems: menuItems2, locale });
}

// src/pages/GalleryPage.tsx
var import_react7 = __toESM(require("react"), 1);
var import_react_router_dom5 = require("react-router-dom");
var CACHE_KEY = "la-cantina-gallery-cache";
var CACHE_DURATION = 24 * 60 * 60 * 1e3;
function GalleryPage() {
  const { locale = "de" } = (0, import_react_router_dom5.useParams)();
  const { t } = useTranslation(locale);
  const [images, setImages] = (0, import_react7.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react7.useState)(true);
  const [cachedImages, setCachedImages] = (0, import_react7.useState)(/* @__PURE__ */ new Map());
  const [showAll, setShowAll] = (0, import_react7.useState)(false);
  const isCacheValid = (0, import_react7.useCallback)((cachedAt) => {
    return Date.now() - cachedAt < CACHE_DURATION;
  }, []);
  const loadFromCache = (0, import_react7.useCallback)(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsedCache = JSON.parse(cached);
        return parsedCache.filter((img) => isCacheValid(img.cachedAt));
      }
    } catch (error) {
      console.warn("Failed to load gallery cache:", error);
    }
    return [];
  }, [isCacheValid]);
  const saveToCache = (0, import_react7.useCallback)((galleryImages) => {
    try {
      const cacheData = galleryImages.map((img) => ({
        ...img,
        cachedAt: Date.now()
      }));
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn("Failed to save gallery cache:", error);
    }
  }, []);
  const preloadImage = (0, import_react7.useCallback)((imageUrl, imageId) => {
    if (!imageUrl || cachedImages.has(imageId)) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const blobUrl = URL.createObjectURL(blob);
            setCachedImages((prev) => new Map(prev.set(imageId, blobUrl)));
          }
        }, "image/jpeg", 0.8);
      }
    };
    img.src = imageUrl;
  }, [cachedImages]);
  (0, import_react7.useEffect)(() => {
    const fetchGallery = async () => {
      const cachedGallery = loadFromCache();
      if (cachedGallery.length > 0) {
        const validImages = cachedGallery.filter((img) => img.imageUrl && img.imageUrl.trim() !== "");
        setImages(validImages);
        setIsLoading(false);
        validImages.forEach((img) => preloadImage(img.imageUrl, img.id));
        return;
      }
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const data = await response.json();
        console.log("Gallery API response:", data.length, "images");
        console.log("Sample image:", data[0]);
        const validImages = data.filter((img) => {
          const hasUrl = img.imageUrl && img.imageUrl.trim() !== "";
          if (!hasUrl) {
            console.log("Filtered out image without URL:", img);
          }
          return hasUrl;
        });
        console.log("Valid images after filtering:", validImages.length);
        setImages(validImages);
        saveToCache(validImages);
        validImages.forEach((img) => preloadImage(img.imageUrl, img.id));
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, [loadFromCache, saveToCache, preloadImage]);
  return /* @__PURE__ */ import_react7.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-center mb-16" }, /* @__PURE__ */ import_react7.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-foreground mb-6" }, t("pages.gallery.title")), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto" }, locale === "de" ? "Erleben Sie die Atmosph\xE4re von La Cantina Berlin" : "Experience the atmosphere of La Cantina Berlin")), isLoading ? /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-center text-muted-foreground" }, t("pages.gallery.loading")) : images.length === 0 ? /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-card rounded-lg border p-8" }, /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-xl font-serif font-medium text-card-foreground mb-4" }, locale === "de" ? "Galerie kommt bald" : "Gallery Coming Soon"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-muted-foreground" }, locale === "de" ? "Wir bereiten wundersch\xF6ne Fotos unserer Restaurantatmosph\xE4re, k\xF6stlichen Gerichte und authentischen italienischen Speiseerlebnis vor. Schauen Sie bald wieder vorbei!" : "We're preparing beautiful photos of our restaurant atmosphere, delicious dishes, and authentic Italian dining experience. Please check back soon to see our gallery!"))) : /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, images.slice(0, showAll ? images.length : 30).map((image) => /* @__PURE__ */ import_react7.default.createElement("div", { key: image.id, className: "bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow duration-300 group" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "relative overflow-hidden" }, /* @__PURE__ */ import_react7.default.createElement(
    "img",
    {
      src: cachedImages.get(image.id) || image.imageUrl,
      alt: image.altText || image.title,
      className: "w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300",
      loading: "lazy",
      onError: (e) => {
        e.currentTarget.style.display = "none";
      }
    }
  ), /* @__PURE__ */ import_react7.default.createElement("div", { className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" })), /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-6" }, /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-lg font-serif font-medium text-card-foreground mb-2" }, image.title), image.description && /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-sm text-muted-foreground leading-relaxed" }, image.description))))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-16 text-center" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "bg-card rounded-lg p-6 border mb-6" }, /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-muted-foreground mb-4" }, locale === "de" ? `Zeige ${Math.min(images.length, showAll ? images.length : 30)} von ${images.length} Bildern` : `Showing ${Math.min(images.length, showAll ? images.length : 30)} of ${images.length} images`), !showAll && images.length > 30 && /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => setShowAll(true),
      className: "inline-flex items-center px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
    },
    locale === "de" ? `Alle ${images.length} Fotos anzeigen` : `Show All ${images.length} Photos`,
    /* @__PURE__ */ import_react7.default.createElement("svg", { className: "ml-2 h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react7.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }))
  ), showAll && /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => setShowAll(false),
      className: "inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
    },
    locale === "de" ? "Weniger anzeigen" : "Show Less",
    /* @__PURE__ */ import_react7.default.createElement("svg", { className: "ml-2 h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react7.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 15l7-7 7 7" }))
  ))));
}

// src/pages/ReservationsPage.tsx
var import_react9 = __toESM(require("react"), 1);

// src/components/ReservationForm.tsx
var import_react8 = __toESM(require("react"), 1);
function ReservationForm() {
  const [formData, setFormData] = (0, import_react8.useState)({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: 2
  });
  const [isSubmitting, setIsSubmitting] = (0, import_react8.useState)(false);
  const [message, setMessage] = (0, import_react8.useState)("");
  const [isSuccess, setIsSuccess] = (0, import_react8.useState)(false);
  const [errors, setErrors] = (0, import_react8.useState)({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }
    if (!formData.time) {
      newErrors.time = "Time is required";
    }
    if (!formData.guests || formData.guests < 1 || formData.guests > 100) {
      newErrors.guests = "Please select a valid number of guests (1-100)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSuccess(true);
        setMessage("Thank you! Your reservation has been submitted successfully.");
        setFormData({
          name: "",
          phone: "",
          email: "",
          date: "",
          time: "",
          guests: 2
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "There was an error with your reservation. Please try again.");
      }
    } catch (error) {
      setMessage("There was an error with your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  return /* @__PURE__ */ import_react8.default.createElement("form", { onSubmit: handleSubmit, className: "space-y-6" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "name", className: "block text-sm font-medium text-foreground mb-2" }, "Name *"), /* @__PURE__ */ import_react8.default.createElement(
    "input",
    {
      type: "text",
      id: "name",
      name: "name",
      required: true,
      value: formData.name,
      onChange: handleChange,
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1`,
      placeholder: "Your full name",
      "aria-invalid": errors.name ? "true" : "false",
      "aria-describedby": errors.name ? "name-error" : void 0,
      "data-testid": "input-reservation-name"
    }
  ), errors.name && /* @__PURE__ */ import_react8.default.createElement("p", { id: "name-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.name)), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "phone", className: "block text-sm font-medium text-foreground mb-2" }, "Phone *"), /* @__PURE__ */ import_react8.default.createElement(
    "input",
    {
      type: "tel",
      id: "phone",
      name: "phone",
      required: true,
      value: formData.phone,
      onChange: handleChange,
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1`,
      placeholder: "+49 30 123 456 78",
      "aria-invalid": errors.phone ? "true" : "false",
      "aria-describedby": errors.phone ? "phone-error" : void 0,
      "data-testid": "input-reservation-phone"
    }
  ), errors.phone && /* @__PURE__ */ import_react8.default.createElement("p", { id: "phone-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.phone)), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-foreground mb-2" }, "Email *"), /* @__PURE__ */ import_react8.default.createElement(
    "input",
    {
      type: "email",
      id: "email",
      name: "email",
      required: true,
      value: formData.email,
      onChange: handleChange,
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1`,
      placeholder: "your@email.com",
      "aria-invalid": errors.email ? "true" : "false",
      "aria-describedby": errors.email ? "email-error" : void 0,
      "data-testid": "input-reservation-email"
    }
  ), errors.email && /* @__PURE__ */ import_react8.default.createElement("p", { id: "email-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.email)), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4" }, /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "date", className: "block text-sm font-medium text-foreground mb-2" }, "Date *"), /* @__PURE__ */ import_react8.default.createElement(
    "input",
    {
      type: "date",
      id: "date",
      name: "date",
      required: true,
      value: formData.date,
      onChange: handleChange,
      min: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.date ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1`,
      "aria-invalid": errors.date ? "true" : "false",
      "aria-describedby": errors.date ? "date-error" : void 0,
      "data-testid": "input-reservation-date"
    }
  ), errors.date && /* @__PURE__ */ import_react8.default.createElement("p", { id: "date-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.date)), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "time", className: "block text-sm font-medium text-foreground mb-2" }, "Time *"), /* @__PURE__ */ import_react8.default.createElement(
    "select",
    {
      id: "time",
      name: "time",
      required: true,
      value: formData.time,
      onChange: handleChange,
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.time ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 bg-background`,
      "aria-invalid": errors.time ? "true" : "false",
      "aria-describedby": errors.time ? "time-error" : void 0,
      "data-testid": "select-reservation-time"
    },
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "" }, "Select a time"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "17:00" }, "17:00 (5:00 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "17:30" }, "17:30 (5:30 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "18:00" }, "18:00 (6:00 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "18:30" }, "18:30 (6:30 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "19:00" }, "19:00 (7:00 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "19:30" }, "19:30 (7:30 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "20:00" }, "20:00 (8:00 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "20:30" }, "20:30 (8:30 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "21:00" }, "21:00 (9:00 PM)"),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: "21:30" }, "21:30 (9:30 PM)")
  ), errors.time && /* @__PURE__ */ import_react8.default.createElement("p", { id: "time-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.time)), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "guests", className: "block text-sm font-medium text-foreground mb-2" }, "Guests *"), /* @__PURE__ */ import_react8.default.createElement(
    "select",
    {
      id: "guests",
      name: "guests",
      required: true,
      value: formData.guests,
      onChange: handleChange,
      className: `w-full px-4 py-3 rounded-lg border transition-colors duration-200 ${errors.guests ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-input focus:border-primary focus:ring-primary"} focus:outline-none focus:ring-1 bg-background`,
      "aria-invalid": errors.guests ? "true" : "false",
      "aria-describedby": errors.guests ? "guests-error" : void 0,
      "data-testid": "select-reservation-guests"
    },
    Array.from({ length: 12 }, (_, i) => i + 1).map((num) => /* @__PURE__ */ import_react8.default.createElement("option", { key: num, value: num }, num, " ", num === 1 ? "person" : "people")),
    /* @__PURE__ */ import_react8.default.createElement("option", { value: 15 }, "15+ people (Large Group)")
  ), errors.guests && /* @__PURE__ */ import_react8.default.createElement("p", { id: "guests-error", className: "mt-1 text-sm text-red-600", role: "alert" }, errors.guests))), message && /* @__PURE__ */ import_react8.default.createElement("div", { className: `p-4 rounded-lg border ${isSuccess ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}` }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-start gap-2" }, isSuccess ? /* @__PURE__ */ import_react8.default.createElement("svg", { className: "w-5 h-5 text-green-600 mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react8.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })) : /* @__PURE__ */ import_react8.default.createElement("svg", { className: "w-5 h-5 text-red-600 mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react8.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-sm font-medium" }, message))), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("label", { htmlFor: "specialRequests", className: "block text-sm font-medium text-foreground mb-2" }, "Special Requests ", /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-muted-foreground" }, "(Optional)")), /* @__PURE__ */ import_react8.default.createElement(
    "textarea",
    {
      id: "specialRequests",
      name: "specialRequests",
      rows: 3,
      className: "w-full px-4 py-3 rounded-lg border border-input focus:border-primary focus:ring-primary focus:outline-none focus:ring-1 transition-colors duration-200 resize-none",
      placeholder: "Dietary restrictions, birthday celebration, specific table preferences..."
    }
  )), /* @__PURE__ */ import_react8.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting,
      className: `w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${isSubmitting ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-sm hover:shadow-md"}`,
      "data-testid": "button-submit-reservation"
    },
    /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-center gap-2" }, isSubmitting && /* @__PURE__ */ import_react8.default.createElement("svg", { className: "animate-spin -ml-1 mr-2 h-5 w-5 text-current", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react8.default.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ import_react8.default.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), isSubmitting ? "Submitting Reservation..." : "Reserve Your Table")
  ));
}

// src/pages/ReservationsPage.tsx
function ReservationsPage() {
  return /* @__PURE__ */ import_react9.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "relative bg-gradient-to-r from-primary/90 to-primary/80 text-white" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "absolute inset-0 bg-black/20" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react9.default.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold mb-6" }, "Reserve Your Table"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" }, "Experience authentic Italian cuisine in the heart of Berlin"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex flex-wrap justify-center gap-8 text-lg" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Open Daily 17:00-23:00")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Prenzlauer Berg, Berlin")))))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "order-2 lg:order-1" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "bg-card rounded-2xl border shadow-xl p-8" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "mb-8" }, /* @__PURE__ */ import_react9.default.createElement("h2", { className: "text-2xl font-serif font-bold text-card-foreground mb-4" }, "Book Your Table"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-muted-foreground" }, "Reserve your spot for an unforgettable Italian dining experience. We'll confirm your reservation within 30 minutes.")), /* @__PURE__ */ import_react9.default.createElement(ReservationForm, null))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "order-1 lg:order-2 space-y-8" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "bg-card rounded-xl border p-6" }, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-xl font-serif font-semibold text-card-foreground mb-6 flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.71a11.045 11.045 0 005.28 5.28l1.323-3.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" })), "Contact & Hours"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-4 text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-5 h-5 text-primary mt-1 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.71a11.045 11.045 0 005.28 5.28l1.323-3.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" })), /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Phone"), /* @__PURE__ */ import_react9.default.createElement("div", null, "+49 30 123 456 78"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-5 h-5 text-primary mt-1 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })), /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Address"), /* @__PURE__ */ import_react9.default.createElement("div", null, "Kastanienallee 123", /* @__PURE__ */ import_react9.default.createElement("br", null), "10119 Berlin, Germany"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-5 h-5 text-primary mt-1 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Opening Hours"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react9.default.createElement("div", null, "Monday - Thursday: 17:00 - 22:30"), /* @__PURE__ */ import_react9.default.createElement("div", null, "Friday - Saturday: 17:00 - 23:00"), /* @__PURE__ */ import_react9.default.createElement("div", null, "Sunday: 17:00 - 22:00")))))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "bg-card rounded-xl border p-6" }, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-xl font-serif font-semibold text-card-foreground mb-6 flex items-center gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-5 h-5 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" })), "What Makes Us Special"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Fresh Ingredients"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-sm" }, "Daily imported Italian ingredients and fresh pasta made in-house"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Authentic Recipes"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-sm" }, "Traditional family recipes from different regions of Italy"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Wine Selection"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-sm" }, "Curated selection of over 100 Italian wines"))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" }), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "font-medium text-card-foreground" }, "Cozy Atmosphere"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-sm" }, "Warm, intimate setting perfect for dates and family dinners"))))), /* @__PURE__ */ import_react9.default.createElement("div", { className: "bg-muted/30 rounded-xl p-6" }, /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-lg font-serif font-semibold text-foreground mb-4" }, "Reservation Policies"), /* @__PURE__ */ import_react9.default.createElement("div", { className: "space-y-3 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Reservations confirmed within 30 minutes")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Free cancellation up to 2 hours before")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Special dietary requirements accommodated")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react9.default.createElement("svg", { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react9.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })), /* @__PURE__ */ import_react9.default.createElement("span", null, "Tables held for 15 minutes past reservation time"))))))));
}

// src/pages/EventsPage.tsx
var import_react10 = __toESM(require("react"), 1);
var import_react_router_dom6 = require("react-router-dom");
var import_react_router_dom7 = require("react-router-dom");
var import_date_fns = require("date-fns");
var import_locale = require("date-fns/locale");
function EventsPage() {
  const { locale = "de" } = (0, import_react_router_dom6.useParams)();
  const { t } = useTranslation(locale);
  const [events2, setEvents] = (0, import_react10.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react10.useState)(true);
  const [error, setError] = (0, import_react10.useState)(null);
  (0, import_react10.useEffect)(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);
  const getEventIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("wine") || lowerTitle.includes("vino")) {
      return /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }));
    }
    if (lowerTitle.includes("pasta") || lowerTitle.includes("cooking") || lowerTitle.includes("chef")) {
      return /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" }));
    }
    return /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }));
  };
  if (isLoading) {
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-foreground mb-6" }, t("pages.events.title")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-center gap-2 text-muted-foreground" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "animate-spin h-5 w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ import_react10.default.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ import_react10.default.createElement("span", null, t("pages.events.loading")))));
  }
  if (error) {
    return /* @__PURE__ */ import_react10.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-foreground mb-6" }, t("pages.events.title")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2 text-red-800" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react10.default.createElement("span", { className: "font-medium" }, t("pages.events.error"), ": ", error)))));
  }
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "relative bg-gradient-to-r from-primary/90 to-primary/80 text-white" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "absolute inset-0 bg-black/20" }), /* @__PURE__ */ import_react10.default.createElement("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold mb-6" }, t("pages.events.heroTitle")), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed" }, t("pages.events.heroSubtitle")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap justify-center gap-8 text-lg" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" })), /* @__PURE__ */ import_react10.default.createElement("span", null, t("pages.events.limitedSeating"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" })), /* @__PURE__ */ import_react10.default.createElement("span", null, t("pages.events.authenticExperiences"))))))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, events2.length > 0 ? /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "mb-16" }, /* @__PURE__ */ import_react10.default.createElement("h2", { className: "text-3xl font-serif font-bold text-center text-foreground mb-12" }, t("pages.events.upcomingEvents")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, events2.map((event) => {
    const eventDate = new Date(event.event_date);
    const availableSpots = event.max_attendees - event.current_attendees;
    const isNearlyFull = availableSpots <= 3;
    return /* @__PURE__ */ import_react10.default.createElement(
      "div",
      {
        key: event.id,
        className: "bg-card rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      },
      /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-8" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-start gap-4 mb-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-primary/10 rounded-full p-3 group-hover:bg-primary/20 transition-colors duration-300" }, getEventIcon(event.title_en)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ import_react10.default.createElement("h3", { className: "text-2xl font-serif font-bold text-card-foreground mb-2" }, locale === "de" ? event.title_de : event.title_en), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-4 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" })), /* @__PURE__ */ import_react10.default.createElement("span", null, (0, import_date_fns.format)(eventDate, "PPP", { locale: locale === "de" ? import_locale.de : import_locale.enUS }))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react10.default.createElement("span", null, (0, import_date_fns.format)(eventDate, "p", { locale: locale === "de" ? import_locale.de : import_locale.enUS })))))), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-muted-foreground leading-relaxed mb-6" }, locale === "de" ? event.description_de : event.description_en), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-6 mb-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-2xl font-bold text-primary" }, "\u20AC", event.price), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-sm text-muted-foreground" }, t("pages.events.perPerson"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-lg font-semibold text-card-foreground" }, availableSpots, " ", t("pages.events.spotsLeft")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-sm text-muted-foreground" }, t("pages.events.ofSpots"), " ", event.max_attendees, " ", t("pages.events.spots")))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2" }, availableSpots === 0 ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium" }, t("pages.events.soldOut")) : isNearlyFull ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium" }, t("pages.events.almostFull")) : /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium" }, t("pages.events.available")))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex justify-between text-sm text-muted-foreground" }, /* @__PURE__ */ import_react10.default.createElement("span", null, "Capacity"), /* @__PURE__ */ import_react10.default.createElement("span", null, event.current_attendees, "/", event.max_attendees)), /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-full bg-gray-200 rounded-full h-2" }, /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          className: `h-2 rounded-full transition-all duration-300 ${availableSpots === 0 ? "bg-red-500" : isNearlyFull ? "bg-amber-500" : "bg-green-500"}`,
          style: { width: `${event.current_attendees / event.max_attendees * 100}%` }
        }
      )))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex -space-x-2" }, Array.from({ length: Math.min(event.current_attendees, 5) }).map((_, i) => /* @__PURE__ */ import_react10.default.createElement(
        "div",
        {
          key: i,
          className: "w-8 h-8 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center text-xs font-medium text-primary"
        },
        String.fromCharCode(65 + i)
      )), event.current_attendees > 5 && /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-8 h-8 rounded-full bg-gray-100 border-2 border-background flex items-center justify-center text-xs font-medium text-gray-600" }, "+", event.current_attendees - 5), event.current_attendees === 0 && /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-sm text-muted-foreground italic" }, t("pages.events.beFirstToJoin"))), /* @__PURE__ */ import_react10.default.createElement(
        import_react_router_dom7.Link,
        {
          to: `/events/${event.id}`,
          className: `px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md text-center min-w-[140px] ${availableSpots === 0 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"}`,
          onClick: (e) => availableSpots === 0 && e.preventDefault()
        },
        availableSpots === 0 ? t("pages.events.soldOut") : t("pages.events.reserveSpot")
      )))
    );
  }))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-muted/30 rounded-2xl p-8" }, /* @__PURE__ */ import_react10.default.createElement("h3", { className: "text-xl font-serif font-semibold text-center text-foreground mb-8" }, "What to Expect at Our Events"), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }))), /* @__PURE__ */ import_react10.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, "Expert Guidance"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Learn from our experienced Italian chefs and wine experts")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }))), /* @__PURE__ */ import_react10.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, "Small Groups"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Intimate experiences with personalized attention")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-8 h-8 text-primary", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }))), /* @__PURE__ */ import_react10.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, "Authentic Experience"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-sm text-muted-foreground" }, "Traditional techniques and genuine Italian hospitality"))))) : /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-center py-16" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "bg-card rounded-2xl border p-12 max-w-md mx-auto" }, /* @__PURE__ */ import_react10.default.createElement("svg", { className: "w-16 h-16 text-muted-foreground mx-auto mb-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react10.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" })), /* @__PURE__ */ import_react10.default.createElement("h3", { className: "text-xl font-serif font-medium text-card-foreground mb-4" }, "No Events Scheduled"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-muted-foreground mb-6" }, "We're planning exciting new events! Check back soon for wine tastings, cooking classes, and special celebrations."), /* @__PURE__ */ import_react10.default.createElement("button", { className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200" }, "Get Notified")))));
}

// src/pages/EventDetailPage.tsx
var import_react11 = __toESM(require("react"), 1);
var import_react_router_dom8 = require("react-router-dom");
var import_date_fns2 = require("date-fns");
function EventDetailPage() {
  const { id } = (0, import_react_router_dom8.useParams)();
  const [event, setEvent] = (0, import_react11.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react11.useState)(true);
  const [error, setError] = (0, import_react11.useState)(null);
  const [showBookingForm, setShowBookingForm] = (0, import_react11.useState)(false);
  const [isBooking, setIsBooking] = (0, import_react11.useState)(false);
  const [bookingSuccess, setBookingSuccess] = (0, import_react11.useState)(false);
  const [bookingError, setBookingError] = (0, import_react11.useState)(null);
  const [bookingForm, setBookingForm] = (0, import_react11.useState)({
    name: "",
    email: "",
    phone: "",
    guests: 1,
    specialRequests: ""
  });
  (0, import_react11.useEffect)(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvent();
  }, [id]);
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsBooking(true);
    setBookingError(null);
    try {
      const response = await fetch(`/api/events/${id}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...bookingForm,
          eventId: id
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book event");
      }
      setBookingSuccess(true);
      setShowBookingForm(false);
      const eventResponse = await fetch(`/api/events/${id}`);
      if (eventResponse.ok) {
        const updatedEvent = await eventResponse.json();
        setEvent(updatedEvent);
      }
    } catch (err) {
      setBookingError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setIsBooking(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: name === "guests" ? parseInt(value) : value
    }));
  };
  const availableSpots = event ? event.max_attendees - event.current_attendees : 0;
  const isEventFull = availableSpots <= 0;
  if (isLoading) {
    return /* @__PURE__ */ import_react11.default.createElement("div", { style: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px 16px 32px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    } }, /* @__PURE__ */ import_react11.default.createElement("p", null, "Loading event..."));
  }
  if (error || !event) {
    return /* @__PURE__ */ import_react11.default.createElement("div", { style: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px 16px 32px",
      fontFamily: "Arial, sans-serif",
      textAlign: "center"
    } }, /* @__PURE__ */ import_react11.default.createElement("h1", { style: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#111827",
      margin: "0"
    } }, "Event Not Found"), error && /* @__PURE__ */ import_react11.default.createElement("p", { style: { color: "red", marginTop: "16px" } }, "Error: ", error));
  }
  return /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px 16px 32px",
    fontFamily: "Arial, sans-serif"
  } }, /* @__PURE__ */ import_react11.default.createElement("div", { style: { maxWidth: "768px", margin: "0 auto" } }, /* @__PURE__ */ import_react11.default.createElement("h1", { style: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "24px",
    margin: "0 0 24px 0"
  } }, event.title_en), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "32px"
  } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: {
    fontSize: "18px",
    color: "#374151",
    marginBottom: "24px",
    margin: "0 0 24px 0",
    lineHeight: "1.6"
  } }, event.description_en), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "24px"
  } }, /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("h3", { style: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#111827",
    margin: "0 0 8px 0"
  } }, "Event Details"), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#4B5563"
  } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ import_react11.default.createElement("strong", null, "Date:"), " ", (0, import_date_fns2.format)(new Date(event.event_date), "PPP")), /* @__PURE__ */ import_react11.default.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ import_react11.default.createElement("strong", null, "Price:"), " \u20AC", event.price), /* @__PURE__ */ import_react11.default.createElement("p", { style: { margin: 0 } }, /* @__PURE__ */ import_react11.default.createElement("strong", null, "Availability:"), " ", event.current_attendees, "/", event.max_attendees, " attendees"))))), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "32px"
  } }, /* @__PURE__ */ import_react11.default.createElement("h3", { style: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#111827",
    margin: "0 0 16px 0"
  } }, "Book Your Spot"), bookingSuccess && /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    backgroundColor: "#D1FAE5",
    border: "1px solid #A7F3D0",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px"
  } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: {
    color: "#065F46",
    margin: 0,
    fontWeight: "500"
  } }, "\u{1F4DD} Booking submitted successfully! Your reservation is pending confirmation by our staff. You will receive a confirmation email once approved.")), isEventFull ? /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: {
    color: "#B91C1C",
    margin: 0,
    fontSize: "16px",
    fontWeight: "500"
  } }, "Sorry, this event is fully booked.")) : !showBookingForm ? /* @__PURE__ */ import_react11.default.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: {
    color: "#059669",
    marginBottom: "16px",
    margin: "0 0 16px 0",
    fontSize: "16px",
    fontWeight: "500"
  } }, availableSpots, " spots remaining"), /* @__PURE__ */ import_react11.default.createElement(
    "button",
    {
      onClick: () => setShowBookingForm(true),
      style: {
        backgroundColor: "#C2410C",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "background-color 0.2s"
      },
      onMouseOver: (e) => e.currentTarget.style.backgroundColor = "#9A3412",
      onMouseOut: (e) => e.currentTarget.style.backgroundColor = "#C2410C"
    },
    "Book Now - \u20AC",
    event.price
  )) : /* @__PURE__ */ import_react11.default.createElement("form", { onSubmit: handleBookingSubmit }, bookingError && /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "16px"
  } }, /* @__PURE__ */ import_react11.default.createElement("p", { style: { color: "#B91C1C", margin: 0 } }, bookingError)), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "16px"
  } }, /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("label", { style: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#374151"
  } }, "Full Name *"), /* @__PURE__ */ import_react11.default.createElement(
    "input",
    {
      type: "text",
      name: "name",
      value: bookingForm.name,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px",
        boxSizing: "border-box"
      }
    }
  )), /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("label", { style: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#374151"
  } }, "Email *"), /* @__PURE__ */ import_react11.default.createElement(
    "input",
    {
      type: "email",
      name: "email",
      value: bookingForm.email,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px",
        boxSizing: "border-box"
      }
    }
  )), /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("label", { style: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#374151"
  } }, "Phone *"), /* @__PURE__ */ import_react11.default.createElement(
    "input",
    {
      type: "tel",
      name: "phone",
      value: bookingForm.phone,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px",
        boxSizing: "border-box"
      }
    }
  )), /* @__PURE__ */ import_react11.default.createElement("div", null, /* @__PURE__ */ import_react11.default.createElement("label", { style: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#374151"
  } }, "Number of Guests *"), /* @__PURE__ */ import_react11.default.createElement(
    "select",
    {
      name: "guests",
      value: bookingForm.guests,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px",
        boxSizing: "border-box"
      }
    },
    Array.from({ length: Math.min(availableSpots, 8) }, (_, i) => /* @__PURE__ */ import_react11.default.createElement("option", { key: i + 1, value: i + 1 }, i + 1, " ", i === 0 ? "person" : "people"))
  ))), /* @__PURE__ */ import_react11.default.createElement("div", { style: { marginBottom: "24px" } }, /* @__PURE__ */ import_react11.default.createElement("label", { style: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "500",
    color: "#374151"
  } }, "Special Requests"), /* @__PURE__ */ import_react11.default.createElement(
    "textarea",
    {
      name: "specialRequests",
      value: bookingForm.specialRequests,
      onChange: handleInputChange,
      rows: 3,
      placeholder: "Any dietary restrictions, allergies, or special requests...",
      style: {
        width: "100%",
        padding: "12px",
        border: "1px solid #D1D5DB",
        borderRadius: "6px",
        fontSize: "16px",
        resize: "vertical",
        boxSizing: "border-box"
      }
    }
  )), /* @__PURE__ */ import_react11.default.createElement("div", { style: {
    display: "flex",
    gap: "12px",
    justifyContent: "flex-end",
    flexWrap: "wrap"
  } }, /* @__PURE__ */ import_react11.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowBookingForm(false),
      style: {
        backgroundColor: "#F3F4F6",
        color: "#374151",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer"
      }
    },
    "Cancel"
  ), /* @__PURE__ */ import_react11.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isBooking,
      style: {
        backgroundColor: isBooking ? "#9CA3AF" : "#C2410C",
        color: "white",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: isBooking ? "not-allowed" : "pointer"
      }
    },
    isBooking ? "Booking..." : `Confirm Booking - \u20AC${event.price * bookingForm.guests}`
  ))))));
}

// src/pages/ContactPage.tsx
var import_react13 = __toESM(require("react"), 1);

// src/components/ContactForm.tsx
var import_react12 = __toESM(require("react"), 1);
function ContactForm() {
  const [formData, setFormData] = (0, import_react12.useState)({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = (0, import_react12.useState)(false);
  const [message, setMessage] = (0, import_react12.useState)("");
  const [errors, setErrors] = (0, import_react12.useState)({});
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters long";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage("Thank you! Your message has been sent successfully.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "There was an error sending your message. Please try again.");
      }
    } catch (error) {
      setMessage("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  return /* @__PURE__ */ import_react12.default.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "24px", fontFamily: "Arial, sans-serif" } }, /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement(
    "label",
    {
      htmlFor: "name",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        marginBottom: "8px"
      }
    },
    "Name *"
  ), /* @__PURE__ */ import_react12.default.createElement(
    "input",
    {
      type: "text",
      id: "name",
      name: "name",
      required: true,
      value: formData.name,
      onChange: handleChange,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: `1px solid ${errors.name ? "#dc2626" : "#d1d5db"}`,
        borderRadius: "6px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        color: "#111827",
        outline: "none",
        transition: "border-color 0.2s"
      },
      onFocus: (e) => e.target.style.borderColor = "#2563eb",
      onBlur: (e) => e.target.style.borderColor = errors.name ? "#dc2626" : "#d1d5db",
      "aria-invalid": errors.name ? "true" : "false",
      "aria-describedby": errors.name ? "name-error" : void 0,
      "data-testid": "input-contact-name"
    }
  ), errors.name && /* @__PURE__ */ import_react12.default.createElement(
    "p",
    {
      id: "name-error",
      style: {
        color: "#dc2626",
        fontSize: "14px",
        marginTop: "4px"
      },
      role: "alert"
    },
    errors.name
  )), /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement(
    "label",
    {
      htmlFor: "email",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        marginBottom: "8px"
      }
    },
    "Email *"
  ), /* @__PURE__ */ import_react12.default.createElement(
    "input",
    {
      type: "email",
      id: "email",
      name: "email",
      required: true,
      value: formData.email,
      onChange: handleChange,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: `1px solid ${errors.email ? "#dc2626" : "#d1d5db"}`,
        borderRadius: "6px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        color: "#111827",
        outline: "none",
        transition: "border-color 0.2s"
      },
      onFocus: (e) => e.target.style.borderColor = "#2563eb",
      onBlur: (e) => e.target.style.borderColor = errors.email ? "#dc2626" : "#d1d5db",
      "aria-invalid": errors.email ? "true" : "false",
      "aria-describedby": errors.email ? "email-error" : void 0,
      "data-testid": "input-contact-email"
    }
  ), errors.email && /* @__PURE__ */ import_react12.default.createElement(
    "p",
    {
      id: "email-error",
      style: {
        color: "#dc2626",
        fontSize: "14px",
        marginTop: "4px"
      },
      role: "alert"
    },
    errors.email
  )), /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement(
    "label",
    {
      htmlFor: "subject",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        marginBottom: "8px"
      }
    },
    "Subject *"
  ), /* @__PURE__ */ import_react12.default.createElement(
    "input",
    {
      type: "text",
      id: "subject",
      name: "subject",
      required: true,
      value: formData.subject,
      onChange: handleChange,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: `1px solid ${errors.subject ? "#dc2626" : "#d1d5db"}`,
        borderRadius: "6px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        color: "#111827",
        outline: "none",
        transition: "border-color 0.2s"
      },
      onFocus: (e) => e.target.style.borderColor = "#2563eb",
      onBlur: (e) => e.target.style.borderColor = errors.subject ? "#dc2626" : "#d1d5db",
      "aria-invalid": errors.subject ? "true" : "false",
      "aria-describedby": errors.subject ? "subject-error" : void 0,
      "data-testid": "input-contact-subject"
    }
  ), errors.subject && /* @__PURE__ */ import_react12.default.createElement(
    "p",
    {
      id: "subject-error",
      style: {
        color: "#dc2626",
        fontSize: "14px",
        marginTop: "4px"
      },
      role: "alert"
    },
    errors.subject
  )), /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement(
    "label",
    {
      htmlFor: "message",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#111827",
        marginBottom: "8px"
      }
    },
    "Message *"
  ), /* @__PURE__ */ import_react12.default.createElement(
    "textarea",
    {
      id: "message",
      name: "message",
      required: true,
      rows: 5,
      value: formData.message,
      onChange: handleChange,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: `1px solid ${errors.message ? "#dc2626" : "#d1d5db"}`,
        borderRadius: "6px",
        fontSize: "16px",
        backgroundColor: "#ffffff",
        color: "#111827",
        outline: "none",
        transition: "border-color 0.2s",
        resize: "vertical"
      },
      onFocus: (e) => e.target.style.borderColor = "#2563eb",
      onBlur: (e) => e.target.style.borderColor = errors.message ? "#dc2626" : "#d1d5db",
      "aria-invalid": errors.message ? "true" : "false",
      "aria-describedby": errors.message ? "message-error" : void 0,
      "data-testid": "textarea-contact-message"
    }
  ), errors.message && /* @__PURE__ */ import_react12.default.createElement(
    "p",
    {
      id: "message-error",
      style: {
        color: "#dc2626",
        fontSize: "14px",
        marginTop: "4px"
      },
      role: "alert"
    },
    errors.message
  )), message && /* @__PURE__ */ import_react12.default.createElement(
    "div",
    {
      style: {
        padding: "16px",
        borderRadius: "6px",
        backgroundColor: message === "Thank you! Your message has been sent successfully." ? "#dcfce7" : "#fef2f2",
        color: message === "Thank you! Your message has been sent successfully." ? "#166534" : "#dc2626",
        border: `1px solid ${message === "Thank you! Your message has been sent successfully." ? "#bbf7d0" : "#fecaca"}`
      }
    },
    message
  ), /* @__PURE__ */ import_react12.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting,
      style: {
        width: "100%",
        backgroundColor: isSubmitting ? "#6b7280" : "#2563eb",
        color: "#ffffff",
        padding: "16px 32px",
        borderRadius: "6px",
        border: "none",
        fontSize: "18px",
        fontWeight: "600",
        cursor: isSubmitting ? "not-allowed" : "pointer",
        transition: "background-color 0.2s",
        opacity: isSubmitting ? 0.6 : 1
      },
      onMouseOver: (e) => {
        if (!isSubmitting) e.target.style.backgroundColor = "#1d4ed8";
      },
      onMouseOut: (e) => {
        if (!isSubmitting) e.target.style.backgroundColor = "#2563eb";
      },
      "data-testid": "button-submit-contact"
    },
    isSubmitting ? "Sending..." : "Send Message"
  ));
}

// src/pages/ContactPage.tsx
function ContactPage() {
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-16" }, /* @__PURE__ */ import_react13.default.createElement("div", null, /* @__PURE__ */ import_react13.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-foreground mb-12" }, "Contact Us"), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "bg-card rounded-lg p-6 border" }, /* @__PURE__ */ import_react13.default.createElement("h3", { className: "text-xl font-serif font-semibold text-primary mb-3" }, "Address"), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-muted-foreground leading-relaxed" }, "Bleibtreustra\xDFe 49", /* @__PURE__ */ import_react13.default.createElement("br", null), "10623 Berlin", /* @__PURE__ */ import_react13.default.createElement("br", null), "Deutschland")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "bg-card rounded-lg p-6 border" }, /* @__PURE__ */ import_react13.default.createElement("h3", { className: "text-xl font-serif font-semibold text-primary mb-3" }, "Phone"), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-muted-foreground" }, "+49 30 881 6562")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "bg-card rounded-lg p-6 border" }, /* @__PURE__ */ import_react13.default.createElement("h3", { className: "text-xl font-serif font-semibold text-primary mb-3" }, "Email"), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-muted-foreground" }, "info@lacantina-berlin.de")))), /* @__PURE__ */ import_react13.default.createElement("div", null, /* @__PURE__ */ import_react13.default.createElement(ContactForm, null))));
}

// src/pages/FeedbackPage.tsx
var import_react14 = __toESM(require("react"), 1);
var sampleReviews = [
  {
    id: 1,
    name: "Maria Schmidt",
    rating: 5,
    date: "2025-09-20",
    source: "Google",
    review: "Absolutely fantastic! The pasta was handmade and the tiramisu was the best I've ever had. Chef Antonio is a master of his craft. Will definitely be back!"
  },
  {
    id: 2,
    name: "Thomas Weber",
    rating: 5,
    date: "2025-09-18",
    source: "Website",
    review: "Amazing Italian experience in the heart of Berlin. The wine selection is outstanding and the atmosphere feels like you're dining in Italy. Highly recommended!"
  },
  {
    id: 3,
    name: "Elena Rossi",
    rating: 5,
    date: "2025-09-15",
    source: "Google",
    review: "La Cantina Berlin exceeded all expectations. Fresh ingredients, authentic flavors, and exceptional service. The risotto alle vongole was perfection!"
  },
  {
    id: 4,
    name: "Hans Mueller",
    rating: 4,
    date: "2025-09-12",
    source: "Website",
    review: "Great food and lovely ambiance. The osso buco was tender and flavorful. Only minor wait for our table but totally worth it. A true Italian gem!"
  },
  {
    id: 5,
    name: "Sophie Dubois",
    rating: 5,
    date: "2025-09-10",
    source: "Google",
    review: "Incredible dining experience! Every dish was a work of art. The staff was knowledgeable about wine pairings. This is now our favorite restaurant in Berlin."
  },
  {
    id: 6,
    name: "Andrea Bianchi",
    rating: 5,
    date: "2025-09-08",
    source: "Website",
    review: "Finally, authentic Italian cuisine in Berlin! As an Italian living here, I can confirm this is the real deal. Grazie mille for bringing Italy to our city!"
  }
];
function FeedbackPage() {
  const [formData, setFormData] = (0, import_react14.useState)({
    name: "",
    email: "",
    rating: 5,
    experience: "",
    suggestions: ""
  });
  const [isSubmitting, setIsSubmitting] = (0, import_react14.useState)(false);
  const [message, setMessage] = (0, import_react14.useState)("");
  const [showAllReviews, setShowAllReviews] = (0, import_react14.useState)(false);
  const [googleReviews, setGoogleReviews] = (0, import_react14.useState)([]);
  const [businessInfo, setBusinessInfo] = (0, import_react14.useState)(null);
  const [isLoadingReviews, setIsLoadingReviews] = (0, import_react14.useState)(true);
  (0, import_react14.useEffect)(() => {
    const fetchGoogleReviews = async () => {
      try {
        const response = await fetch("/api/google-reviews");
        if (response.ok) {
          const data = await response.json();
          setGoogleReviews(data.reviews || []);
          setBusinessInfo(data.businessInfo || null);
        } else {
          console.warn("Failed to fetch Google reviews, using sample data");
          setGoogleReviews(sampleReviews);
        }
      } catch (error) {
        console.warn("Error fetching Google reviews, using sample data:", error);
        setGoogleReviews(sampleReviews);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    fetchGoogleReviews();
  }, []);
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ import_react14.default.createElement(
      "svg",
      {
        key: i,
        className: `w-5 h-5 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`,
        viewBox: "0 0 20 20"
      },
      /* @__PURE__ */ import_react14.default.createElement("path", { d: "M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" })
    ));
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? parseInt(value) : value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setMessage("Thank you for your feedback! We appreciate your input.");
        setFormData({
          name: "",
          email: "",
          rating: 5,
          experience: "",
          suggestions: ""
        });
      } else {
        setMessage("Sorry, there was an error submitting your feedback. Please try again.");
      }
    } catch (error) {
      setMessage("Sorry, there was an error submitting your feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const displayedReviews = showAllReviews ? sampleReviews : sampleReviews.slice(0, 3);
  const avgRating = sampleReviews.reduce((sum, review) => sum + review.rating, 0) / sampleReviews.length;
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "bg-gradient-to-r from-primary/90 to-primary/80 text-white py-16" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, /* @__PURE__ */ import_react14.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold mb-6" }, "Customer Reviews & Feedback"), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto" }, "Your opinion matters to us. Share your La Cantina Berlin experience."), /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center justify-center gap-4 text-lg" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center" }, renderStars(Math.round(avgRating))), /* @__PURE__ */ import_react14.default.createElement("span", { className: "font-semibold" }, avgRating.toFixed(1), " stars")), /* @__PURE__ */ import_react14.default.createElement("div", { className: "w-px h-6 bg-white/30" }), /* @__PURE__ */ import_react14.default.createElement("span", null, sampleReviews.length, " reviews")))), /* @__PURE__ */ import_react14.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "mb-16" }, /* @__PURE__ */ import_react14.default.createElement("h2", { className: "text-3xl font-serif font-bold text-center text-foreground mb-12" }, "What Our Customers Say"), /* @__PURE__ */ import_react14.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" }, displayedReviews.map((review) => /* @__PURE__ */ import_react14.default.createElement(
    "div",
    {
      key: review.id,
      className: "bg-card rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
    },
    /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-2" }, renderStars(review.rating)), /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-2 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react14.default.createElement("span", { className: `px-2 py-1 rounded-full text-xs font-medium ${review.source === "Google" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}` }, review.source))),
    /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-muted-foreground mb-4 leading-relaxed" }, '"', review.review, '"'),
    /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center justify-between text-sm" }, /* @__PURE__ */ import_react14.default.createElement("span", { className: "font-medium text-card-foreground" }, review.name), /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-muted-foreground" }, new Date(review.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })))
  ))), !showAllReviews && sampleReviews.length > 3 && /* @__PURE__ */ import_react14.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react14.default.createElement(
    "button",
    {
      onClick: () => setShowAllReviews(true),
      className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
    },
    "Show All ",
    sampleReviews.length,
    " Reviews"
  ))), /* @__PURE__ */ import_react14.default.createElement("div", { className: "bg-card rounded-2xl border p-8 shadow-sm" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "text-center mb-8" }, /* @__PURE__ */ import_react14.default.createElement("h3", { className: "text-2xl font-serif font-bold text-card-foreground mb-4" }, "Share Your Experience"), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-muted-foreground" }, "Help us continue delivering exceptional Italian dining experiences")), /* @__PURE__ */ import_react14.default.createElement("form", { onSubmit: handleSubmit, className: "space-y-6 max-w-2xl mx-auto" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("label", { className: "block text-sm font-semibold text-card-foreground mb-2" }, "Name *"), /* @__PURE__ */ import_react14.default.createElement(
    "input",
    {
      type: "text",
      name: "name",
      value: formData.name,
      onChange: handleInputChange,
      required: true,
      className: "w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200",
      placeholder: "Your full name"
    }
  )), /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("label", { className: "block text-sm font-semibold text-card-foreground mb-2" }, "Email *"), /* @__PURE__ */ import_react14.default.createElement(
    "input",
    {
      type: "email",
      name: "email",
      value: formData.email,
      onChange: handleInputChange,
      required: true,
      className: "w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200",
      placeholder: "your.email@example.com"
    }
  ))), /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("label", { className: "block text-sm font-semibold text-card-foreground mb-2" }, "Overall Rating *"), /* @__PURE__ */ import_react14.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react14.default.createElement(
    "select",
    {
      name: "rating",
      value: formData.rating,
      onChange: handleInputChange,
      className: "w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 appearance-none bg-background"
    },
    /* @__PURE__ */ import_react14.default.createElement("option", { value: 5 }, "\u2B50\u2B50\u2B50\u2B50\u2B50 Excellent (5 stars)"),
    /* @__PURE__ */ import_react14.default.createElement("option", { value: 4 }, "\u2B50\u2B50\u2B50\u2B50 Very Good (4 stars)"),
    /* @__PURE__ */ import_react14.default.createElement("option", { value: 3 }, "\u2B50\u2B50\u2B50 Good (3 stars)"),
    /* @__PURE__ */ import_react14.default.createElement("option", { value: 2 }, "\u2B50\u2B50 Fair (2 stars)"),
    /* @__PURE__ */ import_react14.default.createElement("option", { value: 1 }, "\u2B50 Needs Improvement (1 star)")
  ), /* @__PURE__ */ import_react14.default.createElement("svg", { className: "absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react14.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })))), /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("label", { className: "block text-sm font-semibold text-card-foreground mb-2" }, "Tell us about your experience *"), /* @__PURE__ */ import_react14.default.createElement(
    "textarea",
    {
      name: "experience",
      value: formData.experience,
      onChange: handleInputChange,
      required: true,
      rows: 4,
      className: "w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-vertical",
      placeholder: "How was your dining experience? Food quality, service, atmosphere, staff..."
    }
  )), /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("label", { className: "block text-sm font-semibold text-card-foreground mb-2" }, "Suggestions for improvement", /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-muted-foreground font-normal ml-1" }, "(Optional)")), /* @__PURE__ */ import_react14.default.createElement(
    "textarea",
    {
      name: "suggestions",
      value: formData.suggestions,
      onChange: handleInputChange,
      rows: 3,
      className: "w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-vertical",
      placeholder: "Any suggestions to help us improve your next visit?"
    }
  )), /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center justify-center pt-4" }, /* @__PURE__ */ import_react14.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isSubmitting,
      className: `px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center gap-2 ${isSubmitting ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"}`
    },
    isSubmitting ? /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement("svg", { className: "animate-spin w-5 h-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react14.default.createElement("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), /* @__PURE__ */ import_react14.default.createElement("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })), /* @__PURE__ */ import_react14.default.createElement("span", null, "Submitting...")) : /* @__PURE__ */ import_react14.default.createElement(import_react14.default.Fragment, null, /* @__PURE__ */ import_react14.default.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react14.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" })), /* @__PURE__ */ import_react14.default.createElement("span", null, "Submit Feedback"))
  )), message && /* @__PURE__ */ import_react14.default.createElement("div", { className: `p-4 rounded-lg border flex items-center gap-3 ${message.includes("Thank you") ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}` }, /* @__PURE__ */ import_react14.default.createElement("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, message.includes("Thank you") ? /* @__PURE__ */ import_react14.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) : /* @__PURE__ */ import_react14.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })), /* @__PURE__ */ import_react14.default.createElement("span", { className: "font-medium" }, message)))), /* @__PURE__ */ import_react14.default.createElement("div", { className: "bg-muted/30 rounded-2xl p-8 text-center" }, /* @__PURE__ */ import_react14.default.createElement("h3", { className: "text-xl font-serif font-semibold text-foreground mb-4" }, "Love La Cantina Berlin?"), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-muted-foreground mb-6" }, "Help others discover our authentic Italian cuisine by leaving a review on Google or sharing your experience on social media."), /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex flex-wrap justify-center gap-4" }, /* @__PURE__ */ import_react14.default.createElement(
    "a",
    {
      href: "https://search.google.com/local/writereview?placeid=ChIJu3mKd0lOqEcRb5l8dZ2N-9o",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
    },
    /* @__PURE__ */ import_react14.default.createElement("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ import_react14.default.createElement("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" }), /* @__PURE__ */ import_react14.default.createElement("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" }), /* @__PURE__ */ import_react14.default.createElement("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" }), /* @__PURE__ */ import_react14.default.createElement("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" })),
    "Review on Google"
  ), /* @__PURE__ */ import_react14.default.createElement(
    "button",
    {
      onClick: () => {
        const shareData = {
          title: "La Cantina Berlin - Authentic Italian Restaurant",
          text: "I had an amazing experience at La Cantina Berlin! Authentic Italian cuisine in the heart of Berlin.",
          url: window.location.origin
        };
        if (navigator.share) {
          navigator.share(shareData);
        } else {
          const text2 = encodeURIComponent(shareData.text + " " + shareData.url);
          const urls = {
            twitter: `https://twitter.com/intent/tweet?text=${text2}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
            whatsapp: `https://wa.me/?text=${text2}`
          };
          const choice = window.confirm("Choose your platform:\nOK = Twitter\nCancel = Facebook");
          window.open(choice ? urls.twitter : urls.facebook, "_blank", "width=550,height=420");
        }
      },
      className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2"
    },
    /* @__PURE__ */ import_react14.default.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react14.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" })),
    "Share Experience"
  )))));
}

// src/pages/LegalPage.tsx
var import_react15 = __toESM(require("react"), 1);
var import_react_router_dom9 = require("react-router-dom");
function LegalPage() {
  const { locale } = (0, import_react_router_dom9.useParams)();
  const isGerman = locale === "de";
  const [activeSection, setActiveSection] = (0, import_react15.useState)("impressum");
  const sections = [
    { id: "impressum", title: isGerman ? "Impressum" : "Legal Notice" },
    { id: "datenschutz", title: isGerman ? "Datenschutz" : "Privacy Policy" },
    { id: "agb", title: isGerman ? "AGB" : "Terms & Conditions" },
    { id: "cookies", title: isGerman ? "Cookie-Richtlinie" : "Cookie Policy" }
  ];
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-gradient-to-r from-primary/90 to-primary/80 text-white py-16" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, /* @__PURE__ */ import_react15.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold mb-6" }, isGerman ? "Rechtliche Hinweise" : "Legal Information"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-xl md:text-2xl max-w-3xl mx-auto" }, isGerman ? "Transparenz und Rechtssicherheit f\xFCr unsere G\xE4ste" : "Transparency and legal security for our guests"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "lg:col-span-1" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-card rounded-xl border p-6 sticky top-8" }, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-lg font-semibold text-card-foreground mb-4" }, isGerman ? "Rechtsbereiche" : "Legal Sections"), /* @__PURE__ */ import_react15.default.createElement("nav", { className: "space-y-2" }, sections.map((section) => /* @__PURE__ */ import_react15.default.createElement(
    "button",
    {
      key: section.id,
      onClick: () => setActiveSection(section.id),
      className: `w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${activeSection === section.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`
    },
    section.title
  ))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "lg:col-span-3" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-card rounded-xl border p-8 shadow-sm" }, activeSection === "impressum" && /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h2", { className: "text-3xl font-serif font-bold text-card-foreground mb-8" }, isGerman ? "Impressum" : "Legal Notice"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-lg font-semibold text-card-foreground mb-4" }, isGerman ? "Angaben gem\xE4\xDF \xA7 5 TMG" : "Information according to \xA7 5 TMG"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react15.default.createElement("p", { className: "font-semibold text-primary" }, "Ristorante La Cantina Berlin"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Bleibtreustra\xDFe 49"), /* @__PURE__ */ import_react15.default.createElement("p", null, "10623 Berlin-Charlottenburg"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Deutschland"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Kontakt" : "Contact"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2 text-sm" }, /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, isGerman ? "Telefon:" : "Phone:"), " +49 30 881 6562"), /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, isGerman ? "E-Mail:" : "Email:"), " info@lacantina-berlin.de"), /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, "Web:"), " www.lacantina-berlin.de"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Gesch\xE4ftsf\xFChrung" : "Management"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2 text-sm" }, /* @__PURE__ */ import_react15.default.createElement("p", null, "Chef Antonio Rossi"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-muted-foreground text-xs" }, isGerman ? "Handelsregister-Anmeldung bei Gewerbeanmeldung" : "Commercial registration upon business registration"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-muted-foreground text-xs" }, isGerman ? "Umsatzsteuer-ID wird bei Erreichen der Umsatzgrenze beantragt" : "VAT ID will be applied for when turnover threshold is reached")))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Verantwortlich f\xFCr den Inhalt nach \xA7 55 Abs. 2 RStV" : "Responsible for content according to \xA7 55 para. 2 RStV"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-1 text-sm" }, /* @__PURE__ */ import_react15.default.createElement("p", null, "Antonio Rossi"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Bleibtreustra\xDFe 49, 10623 Berlin"))), isGerman && /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-yellow-50 border-l-4 border-yellow-400 p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-yellow-800 mb-2" }, "Streitschlichtung"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-yellow-700" }, "Die Europ\xE4ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:", /* @__PURE__ */ import_react15.default.createElement("a", { href: "https://ec.europa.eu/consumers/odr", className: "underline hover:text-primary", target: "_blank", rel: "noopener" }, "https://ec.europa.eu/consumers/odr"), /* @__PURE__ */ import_react15.default.createElement("br", null), "Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.")))), activeSection === "datenschutz" && /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h2", { className: "text-3xl font-serif font-bold text-card-foreground mb-8" }, isGerman ? "Datenschutzerkl\xE4rung" : "Privacy Policy"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Datenschutz auf einen Blick" : "Privacy at a Glance"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg" }, /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-blue-800" }, isGerman ? "Der Schutz Ihrer pers\xF6nlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschlie\xDFlich auf Grundlage der gesetzlichen Bestimmungen (EU-DSGVO, TKG). In dieser Datenschutzinformation informieren wir Sie \xFCber die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website." : "The protection of your personal data is of particular concern to us. We therefore process your data exclusively on the basis of legal provisions (EU-GDPR, TKG). In this privacy information, we inform you about the most important aspects of data processing within our website."))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Datenerfassung auf dieser Website" : "Data Collection on this Website"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Die Datenverarbeitung erfolgt durch den Websitebetreiber. Kontaktdaten im Impressum." : "Data processing is carried out by the website operator. Contact details in the legal notice.")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Ihre Rechte" : "Your Rights"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Auskunft, Berichtigung, L\xF6schung und Einschr\xE4nkung der Verarbeitung Ihrer Daten." : "Information, correction, deletion and restriction of processing of your data."))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Datenverarbeitung im Detail" : "Data Processing in Detail"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Reservierungen" : "Reservations"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-2" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Zweck: Tischreservierung und Kontaktaufnahme" : "Purpose: Table reservation and contact"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Daten: Name, E-Mail, Telefon, Personenanzahl" : "Data: Name, email, phone, number of guests"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Rechtsgrundlage: Vertragserf\xFCllung (Art. 6 Abs. 1 lit. b DSGVO)" : "Legal basis: Contract fulfillment (Art. 6 para. 1 lit. b GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Speicherdauer: 2 Jahre nach Reservierung" : "Storage period: 2 years after reservation"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Kontaktformular & Feedback" : "Contact Form & Feedback"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-2" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Zweck: Bearbeitung von Anfragen und Feedback" : "Purpose: Processing inquiries and feedback"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Daten: Name, E-Mail, Nachrichteninhalt" : "Data: Name, email, message content"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Rechtsgrundlage: Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO)" : "Legal basis: Legitimate interest (Art. 6 para. 1 lit. f GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Speicherdauer: 1 Jahr nach Bearbeitung" : "Storage period: 1 year after processing"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Server-Log-Files" : "Server Log Files"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground mb-3" }, isGerman ? "Bei jedem Aufruf unserer Website erfassen wir automatisch Informationen:" : "Every time you visit our website, we automatically collect information:"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "IP-Adresse (anonymisiert nach 7 Tagen)" : "IP address (anonymized after 7 days)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Browsertyp und Version" : "Browser type and version"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Verwendetes Betriebssystem" : "Operating system used"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Zugriffsdatum und -zeit" : "Date and time of access"))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-green-800 mb-3" }, isGerman ? "Ihre Rechte nach der DSGVO" : "Your Rights under GDPR"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700" }, /* @__PURE__ */ import_react15.default.createElement("ul", { className: "space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Recht auf Auskunft (Art. 15 DSGVO)" : "Right to information (Art. 15 GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Recht auf Berichtigung (Art. 16 DSGVO)" : "Right to rectification (Art. 16 GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Recht auf L\xF6schung (Art. 17 DSGVO)" : "Right to erasure (Art. 17 GDPR)")), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Recht auf Daten\xFCbertragbarkeit (Art. 20 DSGVO)" : "Right to data portability (Art. 20 GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Widerspruchsrecht (Art. 21 DSGVO)" : "Right to object (Art. 21 GDPR)"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Beschwerderecht bei Aufsichtsbeh\xF6rde" : "Right to complain to supervisory authority")))))), activeSection === "agb" && /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h2", { className: "text-3xl font-serif font-bold text-card-foreground mb-8" }, isGerman ? "Allgemeine Gesch\xE4ftsbedingungen" : "Terms and Conditions"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg" }, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-lg font-semibold text-orange-800 mb-2" }, isGerman ? "G\xFCltigkeit" : "Validity"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-orange-700" }, isGerman ? "Mit der Nutzung unserer Dienstleistungen akzeptieren Sie unsere Allgemeinen Gesch\xE4ftsbedingungen. Stand: September 2025." : "By using our services, you accept our Terms and Conditions. Last updated: September 2025.")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Reservierungen" : "Reservations"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Reservierungsbedingungen" : "Reservation Conditions"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Reservierung telefonisch oder online m\xF6glich" : "Reservations by phone or online"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Best\xE4tigung erfolgt binnen 24 Stunden" : "Confirmation within 24 hours"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Tisch wird 15 Minuten nach Reservierungszeit freigegeben" : "Table released 15 minutes after reservation time"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Kostenlose Stornierung bis 2 Stunden vorher" : "Free cancellation up to 2 hours before"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "No-Show Policy" : "No-Show Policy"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Bei Nichterscheinen ohne Absage behalten wir uns vor, eine Ausfallgeb\xFChr von \u20AC25 pro Person zu erheben." : "In case of no-show without cancellation, we reserve the right to charge a cancellation fee of \u20AC25 per person.")))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "\xD6ffnungszeiten & Service" : "Opening Hours & Service"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "\xD6ffnungszeiten" : "Opening Hours"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "text-sm space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, isGerman ? "T\xE4glich:" : "Daily:"), " 17:00 - 23:00"), /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, isGerman ? "K\xFCche:" : "Kitchen:"), " ", isGerman ? "bis 22:00 Uhr" : "until 22:00"), /* @__PURE__ */ import_react15.default.createElement("p", null, /* @__PURE__ */ import_react15.default.createElement("strong", null, isGerman ? "Letzte Reservierung:" : "Last reservation:"), " 21:30"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Besondere Anl\xE4sse" : "Special Occasions"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Geburtstage und Jubil\xE4en kostenlos" : "Birthdays and anniversaries free"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Gruppenbuchungen ab 8 Personen" : "Group bookings from 8 people"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Private Events nach Vereinbarung" : "Private events by arrangement")))))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Zahlungsbedingungen & Preise" : "Payment Terms & Prices"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Zahlungsmittel" : "Payment Methods"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Bargeld" : "Cash"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 EC-Karte"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 Visa/Mastercard"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 PayPal (online)"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Preise" : "Prices"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Alle Preise inkl. MwSt." : "All prices incl. VAT"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Preise k\xF6nnen sich \xE4ndern" : "Prices subject to change"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Gruppenrabatte m\xF6glich" : "Group discounts available"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Trinkgeld" : "Gratuity"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Trinkgeld ist freiwillig. \xDCblich sind 8-10% bei zufriedener Service." : "Gratuity is voluntary. 8-10% is customary for satisfactory service.")))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Haftung & Gew\xE4hrleistung" : "Liability & Warranty"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-red-800 mb-2" }, isGerman ? "Haftungsausschluss" : "Disclaimer"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-red-700" }, isGerman ? "Wir haften nicht f\xFCr Sch\xE4den an mitgebrachten Gegenst\xE4nden. Die Haftung bei Vorsatz und grober Fahrl\xE4ssigkeit bleibt unber\xFChrt." : "We are not liable for damage to personal items brought in. Liability for intent and gross negligence remains unaffected.")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Allergien & Unvertr\xE4glichkeiten" : "Allergies & Intolerances"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Bitte informieren Sie uns \xFCber Allergien. Wir bem\xFChen uns, k\xF6nnen jedoch Kreuzkontaminationen nicht ausschlie\xDFen." : "Please inform us about allergies. We try our best but cannot exclude cross-contamination.")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Hausordnung" : "House Rules"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Respektvoller Umgang" : "Respectful behavior"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Bitte Handy stumm" : "Please silence phones"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Keine Haustiere (au\xDFer Assistenzhunde)" : "No pets (except service dogs)")))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-gray-100 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Gerichtsstand & Anwendbares Recht" : "Jurisdiction & Applicable Law"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist Berlin. Sollten einzelne Bestimmungen unwirksam sein, bleibt die G\xFCltigkeit der \xFCbrigen Bestimmungen unber\xFChrt." : "The law of the Federal Republic of Germany applies. Place of jurisdiction is Berlin. Should individual provisions be invalid, the validity of the remaining provisions remains unaffected.")))), activeSection === "cookies" && /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h2", { className: "text-3xl font-serif font-bold text-card-foreground mb-8" }, isGerman ? "Cookie-Richtlinie" : "Cookie Policy"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg" }, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-lg font-semibold text-blue-800 mb-2" }, isGerman ? "Was sind Cookies?" : "What are Cookies?"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-blue-700" }, isGerman ? "Diese Website verwendet nur technisch notwendige Cookies f\xFCr den Betrieb der Website. Wir setzen keine Marketing- oder Tracking-Cookies ein." : "This website only uses technically necessary cookies for website operation. We do not use marketing or tracking cookies.")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8" }, /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Cookie-Arten" : "Types of Cookies"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2 flex items-center gap-2" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "w-3 h-3 bg-green-500 rounded-full" }), isGerman ? "Notwendige Cookies" : "Necessary Cookies"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, isGerman ? "Diese Cookies sind f\xFCr das Funktionieren der Website erforderlich." : "These cookies are necessary for the website to function."), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-xs text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Session-Verwaltung" : "Session management"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Sicherheitseinstellungen" : "Security settings"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Spracheinstellungen" : "Language preferences"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2 flex items-center gap-2" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "w-3 h-3 bg-yellow-500 rounded-full" }), isGerman ? "Funktionale Cookies" : "Functional Cookies"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground mb-2" }, isGerman ? "Verbessern die Benutzererfahrung durch Speicherung von Pr\xE4ferenzen." : "Improve user experience by storing preferences."), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-xs text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Reservierungsformular-Daten" : "Reservation form data"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Men\xFC-Filtereinstellungen" : "Menu filter settings"))))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Cookie-Verwaltung" : "Cookie Management"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Ihre Wahlm\xF6glichkeiten" : "Your Choices"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground mb-3" }, isGerman ? "Sie k\xF6nnen Cookies in Ihrem Browser verwalten:" : "You can manage cookies in your browser:"), /* @__PURE__ */ import_react15.default.createElement("ul", { className: "text-sm text-muted-foreground space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Cookies deaktivieren" : "Disable cookies"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Cookies l\xF6schen" : "Delete cookies"), /* @__PURE__ */ import_react15.default.createElement("li", null, "\u2022 ", isGerman ? "Benachrichtigungen aktivieren" : "Enable notifications"))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "border border-border rounded-lg p-4" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-2" }, isGerman ? "Browser-Einstellungen" : "Browser Settings"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground" }, /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("p", { className: "font-medium" }, "Chrome:"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Einstellungen \u2192 Datenschutz")), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("p", { className: "font-medium" }, "Firefox:"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Optionen \u2192 Datenschutz")), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("p", { className: "font-medium" }, "Safari:"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Einstellungen \u2192 Datenschutz")), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("p", { className: "font-medium" }, "Edge:"), /* @__PURE__ */ import_react15.default.createElement("p", null, "Einstellungen \u2192 Cookies"))))))), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h3", { className: "text-xl font-semibold text-card-foreground mb-4" }, isGerman ? "Verwendete Cookies im Detail" : "Cookies Used in Detail"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react15.default.createElement("table", { className: "w-full border-collapse" }, /* @__PURE__ */ import_react15.default.createElement("thead", null, /* @__PURE__ */ import_react15.default.createElement("tr", { className: "bg-muted/30" }, /* @__PURE__ */ import_react15.default.createElement("th", { className: "border border-border p-3 text-left text-sm font-semibold" }, isGerman ? "Cookie-Name" : "Cookie Name"), /* @__PURE__ */ import_react15.default.createElement("th", { className: "border border-border p-3 text-left text-sm font-semibold" }, isGerman ? "Zweck" : "Purpose"), /* @__PURE__ */ import_react15.default.createElement("th", { className: "border border-border p-3 text-left text-sm font-semibold" }, isGerman ? "Laufzeit" : "Duration"), /* @__PURE__ */ import_react15.default.createElement("th", { className: "border border-border p-3 text-left text-sm font-semibold" }, isGerman ? "Typ" : "Type"))), /* @__PURE__ */ import_react15.default.createElement("tbody", null, /* @__PURE__ */ import_react15.default.createElement("tr", null, /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm font-mono" }, "vite_session"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, isGerman ? "Technische Session-Verwaltung" : "Technical session management"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, "Session"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "px-2 py-1 bg-green-100 text-green-800 rounded text-xs" }, isGerman ? "Notwendig" : "Necessary"))), /* @__PURE__ */ import_react15.default.createElement("tr", null, /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm font-mono" }, "theme_preference"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, isGerman ? "Speichert Ihre Darstellungspr\xE4ferenzen" : "Stores your display preferences"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, isGerman ? "Lokal" : "Local"), /* @__PURE__ */ import_react15.default.createElement("td", { className: "border border-border p-3 text-sm" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "px-2 py-1 bg-green-100 text-green-800 rounded text-xs" }, isGerman ? "Notwendig" : "Necessary"))))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-gray-100 rounded-lg p-6" }, /* @__PURE__ */ import_react15.default.createElement("h4", { className: "font-semibold text-card-foreground mb-3" }, isGerman ? "Aktualisierung der Cookie-Richtlinie" : "Cookie Policy Updates"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-sm text-muted-foreground" }, isGerman ? "Diese Cookie-Richtlinie kann von Zeit zu Zeit aktualisiert werden. Die neueste Version finden Sie immer auf dieser Seite. Letzte Aktualisierung: September 2025." : "This Cookie Policy may be updated from time to time. You can always find the latest version on this page. Last updated: September 2025."))))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "bg-muted/30 rounded-2xl p-8 text-center mt-12" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react15.default.createElement("p", null, isGerman ? "Stand: September 2025" : "Last updated: September 2025"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "w-px h-4 bg-border" }), /* @__PURE__ */ import_react15.default.createElement("p", null, isGerman ? "Bei Fragen kontaktieren Sie uns gerne" : "Please contact us if you have any questions"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "w-px h-4 bg-border" }), /* @__PURE__ */ import_react15.default.createElement(
    "a",
    {
      href: "mailto:info@lacantina-berlin.de",
      className: "text-primary hover:underline"
    },
    "info@lacantina-berlin.de"
  )))));
}

// src/pages/BlogPage.tsx
var import_react16 = __toESM(require("react"), 1);
var blogPosts = [
  {
    id: 1,
    title: "The Journey from Tuscany to Berlin: Chef Antonio's Story",
    excerpt: "Discover how our head chef Antonio brought authentic Tuscan flavors to the heart of Berlin, creating La Cantina's unique culinary identity.",
    content: `Growing up in the rolling hills of Tuscany, I learned that cooking isn't just about feeding people \u2013 it's about bringing families together, preserving tradition, and sharing love through food.

My nonna taught me to make pasta when I was just seven years old. 'Antonio,' she would say, 'the secret is in your hands. Feel the dough, listen to what it needs.' Those words still guide me today in our Berlin kitchen.

When I first arrived in Berlin in 2018, I was struck by the city's incredible diversity and energy. But I noticed something missing \u2013 truly authentic Italian cuisine that honored the traditions I grew up with. That's when the dream of La Cantina began.

We opened our doors in March 2025 with a simple mission: to bring the warmth and authenticity of Italian hospitality to Berlin. Every dish tells a story, from our handmade pappardelle with wild boar ragu (my grandfather's recipe) to our tiramisu made fresh every morning.

What makes me proudest is seeing families gathering around our tables, just like they do in Italy. Food has this magical power to create connections, and that's what La Cantina is all about.`,
    author: "Chef Antonio Rossi",
    date: "2025-09-25",
    category: "Our Story",
    readTime: 4,
    imageUrl: "/api/placeholder/600/400"
  },
  {
    id: 2,
    title: "The Art of Handmade Pasta: Behind the Scenes",
    excerpt: "Step into our kitchen to discover the ancient techniques we use daily to create perfect fresh pasta, just like nonna used to make.",
    content: `Every morning at 6 AM, our pasta station comes alive with the rhythm of tradition. We make over 15 different pasta shapes daily, each with its own purpose and personality.

The process starts with our pasta dough \u2013 a simple combination of 00 flour, fresh eggs from local farms, and a pinch of sea salt. But simplicity doesn't mean easy. The dough must be kneaded for exactly 10 minutes, rested for 30, and rolled with the patience of generations.

Our pappardelle, wide ribbons perfect for rich ragus, requires a delicate touch. Too thick and it overwhelms the sauce; too thin and it breaks under the weight of our slow-cooked wild boar. Our pasta chefs have trained for years to achieve this balance.

The tortellini are perhaps our greatest pride. Each one is folded by hand \u2013 we make about 400 pieces daily. The filling combines mortadella, prosciutto, and Parmigiano-Reggiano aged 24 months. It takes our team member Maria about 2 hours to shape them all, but the result is poetry on a plate.

When guests ask why we don't use machines, I tell them: machines can copy, but they cannot create soul. Every imperfection in our handmade pasta is a signature of human care.`,
    author: "Chef Antonio Rossi",
    date: "2025-09-20",
    category: "Kitchen Stories",
    readTime: 5,
    imageUrl: "/api/placeholder/600/400"
  },
  {
    id: 3,
    title: "Autumn Flavors: Our Seasonal Menu Transformation",
    excerpt: "As Berlin's autumn arrives, discover how we incorporate seasonal ingredients to create dishes that celebrate the changing seasons.",
    content: `Autumn in Berlin brings a transformation to our kitchen that excites every chef on our team. As the leaves change color, so does our menu, embracing the rich, earthy flavors that make this season so magical.

This month, we're featuring fresh porcini mushrooms flown in twice weekly from Umbria. These beauties find their way into our risotto ai porcini, where each grain of Carnaroli rice is stirred with patience and love. The dish is finished with aged Pecorino and a drizzle of truffle oil that will make you close your eyes in bliss.

Our kitchen team has been working with local Berlin suppliers to source the finest autumn vegetables. The butternut squash for our ravioli comes from a farm just outside the city, while the chestnuts in our dessert are foraged from Brandenburg forests.

The star of our autumn menu is undoubtedly the osso buco alla Milanese. This traditional Lombard dish features veal shanks braised for four hours in white wine, vegetables, and herbs. Served with saffron risotto, it's comfort food that warms both body and soul during Berlin's crisp evenings.

We're also introducing a special wine pairing menu featuring Italian reds that complement autumn flavors \u2013 Barolo, Chianti Classico, and a stunning Brunello di Montalcino that pairs beautifully with our game dishes.`,
    author: "Sous Chef Marco Benedetti",
    date: "2025-09-15",
    category: "Seasonal Menu",
    readTime: 3,
    imageUrl: "/api/placeholder/600/400"
  },
  {
    id: 4,
    title: "Wine Wisdom: Understanding Italian Wine Regions",
    excerpt: "Join our sommelier on a journey through Italy's diverse wine regions and learn to pair wines with your favorite Italian dishes.",
    content: `Italy's wine regions are as diverse as its dialects, each telling a unique story through climate, soil, and centuries of winemaking tradition. At La Cantina, we're passionate about sharing these stories with our guests.

Tuscany, perhaps Italy's most famous wine region, gives us the noble Sangiovese grape. Our Chianti Classico, with its distinctive black rooster seal, offers bright cherry flavors that dance beautifully with tomato-based dishes. Try it with our osso buco or wild boar ragu.

Venturing north to Piedmont, we discover the king of Italian wines \u2013 Barolo. Made from Nebbiolo grapes grown in foggy hills, this wine demands patience. Young Barolo can be tannic and bold, but with age develops incredible complexity. We pair it with our aged cheeses and braised meats.

The Veneto region surprises many with its diversity. Beyond Prosecco (perfect for aperitivo), we find Amarone \u2013 a wine made from dried grapes that creates rich, concentrated flavors perfect with our chocolate desserts.

Our wine dinners on the first Friday of each month explore different regions. Last month's Sicilian evening featured wines from Mount Etna's volcanic soils paired with dishes showcasing Sicily's Arabic influences. The combination of wine and food transported our guests straight to the Mediterranean.

Remember: wine pairing isn't about rules \u2013 it's about discovery and personal taste. Come explore with us!`,
    author: "Sommelier Elena Conti",
    date: "2025-09-10",
    category: "Wine & Pairing",
    readTime: 6,
    imageUrl: "/api/placeholder/600/400"
  },
  {
    id: 5,
    title: "Celebrating Traditions: Our Italian Holiday Menu",
    excerpt: "Experience authentic Italian holiday celebrations with special menus that bring the warmth of Italian family traditions to Berlin.",
    content: `In Italy, holidays aren't just dates on a calendar \u2013 they're occasions for families to gather, share stories, and create memories around the dinner table. At La Cantina, we bring these cherished traditions to our Berlin family of guests.

This December, we're hosting our first Vigilia di Natale (Christmas Eve) dinner, following the Italian tradition of La Festa dei Sette Pesci \u2013 the Feast of Seven Fishes. This southern Italian custom celebrates the anticipation of Christmas with a magnificent seafood feast.

Our seven-course menu features the finest seafood: baccal\xE0 mantecato (whipped salt cod) from Venice, Sicilian-style sardines, linguine alle vongole with fresh clams, and bronzino al sale (salt-baked sea bass). Each dish represents a different coastal region of Italy.

For Carnevale in February, we'll transform our dining room with colorful decorations and serve traditional Italian carnival treats. Think frittelle (Venetian carnival fritters), chiacchiere (crispy sweetened pastries), and our special carnival risotto with saffron and pancetta.

Easter brings agnello al forno (roasted lamb) with rosemary and garlic, accompanied by carciofi alla giudia (Jewish-style artichokes) \u2013 a dish that tells the beautiful story of Italian-Jewish culinary heritage.

These celebrations aren't just meals; they're cultural experiences that connect us to centuries of Italian tradition. Join us and become part of our extended Italian family in Berlin.`,
    author: "Chef Antonio Rossi",
    date: "2025-09-05",
    category: "Traditions",
    readTime: 4,
    imageUrl: "/api/placeholder/600/400"
  }
];
function BlogPage() {
  const [selectedPost, setSelectedPost] = (0, import_react16.useState)(null);
  const [selectedCategory, setSelectedCategory] = (0, import_react16.useState)("All");
  const categories = ["All", "Our Story", "Kitchen Stories", "Seasonal Menu", "Wine & Pairing", "Traditions"];
  const filteredPosts = selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory);
  if (selectedPost) {
    return /* @__PURE__ */ import_react16.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "bg-card border-b" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4" }, /* @__PURE__ */ import_react16.default.createElement(
      "button",
      {
        onClick: () => setSelectedPost(null),
        className: "flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
      },
      /* @__PURE__ */ import_react16.default.createElement("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react16.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" })),
      "Back to Blog"
    ))), /* @__PURE__ */ import_react16.default.createElement("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react16.default.createElement("header", { className: "mb-12" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-4 mb-6" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium" }, selectedPost.category), /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-muted-foreground text-sm" }, selectedPost.readTime, " min read")), /* @__PURE__ */ import_react16.default.createElement("h1", { className: "text-4xl md:text-5xl font-serif font-bold text-foreground mb-6" }, selectedPost.title), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-4 text-muted-foreground" }, /* @__PURE__ */ import_react16.default.createElement("span", null, "By ", selectedPost.author), /* @__PURE__ */ import_react16.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react16.default.createElement("span", null, new Date(selectedPost.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })))), selectedPost.imageUrl && /* @__PURE__ */ import_react16.default.createElement("div", { className: "mb-12" }, /* @__PURE__ */ import_react16.default.createElement(
      "img",
      {
        src: selectedPost.imageUrl,
        alt: selectedPost.title,
        className: "w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
      }
    )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "prose prose-lg max-w-none" }, selectedPost.content.split("\n\n").map((paragraph, index2) => /* @__PURE__ */ import_react16.default.createElement("p", { key: index2, className: "mb-6 text-muted-foreground leading-relaxed" }, paragraph))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "bg-muted/30 rounded-xl p-8 mt-12 text-center" }, /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-xl font-serif font-semibold text-foreground mb-4" }, "Experience Our Italian Traditions"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-muted-foreground mb-6" }, "Join us at La Cantina Berlin for an authentic taste of Italy in the heart of Berlin."), /* @__PURE__ */ import_react16.default.createElement("button", { className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors duration-200" }, "Make a Reservation"))));
  }
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "bg-gradient-to-r from-primary/90 to-primary/80 text-white py-20" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, /* @__PURE__ */ import_react16.default.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold mb-6" }, "Stories from La Cantina"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto" }, "Discover the passion, traditions, and stories behind Berlin's most authentic Italian restaurant"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-wrap justify-center gap-8 text-lg" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react16.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" })), /* @__PURE__ */ import_react16.default.createElement("span", null, "Culinary Stories")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react16.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" })), /* @__PURE__ */ import_react16.default.createElement("span", null, "Italian Traditions"))))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-wrap justify-center gap-3 mb-12" }, categories.map((category) => /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      key: category,
      onClick: () => setSelectedCategory(category),
      className: `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"}`
    },
    category
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "mb-16" }, /* @__PURE__ */ import_react16.default.createElement("h2", { className: "text-3xl font-serif font-bold text-center text-foreground mb-12" }, "Latest Stories"), filteredPosts.length > 0 && filteredPosts[0] && /* @__PURE__ */ import_react16.default.createElement(
    "div",
    {
      className: "bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer",
      onClick: () => setSelectedPost(filteredPosts[0])
    },
    /* @__PURE__ */ import_react16.default.createElement("div", { className: "md:flex" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "md:w-1/2" }, filteredPosts[0].imageUrl && /* @__PURE__ */ import_react16.default.createElement(
      "img",
      {
        src: filteredPosts[0].imageUrl,
        alt: filteredPosts[0].title,
        className: "w-full h-64 md:h-full object-cover"
      }
    )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "md:w-1/2 p-8" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-3 mb-4" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium" }, filteredPosts[0].category), /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-muted-foreground text-sm" }, filteredPosts[0].readTime, " min read")), /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-2xl md:text-3xl font-serif font-bold text-card-foreground mb-4" }, filteredPosts[0].title), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-muted-foreground leading-relaxed mb-6" }, filteredPosts[0].excerpt), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-3 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react16.default.createElement("span", null, "By ", filteredPosts[0].author), /* @__PURE__ */ import_react16.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react16.default.createElement("span", null, new Date(filteredPosts[0].date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-2 text-primary font-medium" }, /* @__PURE__ */ import_react16.default.createElement("span", null, "Read More"), /* @__PURE__ */ import_react16.default.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react16.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" }))))))
  )), filteredPosts.length > 1 && /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-2xl font-serif font-semibold text-foreground mb-8" }, "More Stories"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" }, filteredPosts.slice(1).map((post) => /* @__PURE__ */ import_react16.default.createElement(
    "article",
    {
      key: post.id,
      className: "bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group",
      onClick: () => setSelectedPost(post)
    },
    post.imageUrl && /* @__PURE__ */ import_react16.default.createElement("div", { className: "relative overflow-hidden" }, /* @__PURE__ */ import_react16.default.createElement(
      "img",
      {
        src: post.imageUrl,
        alt: post.title,
        className: "w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      }
    ), /* @__PURE__ */ import_react16.default.createElement("div", { className: "absolute top-4 left-4" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "bg-white/90 text-primary px-3 py-1 rounded-full text-sm font-medium" }, post.category))),
    /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-6" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-3 mb-3" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-muted-foreground text-sm" }, post.readTime, " min read"), /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-muted-foreground text-sm" }, "\u2022"), /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-muted-foreground text-sm" }, new Date(post.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short"
    }))), /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-lg font-serif font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-200" }, post.title), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-muted-foreground text-sm leading-relaxed mb-4" }, post.excerpt), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-sm text-muted-foreground" }, post.author), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-1 text-primary group-hover:gap-2 transition-all duration-200" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-sm font-medium" }, "Read"), /* @__PURE__ */ import_react16.default.createElement("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" }, /* @__PURE__ */ import_react16.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 8l4 4m0 0l-4 4m4-4H3" })))))
  )))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "bg-primary/5 rounded-2xl p-8 mt-16 text-center" }, /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-2xl font-serif font-semibold text-foreground mb-4" }, "Stay Connected with Our Stories"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-muted-foreground mb-6 max-w-2xl mx-auto" }, "Subscribe to receive our latest culinary stories, seasonal menu updates, and exclusive invitations to special events at La Cantina Berlin."), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-col sm:flex-row gap-4 max-w-md mx-auto" }, /* @__PURE__ */ import_react16.default.createElement(
    "input",
    {
      type: "email",
      placeholder: "Enter your email",
      className: "flex-1 px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
    }
  ), /* @__PURE__ */ import_react16.default.createElement("button", { className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200" }, "Subscribe")))));
}

// src/pages/InstagramPage.tsx
var import_react18 = __toESM(require("react"), 1);
var import_lucide_react2 = require("lucide-react");

// src/components/InstagramEmbed.tsx
var import_react17 = require("react");
function InstagramEmbed({ url, aspect = 1.25 }) {
  const shortcode = (0, import_react17.useMemo)(() => {
    try {
      const u = new URL(url);
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[1];
    } catch {
      return "";
    }
  }, [url]);
  if (!shortcode) return null;
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: {
        position: "relative",
        width: "100%",
        paddingTop: `${aspect * 100}%`
      }
    },
    /* @__PURE__ */ React.createElement(
      "iframe",
      {
        src: `https://www.instagram.com/p/${shortcode}/embed`,
        title: `ig-${shortcode}`,
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          overflow: "hidden"
        },
        loading: "lazy"
      }
    )
  );
}

// src/pages/InstagramPage.tsx
var IG_URLS = [
  "https://www.instagram.com/p/DAvXTRFidcu/",
  "https://www.instagram.com/p/C_vwvupNoNR/",
  "https://www.instagram.com/p/C8HwJgmt8aL/",
  "https://www.instagram.com/p/C6gz8uSiGlb/",
  "https://www.instagram.com/p/C6Mg0uGLdNH/",
  "https://www.instagram.com/p/C4lqzQMrscT/",
  "https://www.instagram.com/p/C4kriK-NmpI/",
  "https://www.instagram.com/p/C0e_9IcLnk-/",
  "https://www.instagram.com/p/Cztz53rN1km/",
  "https://www.instagram.com/p/CroTpxftUqg/",
  "https://www.instagram.com/p/C3xB9KuNmPR/",
  "https://www.instagram.com/p/C2pL7VuoTqX/"
];
var getPostId = (url) => {
  const match = url.match(/\/p\/([^\/]+)\//);
  if (match && match[1]) return match[1];
  const extracted = url.substring(url.lastIndexOf("/") + 1);
  return extracted || "unknown";
};
var getPostData = (url) => {
  const posts = [
    { id: "DAvXTRFidcu", caption: "Fresh handmade pasta ready for tonight's dinner service! Our pappardelle with wild boar ragu is a customer favorite. \u{1F35D}", likes: 245, date: "3 days ago", imageAlt: "Fresh handmade pappardelle pasta with wild boar ragu" },
    { id: "C_vwvupNoNR", caption: "Behind the scenes: Chef Antonio preparing our signature tiramisu. Every layer is made with love and authentic Italian ingredients \u2615", likes: 189, date: "5 days ago", imageAlt: "Chef Antonio preparing tiramisu in the kitchen" },
    { id: "C8HwJgmt8aL", caption: "Wine tasting evening with our sommelier Elena! Discovering the perfect Barolo pairing for our osso buco \u{1F377}", likes: 156, date: "1 week ago", imageAlt: "Wine tasting event with Italian wines" },
    { id: "C6gz8uSiGlb", caption: "Autumn flavors are here! Our new seasonal menu featuring fresh porcini mushrooms from Umbria \u{1F344}", likes: 203, date: "2 weeks ago", imageAlt: "Seasonal autumn dishes with porcini mushrooms" },
    { id: "C6Mg0uGLdNH", caption: "La Cantina family dinner! Nothing beats the warmth of sharing a meal together, just like in Italy \u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}", likes: 167, date: "3 weeks ago", imageAlt: "Family dinner at La Cantina Berlin" },
    { id: "C4lqzQMrscT", caption: "Fresh mozzarella being made this morning! The art of Italian cheese making continues in our Berlin kitchen \u{1F9C0}", likes: 178, date: "1 month ago", imageAlt: "Fresh mozzarella cheese being made" },
    { id: "C4kriK-NmpI", caption: "Celebrating our 6-month anniversary! Thank you Berlin for welcoming us with open arms \u{1F389}", likes: 298, date: "1 month ago", imageAlt: "La Cantina Berlin anniversary celebration" },
    { id: "C0e_9IcLnk-", caption: "Sunday pasta workshop in action! Learning the secrets of authentic Italian pasta making \u{1F469}\u200D\u{1F373}", likes: 134, date: "2 months ago", imageAlt: "Pasta making workshop with customers" },
    { id: "Cztz53rN1km", caption: "Our wood-fired oven bringing the taste of Naples to Berlin! Perfect pizza margherita every time \u{1F525}", likes: 221, date: "2 months ago", imageAlt: "Wood-fired pizza oven with margherita pizza" },
    { id: "CroTpxftUqg", caption: "Opening day memories! The journey from Tuscany to Berlin begins here at La Cantina \u{1F1EE}\u{1F1F9}", likes: 345, date: "6 months ago", imageAlt: "La Cantina Berlin opening day celebration" },
    { id: "C3xB9KuNmPR", caption: "Truffle season is here! Our special truffle risotto with freshly shaved black truffles \u{1F344}\u200D\u2B1B", likes: 267, date: "3 months ago", imageAlt: "Truffle risotto with freshly shaved black truffles" },
    { id: "C2pL7VuoTqX", caption: "Meet our kitchen team! The passionate chefs who bring authentic Italian flavors to your table every day \u{1F468}\u200D\u{1F373}", likes: 189, date: "4 months ago", imageAlt: "La Cantina kitchen team portrait" }
  ];
  const postId = getPostId(url);
  return posts.find((p) => p.id === postId) ?? posts[0];
};
function InstagramPage() {
  const [showAll, setShowAll] = (0, import_react18.useState)(false);
  const [selectedView, setSelectedView] = (0, import_react18.useState)("gallery");
  const postsToShow = showAll ? IG_URLS : IG_URLS.slice(0, 6);
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white py-20" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex justify-center mb-6" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-full p-4" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Instagram, { className: "w-16 h-16" }))), /* @__PURE__ */ import_react18.default.createElement("h1", { className: "text-4xl md:text-6xl font-serif font-bold mb-6" }, "@lacantina.berlin"), /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-xl md:text-2xl mb-8 max-w-3xl mx-auto" }, "Follow our culinary journey from Tuscany to Berlin. Fresh pasta, authentic flavors, and Italian traditions shared daily."), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex flex-wrap justify-center gap-8 text-lg mb-8" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Heart, { className: "w-6 h-6" }), /* @__PURE__ */ import_react18.default.createElement("span", null, "2.1k followers")), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Grid, { className: "w-6 h-6" }), /* @__PURE__ */ import_react18.default.createElement("span", null, "127 posts")), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.MessageCircle, { className: "w-6 h-6" }), /* @__PURE__ */ import_react18.default.createElement("span", null, "Italian cuisine"))), /* @__PURE__ */ import_react18.default.createElement(
    "a",
    {
      href: "https://instagram.com/lacantina.berlin",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 bg-white text-purple-600 hover:bg-white/90 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-200"
    },
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Instagram, { className: "w-6 h-6" }),
    "Follow on Instagram",
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.ExternalLink, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ import_react18.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex justify-center mb-12" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "bg-muted rounded-full p-1 flex" }, /* @__PURE__ */ import_react18.default.createElement(
    "button",
    {
      onClick: () => setSelectedView("feed"),
      className: `flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${selectedView === "feed" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`
    },
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.MessageCircle, { className: "w-4 h-4" }),
    "Feed View"
  ), /* @__PURE__ */ import_react18.default.createElement(
    "button",
    {
      onClick: () => setSelectedView("gallery"),
      className: `flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-colors duration-200 ${selectedView === "gallery" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`
    },
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Grid, { className: "w-4 h-4" }),
    "Gallery View"
  ))), selectedView === "feed" ? /* @__PURE__ */ import_react18.default.createElement("div", { className: "space-y-12" }, postsToShow.map((url) => {
    const postData = getPostData(url);
    return /* @__PURE__ */ import_react18.default.createElement("article", { key: url, className: "bg-card rounded-2xl overflow-hidden shadow-sm border border-border" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-4 p-6 border-b border-border" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "text-white font-bold text-lg" }, "LC")), /* @__PURE__ */ import_react18.default.createElement("div", null, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "font-semibold text-card-foreground" }, "lacantina.berlin"), /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-sm text-muted-foreground" }, postData.date)), /* @__PURE__ */ import_react18.default.createElement("div", { className: "ml-auto" }, /* @__PURE__ */ import_react18.default.createElement(
      "a",
      {
        href: url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-muted-foreground hover:text-foreground transition-colors"
      },
      /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.ExternalLink, { className: "w-5 h-5" })
    ))), /* @__PURE__ */ import_react18.default.createElement("div", { className: "aspect-square max-w-full" }, /* @__PURE__ */ import_react18.default.createElement(InstagramEmbed, { url })), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-6" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-4 mb-4" }, /* @__PURE__ */ import_react18.default.createElement("button", { className: "flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Heart, { className: "w-6 h-6" }), /* @__PURE__ */ import_react18.default.createElement("span", { className: "font-medium" }, postData.likes)), /* @__PURE__ */ import_react18.default.createElement("button", { className: "text-muted-foreground hover:text-foreground transition-colors" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.MessageCircle, { className: "w-6 h-6" })), /* @__PURE__ */ import_react18.default.createElement("button", { className: "text-muted-foreground hover:text-foreground transition-colors" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Bookmark, { className: "w-6 h-6" }))), /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-card-foreground leading-relaxed" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "font-semibold" }, "lacantina.berlin"), " ", postData.caption)));
  })) : /* @__PURE__ */ import_react18.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, postsToShow.map((url) => {
    const postData = getPostData(url);
    return /* @__PURE__ */ import_react18.default.createElement("div", { key: url, className: "group" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-shadow duration-300" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "aspect-square" }, /* @__PURE__ */ import_react18.default.createElement(InstagramEmbed, { url })), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4" }, /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-2" }, postData.caption), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center justify-between text-sm text-muted-foreground" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Heart, { className: "w-4 h-4" }), /* @__PURE__ */ import_react18.default.createElement("span", null, postData.likes)), /* @__PURE__ */ import_react18.default.createElement("span", null, postData.date)))));
  })), !showAll && IG_URLS.length > 6 && /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-center mt-12" }, /* @__PURE__ */ import_react18.default.createElement(
    "button",
    {
      onClick: () => setShowAll(true),
      className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
    },
    "Show All Posts (",
    IG_URLS.length - 6,
    " more)"
  )), /* @__PURE__ */ import_react18.default.createElement("div", { className: "bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mt-16 text-center" }, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "text-2xl font-serif font-semibold text-foreground mb-4" }, "Experience La Cantina in Person"), /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-muted-foreground mb-6 max-w-2xl mx-auto" }, "Follow us on Instagram for daily behind-the-scenes content, and visit us in Berlin for an authentic taste of Italy."), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex flex-col sm:flex-row gap-4 justify-center" }, /* @__PURE__ */ import_react18.default.createElement(
    "a",
    {
      href: "https://instagram.com/lacantina.berlin",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
    },
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react2.Instagram, { className: "w-5 h-5" }),
    "Follow @lacantina.berlin"
  ), /* @__PURE__ */ import_react18.default.createElement("button", { className: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold transition-colors duration-200" }, "Make a Reservation")))));
}

// src/pages/AdminPage.tsx
var import_react20 = __toESM(require("react"), 1);
var import_react_router_dom10 = require("react-router-dom");

// src/lib/adminAuth.ts
var adminAuth = {
  async login(identifier, password) {
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        // Include cookies in request
        body: JSON.stringify({ identifier, password })
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, redirectTo: data.redirectTo };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },
  async checkAuth() {
    try {
      const response = await fetch("/api/admin/session", {
        credentials: "include"
        // Include cookies in request
      });
      if (response.ok) {
        const data = await response.json();
        return data.authenticated;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  },
  async refresh() {
    try {
      const response = await fetch("/api/admin/refresh", {
        method: "POST",
        credentials: "include"
        // Include cookies in request
      });
      if (response.ok) {
        const data = await response.json();
        return { success: true, csrfToken: data.csrfToken };
      }
      return { success: false };
    } catch {
      return { success: false };
    }
  },
  async logout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include"
        // Include cookies in request
      });
    } catch {
    }
  },
  async getCSRFToken() {
    try {
      const response = await fetch("/api/admin/csrf", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
      }
      return null;
    } catch {
      return null;
    }
  }
};

// src/components/admin/AdminOverview.tsx
var import_react19 = __toESM(require("react"), 1);
var import_lucide_react3 = require("lucide-react");
function AdminOverview({
  locale,
  menuItems: menuItems2,
  galleryImages,
  events: events2,
  eventBookings: eventBookings2,
  reservations: reservations2,
  feedbackList,
  contactMessages: contactMessages2
}) {
  const { t } = useTranslation(locale);
  const stats = {
    totalMenuItems: menuItems2.length,
    availableMenuItems: menuItems2.filter((item) => item.isAvailable).length,
    totalEvents: events2.length,
    totalBookings: eventBookings2.length,
    pendingBookings: eventBookings2.filter((booking) => booking.status === "pending").length,
    totalReservations: reservations2.length,
    pendingReservations: reservations2.filter((res) => res.status === "pending").length,
    totalFeedback: feedbackList.length,
    averageRating: feedbackList.length > 0 ? Math.round(feedbackList.reduce((sum, fb) => sum + (fb.rating || 0), 0) / feedbackList.length * 10) / 10 : 0,
    totalImages: galleryImages.length,
    unreadMessages: contactMessages2.filter((msg) => msg.status === "unread" || !msg.replied).length
  };
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    color = "primary",
    trend
  }) => {
    const colorStyles = {
      primary: { bg: "bg-primary/10", text: "text-primary" },
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-green-100", text: "text-green-600" },
      yellow: { bg: "bg-yellow-100", text: "text-yellow-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
      indigo: { bg: "bg-indigo-100", text: "text-indigo-600" },
      gray: { bg: "bg-gray-100", text: "text-gray-600" }
    };
    const selectedStyle = colorStyles[color] || colorStyles.primary;
    return /* @__PURE__ */ import_react19.default.createElement("div", { className: "bg-card rounded-xl border p-6 hover:shadow-md transition-shadow" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: `p-3 rounded-full ${selectedStyle.bg}` }, /* @__PURE__ */ import_react19.default.createElement(Icon, { className: `w-6 h-6 ${selectedStyle.text}` })), trend && /* @__PURE__ */ import_react19.default.createElement("div", { className: `flex items-center gap-1 text-sm font-medium ${trend.isUp ? "text-green-600" : "text-red-600"}` }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.TrendingUp, { className: `w-4 h-4 ${trend.isUp ? "" : "rotate-180"}` }), trend.value, "%")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-2xl font-bold text-foreground" }, value), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-sm font-medium text-muted-foreground" }, title), subtitle && /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, subtitle)));
  };
  const getRecentActivity = () => {
    const activities = [];
    eventBookings2.slice(-3).forEach((booking) => {
      activities.push({
        id: `booking-${booking.id}`,
        type: "booking",
        message: locale === "de" ? `Neue Veranstaltungsanmeldung von ${booking.name}` : `New event booking from ${booking.name}`,
        time: new Date(booking.created_at || Date.now()),
        color: "blue"
      });
    });
    reservations2.slice(-3).forEach((reservation) => {
      activities.push({
        id: `reservation-${reservation.id}`,
        type: "reservation",
        message: locale === "de" ? `Neue Reservierung von ${reservation.name}` : `New reservation from ${reservation.name}`,
        time: new Date(reservation.created_at || Date.now()),
        color: "green"
      });
    });
    contactMessages2.slice(-2).forEach((message) => {
      activities.push({
        id: `message-${message.id}`,
        type: "message",
        message: locale === "de" ? `Neue Kontaktnachricht von ${message.name}` : `New contact message from ${message.name}`,
        time: new Date(message.createdAt || Date.now()),
        color: "purple"
      });
    });
    return activities.sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 5);
  };
  const formatTime = (date) => {
    const now = Date.now();
    const diffMs = now - date.getTime();
    const diffHours = Math.floor(diffMs / (1e3 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1e3 * 60 * 60 * 24));
    if (diffHours < 1) {
      return locale === "de" ? "Gerade eben" : "Just now";
    } else if (diffHours < 24) {
      return locale === "de" ? `vor ${diffHours}h` : `${diffHours}h ago`;
    } else {
      return locale === "de" ? `vor ${diffDays}d` : `${diffDays}d ago`;
    }
  };
  return /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-8" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("h1", { className: "text-3xl font-serif font-bold text-foreground mb-2" }, locale === "de" ? "Dashboard \xDCbersicht" : "Dashboard Overview"), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-muted-foreground" }, locale === "de" ? "Willkommen zur\xFCck! Hier ist eine \xDCbersicht Ihrer Restaurant-Verwaltung." : "Welcome back! Here's an overview of your restaurant management.")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center gap-2 text-sm text-muted-foreground" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Clock, { className: "w-4 h-4" }), (/* @__PURE__ */ new Date()).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  }))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.UtensilsCrossed,
      title: locale === "de" ? "Speisekarten-Artikel" : "Menu Items",
      value: stats.totalMenuItems,
      subtitle: locale === "de" ? `${stats.availableMenuItems} verf\xFCgbar` : `${stats.availableMenuItems} available`,
      color: "primary"
    }
  ), /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.Calendar,
      title: locale === "de" ? "Veranstaltungsanmeldungen" : "Event Bookings",
      value: stats.totalBookings,
      subtitle: locale === "de" ? `${stats.pendingBookings} ausstehend` : `${stats.pendingBookings} pending`,
      color: "blue"
    }
  ), /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.ClipboardList,
      title: locale === "de" ? "Reservierungen" : "Reservations",
      value: stats.totalReservations,
      subtitle: locale === "de" ? `${stats.pendingReservations} ausstehend` : `${stats.pendingReservations} pending`,
      color: "green"
    }
  ), /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.MessageSquare,
      title: locale === "de" ? "Ungelesene Nachrichten" : "Unread Messages",
      value: stats.unreadMessages,
      subtitle: locale === "de" ? "Kontaktnachrichten" : "Contact messages",
      color: stats.unreadMessages > 0 ? "orange" : "gray"
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.Star,
      title: locale === "de" ? "Durchschnittsbewertung" : "Average Rating",
      value: `${stats.averageRating}/5`,
      subtitle: locale === "de" ? `${stats.totalFeedback} Bewertungen` : `${stats.totalFeedback} reviews`,
      color: "yellow"
    }
  ), /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.Calendar,
      title: locale === "de" ? "Veranstaltungen" : "Events",
      value: stats.totalEvents,
      subtitle: locale === "de" ? "Aktive Veranstaltungen" : "Active events",
      color: "purple"
    }
  ), /* @__PURE__ */ import_react19.default.createElement(
    StatCard,
    {
      icon: import_lucide_react3.Image,
      title: locale === "de" ? "Galerie-Bilder" : "Gallery Images",
      value: stats.totalImages,
      subtitle: locale === "de" ? "Hochgeladene Bilder" : "Uploaded images",
      color: "indigo"
    }
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "bg-card rounded-xl border p-6" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center gap-2 mb-6" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Activity, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ import_react19.default.createElement("h2", { className: "text-xl font-semibold text-foreground" }, locale === "de" ? "Letzte Aktivit\xE4ten" : "Recent Activity")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-4" }, getRecentActivity().length > 0 ? getRecentActivity().map((activity) => {
    const activityColorStyles = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      yellow: "bg-yellow-500",
      indigo: "bg-indigo-500"
    };
    const dotColor = activityColorStyles[activity.color] || "bg-blue-500";
    return /* @__PURE__ */ import_react19.default.createElement("div", { key: activity.id, className: "flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: `w-2 h-2 rounded-full ${dotColor} mt-2 flex-shrink-0` }), /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-sm text-foreground mb-1" }, activity.message), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-muted-foreground" }, formatTime(activity.time))));
  }) : /* @__PURE__ */ import_react19.default.createElement("div", { className: "text-center py-8 text-muted-foreground" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Activity, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-sm" }, locale === "de" ? "Keine aktuellen Aktivit\xE4ten" : "No recent activity")))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "bg-card rounded-xl border p-6" }, /* @__PURE__ */ import_react19.default.createElement("h2", { className: "text-xl font-semibold text-foreground mb-4" }, locale === "de" ? "Schnellaktionen" : "Quick Actions"), /* @__PURE__ */ import_react19.default.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react19.default.createElement("button", { className: "flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.UtensilsCrossed, { className: "w-5 h-5 text-primary" }), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-sm font-medium" }, locale === "de" ? "Neues Gericht" : "New Dish")), /* @__PURE__ */ import_react19.default.createElement("button", { className: "flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Calendar, { className: "w-5 h-5 text-blue-600" }), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-sm font-medium" }, locale === "de" ? "Neue Veranstaltung" : "New Event")), /* @__PURE__ */ import_react19.default.createElement("button", { className: "flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Image, { className: "w-5 h-5 text-purple-600" }), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-sm font-medium" }, locale === "de" ? "Bild hochladen" : "Upload Image")), /* @__PURE__ */ import_react19.default.createElement("button", { className: "flex items-center gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors text-left" }, /* @__PURE__ */ import_react19.default.createElement(import_lucide_react3.Users, { className: "w-5 h-5 text-green-600" }), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-sm font-medium" }, locale === "de" ? "Reservierungen" : "Reservations")))));
}

// src/pages/AdminPage.tsx
function AdminPage() {
  const { locale } = (0, import_react_router_dom10.useParams)();
  const currentLocale = locale || "de";
  const isGerman = currentLocale === "de";
  const { t } = useTranslation(currentLocale);
  const [isAuthenticated, setIsAuthenticated] = (0, import_react20.useState)(null);
  const [isLoading, setIsLoading] = (0, import_react20.useState)(true);
  const [user, setUser] = (0, import_react20.useState)(null);
  const [activeTab, setActiveTab] = (0, import_react20.useState)("overview");
  const adminT = (key) => {
    const adminTranslations = {
      "admin.title": { de: "La Cantina Admin", en: "La Cantina Admin" },
      "admin.welcome": { de: "Willkommen", en: "Welcome" },
      "admin.logout": { de: "Abmelden", en: "Log Out" },
      "admin.loading": { de: "L\xE4dt...", en: "Loading..." },
      "admin.accessRequired": { de: "Zugang erforderlich", en: "Access Required" },
      "admin.pleaseLogin": { de: "Bitte melden Sie sich an, um auf das Admin-Panel zuzugreifen.", en: "Please log in to access the admin panel." },
      "admin.login": { de: "Anmelden", en: "Log In" },
      "menu.title": { de: "Speisekarten-Artikel", en: "Menu Items" },
      "menu.addNew": { de: "Neuen Artikel hinzuf\xFCgen", en: "Add New Item" },
      "menu.available": { de: "Verf\xFCgbar", en: "Available" },
      "menu.unavailable": { de: "Nicht verf\xFCgbar", en: "Unavailable" },
      "actions.edit": { de: "Bearbeiten", en: "Edit" },
      "actions.delete": { de: "L\xF6schen", en: "Delete" }
    };
    return adminTranslations[key]?.[currentLocale] || key;
  };
  const [menuItems2, setMenuItems] = (0, import_react20.useState)([]);
  const [galleryImages, setGalleryImages] = (0, import_react20.useState)([]);
  const [events2, setEvents] = (0, import_react20.useState)([]);
  const [reservations2, setReservations] = (0, import_react20.useState)([]);
  const [feedbackList, setFeedbackList] = (0, import_react20.useState)([]);
  const [contactMessages2, setContactMessages] = (0, import_react20.useState)([]);
  const [eventBookings2, setEventBookings] = (0, import_react20.useState)([]);
  const [showMenuModal, setShowMenuModal] = (0, import_react20.useState)(false);
  const [showGalleryModal, setShowGalleryModal] = (0, import_react20.useState)(false);
  const [showEventModal, setShowEventModal] = (0, import_react20.useState)(false);
  const [showReservationModal, setShowReservationModal] = (0, import_react20.useState)(false);
  const [editingItem, setEditingItem] = (0, import_react20.useState)(null);
  const [formData, setFormData] = (0, import_react20.useState)({});
  (0, import_react20.useEffect)(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await adminAuth.checkAuth();
        if (authenticated) {
          const response = await fetch("/api/admin/session", {
            credentials: "include"
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  (0, import_react20.useEffect)(() => {
    if (isAuthenticated) {
      fetchMenuItems();
      fetchGalleryImages();
      fetchEvents();
      fetchEventBookings();
      fetchReservations();
      fetchFeedback();
      fetchContactMessages();
    }
  }, [isAuthenticated]);
  const handleLogout = async () => {
    await adminAuth.logout();
    window.location.href = "/de/admin/login";
  };
  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
    }
  };
  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGalleryImages(data);
    } catch (error) {
      console.error("Failed to fetch gallery images:", error);
    }
  };
  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };
  const fetchEventBookings = async () => {
    try {
      const response = await fetch("/api/admin/bookings", {
        credentials: "include"
      });
      const data = await response.json();
      setEventBookings(data);
    } catch (error) {
      console.error("Failed to fetch event bookings:", error);
    }
  };
  const fetchReservations = async () => {
    try {
      const response = await fetch("/api/reservations");
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };
  const fetchFeedback = async () => {
    try {
      const response = await fetch("/api/feedback");
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };
  const fetchContactMessages = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();
      setContactMessages(data);
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);
    }
  };
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ status })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update booking status");
      }
      await fetchEventBookings();
      await fetchEvents();
      console.log(`Booking ${bookingId} status updated to ${status}`);
    } catch (error) {
      console.error("Error updating booking status:", error);
      alert(`Failed to update booking: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteMenuItem = async (itemId) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const response = await fetch(`/api/admin/menu/${itemId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete menu item");
      await fetchMenuItems();
      console.log(`Menu item ${itemId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert(`Failed to delete menu item: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteGalleryImage = async (imageId) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`/api/admin/gallery/${imageId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete image");
      await fetchGalleryImages();
      console.log(`Gallery image ${imageId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      alert(`Failed to delete image: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event? All associated bookings will also be deleted.")) return;
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete event");
      await fetchEvents();
      await fetchEventBookings();
      console.log(`Event ${eventId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(`Failed to delete event: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteBooking = async (bookingId) => {
    if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
      return;
    }
    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete booking");
      }
      await fetchEventBookings();
      await fetchEvents();
      console.log(`Booking ${bookingId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert(`Failed to delete booking: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteReservation = async (reservationId) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    try {
      const response = await fetch(`/api/admin/reservations/${reservationId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete reservation");
      await fetchReservations();
      alert("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert(`Failed to delete reservation: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const updateReservationStatus = async (reservationId, status) => {
    try {
      const response = await fetch(`/api/admin/reservations/${reservationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Failed to update reservation status");
      await fetchReservations();
      alert(`Reservation status updated to ${status}!`);
    } catch (error) {
      console.error("Error updating reservation status:", error);
      alert(`Failed to update reservation: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteFeedback = async (feedbackId) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete feedback");
      await fetchFeedback();
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert(`Failed to delete feedback: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const approveFeedback = async (feedbackId) => {
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}/approve`, {
        method: "PATCH",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to approve feedback");
      await fetchFeedback();
      alert("Feedback approved successfully!");
    } catch (error) {
      console.error("Error approving feedback:", error);
      alert(`Failed to approve feedback: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const deleteContactMessage = async (messageId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`/api/admin/contact/${messageId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to delete message");
      await fetchContactMessages();
      alert("Message deleted successfully!");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert(`Failed to delete message: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  const markMessageAsReplied = async (messageId) => {
    try {
      const response = await fetch(`/api/admin/contact/${messageId}/reply`, {
        method: "PATCH",
        credentials: "include"
      });
      if (!response.ok) throw new Error("Failed to mark message as replied");
      await fetchContactMessages();
      alert("Message marked as replied!");
    } catch (error) {
      console.error("Error updating message:", error);
      alert(`Failed to update message: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ import_react20.default.createElement("div", { className: "min-h-screen bg-background flex items-center justify-center" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" }), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, t.loading)));
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ import_react20.default.createElement("div", { className: "min-h-screen bg-background flex items-center justify-center" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-center" }, /* @__PURE__ */ import_react20.default.createElement("h1", { className: "text-2xl font-serif font-bold text-foreground mb-4" }, t.accessRequired), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground mb-6" }, t.pleaseLogin), /* @__PURE__ */ import_react20.default.createElement(
      "a",
      {
        href: "/api/login",
        className: "inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      },
      t.login
    )));
  }
  return /* @__PURE__ */ import_react20.default.createElement("div", { className: "min-h-screen bg-background" }, /* @__PURE__ */ import_react20.default.createElement("style", { dangerouslySetInnerHTML: {
    __html: `
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `
  } }), /* @__PURE__ */ import_react20.default.createElement("header", { className: "bg-card border-b sticky top-0 z-10" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center justify-between h-14 sm:h-16" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center space-x-4" }, /* @__PURE__ */ import_react20.default.createElement("h1", { className: "text-xl sm:text-2xl font-serif font-bold text-foreground" }, adminT("admin.title")), user && /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs sm:text-sm text-muted-foreground hidden sm:inline" }, adminT("admin.welcome"), ", ", user.firstName || user.email || "User")), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: handleLogout,
      className: "text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-muted-foreground/20 hover:bg-muted/50"
    },
    adminT("admin.logout")
  )))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-card border-b" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react20.default.createElement("nav", { className: "flex overflow-x-auto space-x-1 sm:space-x-4 lg:space-x-8 scrollbar-hide py-2" }, [
    { id: "overview", label: isGerman ? "\xDCbersicht" : "Overview", icon: "\u{1F4CA}", shortLabel: isGerman ? "\xDCbersicht" : "Overview" },
    { id: "menu", label: isGerman ? "Speisekarte" : "Menu", icon: "\u{1F35D}", shortLabel: isGerman ? "Men\xFC" : "Menu" },
    { id: "gallery", label: isGerman ? "Galerie" : "Gallery", icon: "\u{1F4F8}", shortLabel: isGerman ? "Galerie" : "Gallery" },
    { id: "events", label: isGerman ? "Veranstaltungen" : "Events", icon: "\u{1F389}", shortLabel: isGerman ? "Events" : "Events" },
    { id: "bookings", label: isGerman ? "Buchungen" : "Bookings", icon: "\u{1F3AB}", shortLabel: isGerman ? "Buchungen" : "Bookings" },
    { id: "reservations", label: isGerman ? "Reservierungen" : "Reservations", icon: "\u{1F4C5}", shortLabel: isGerman ? "Reservierungen" : "Reservations" },
    { id: "feedback", label: isGerman ? "Feedback" : "Feedback", icon: "\u2B50", shortLabel: "Feedback" },
    { id: "contact", label: isGerman ? "Kontakt" : "Contact", icon: "\u{1F4E7}", shortLabel: "Contact" }
  ].map((tab) => /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      key: tab.id,
      onClick: () => setActiveTab(tab.id),
      className: `flex-shrink-0 flex items-center space-x-1 sm:space-x-2 py-3 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors rounded-t-lg ${activeTab === tab.id ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground hover:bg-muted/50"}`
    },
    /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-sm sm:text-base" }, tab.icon),
    /* @__PURE__ */ import_react20.default.createElement("span", { className: "hidden sm:inline" }, tab.label),
    /* @__PURE__ */ import_react20.default.createElement("span", { className: "sm:hidden" }, tab.shortLabel)
  ))))), /* @__PURE__ */ import_react20.default.createElement("main", { className: "max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8" }, activeTab === "overview" && /* @__PURE__ */ import_react20.default.createElement(
    AdminOverview,
    {
      locale: currentLocale,
      menuItems: menuItems2,
      galleryImages,
      events: events2,
      eventBookings: eventBookings2,
      reservations: reservations2,
      feedbackList,
      contactMessages: contactMessages2
    }
  ), activeTab === "menu" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-foreground" }, adminT("menu.title")), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(null);
        setShowMenuModal(true);
      },
      className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
    },
    adminT("menu.addNew")
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" }, menuItems2.map((item) => /* @__PURE__ */ import_react20.default.createElement("div", { key: item.id, className: "bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "font-serif font-semibold text-lg text-card-foreground" }, item.title), /* @__PURE__ */ import_react20.default.createElement("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}` }, item.isAvailable ? adminT("menu.available") : adminT("menu.unavailable"))), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-2" }, item.description), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-primary font-semibold" }, "\u20AC", item.price.toFixed(2)), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-1 rounded" }, item.category)), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center mt-4 pt-4 border-t" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(item);
        setShowMenuModal(true);
      },
      className: "text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
    },
    adminT("actions.edit")
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteMenuItem(item.id),
      className: "text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
    },
    adminT("actions.delete")
  )))))), activeTab === "gallery" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-foreground" }, t.gallery.title), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(null);
        setShowGalleryModal(true);
      },
      className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
    },
    t.gallery.uploadImage
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6" }, galleryImages.map((image) => /* @__PURE__ */ import_react20.default.createElement("div", { key: image.id, className: "bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow" }, /* @__PURE__ */ import_react20.default.createElement(
    "img",
    {
      src: image.imageUrl,
      alt: image.title,
      className: "w-full h-32 sm:h-48 object-cover"
    }
  ), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-2 sm:p-4" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "font-medium text-card-foreground mb-2 text-sm sm:text-base line-clamp-1" }, image.title), image.description && /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-xs sm:text-sm text-muted-foreground line-clamp-2 mb-3 hidden sm:block" }, image.description), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center space-y-1 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(image);
        setShowGalleryModal(true);
      },
      className: "text-xs sm:text-sm bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
    },
    t.actions.edit
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteGalleryImage(image.id),
      className: "text-xs sm:text-sm bg-red-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
    },
    t.actions.delete
  ))))))), activeTab === "events" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-foreground" }, t.events.title), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(null);
        setShowEventModal(true);
      },
      className: "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base w-full sm:w-auto"
    },
    t.events.createNew
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" }, events2.map((event) => /* @__PURE__ */ import_react20.default.createElement("div", { key: event.id, className: "bg-card rounded-lg border p-4 sm:p-6 hover:shadow-lg transition-shadow" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "font-serif font-semibold text-lg text-card-foreground" }, event.title_en), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-1 rounded" }, "\u20AC", event.price)), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-2" }, event.description_en), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center text-sm" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-primary font-medium" }, new Date(event.event_date).toLocaleDateString()), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-muted-foreground" }, event.current_attendees, "/", event.max_attendees, " ", t.events.attendees)), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row justify-between items-center mt-4 pt-4 border-t space-y-2 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(event);
        setShowEventModal(true);
      },
      className: "text-sm bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
    },
    t.actions.edit
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteEvent(event.id),
      className: "text-sm bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
    },
    t.actions.delete
  )))))), activeTab === "bookings" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-foreground" }, t.bookings.title), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-sm text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg" }, t.bookings.totalBookings, ": ", eventBookings2.length)), eventBookings2.length === 0 ? /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-center py-8 sm:py-12 bg-card rounded-lg border border-dashed" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-4xl sm:text-6xl mb-4" }, "\u{1F3AB}"), /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-lg sm:text-xl font-semibold text-foreground mb-2" }, t.bookings.noBookings), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-sm sm:text-base" }, t.bookings.noBookingsDesc)) : /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 gap-4 sm:gap-6" }, eventBookings2.map((booking) => {
    const event = events2.find((e) => e.id === booking.eventId);
    return /* @__PURE__ */ import_react20.default.createElement("div", { key: booking.id, className: "bg-card p-4 sm:p-6 rounded-lg border" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-xl font-semibold text-foreground mb-1" }, event ? event.title_en : `Event ID: ${booking.eventId}`), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-sm text-muted-foreground" }, t.bookings.booking, " #", booking.id, " \u2022 ", new Date(booking.created_at).toLocaleDateString())), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center space-x-2" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: `px-3 py-1 text-sm rounded-full ${booking.status === "confirmed" ? "bg-green-100 text-green-800" : booking.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}` }, booking.status === "confirmed" ? t.bookings.confirmed : booking.status === "pending" ? t.bookings.pending : t.bookings.cancelled), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-lg font-bold text-primary" }, "\u20AC", booking.totalAmount))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("p", { className: "font-medium text-foreground" }, t.bookings.customerDetails), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, booking.name), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, booking.email), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, booking.phone)), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("p", { className: "font-medium text-foreground" }, t.bookings.bookingDetails), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, t.bookings.guests, ": ", booking.guests), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, t.bookings.event, ": ", event ? new Date(event.event_date).toLocaleDateString() : "Unknown"), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, t.bookings.perPerson, ": \u20AC", event ? event.price : booking.totalAmount / booking.guests)), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("p", { className: "font-medium text-foreground" }, t.bookings.specialRequests), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground" }, booking.specialRequests || t.bookings.none))), booking.status === "pending" && /* @__PURE__ */ import_react20.default.createElement("div", { className: "mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" }, /* @__PURE__ */ import_react20.default.createElement(
      "button",
      {
        onClick: () => updateBookingStatus(booking.id, "confirmed"),
        className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm w-full sm:w-auto"
      },
      t.bookings.confirmBooking
    ), /* @__PURE__ */ import_react20.default.createElement(
      "button",
      {
        onClick: () => updateBookingStatus(booking.id, "cancelled"),
        className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm w-full sm:w-auto"
      },
      t.bookings.cancelBooking
    )), booking.status === "confirmed" && /* @__PURE__ */ import_react20.default.createElement("div", { className: "mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" }, /* @__PURE__ */ import_react20.default.createElement(
      "button",
      {
        onClick: () => updateBookingStatus(booking.id, "cancelled"),
        className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm w-full sm:w-auto"
      },
      t.bookings.cancelBooking
    ), /* @__PURE__ */ import_react20.default.createElement(
      "button",
      {
        onClick: () => deleteBooking(booking.id),
        className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm w-full sm:w-auto"
      },
      t.bookings.deleteBooking
    )));
  }))), activeTab === "reservations" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center mb-8" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-3xl font-serif font-bold text-foreground" }, "Reservations Management"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-4" }, /* @__PURE__ */ import_react20.default.createElement("select", { className: "border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm" }, /* @__PURE__ */ import_react20.default.createElement("option", { value: "all" }, "All Status"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "pending" }, "Pending"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "confirmed" }, "Confirmed"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "cancelled" }, "Cancelled")))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-card rounded-lg border overflow-hidden" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react20.default.createElement("table", { className: "w-full" }, /* @__PURE__ */ import_react20.default.createElement("thead", { className: "bg-muted/50" }, /* @__PURE__ */ import_react20.default.createElement("tr", null, /* @__PURE__ */ import_react20.default.createElement("th", { className: "text-left p-4 font-medium text-foreground" }, "Guest"), /* @__PURE__ */ import_react20.default.createElement("th", { className: "text-left p-4 font-medium text-foreground" }, "Date & Time"), /* @__PURE__ */ import_react20.default.createElement("th", { className: "text-left p-4 font-medium text-foreground" }, "Guests"), /* @__PURE__ */ import_react20.default.createElement("th", { className: "text-left p-4 font-medium text-foreground" }, "Status"), /* @__PURE__ */ import_react20.default.createElement("th", { className: "text-left p-4 font-medium text-foreground" }, "Actions"))), /* @__PURE__ */ import_react20.default.createElement("tbody", null, reservations2.slice(0, 10).map((reservation) => /* @__PURE__ */ import_react20.default.createElement("tr", { key: reservation.id, className: "border-t hover:bg-muted/20" }, /* @__PURE__ */ import_react20.default.createElement("td", { className: "p-4" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "font-medium text-foreground" }, reservation.name), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-sm text-muted-foreground" }, reservation.email), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-sm text-muted-foreground" }, reservation.phone))), /* @__PURE__ */ import_react20.default.createElement("td", { className: "p-4" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-sm" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "font-medium" }, reservation.date), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-muted-foreground" }, reservation.time))), /* @__PURE__ */ import_react20.default.createElement("td", { className: "p-4 text-sm" }, reservation.guests), /* @__PURE__ */ import_react20.default.createElement("td", { className: "p-4" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${reservation.status === "confirmed" ? "bg-green-100 text-green-800" : reservation.status === "pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}` }, reservation.status)), /* @__PURE__ */ import_react20.default.createElement("td", { className: "p-4" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-col space-y-1" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setEditingItem(reservation);
        setShowReservationModal(true);
      },
      className: "text-primary hover:text-primary/80 text-sm font-medium"
    },
    "Edit"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteReservation(reservation.id),
      className: "text-red-600 hover:text-red-500 text-sm font-medium"
    },
    "Delete"
  )), reservation.status === "pending" && /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-1" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => updateReservationStatus(reservation.id, "confirmed"),
      className: "text-green-600 hover:text-green-500 text-xs font-medium"
    },
    "Confirm"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => updateReservationStatus(reservation.id, "cancelled"),
      className: "text-red-600 hover:text-red-500 text-xs font-medium"
    },
    "Cancel"
  ))))))))))), activeTab === "feedback" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center mb-8" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-3xl font-serif font-bold text-foreground" }, "Feedback & Reviews"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-4" }, /* @__PURE__ */ import_react20.default.createElement("select", { className: "border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm" }, /* @__PURE__ */ import_react20.default.createElement("option", { value: "all" }, "All Ratings"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "5" }, "5 Stars"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "4" }, "4 Stars"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "3" }, "3 Stars"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "2" }, "2 Stars"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "1" }, "1 Star")))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6" }, feedbackList.map((feedback) => /* @__PURE__ */ import_react20.default.createElement("div", { key: feedback.id, className: "bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "font-medium text-card-foreground" }, feedback.name), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-sm text-muted-foreground" }, feedback.email)), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex text-yellow-400" }, [...Array(5)].map((_, i) => /* @__PURE__ */ import_react20.default.createElement("span", { key: i, className: i < feedback.rating ? "text-yellow-400" : "text-gray-300" }, "\u2B50")))), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-3" }, feedback.experience), feedback.suggestions && /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-xs mb-4 line-clamp-2" }, /* @__PURE__ */ import_react20.default.createElement("strong", null, "Suggestions:"), " ", feedback.suggestions), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center text-xs text-muted-foreground" }, /* @__PURE__ */ import_react20.default.createElement("span", null, new Date(feedback.created_at).toLocaleDateString()), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => approveFeedback(feedback.id),
      className: "text-green-600 hover:text-green-500 font-medium"
    },
    "Approve"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteFeedback(feedback.id),
      className: "text-red-600 hover:text-red-500 font-medium"
    },
    "Delete"
  ))))))), activeTab === "contact" && /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center mb-8" }, /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-3xl font-serif font-bold text-foreground" }, "Contact Messages"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-4" }, /* @__PURE__ */ import_react20.default.createElement("select", { className: "border border-muted-foreground/20 rounded-lg px-3 py-2 text-sm" }, /* @__PURE__ */ import_react20.default.createElement("option", { value: "all" }, "All Messages"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "unread" }, "Unread"), /* @__PURE__ */ import_react20.default.createElement("option", { value: "replied" }, "Replied")))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-4" }, contactMessages2.map((message) => /* @__PURE__ */ import_react20.default.createElement("div", { key: message.id, className: "bg-card rounded-lg border p-6 hover:shadow-lg transition-shadow" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-start mb-4" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "font-medium text-card-foreground" }, message.name), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-sm text-muted-foreground" }, message.email), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-sm font-medium text-foreground mt-1" }, message.subject)), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-muted-foreground" }, new Date(message.createdAt).toLocaleDateString())), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-muted-foreground text-sm mb-4 line-clamp-3" }, message.message), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex justify-between items-center" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, "New"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex space-x-2" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => markMessageAsReplied(message.id),
      className: "text-primary hover:text-primary/80 text-sm font-medium"
    },
    "Mark Replied"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => deleteContactMessage(message.id),
      className: "text-red-600 hover:text-red-500 text-sm font-medium"
    },
    "Delete"
  )))))))), showMenuModal && /* @__PURE__ */ import_react20.default.createElement("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-card rounded-lg p-6 w-full max-w-md" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-xl font-semibold mb-4" }, editingItem ? "Edit Menu Item" : "Add New Menu Item"), /* @__PURE__ */ import_react20.default.createElement("form", { onSubmit: async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData2 = new FormData(form);
    const itemData = {
      title: formData2.get("title"),
      description: formData2.get("description"),
      price: parseFloat(formData2.get("price")),
      category: formData2.get("category"),
      isAvailable: true
    };
    try {
      const url = editingItem ? `/api/admin/menu/${editingItem.id}` : "/api/admin/menu";
      const method = editingItem ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(itemData)
      });
      if (!response.ok) throw new Error("Failed to save menu item");
      await fetchMenuItems();
      setShowMenuModal(false);
      setEditingItem(null);
      alert(editingItem ? "Menu item updated successfully!" : "Menu item created successfully!");
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  } }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "title",
      type: "text",
      placeholder: "Item Title",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.title || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "textarea",
    {
      name: "description",
      placeholder: "Description",
      className: "w-full p-3 border rounded-lg h-24",
      defaultValue: editingItem?.description || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "price",
      type: "number",
      placeholder: "Price",
      step: "0.01",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.price || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "select",
    {
      name: "category",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.category || "",
      required: true
    },
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "" }, "Select Category"),
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "Antipasti" }, "Antipasti"),
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "Primi" }, "Primi"),
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "Secondi" }, "Secondi"),
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "Dolci" }, "Dolci"),
    /* @__PURE__ */ import_react20.default.createElement("option", { value: "Bevande" }, "Bevande")
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex gap-3 mt-6" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "submit",
      className: "flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
    },
    editingItem ? "Update" : "Create"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowMenuModal(false),
      className: "flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
    },
    "Cancel"
  ))))), showGalleryModal && /* @__PURE__ */ import_react20.default.createElement("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-card rounded-lg p-6 w-full max-w-md" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-xl font-semibold mb-4" }, editingItem ? "Edit Gallery Image" : "Upload New Image"), /* @__PURE__ */ import_react20.default.createElement("form", { onSubmit: async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData2 = new FormData(form);
    const imageData = {
      title: formData2.get("title"),
      imageUrl: formData2.get("imageUrl"),
      description: formData2.get("description") || ""
    };
    try {
      const url = editingItem ? `/api/admin/gallery/${editingItem.id}` : "/api/admin/gallery";
      const method = editingItem ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(imageData)
      });
      if (!response.ok) throw new Error("Failed to save gallery image");
      await fetchGalleryImages();
      setShowGalleryModal(false);
      setEditingItem(null);
      alert(editingItem ? "Gallery image updated successfully!" : "Gallery image uploaded successfully!");
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  } }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "title",
      type: "text",
      placeholder: "Image Title",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.title || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "imageUrl",
      type: "url",
      placeholder: "Image URL",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.imageUrl || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "textarea",
    {
      name: "description",
      placeholder: "Description (optional)",
      className: "w-full p-3 border rounded-lg h-24",
      defaultValue: editingItem?.description || ""
    }
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex gap-3 mt-6" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "submit",
      className: "flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
    },
    editingItem ? "Update" : "Upload"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowGalleryModal(false),
      className: "flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
    },
    "Cancel"
  ))))), showEventModal && /* @__PURE__ */ import_react20.default.createElement("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "bg-card rounded-lg p-6 w-full max-w-md" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-xl font-semibold mb-4" }, editingItem ? "Edit Event" : "Create New Event"), /* @__PURE__ */ import_react20.default.createElement("form", { onSubmit: async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData2 = new FormData(form);
    const eventData = {
      title_en: formData2.get("title_en"),
      title_de: formData2.get("title_de"),
      description_en: formData2.get("description_en"),
      description_de: formData2.get("description_de") || "",
      event_date: formData2.get("event_date"),
      price: parseFloat(formData2.get("price")),
      max_attendees: parseInt(formData2.get("max_attendees")),
      current_attendees: editingItem?.current_attendees || 0
    };
    try {
      const url = editingItem ? `/api/events/${editingItem.id}` : "/api/events";
      const method = editingItem ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData)
      });
      if (!response.ok) throw new Error("Failed to save event");
      await fetchEvents();
      setShowEventModal(false);
      setEditingItem(null);
      alert(editingItem ? "Event updated successfully!" : "Event created successfully!");
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  } }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "title_en",
      type: "text",
      placeholder: "Event Title (English)",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.title_en || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "title_de",
      type: "text",
      placeholder: "Event Title (German)",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.title_de || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "textarea",
    {
      name: "description_en",
      placeholder: "Description (English)",
      className: "w-full p-3 border rounded-lg h-24",
      defaultValue: editingItem?.description_en || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "textarea",
    {
      name: "description_de",
      placeholder: "Description (German)",
      className: "w-full p-3 border rounded-lg h-24",
      defaultValue: editingItem?.description_de || ""
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "event_date",
      type: "datetime-local",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.event_date ? new Date(editingItem.event_date).toISOString().slice(0, 16) : "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "price",
      type: "number",
      placeholder: "Price per person",
      step: "0.01",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.price || "",
      required: true
    }
  ), /* @__PURE__ */ import_react20.default.createElement(
    "input",
    {
      name: "max_attendees",
      type: "number",
      placeholder: "Max attendees",
      className: "w-full p-3 border rounded-lg",
      defaultValue: editingItem?.max_attendees || "",
      required: true
    }
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex gap-3 mt-6" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "submit",
      className: "flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90"
    },
    editingItem ? "Update" : "Create"
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowEventModal(false),
      className: "flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
    },
    "Cancel"
  ))))));
}

// src/pages/AdminLoginPage.tsx
var import_react21 = __toESM(require("react"), 1);
function AdminLoginPage() {
  const [formData, setFormData] = (0, import_react21.useState)({
    identifier: "",
    // Can be email or username
    password: ""
  });
  const [isLoading, setIsLoading] = (0, import_react21.useState)(false);
  const [error, setError] = (0, import_react21.useState)("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const result = await adminAuth.login(formData.identifier, formData.password);
      if (result.success) {
        const redirectTo = result.redirectTo || `/${window.location.pathname.split("/")[1] || "de"}/admin/dashboard`;
        window.location.href = redirectTo;
      } else {
        setError("Invalid credentials. Please check your email/username and password.");
      }
    } catch (error2) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return /* @__PURE__ */ import_react21.default.createElement("div", { style: {
    minHeight: "100vh",
    backgroundColor: "#FEF9F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, Arial, sans-serif"
  } }, /* @__PURE__ */ import_react21.default.createElement("div", { style: {
    maxWidth: "448px",
    width: "100%",
    padding: "32px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
  } }, /* @__PURE__ */ import_react21.default.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ import_react21.default.createElement("h1", { style: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "8px",
    margin: "0 0 8px 0",
    fontFamily: "Playfair Display, serif"
  } }, "La Cantina Berlin"), /* @__PURE__ */ import_react21.default.createElement("p", { style: {
    fontSize: "16px",
    color: "#6B7280",
    margin: 0
  } }, "Admin Panel Access")), /* @__PURE__ */ import_react21.default.createElement("form", { onSubmit: handleSubmit, style: { display: "flex", flexDirection: "column", gap: "20px" } }, /* @__PURE__ */ import_react21.default.createElement("div", null, /* @__PURE__ */ import_react21.default.createElement(
    "label",
    {
      htmlFor: "identifier",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "6px"
      }
    },
    "Email or Username"
  ), /* @__PURE__ */ import_react21.default.createElement(
    "input",
    {
      type: "text",
      id: "identifier",
      name: "identifier",
      value: formData.identifier,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        fontSize: "16px",
        backgroundColor: "white",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
      },
      onFocus: (e) => {
        e.target.style.borderColor = "#C4834C";
        e.target.style.boxShadow = "0 0 0 3px rgba(196, 131, 76, 0.1)";
      },
      onBlur: (e) => {
        e.target.style.borderColor = "#D1D5DB";
        e.target.style.boxShadow = "none";
      },
      placeholder: "Enter your email or username"
    }
  )), /* @__PURE__ */ import_react21.default.createElement("div", null, /* @__PURE__ */ import_react21.default.createElement(
    "label",
    {
      htmlFor: "password",
      style: {
        display: "block",
        fontSize: "14px",
        fontWeight: "500",
        color: "#374151",
        marginBottom: "6px"
      }
    },
    "Password"
  ), /* @__PURE__ */ import_react21.default.createElement(
    "input",
    {
      type: "password",
      id: "password",
      name: "password",
      value: formData.password,
      onChange: handleInputChange,
      required: true,
      style: {
        width: "100%",
        padding: "12px 16px",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        fontSize: "16px",
        backgroundColor: "white",
        boxSizing: "border-box",
        outline: "none",
        transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out"
      },
      onFocus: (e) => {
        e.target.style.borderColor = "#C4834C";
        e.target.style.boxShadow = "0 0 0 3px rgba(196, 131, 76, 0.1)";
      },
      onBlur: (e) => {
        e.target.style.borderColor = "#D1D5DB";
        e.target.style.boxShadow = "none";
      },
      placeholder: "Enter your password"
    }
  )), error && /* @__PURE__ */ import_react21.default.createElement("div", { style: {
    padding: "12px",
    backgroundColor: "#FEE2E2",
    border: "1px solid #FCA5A5",
    borderRadius: "8px",
    color: "#B91C1C",
    fontSize: "14px",
    textAlign: "center"
  } }, error), /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isLoading,
      style: {
        width: "100%",
        padding: "12px 24px",
        backgroundColor: isLoading ? "#9CA3AF" : "#C4834C",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: isLoading ? "not-allowed" : "pointer",
        transition: "background-color 0.15s ease-in-out",
        outline: "none"
      },
      onMouseEnter: (e) => {
        if (!isLoading) {
          e.target.style.backgroundColor = "#A16A35";
        }
      },
      onMouseLeave: (e) => {
        if (!isLoading) {
          e.target.style.backgroundColor = "#C4834C";
        }
      }
    },
    isLoading ? "Signing in..." : "Sign In"
  ))));
}

// src/pages/AdminTestPage.tsx
var import_react22 = __toESM(require("react"), 1);
function AdminTestPage() {
  const [authStatus, setAuthStatus] = (0, import_react22.useState)("Testing...");
  const [sessionData, setSessionData] = (0, import_react22.useState)(null);
  const [loginResult, setLoginResult] = (0, import_react22.useState)("");
  (0, import_react22.useEffect)(() => {
    testAuth();
  }, []);
  const testAuth = async () => {
    try {
      const isAuth = await adminAuth.checkAuth();
      setAuthStatus(`Auth Check: ${isAuth ? "AUTHENTICATED" : "NOT AUTHENTICATED"}`);
      const response = await fetch("/api/admin/session", {
        credentials: "include"
      });
      const sessionData2 = await response.json();
      setSessionData(sessionData2);
    } catch (error) {
      setAuthStatus(`Error: ${error}`);
    }
  };
  const testLogin = async () => {
    try {
      const result = await adminAuth.login("ergysonuzi12@gmail.com", "Xharie123");
      setLoginResult(`Login Result: ${JSON.stringify(result)}`);
      setTimeout(testAuth, 1e3);
    } catch (error) {
      setLoginResult(`Login Error: ${error}`);
    }
  };
  return /* @__PURE__ */ import_react22.default.createElement("div", { style: { padding: "20px", fontFamily: "monospace" } }, /* @__PURE__ */ import_react22.default.createElement("h1", null, "Admin Authentication Test"), /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ import_react22.default.createElement("h3", null, "Current Status:"), /* @__PURE__ */ import_react22.default.createElement("p", null, authStatus)), /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ import_react22.default.createElement("h3", null, "Session Data:"), /* @__PURE__ */ import_react22.default.createElement("pre", null, JSON.stringify(sessionData, null, 2))), /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ import_react22.default.createElement("button", { onClick: testLogin, style: { padding: "10px 20px" } }, "Test Login"), /* @__PURE__ */ import_react22.default.createElement("p", null, loginResult)), /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ import_react22.default.createElement("button", { onClick: testAuth, style: { padding: "10px 20px" } }, "Refresh Auth Status")), /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginBottom: "20px" } }, /* @__PURE__ */ import_react22.default.createElement("h3", null, "Quick Login Form:"), /* @__PURE__ */ import_react22.default.createElement("form", { onSubmit: (e) => {
    e.preventDefault();
    testLogin();
  } }, /* @__PURE__ */ import_react22.default.createElement("div", null, "Email: ergysonuzi12@gmail.com"), /* @__PURE__ */ import_react22.default.createElement("div", null, "Password: Xharie123"), /* @__PURE__ */ import_react22.default.createElement("button", { type: "submit" }, "Quick Login"))));
}

// src/pages/NotFoundPage.tsx
var import_react23 = __toESM(require("react"), 1);
var import_react_router_dom11 = require("react-router-dom");
function NotFoundPage() {
  return /* @__PURE__ */ import_react23.default.createElement("div", { style: {
    minHeight: "100vh",
    backgroundColor: "#F9FAFB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif"
  } }, /* @__PURE__ */ import_react23.default.createElement("div", { style: { textAlign: "center" } }, /* @__PURE__ */ import_react23.default.createElement("h1", { style: {
    fontSize: "72px",
    fontWeight: "bold",
    color: "#111827",
    marginBottom: "16px",
    margin: "0 0 16px 0"
  } }, "404"), /* @__PURE__ */ import_react23.default.createElement("h2", { style: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "16px",
    margin: "0 0 16px 0"
  } }, "Page Not Found"), /* @__PURE__ */ import_react23.default.createElement("p", { style: {
    color: "#4B5563",
    marginBottom: "32px",
    margin: "0 0 32px 0",
    fontSize: "16px"
  } }, "The page you're looking for doesn't exist."), /* @__PURE__ */ import_react23.default.createElement(
    import_react_router_dom11.Link,
    {
      to: "/",
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: "12px 24px",
        border: "none",
        fontSize: "16px",
        fontWeight: "500",
        borderRadius: "6px",
        color: "white",
        backgroundColor: "#d4a574",
        textDecoration: "none",
        transition: "background-color 0.2s"
      },
      onMouseOver: (e) => e.currentTarget.style.backgroundColor = "#c19658",
      onMouseOut: (e) => e.currentTarget.style.backgroundColor = "#d4a574"
    },
    "Back to Home"
  )));
}

// src/App.tsx
function App() {
  return /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Routes, null, /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "/", element: /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Navigate, { to: "/de", replace: true }) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "/admin", element: /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Navigate, { to: "/de/admin/login", replace: true }) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "/admin/login", element: /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Navigate, { to: "/de/admin/login", replace: true }) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "/:locale", element: /* @__PURE__ */ import_react24.default.createElement(SimpleLayout, null) }, /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { index: true, element: /* @__PURE__ */ import_react24.default.createElement(HomePage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "test", element: /* @__PURE__ */ import_react24.default.createElement(TestPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "menu", element: /* @__PURE__ */ import_react24.default.createElement(MenuPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "gallery", element: /* @__PURE__ */ import_react24.default.createElement(GalleryPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "reservations", element: /* @__PURE__ */ import_react24.default.createElement(ReservationsPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "events", element: /* @__PURE__ */ import_react24.default.createElement(EventsPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "events/:id", element: /* @__PURE__ */ import_react24.default.createElement(EventDetailPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "contact", element: /* @__PURE__ */ import_react24.default.createElement(ContactPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "feedback", element: /* @__PURE__ */ import_react24.default.createElement(FeedbackPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "legal", element: /* @__PURE__ */ import_react24.default.createElement(LegalPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "blog", element: /* @__PURE__ */ import_react24.default.createElement(BlogPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "instagram", element: /* @__PURE__ */ import_react24.default.createElement(InstagramPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "admin", element: /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Navigate, { to: "admin/login", replace: true }) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "admin/login", element: /* @__PURE__ */ import_react24.default.createElement(AdminLoginPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "admin/test", element: /* @__PURE__ */ import_react24.default.createElement(AdminTestPage, null) }), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "admin/*", element: /* @__PURE__ */ import_react24.default.createElement(AdminPage, null) })), /* @__PURE__ */ import_react24.default.createElement(import_react_router_dom12.Route, { path: "*", element: /* @__PURE__ */ import_react24.default.createElement(NotFoundPage, null) }));
}
var App_default = App;

// server/ssr.tsx
function renderPage(options) {
  const { url, locale, menuItems: menuItems2 = [], reviewsData, seoTitle, seoDescription, ogImage } = options;
  const queryClient = new import_react_query.QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false
      }
    }
  });
  if (menuItems2.length > 0) {
    queryClient.setQueryData(["/api/menu"], menuItems2);
  }
  if (reviewsData) {
    queryClient.setQueryData(["/api/reviews"], reviewsData);
    queryClient.setQueryData(["/api/google-reviews"], reviewsData);
  }
  const appHTML = (0, import_server.renderToString)(
    /* @__PURE__ */ import_react25.default.createElement(import_react_query.QueryClientProvider, { client: queryClient }, /* @__PURE__ */ import_react25.default.createElement(import_react_router_dom13.MemoryRouter, { initialEntries: [url], initialIndex: 0 }, /* @__PURE__ */ import_react25.default.createElement(App_default, null)))
  );
  const dehydratedState = JSON.stringify(queryClient.getQueryCache().getAll());
  return generateHTML({
    appHTML,
    dehydratedState,
    locale,
    seoTitle: seoTitle || "La Cantina Berlin - Authentic Italian Restaurant",
    seoDescription: seoDescription || "Authentic Italian cuisine in the heart of Berlin. Experience traditional flavors at Ristorante La Cantina Bleibtreu.",
    ogImage: ogImage || "/og.jpg",
    url,
    reviewsData
  });
}
function generateHTML(options) {
  const { appHTML, dehydratedState, locale, seoTitle, seoDescription, ogImage, url, reviewsData } = options;
  const SITE_URL = "https://lacantina-berlin.de";
  const ASSET_BASE = "https://lacantina-berlin.de";
  const cleanPath = url.replace(/^\/(de|en)/, "") || "/";
  const canonicalUrl = `${SITE_URL}${url}`;
  const alternateUrl = locale === "de" ? `${SITE_URL}/en${cleanPath === "/" ? "" : cleanPath}` : `${SITE_URL}/de${cleanPath === "/" ? "" : cleanPath}`;
  const defaultUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const resolvedOgImage = ogImage.startsWith("http") ? ogImage : `${ASSET_BASE}${ogImage}`;
  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${seoTitle}</title>
    <meta name="description" content="${seoDescription}" />
    
    <!-- Enhanced SEO Meta Tags -->
    <meta name="keywords" content="${locale === "de" ? "Italienisches Restaurant Berlin, Pasta Berlin, Pizza Berlin, Italiener Charlottenburg, Ristorante Berlin" : "Italian Restaurant Berlin, Pasta Berlin, Pizza Berlin, Italian Food Berlin, Ristorante Berlin"}" />
    <meta name="author" content="Ristorante La Cantina Bleibtreu" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <meta name="bingbot" content="index, follow" />
    <meta name="geo.region" content="DE-BE" />
    <meta name="geo.placename" content="Berlin" />
    <meta name="geo.position" content="52.5033;13.3298" />
    <meta name="ICBM" content="52.5033, 13.3298" />
    
    <!-- Favicon and Icons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />

    <!-- Enhanced Open Graph Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="Ristorante La Cantina Bleibtreu" />
    <meta property="og:title" content="${seoTitle}" />
    <meta property="og:description" content="${seoDescription}" />
    <meta property="og:image" content="${resolvedOgImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Ristorante La Cantina Bleibtreu - Authentic Italian Restaurant in Berlin" />
    <meta property="og:locale" content="${locale === "de" ? "de_DE" : "en_US"}" />
    <meta property="og:locale:alternate" content="${locale === "de" ? "en_US" : "de_DE"}" />

    <!-- Enhanced Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lacantina_berlin" />
    <meta name="twitter:title" content="${seoTitle}" />
    <meta name="twitter:description" content="${seoDescription}" />
    <meta name="twitter:image" content="${resolvedOgImage}" />
    <meta name="twitter:image:alt" content="Authentic Italian Restaurant in Berlin" />

    <!-- Canonical URL and Language Alternates -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="de" href="${SITE_URL}/de${cleanPath === "/" ? "" : cleanPath}" />
    <link rel="alternate" hreflang="en" href="${SITE_URL}/en${cleanPath === "/" ? "" : cleanPath}" />
    <link rel="alternate" hreflang="x-default" href="${defaultUrl}" />
    
    <!-- Enhanced Structured Data for Restaurant -->
    <script type="application/ld+json">
    ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Restaurant", "LocalBusiness"],
    "@id": `${SITE_URL}/#restaurant`,
    "name": "Ristorante La Cantina Bleibtreu",
    "alternateName": "La Cantina Berlin",
    "description": seoDescription,
    "url": SITE_URL,
    "sameAs": [
      "https://www.facebook.com/lacantina.berlin",
      "https://www.instagram.com/lacantina.berlin",
      "https://www.google.com/maps/place/Bleibtreustra%C3%9Fe+17,+10623+Berlin"
    ],
    "telephone": "+49 30 8832156",
    "email": "info@ristorante-la-cantina.de",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Bleibtreustra\xDFe 17",
      "addressLocality": "Berlin",
      "addressRegion": "Berlin",
      "postalCode": "10623",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 52.5033,
      "longitude": 13.3298
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "15:00",
        "closes": "23:00"
      }
    ],
    "servesCuisine": ["Italian", "Mediterranean"],
    "priceRange": "\u20AC20-30",
    "currenciesAccepted": "EUR",
    "paymentAccepted": ["Cash", "Credit Card", "Debit Card"],
    "hasMenu": `${SITE_URL}/${locale}/menu`,
    "acceptsReservations": true,
    "smokingAllowed": false,
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Reservations",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Takeout",
        "value": true
      }
    ],
    ...reviewsData && reviewsData.place_info?.rating > 0 && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": reviewsData.place_info.rating,
        "reviewCount": reviewsData.place_info.user_ratings_total || reviewsData.reviews.length,
        "bestRating": 5,
        "worstRating": 1
      }
    },
    ...reviewsData && reviewsData.reviews.length > 0 && {
      "review": reviewsData.reviews.slice(0, 3).map((review) => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating || 5,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": review.author_name || "Google User"
        },
        "reviewBody": (review.text || "").substring(0, 200) + ((review.text || "").length > 200 ? "..." : ""),
        "datePublished": review.time ? new Date(review.time * 1e3).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
      }))
    }
  }, null, 2)}
    </script>
    
    <!-- Website Structured Data -->
    <script type="application/ld+json">
    ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    "name": "Ristorante La Cantina Bleibtreu",
    "url": SITE_URL,
    "description": locale === "de" ? "Offizielle Website des Ristorante La Cantina Bleibtreu - Authentisches italienisches Restaurant in Berlin-Charlottenburg" : "Official website of Ristorante La Cantina Bleibtreu - Authentic Italian restaurant in Berlin-Charlottenburg",
    "inLanguage": locale === "de" ? "de-DE" : "en-US",
    "publisher": {
      "@type": "Restaurant",
      "name": "Ristorante La Cantina Bleibtreu"
    }
  }, null, 2)}
    </script>
  </head>
  <body>
    <div id="root">${appHTML}</div>
    <script>
      window.__REACT_QUERY_STATE__ = ${dehydratedState};
    </script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

// server/services/googleReviews.ts
var import_crypto = __toESM(require("crypto"), 1);
var CACHE_DURATION2 = 6 * 60 * 60 * 1e3;
var reviewsCache = /* @__PURE__ */ new Map();
var GOOGLE_PLACES_BASE_URL = "https://maps.googleapis.com/maps/api/place";
var GoogleReviewsService = class {
  static initialize() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.placeId = process.env.GOOGLE_PLACE_ID;
    if (!this.apiKey || !this.placeId) {
      console.warn("\u26A0\uFE0F Google Reviews: Missing API key or Place ID");
      return false;
    }
    console.log("\u2705 Google Reviews service initialized");
    return true;
  }
  static async fetchPlaceDetails() {
    if (!this.apiKey || !this.placeId) {
      throw new Error("Google Places API not configured");
    }
    const cacheKey = `place_details_${this.placeId}`;
    const cached = reviewsCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION2) {
      console.log("\u{1F4CB} Using cached Google Place details");
      return cached.data;
    }
    try {
      const url = new URL(`${GOOGLE_PLACES_BASE_URL}/details/json`);
      url.searchParams.set("place_id", this.placeId);
      url.searchParams.set("key", this.apiKey);
      url.searchParams.set("fields", "name,rating,reviews,user_ratings_total,formatted_address,website,formatted_phone_number");
      url.searchParams.set("language", "en");
      url.searchParams.set("reviews_sort", "newest");
      console.log("\u{1F310} Fetching Google Place details...");
      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "User-Agent": "La-Cantina-Restaurant/1.0"
        },
        // Security: Set timeouts and size limits
        signal: AbortSignal.timeout(1e4)
        // 10 second timeout
      });
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (data.status !== "OK") {
        throw new Error(`Google Places API status: ${data.status} - ${data.error_message || "Unknown error"}`);
      }
      reviewsCache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      console.log(`\u2705 Fetched Google Place details: ${data.result?.name || "Unknown"} (${data.result?.reviews?.length || 0} reviews)`);
      return data;
    } catch (error) {
      console.error("\u274C Failed to fetch Google Place details:", error.message);
      if (cached) {
        console.log("\u{1F4CB} Falling back to stale cached data");
        return cached.data;
      }
      throw error;
    }
  }
  static sanitizeReview(review) {
    const reviewId = import_crypto.default.createHash("sha256").update(`${review.author_name}-${review.time}-${review.text.substring(0, 50)}`).digest("hex").substring(0, 16);
    const sanitizedText = review.text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "").replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
    const sanitizedAuthorName = review.author_name.replace(/[<>]/g, "").replace(/script/gi, "").trim().substring(0, 100);
    return {
      id: reviewId,
      author_name: sanitizedAuthorName,
      rating: Math.max(1, Math.min(5, Math.floor(review.rating))),
      // Ensure rating is 1-5
      text: sanitizedText.substring(0, 1e3),
      // Limit text length
      time: review.time,
      relative_time_description: review.relative_time_description || "Recently",
      created_at: new Date(review.time * 1e3).toISOString()
    };
  }
  static async getReviews() {
    try {
      const cacheKey = `place_details_${this.placeId}`;
      const cached = reviewsCache.get(cacheKey);
      const isCachedData = cached && Date.now() - cached.timestamp < CACHE_DURATION2;
      const data = await this.fetchPlaceDetails();
      const result = data.result;
      if (!result) {
        throw new Error("No place data received from Google Places API");
      }
      const rawReviews = result.reviews || [];
      const sanitizedReviews = rawReviews.filter((review) => {
        return review.author_name && review.text && review.rating >= 1 && review.rating <= 5 && review.text.length >= 10 && // Minimum meaningful review length
        review.text.length <= 2e3;
      }).map((review) => this.sanitizeReview(review)).sort((a, b) => b.time - a.time);
      const placeInfo = {
        name: result.name || "La Cantina Berlin",
        rating: Math.round((result.rating || 0) * 10) / 10,
        // Round to 1 decimal
        user_ratings_total: result.user_ratings_total || 0,
        formatted_address: result.formatted_address
      };
      console.log(`\u{1F4CA} Processed ${sanitizedReviews.length} reviews for ${placeInfo.name} ${isCachedData ? "(cached)" : "(fresh)"}`);
      return {
        reviews: sanitizedReviews,
        place_info: placeInfo,
        cached: isCachedData,
        fetched_at: cached ? new Date(cached.timestamp).toISOString() : (/* @__PURE__ */ new Date()).toISOString()
      };
    } catch (error) {
      console.error("\u274C Error getting reviews:", error.message);
      return {
        reviews: [],
        place_info: {
          name: "La Cantina Berlin",
          rating: 0,
          user_ratings_total: 0
        },
        cached: false,
        fetched_at: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
  }
  static clearCache() {
    reviewsCache.clear();
    console.log("\u{1F9F9} Google Reviews cache cleared");
  }
  static getCacheStats() {
    return {
      cache_entries: reviewsCache.size,
      cache_keys: Array.from(reviewsCache.keys())
    };
  }
};

// server/routes/ssr.ts
var router2 = import_express2.default.Router();
router2.get(["/", "/de", "/en"], async (req, res) => {
  try {
    const locale = req.path === "/en" ? "en" : "de";
    const url = req.path === "/" ? "/de" : req.path;
    let reviewsData = null;
    try {
      reviewsData = await GoogleReviewsService.getReviews();
      console.log(`\u{1F4CA} SSR: Loaded ${reviewsData.reviews.length} reviews for SEO`);
    } catch (error) {
      console.warn("\u26A0\uFE0F SSR: Failed to load reviews for SEO:", error);
    }
    const seoTitle = locale === "de" ? "La Cantina Berlin - Authentische Italienische K\xFCche | Ristorante" : "La Cantina Berlin - Authentic Italian Restaurant | Fine Dining";
    let seoDescription = locale === "de" ? "Authentische italienische K\xFCche im Herzen Berlins. Traditionelle Aromen im Ristorante La Cantina Bleibtreu. Tisch reservieren." : "Authentic Italian cuisine in the heart of Berlin. Experience traditional flavors at Ristorante La Cantina Bleibtreu. Book a table.";
    if (reviewsData && reviewsData.reviews.length > 0) {
      const avgRating = reviewsData.place_info.rating || 0;
      const reviewCount = reviewsData.place_info.user_ratings_total || 0;
      if (avgRating > 0) {
        seoDescription += locale === "de" ? ` \u2B50 ${avgRating}/5 Sterne (${reviewCount} Bewertungen) auf Google.` : ` \u2B50 ${avgRating}/5 stars (${reviewCount} reviews) on Google.`;
      }
    }
    const html = renderPage({
      url,
      locale,
      reviewsData,
      // Pass reviews data for SSR
      seoTitle,
      seoDescription,
      ogImage: "/og.jpg"
    });
    res.send(html);
  } catch (error) {
    console.error("SSR Error for landing page:", error);
    res.status(500).send("Internal Server Error");
  }
});
router2.get(["/de/menu", "/en/menu"], async (req, res) => {
  try {
    const locale = req.path.startsWith("/en") ? "en" : "de";
    const menuItemsData = await db.select().from(menuItems);
    const seoTitle = locale === "de" ? "Speisekarte - La Cantina Berlin | Italienische K\xFCche" : "Menu - La Cantina Berlin | Italian Cuisine";
    const seoDescription = locale === "de" ? `Entdecken Sie unsere authentische italienische Speisekarte mit ${menuItemsData.length} k\xF6stlichen Gerichten. Hausgemachte Pasta, frischer Fisch und traditionelle Rezepte.` : `Discover our authentic Italian menu with ${menuItemsData.length} delicious dishes. Homemade pasta, fresh fish and traditional recipes.`;
    const html = renderPage({
      url: req.path,
      locale,
      menuItems: menuItemsData,
      seoTitle,
      seoDescription,
      ogImage: "/og.jpg"
    });
    res.send(html);
  } catch (error) {
    console.error("SSR Error for menu page:", error);
    res.status(500).send("Internal Server Error");
  }
});
var ssr_default = router2;

// server/routes/menu.ts
var import_express4 = __toESM(require("express"), 1);
var import_drizzle_orm4 = require("drizzle-orm");

// server/routes/admin.ts
var import_express3 = __toESM(require("express"), 1);
var import_crypto2 = require("crypto");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_drizzle_orm3 = require("drizzle-orm");

// server/middleware/validation.ts
var import_express_validator = require("express-validator");
var handleValidationErrors = (req, res, next) => {
  const errors = (0, import_express_validator.validationResult)(req);
  if (!errors.isEmpty()) {
    console.warn(`\u274C Validation errors for ${req.method} ${req.url}:`, errors.array());
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors.array().map((error) => ({
        field: error.type === "field" ? error.path : "unknown",
        message: error.msg,
        value: error.type === "field" ? error.value : void 0
      }))
    });
  }
  next();
};
var commonValidations = {
  email: (0, import_express_validator.body)("email").isEmail().normalizeEmail().isLength({ max: 254 }).withMessage("Please provide a valid email address"),
  name: (0, import_express_validator.body)("name").trim().isLength({ min: 2, max: 100 }).matches(/^[a-zA-ZÀ-ÿ\u0100-\u017F\s'-]+$/).withMessage("Name must be 2-100 characters and contain only letters, spaces, hyphens, and apostrophes"),
  phone: (0, import_express_validator.body)("phone").optional().isMobilePhone("any").withMessage("Please provide a valid phone number"),
  message: (0, import_express_validator.body)("message").trim().isLength({ min: 10, max: 2e3 }).withMessage("Message must be between 10 and 2000 characters"),
  date: (0, import_express_validator.body)("date").isISO8601().toDate().custom((value) => {
    if (new Date(value) < /* @__PURE__ */ new Date()) {
      throw new Error("Date cannot be in the past");
    }
    return true;
  }).withMessage("Please provide a valid future date"),
  time: (0, import_express_validator.body)("time").matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Time must be in HH:MM format"),
  guests: (0, import_express_validator.body)("guests").isInt({ min: 1, max: 20 }).withMessage("Number of guests must be between 1 and 20"),
  id: (0, import_express_validator.param)("id").isInt({ min: 1 }).withMessage("ID must be a positive integer")
};
var validateContactForm = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.message,
  (0, import_express_validator.body)("subject").trim().isLength({ min: 5, max: 200 }).withMessage("Subject must be between 5 and 200 characters")
];
var validateReservation = [
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  commonValidations.date,
  commonValidations.time,
  commonValidations.guests,
  (0, import_express_validator.body)("specialRequests").optional().trim().isLength({ max: 500 }).withMessage("Special requests must not exceed 500 characters")
];
var validateEventBooking = [
  commonValidations.id,
  // for event ID
  commonValidations.name,
  commonValidations.email,
  commonValidations.phone,
  (0, import_express_validator.body)("guests").isInt({ min: 1, max: 50 }).withMessage("Number of guests must be between 1 and 50"),
  (0, import_express_validator.body)("specialRequests").optional().trim().isLength({ max: 500 }).withMessage("Special requests must not exceed 500 characters")
];
var validateAdminLogin = [
  (0, import_express_validator.body)("identifier").trim().notEmpty().isLength({ min: 3, max: 100 }).withMessage("Username or email is required"),
  (0, import_express_validator.body)("password").isLength({ min: 8, max: 128 }).withMessage("Password must be between 8 and 128 characters")
];
var validateFeedback = [
  commonValidations.name,
  commonValidations.email,
  (0, import_express_validator.body)("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5"),
  (0, import_express_validator.body)("experience").trim().isLength({ min: 20, max: 1e3 }).withMessage("Experience description must be between 20 and 1000 characters"),
  (0, import_express_validator.body)("visitDate").isISO8601().toDate().custom((value) => {
    const visitDate = new Date(value);
    const oneYearAgo = /* @__PURE__ */ new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    if (visitDate > /* @__PURE__ */ new Date()) {
      throw new Error("Visit date cannot be in the future");
    }
    if (visitDate < oneYearAgo) {
      throw new Error("Visit date cannot be more than one year ago");
    }
    return true;
  }).withMessage("Please provide a valid visit date within the past year"),
  (0, import_express_validator.body)("wouldRecommend").isBoolean().withMessage("Please indicate whether you would recommend us")
];
var validateImageUpload = [
  // File validation is handled by multer middleware and ImageValidator service
  // But we can add additional checks here
  (0, import_express_validator.body)("alt").optional().trim().isLength({ max: 200 }).withMessage("Alt text must not exceed 200 characters"),
  (0, import_express_validator.body)("caption").optional().trim().isLength({ max: 300 }).withMessage("Caption must not exceed 300 characters")
];
var validateQueryParams = [
  (0, import_express_validator.query)("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  (0, import_express_validator.query)("limit").optional().isInt({ min: 1, max: 100 }).withMessage("Limit must be between 1 and 100"),
  (0, import_express_validator.query)("category").optional().trim().isLength({ max: 50 }).matches(/^[a-zA-Z0-9_-]+$/).withMessage("Category must contain only alphanumeric characters, hyphens, and underscores")
];

// server/routes/admin.ts
var router3 = import_express3.default.Router();
var JWT_SECRET = process.env.JWT_SECRET || "development-secret-change-in-production";
var ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ergysonuzi12@gmail.com";
var ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ergysonuzi";
var ADMIN_PASSWORD_HASH = (0, import_crypto2.createHash)("sha256").update(process.env.ADMIN_PASSWORD || "Xharie123").digest("hex");
var activeSessions = /* @__PURE__ */ new Map();
var generateSessionToken = () => {
  return import_jsonwebtoken.default.sign(
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
  const secret = (0, import_crypto2.randomBytes)(32).toString("hex");
  const nonce = (0, import_crypto2.randomBytes)(32).toString("hex");
  const hmac = (0, import_crypto2.createHash)("sha256").update(secret + nonce).digest("hex");
  const token = `${nonce}.${hmac}`;
  return { token, secret };
};
function bookingToApiFormat(dbBooking) {
  return {
    id: dbBooking.id,
    eventId: dbBooking.eventId,
    name: dbBooking.name,
    email: dbBooking.email,
    phone: dbBooking.phone,
    guests: dbBooking.guests,
    specialRequests: dbBooking.specialRequests || "",
    totalAmount: dbBooking.totalPrice,
    // API uses totalAmount, DB uses totalPrice
    status: dbBooking.status,
    created_at: dbBooking.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
  };
}
var validateCSRF = (req, res, next) => {
  try {
    const csrfToken = req.headers["x-csrf-token"];
    const csrfSecret = req.cookies?.["la_cantina_csrf_secret"];
    if (!csrfToken || !csrfSecret) {
      res.status(403).json({ error: "CSRF token required" });
      return;
    }
    const [nonce, providedHmac] = csrfToken.split(".");
    if (!nonce || !providedHmac) {
      res.status(403).json({ error: "Invalid CSRF token format" });
      return;
    }
    const expectedHmac = (0, import_crypto2.createHash)("sha256").update(csrfSecret + nonce).digest("hex");
    if (providedHmac !== expectedHmac) {
      res.status(403).json({ error: "Invalid CSRF token" });
      return;
    }
    next();
  } catch (error) {
    res.status(403).json({ error: "CSRF validation failed" });
  }
};
var requireAuth = (req, res, next) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (!sessionCookie) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }
    const decoded = import_jsonwebtoken.default.verify(sessionCookie, JWT_SECRET);
    if (decoded.role === "admin" && decoded.authenticated === true) {
      next();
    } else {
      res.status(401).json({ error: "Invalid session" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid session" });
  }
};
var requireAuthWithCSRF = [requireAuth, validateCSRF];
router3.post("/login", validateAdminLogin, handleValidationErrors, async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const passwordHash = (0, import_crypto2.createHash)("sha256").update(password).digest("hex");
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
router3.post("/logout", async (req, res) => {
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
router3.get("/session", async (req, res) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (!sessionCookie) {
      res.json({
        authenticated: false,
        user: null
      });
      return;
    }
    const decoded = import_jsonwebtoken.default.verify(sessionCookie, JWT_SECRET);
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
router3.post("/refresh", async (req, res) => {
  try {
    const sessionCookie = req.cookies?.["la_cantina_admin_session"];
    if (!sessionCookie) {
      return res.status(401).json({ error: "No active session to refresh" });
    }
    const decoded = import_jsonwebtoken.default.verify(sessionCookie, JWT_SECRET);
    if (decoded.role === "admin" && decoded.authenticated === true) {
      const newSessionToken = generateSessionToken();
      activeSessions.delete(sessionCookie);
      activeSessions.set(newSessionToken, {
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        loginTime: Date.now()
      });
      const { token: csrfToken, secret: csrfSecret } = generateCSRFToken();
      console.log(`\u{1F504} Admin session refreshed`);
      res.cookie("la_cantina_admin_session", newSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1e3,
        // 2 hours
        signed: false
      });
      res.cookie("la_cantina_csrf_secret", csrfSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1e3
      });
      res.json({
        success: true,
        message: "Session refreshed successfully",
        csrfToken,
        user: {
          email: ADMIN_EMAIL,
          username: ADMIN_USERNAME
        }
      });
    } else {
      res.status(401).json({ error: "Invalid session" });
    }
  } catch (error) {
    console.error("Error refreshing admin session:", error);
    res.status(401).json({ error: "Invalid session" });
  }
});
router3.get("/csrf", async (req, res) => {
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
router3.get("/bookings", requireAuth, async (req, res) => {
  try {
    const dbBookings = await db.select().from(eventBookings).orderBy((0, import_drizzle_orm3.desc)(eventBookings.createdAt));
    const apiBookings = dbBookings.map(bookingToApiFormat);
    console.log(`\u{1F4CA} Admin fetched ${apiBookings.length} event bookings`);
    res.json(apiBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});
router3.patch("/bookings/:id/status", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["confirmed", "cancelled", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be confirmed, cancelled, or pending" });
    }
    const [booking] = await db.select().from(eventBookings).where((0, import_drizzle_orm3.eq)(eventBookings.id, parseInt(id)));
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    const previousStatus = booking.status;
    const [event] = await db.select().from(events).where((0, import_drizzle_orm3.eq)(events.id, booking.eventId));
    if (!event) {
      return res.status(404).json({ error: "Associated event not found" });
    }
    let capacityChange = 0;
    if (previousStatus === "confirmed" && status === "cancelled") {
      capacityChange = -booking.guests;
    } else if ((previousStatus === "cancelled" || previousStatus === "pending") && status === "confirmed") {
      const availableSpots = (event.capacity || 10) - (event.currentBookings || 0);
      if (booking.guests > availableSpots) {
        return res.status(400).json({
          error: `Cannot confirm booking: Only ${availableSpots} spots available, but ${booking.guests} requested`
        });
      }
      capacityChange = booking.guests;
    } else if (previousStatus === "pending" && status === "cancelled") {
      capacityChange = 0;
    }
    const [updatedDbBooking] = await db.update(eventBookings).set({
      status,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm3.eq)(eventBookings.id, parseInt(id))).returning();
    if (!updatedDbBooking) {
      return res.status(500).json({ error: "Failed to update booking" });
    }
    if (capacityChange !== 0) {
      const newAttendeeCount = Math.max(0, (event.currentBookings || 0) + capacityChange);
      await db.update(events).set({
        currentBookings: newAttendeeCount,
        updatedAt: /* @__PURE__ */ new Date()
      }).where((0, import_drizzle_orm3.eq)(events.id, booking.eventId));
      console.log(`\u{1F4CA} Updated event ${booking.eventId} capacity: ${capacityChange > 0 ? "+" : ""}${capacityChange} guests (${event.currentBookings || 0} \u2192 ${newAttendeeCount})`);
    }
    const updatedBooking = bookingToApiFormat(updatedDbBooking);
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
router3.delete("/bookings/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [booking] = await db.select().from(eventBookings).where((0, import_drizzle_orm3.eq)(eventBookings.id, parseInt(id)));
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    if (booking.status === "confirmed") {
      const [event] = await db.select().from(events).where((0, import_drizzle_orm3.eq)(events.id, booking.eventId));
      if (event) {
        const newAttendeeCount = Math.max(0, (event.currentBookings || 0) - booking.guests);
        await db.update(events).set({
          currentBookings: newAttendeeCount,
          updatedAt: /* @__PURE__ */ new Date()
        }).where((0, import_drizzle_orm3.eq)(events.id, booking.eventId));
        console.log(`\u{1F4CA} Freed ${booking.guests} spots from event ${booking.eventId} (${event.currentBookings || 0} \u2192 ${newAttendeeCount})`);
      }
    }
    await db.delete(eventBookings).where((0, import_drizzle_orm3.eq)(eventBookings.id, parseInt(id)));
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
var admin_default = router3;

// server/routes/menu.ts
var router4 = import_express4.default.Router();
router4.get("/", async (req, res) => {
  try {
    const items = await db.select().from(menuItems);
    console.log(`\u{1F4CB} Fetched ${items.length} menu items`);
    res.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ error: "Failed to fetch menu items" });
  }
});
router4.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [item] = await db.select().from(menuItems).where((0, import_drizzle_orm4.eq)(menuItems.id, parseInt(id)));
    if (!item) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return res.status(500).json({ error: "Failed to fetch menu item" });
  }
});
router4.post("/", requireAuthWithCSRF, async (req, res) => {
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
    const [newItem] = await db.insert(menuItems).values({
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
    }).returning();
    console.log(`\u{1F4CB} Created menu item: ${newItem.title}`);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    return res.status(500).json({ error: "Failed to create menu item" });
  }
});
router4.put("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const dataWithTimestamp = {
      ...updateData,
      updatedAt: /* @__PURE__ */ new Date()
    };
    const [updatedItem] = await db.update(menuItems).set(dataWithTimestamp).where((0, import_drizzle_orm4.eq)(menuItems.id, parseInt(id))).returning();
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
router4.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedItem] = await db.delete(menuItems).where((0, import_drizzle_orm4.eq)(menuItems.id, parseInt(id))).returning();
    if (!deletedItem) {
      return res.status(404).json({ error: "Menu item not found" });
    }
    console.log(`\u{1F4CB} Deleted menu item ID: ${id}`);
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return res.status(500).json({ error: "Failed to delete menu item" });
  }
});
var menu_default = router4;

// server/routes/gallery.ts
var import_express5 = __toESM(require("express"), 1);
var import_drizzle_orm5 = require("drizzle-orm");
var router5 = import_express5.default.Router();
router5.get("/", async (req, res) => {
  try {
    const images = await db.select().from(gallery).where((0, import_drizzle_orm5.eq)(gallery.isActive, true));
    const transformedImages = images.map((img) => ({
      id: img.id,
      title: img.alt || "",
      description: img.description || "",
      imageUrl: img.imageUrl,
      category: img.category || "atmosphere",
      altText: img.alt || "",
      uploadedAt: img.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      isVisible: img.isActive,
      sortOrder: img.sortOrder || 0
    }));
    console.log(`\u{1F5BC}\uFE0F Fetched ${transformedImages.length} gallery images`);
    res.json(transformedImages);
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return res.status(500).json({ error: "Failed to fetch gallery images" });
  }
});
router5.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const images = await db.select().from(gallery).where((0, import_drizzle_orm5.eq)(gallery.id, parseInt(id)));
    if (images.length === 0) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    const img = images[0];
    const transformedImage = {
      id: img.id,
      title: img.alt || "",
      description: img.description || "",
      imageUrl: img.imageUrl,
      category: img.category || "atmosphere",
      altText: img.alt || "",
      uploadedAt: img.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      isVisible: img.isActive,
      sortOrder: img.sortOrder || 0
    };
    res.json(transformedImage);
  } catch (error) {
    console.error("Error fetching gallery image:", error);
    return res.status(500).json({ error: "Failed to fetch gallery image" });
  }
});
router5.post("/", requireAuthWithCSRF, async (req, res) => {
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
    const insertResult = await db.insert(gallery).values({
      imageUrl,
      description,
      alt: altText || `Image ${Date.now()}`,
      category,
      isActive: isVisible,
      sortOrder
    }).returning();
    const newImage = insertResult[0];
    const transformedImage = {
      id: newImage.id,
      title: newImage.alt || "",
      description: newImage.description || "",
      imageUrl: newImage.imageUrl,
      category: newImage.category || "atmosphere",
      altText: newImage.alt || "",
      uploadedAt: newImage.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      isVisible: newImage.isActive,
      sortOrder: newImage.sortOrder || 0
    };
    console.log(`\u{1F5BC}\uFE0F Created gallery image: ${transformedImage.title}`);
    res.status(201).json(transformedImage);
  } catch (error) {
    console.error("Error creating gallery image:", error);
    return res.status(500).json({ error: "Failed to create gallery image" });
  }
});
router5.put("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      imageUrl,
      description,
      altText,
      category,
      isVisible,
      sortOrder
    } = req.body;
    const updateData = { updatedAt: /* @__PURE__ */ new Date() };
    if (imageUrl !== void 0) updateData.imageUrl = imageUrl;
    if (description !== void 0) updateData.description = description;
    if (altText !== void 0) updateData.alt = altText;
    if (category !== void 0) updateData.category = category;
    if (isVisible !== void 0) updateData.isActive = isVisible;
    if (sortOrder !== void 0) updateData.sortOrder = sortOrder;
    const updateResult = await db.update(gallery).set(updateData).where((0, import_drizzle_orm5.eq)(gallery.id, parseInt(id))).returning();
    if (updateResult.length === 0) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    const updatedImage = updateResult[0];
    const transformedImage = {
      id: updatedImage.id,
      title: updatedImage.alt || "",
      description: updatedImage.description || "",
      imageUrl: updatedImage.imageUrl,
      category: updatedImage.category || "atmosphere",
      altText: updatedImage.alt || "",
      uploadedAt: updatedImage.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString(),
      isVisible: updatedImage.isActive,
      sortOrder: updatedImage.sortOrder || 0
    };
    console.log(`\u{1F5BC}\uFE0F Updated gallery image: ${transformedImage.title}`);
    res.json(transformedImage);
  } catch (error) {
    console.error("Error updating gallery image:", error);
    return res.status(500).json({ error: "Failed to update gallery image" });
  }
});
router5.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResult = await db.delete(gallery).where((0, import_drizzle_orm5.eq)(gallery.id, parseInt(id))).returning();
    if (deleteResult.length === 0) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    console.log(`\u{1F5BC}\uFE0F Deleted gallery image ID: ${id}`);
    res.json({ message: "Gallery image deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery image:", error);
    return res.status(500).json({ error: "Failed to delete gallery image" });
  }
});
router5.patch("/:id/toggle", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const currentImages = await db.select().from(gallery).where((0, import_drizzle_orm5.eq)(gallery.id, parseInt(id)));
    if (currentImages.length === 0) {
      return res.status(404).json({ error: "Gallery image not found" });
    }
    const currentImage = currentImages[0];
    const newVisibility = !currentImage.isActive;
    const updateResult = await db.update(gallery).set({
      isActive: newVisibility,
      updatedAt: /* @__PURE__ */ new Date()
    }).where((0, import_drizzle_orm5.eq)(gallery.id, parseInt(id))).returning();
    const updatedImage = updateResult[0];
    console.log(`\u{1F5BC}\uFE0F Toggled gallery image visibility: ${updatedImage.alt || "Unknown"}`);
    res.json({
      success: true,
      message: `Gallery image ${updatedImage.isActive ? "shown" : "hidden"} successfully`
    });
  } catch (error) {
    console.error("Error toggling gallery image visibility:", error);
    return res.status(500).json({ error: "Failed to update gallery image visibility" });
  }
});
var gallery_default = router5;

// server/routes/reservations.ts
var import_express6 = __toESM(require("express"), 1);
var import_drizzle_orm6 = require("drizzle-orm");
var router6 = import_express6.default.Router();
router6.post("/", validateReservation, handleValidationErrors, async (req, res) => {
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
router6.get("/", requireAuth, async (req, res) => {
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
router6.put("/:id", requireAuthWithCSRF, async (req, res) => {
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
    const [updatedReservation] = await db.update(reservations).set(updateData).where((0, import_drizzle_orm6.eq)(reservations.id, parseInt(id))).returning();
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
router6.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedReservation] = await db.delete(reservations).where((0, import_drizzle_orm6.eq)(reservations.id, parseInt(id))).returning();
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
router6.patch("/:id/status", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be: pending, confirmed, cancelled, or completed" });
    }
    const [updatedReservation] = await db.update(reservations).set({ status }).where((0, import_drizzle_orm6.eq)(reservations.id, parseInt(id))).returning();
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
var reservations_default = router6;

// server/routes/events.ts
var import_express7 = __toESM(require("express"), 1);
var import_drizzle_orm7 = require("drizzle-orm");
var router7 = import_express7.default.Router();
function eventToApiFormat(dbEvent) {
  return {
    id: dbEvent.id,
    title_de: dbEvent.titleDe || "",
    title_en: dbEvent.titleEn || "",
    description_de: dbEvent.descriptionDe || "",
    description_en: dbEvent.descriptionEn || "",
    event_date: dbEvent.date || "",
    price: dbEvent.price || 0,
    max_attendees: dbEvent.capacity || 10,
    current_attendees: dbEvent.currentBookings || 0,
    created_at: dbEvent.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
  };
}
function apiToDbFormat(apiData) {
  return {
    titleDe: apiData.title_de,
    titleEn: apiData.title_en,
    descriptionDe: apiData.description_de || "",
    descriptionEn: apiData.description_en || "",
    date: apiData.event_date,
    price: apiData.price,
    capacity: apiData.max_attendees,
    currentBookings: apiData.current_attendees || 0
  };
}
function bookingToApiFormat2(dbBooking) {
  return {
    id: dbBooking.id,
    eventId: dbBooking.eventId,
    name: dbBooking.name,
    email: dbBooking.email,
    phone: dbBooking.phone,
    guests: dbBooking.guests,
    specialRequests: dbBooking.specialRequests || "",
    totalAmount: dbBooking.totalPrice,
    status: dbBooking.status,
    created_at: dbBooking.createdAt?.toISOString() || (/* @__PURE__ */ new Date()).toISOString()
  };
}
router7.get("/", async (req, res) => {
  try {
    const dbEvents = await db.select().from(events).orderBy((0, import_drizzle_orm7.desc)(events.createdAt));
    const apiEvents = dbEvents.map(eventToApiFormat);
    console.log(`\u{1F389} Fetched ${apiEvents.length} events`);
    return res.json(apiEvents);
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({ error: "Failed to fetch events" });
  }
});
router7.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [dbEvent] = await db.select().from(events).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id)));
    if (!dbEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    const apiEvent = eventToApiFormat(dbEvent);
    return res.json(apiEvent);
  } catch (error) {
    console.error("Error fetching event:", error);
    return res.status(500).json({ error: "Failed to fetch event" });
  }
});
router7.post("/", requireAuthWithCSRF, async (req, res) => {
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
    const dbData = apiToDbFormat({
      title_de,
      title_en,
      description_de,
      description_en,
      event_date,
      price: parseFloat(price),
      max_attendees: parseInt(max_attendees),
      current_attendees: parseInt(current_attendees)
    });
    const [newDbEvent] = await db.insert(events).values(dbData).returning();
    const newEvent = eventToApiFormat(newDbEvent);
    console.log(`\u{1F389} Created event: ${newEvent.title_en}`);
    return res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ error: "Failed to create event" });
  }
});
router7.put("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const [existingEvent] = await db.select().from(events).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id)));
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    const dbUpdateData = apiToDbFormat(updateData);
    const cleanedData = Object.fromEntries(
      Object.entries(dbUpdateData).filter(([, value]) => value !== void 0)
    );
    const [updatedDbEvent] = await db.update(events).set({ ...cleanedData, updatedAt: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id))).returning();
    const updatedEvent = eventToApiFormat(updatedDbEvent);
    console.log(`\u{1F389} Updated event: ${updatedEvent.title_en}`);
    return res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({ error: "Failed to update event" });
  }
});
router7.post("/:id/book", validateEventBooking, handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, guests, specialRequests } = req.body;
    if (!name || !email || !phone || !guests) {
      return res.status(400).json({ error: "Name, email, phone, and number of guests are required" });
    }
    const [event] = await db.select().from(events).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id)));
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const availableSpots = (event.capacity || 10) - (event.currentBookings || 0);
    if (guests > availableSpots) {
      return res.status(400).json({
        error: `Only ${availableSpots} spots available, but ${guests} requested`
      });
    }
    const [newDbBooking] = await db.insert(eventBookings).values({
      eventId: parseInt(id),
      name,
      email,
      phone,
      guests: parseInt(guests),
      specialRequests: specialRequests || "",
      totalPrice: (event.price || 0) * parseInt(guests),
      status: "pending"
    }).returning();
    const booking = bookingToApiFormat2(newDbBooking);
    console.log(`\u{1F389} Event booking created: ${name} for ${guests} guests at ${event.titleEn}`);
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
router7.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [existingEvent] = await db.select().from(events).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id)));
    if (!existingEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    await db.delete(eventBookings).where((0, import_drizzle_orm7.eq)(eventBookings.eventId, parseInt(id)));
    await db.delete(events).where((0, import_drizzle_orm7.eq)(events.id, parseInt(id)));
    console.log(`\u{1F389} Deleted event ID: ${id}`);
    return res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Failed to delete event" });
  }
});
var events_default = router7;

// server/routes/contact.ts
var import_express8 = __toESM(require("express"), 1);
var import_drizzle_orm8 = require("drizzle-orm");
var router8 = import_express8.default.Router();
router8.post("/", validateContactForm, handleValidationErrors, async (req, res) => {
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
router8.get("/", requireAuth, async (req, res) => {
  try {
    const submissions = await db.select().from(contactMessages);
    console.log(`\u{1F4E7} Fetched ${submissions.length} contact submissions`);
    return res.json(submissions);
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return res.status(500).json({ error: "Failed to fetch contact submissions" });
  }
});
router8.get("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const [submission] = await db.select().from(contactMessages).where((0, import_drizzle_orm8.eq)(contactMessages.id, parseInt(id)));
    if (!submission) {
      return res.status(404).json({ error: "Contact submission not found" });
    }
    return res.json(submission);
  } catch (error) {
    console.error("Error fetching contact submission:", error);
    return res.status(500).json({ error: "Failed to fetch contact submission" });
  }
});
router8.patch("/:id/status", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;
    if (!["new", "read", "replied", "archived"].includes(status)) {
      return res.status(400).json({ error: "Invalid status. Must be: new, read, replied, or archived" });
    }
    const updateData = { status };
    if (reply !== void 0) updateData.reply = reply;
    const [updated] = await db.update(contactMessages).set(updateData).where((0, import_drizzle_orm8.eq)(contactMessages.id, parseInt(id))).returning();
    if (!updated) {
      return res.status(404).json({ error: "Contact submission not found" });
    }
    console.log(`\u{1F4E7} Updated contact submission ${id}: ${status}`);
    return res.json({
      success: true,
      submission: updated,
      message: `Contact submission marked as ${status}`
    });
  } catch (error) {
    console.error("Error updating contact submission:", error);
    return res.status(500).json({ error: "Failed to update contact submission" });
  }
});
router8.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [deleted] = await db.delete(contactMessages).where((0, import_drizzle_orm8.eq)(contactMessages.id, parseInt(id))).returning();
    if (!deleted) {
      return res.status(404).json({ error: "Contact submission not found" });
    }
    console.log(`\u{1F4E7} Deleted contact submission: ${deleted.name} - ${deleted.subject}`);
    return res.json({
      success: true,
      message: "Contact submission deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting contact submission:", error);
    return res.status(500).json({ error: "Failed to delete contact submission" });
  }
});
var contact_default = router8;

// server/routes/feedback.ts
var import_express9 = __toESM(require("express"), 1);
var import_drizzle_orm9 = require("drizzle-orm");
var router9 = import_express9.default.Router();
router9.get("/", requireAuth, async (req, res) => {
  try {
    const feedback = await db.select().from(feedbacks).orderBy((0, import_drizzle_orm9.desc)(feedbacks.createdAt));
    console.log(`\u2B50 Fetched ${feedback.length} feedback submissions`);
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
});
router9.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [feedback] = await db.select().from(feedbacks).where((0, import_drizzle_orm9.eq)(feedbacks.id, parseInt(id)));
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return res.status(500).json({ error: "Failed to fetch feedback" });
  }
});
router9.post("/", validateFeedback, handleValidationErrors, async (req, res) => {
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
    const [newFeedback] = await db.insert(feedbacks).values({
      name,
      email,
      rating: parseInt(rating),
      comment: experience,
      status: "pending",
      isPublic: false
    }).returning();
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
router9.put("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const [updatedFeedback] = await db.update(feedbacks).set(updateData).where((0, import_drizzle_orm9.eq)(feedbacks.id, parseInt(id))).returning();
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
router9.delete("/:id", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const [deletedFeedback] = await db.delete(feedbacks).where((0, import_drizzle_orm9.eq)(feedbacks.id, parseInt(id))).returning();
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    console.log(`\u2B50 Deleted feedback: ${id}`);
    res.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback:", error);
    return res.status(500).json({ error: "Failed to delete feedback" });
  }
});
router9.patch("/:id/approve", requireAuthWithCSRF, async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;
    const [updatedFeedback] = await db.update(feedbacks).set({
      status: approved ? "approved" : "rejected",
      isPublic: !!approved
    }).where((0, import_drizzle_orm9.eq)(feedbacks.id, parseInt(id))).returning();
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
var feedback_default = router9;

// server/routes/upload.ts
var import_express10 = __toESM(require("express"), 1);
var import_crypto4 = __toESM(require("crypto"), 1);

// server/services/imageUpload.ts
var import_promises = __toESM(require("fs/promises"), 1);
var import_path = __toESM(require("path"), 1);
var import_crypto3 = __toESM(require("crypto"), 1);
var import_sharp = __toESM(require("sharp"), 1);
var import_multer = __toESM(require("multer"), 1);
var IMAGE_CONFIG = {
  maxFileSize: 2 * 1024 * 1024,
  // 2MB
  maxWidth: 2048,
  maxHeight: 2048,
  quality: 85,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],
  uploadDir: import_path.default.join(process.cwd(), "uploads")
};
async function ensureUploadDir() {
  try {
    await import_promises.default.access(IMAGE_CONFIG.uploadDir);
  } catch {
    await import_promises.default.mkdir(IMAGE_CONFIG.uploadDir, { recursive: true });
  }
}
var IMAGE_SIGNATURES = {
  "image/jpeg": [
    [255, 216, 255]
    // JPEG
  ],
  "image/png": [
    [137, 80, 78, 71]
    // PNG
  ],
  "image/webp": [
    [82, 73, 70, 70]
    // RIFF (WebP container)
  ]
};
function validateMagicBytes(buffer, mimeType) {
  const signatures = IMAGE_SIGNATURES[mimeType];
  if (!signatures) return false;
  return signatures.some((signature) => {
    if (buffer.length < signature.length) return false;
    return signature.every((byte, index2) => buffer[index2] === byte);
  });
}
function generateSecureFilename(originalExtension) {
  const uuid = import_crypto3.default.randomUUID();
  const timestamp2 = Date.now();
  const random = import_crypto3.default.randomBytes(4).toString("hex");
  return `${timestamp2}_${uuid}_${random}.webp`;
}
var ImageValidator = class {
  static async validateFile(file) {
    if (file.size > IMAGE_CONFIG.maxFileSize) {
      return { isValid: false, error: `File too large. Maximum size is ${IMAGE_CONFIG.maxFileSize / (1024 * 1024)}MB` };
    }
    if (!IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
      return { isValid: false, error: "Invalid file type. Only JPEG, PNG, and WebP images are allowed" };
    }
    const ext = import_path.default.extname(file.originalname).toLowerCase();
    if (!IMAGE_CONFIG.allowedExtensions.includes(ext)) {
      return { isValid: false, error: "Invalid file extension" };
    }
    if (!validateMagicBytes(file.buffer, file.mimetype)) {
      return { isValid: false, error: "File content does not match declared type" };
    }
    try {
      const metadata = await (0, import_sharp.default)(file.buffer).metadata();
      if (metadata.width && metadata.width > IMAGE_CONFIG.maxWidth) {
        return { isValid: false, error: `Image width too large. Maximum is ${IMAGE_CONFIG.maxWidth}px` };
      }
      if (metadata.height && metadata.height > IMAGE_CONFIG.maxHeight) {
        return { isValid: false, error: `Image height too large. Maximum is ${IMAGE_CONFIG.maxHeight}px` };
      }
      if (metadata.exif && metadata.exif.length > 1024) {
        console.warn("Image contains large EXIF data, will be stripped");
      }
    } catch (error) {
      return { isValid: false, error: "Invalid or corrupted image file" };
    }
    return { isValid: true };
  }
};
var ImageProcessor = class {
  static async processImage(file) {
    await ensureUploadDir();
    const filename = generateSecureFilename(import_path.default.extname(file.originalname));
    const filepath = import_path.default.join(IMAGE_CONFIG.uploadDir, filename);
    const processedBuffer = await (0, import_sharp.default)(file.buffer).webp({
      quality: IMAGE_CONFIG.quality,
      effort: 4
      // Better compression
    }).resize(IMAGE_CONFIG.maxWidth, IMAGE_CONFIG.maxHeight, {
      fit: "inside",
      withoutEnlargement: true
    }).removeAlpha().toBuffer();
    const metadata = await (0, import_sharp.default)(processedBuffer).metadata();
    await import_promises.default.writeFile(filepath, processedBuffer);
    return {
      filename,
      path: filepath,
      size: processedBuffer.length,
      width: metadata.width || 0,
      height: metadata.height || 0
    };
  }
  static async deleteImage(filename) {
    try {
      const filepath = import_path.default.join(IMAGE_CONFIG.uploadDir, filename);
      await import_promises.default.unlink(filepath);
      return true;
    } catch (error) {
      console.error("Failed to delete image:", error);
      return false;
    }
  }
};
var uploadMiddleware = (0, import_multer.default)({
  storage: import_multer.default.memoryStorage(),
  limits: {
    fileSize: IMAGE_CONFIG.maxFileSize,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    if (!IMAGE_CONFIG.allowedMimeTypes.includes(file.mimetype)) {
      cb(new Error("Invalid file type"));
      return;
    }
    cb(null, true);
  }
});
function createImageUploadHandler() {
  return async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const validation = await ImageValidator.validateFile(req.file);
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }
      const processedImage = await ImageProcessor.processImage(req.file);
      req.processedImage = {
        filename: processedImage.filename,
        path: processedImage.path,
        size: processedImage.size,
        width: processedImage.width,
        height: processedImage.height,
        url: `/uploads/${processedImage.filename}`
      };
      next();
    } catch (error) {
      console.error("Image upload error:", error);
      res.status(500).json({
        error: "Failed to process image",
        traceId: import_crypto3.default.randomUUID()
      });
    }
  };
}

// server/routes/upload.ts
var router10 = import_express10.default.Router();
router10.post("/image", requireAuthWithCSRF, uploadMiddleware.single("image"), validateImageUpload, handleValidationErrors, createImageUploadHandler(), async (req, res) => {
  try {
    const { processedImage } = req;
    if (!processedImage) {
      return res.status(500).json({ error: "Failed to process image" });
    }
    console.log(`\u{1F4F8} Image uploaded: ${processedImage.filename} (${processedImage.size} bytes, ${processedImage.width}x${processedImage.height})`);
    res.status(201).json({
      success: true,
      image: {
        filename: processedImage.filename,
        url: processedImage.url,
        size: processedImage.size,
        width: processedImage.width,
        height: processedImage.height
      },
      message: "Image uploaded successfully"
    });
  } catch (error) {
    console.error("Upload route error:", error);
    res.status(500).json({
      error: "Failed to upload image",
      traceId: import_crypto4.default.randomUUID()
    });
  }
});
router10.delete("/image/:filename", requireAuthWithCSRF, async (req, res) => {
  try {
    const { filename } = req.params;
    if (!/^[0-9]+_[a-f0-9-]+_[a-f0-9]+\.webp$/i.test(filename)) {
      return res.status(400).json({ error: "Invalid filename format" });
    }
    const deleted = await ImageProcessor.deleteImage(filename);
    if (!deleted) {
      return res.status(404).json({ error: "Image not found" });
    }
    console.log(`\u{1F5D1}\uFE0F Image deleted: ${filename}`);
    res.json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error("Delete image error:", error);
    res.status(500).json({
      error: "Failed to delete image",
      traceId: import_crypto4.default.randomUUID()
    });
  }
});
var upload_default = router10;

// server/routes/google-reviews.ts
var import_express11 = __toESM(require("express"), 1);
var import_crypto5 = __toESM(require("crypto"), 1);
var router11 = import_express11.default.Router();
GoogleReviewsService.initialize();
router11.get("/", async (req, res) => {
  const traceId = import_crypto5.default.randomUUID();
  try {
    res.set({
      "Cache-Control": "public, max-age=21600, stale-while-revalidate=3600",
      // 6 hours cache, 1 hour stale
      "X-Content-Type-Options": "nosniff",
      "X-Trace-ID": traceId
    });
    const reviewsData = await GoogleReviewsService.getReviews();
    const response = {
      success: true,
      ...reviewsData,
      metadata: {
        total_reviews: reviewsData.reviews.length,
        average_rating: reviewsData.reviews.length > 0 ? Math.round(reviewsData.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsData.reviews.length * 10) / 10 : 0,
        latest_review: reviewsData.reviews.length > 0 ? reviewsData.reviews[0].created_at : null,
        trace_id: traceId
      }
    };
    console.log(`\u2705 Google Reviews API: ${reviewsData.reviews.length} reviews served (trace: ${traceId})`);
    res.json(response);
  } catch (error) {
    console.error(`\u274C Google Reviews API error (trace: ${traceId}):`, error.message);
    res.status(500).json({
      success: false,
      error: "Unable to fetch reviews at this time",
      reviews: [],
      place_info: {
        name: "La Cantina Berlin",
        rating: 0,
        user_ratings_total: 0
      },
      cached: false,
      fetched_at: (/* @__PURE__ */ new Date()).toISOString(),
      metadata: {
        total_reviews: 0,
        average_rating: 0,
        latest_review: null,
        trace_id: traceId
      }
    });
  }
});
router11.get("/cache", requireAuth, async (req, res) => {
  try {
    const stats = GoogleReviewsService.getCacheStats();
    res.json({
      success: true,
      cache_stats: stats
    });
  } catch (error) {
    console.error("Cache stats error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to get cache stats"
    });
  }
});
router11.delete("/cache", requireAuth, async (req, res) => {
  try {
    GoogleReviewsService.clearCache();
    res.json({
      success: true,
      message: "Reviews cache cleared successfully"
    });
  } catch (error) {
    console.error("Clear cache error:", error.message);
    res.status(500).json({
      success: false,
      error: "Failed to clear cache"
    });
  }
});
var google_reviews_default = router11;

// server/routes/instagram.ts
var import_express12 = __toESM(require("express"), 1);

// server/utils/cache.ts
var InMemoryCache = class {
  constructor(defaultTTLMs = 6e4) {
    this.cache = /* @__PURE__ */ new Map();
    this.defaultTTL = defaultTTLMs;
  }
  set(key, value, ttlMs) {
    const ttl = ttlMs ?? this.defaultTTL;
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data: value, expiry });
  }
  get(key) {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.data;
  }
  delete(key) {
    return this.cache.delete(key);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiry) {
        this.cache.delete(key);
      }
    }
    return this.cache.size;
  }
};

// server/services/instagramService.ts
var FALLBACK_IG_URLS = [
  "https://www.instagram.com/p/DAvXTRFidcu/",
  "https://www.instagram.com/p/C_vwvupNoNR/",
  "https://www.instagram.com/p/C8HwJgmt8aL/",
  "https://www.instagram.com/p/C6gz8uSiGlb/",
  "https://www.instagram.com/p/C6Mg0uGLdNH/",
  "https://www.instagram.com/p/C4lqzQMrscT/",
  "https://www.instagram.com/p/C4kriK-NmpI/",
  "https://www.instagram.com/p/C0e_9IcLnk-/",
  "https://www.instagram.com/p/Cztz53rN1km/",
  "https://www.instagram.com/p/CroTpxftUqg/",
  "https://www.instagram.com/p/C3xB9KuNmPR/",
  "https://www.instagram.com/p/C2pL7VuoTqX/"
];
var InstagramService = class {
  constructor() {
    this.CACHE_TTL = 30 * 60 * 1e3;
    this.cache = new InMemoryCache(this.CACHE_TTL);
    this.pageId = process.env.IG_PAGE_ID || "";
    this.accessToken = process.env.IG_ACCESS_TOKEN || "";
  }
  /**
   * Get Instagram posts with caching and fallback
   */
  async getInstagramPosts(count = 6) {
    try {
      const cached = this.cache.get("instagram_posts");
      if (cached) {
        console.log("\u{1F4F8} Instagram: Using cached posts");
        return cached.slice(0, count).map((post) => post.permalink);
      }
      if (this.pageId && this.accessToken) {
        const posts = await this.fetchFromAPI();
        if (posts.length > 0) {
          this.cache.set("instagram_posts", posts);
          console.log(`\u{1F4F8} Instagram: Fetched ${posts.length} posts from API`);
          return posts.slice(0, count).map((post) => post.permalink);
        }
      }
      console.log("\u{1F4F8} Instagram: Using fallback URLs with daily rotation");
      return this.selectDailyFallbackPosts(count);
    } catch (error) {
      console.warn("\u26A0\uFE0F Instagram API error, using fallback:", error);
      return this.selectDailyFallbackPosts(count);
    }
  }
  /**
   * Fetch posts from Instagram Graph API
   */
  async fetchFromAPI() {
    if (!this.pageId || !this.accessToken) {
      throw new Error("Instagram API credentials not configured");
    }
    const fields = "id,permalink,media_type,media_url,caption,timestamp,thumbnail_url";
    const url = `https://graph.instagram.com/v18.0/${this.pageId}/media?fields=${fields}&limit=12&access_token=${this.accessToken}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Instagram API error (${response.status}): ${errorText}`);
    }
    const data = await response.json();
    return data.data.filter(
      (post) => post.media_type === "IMAGE" || post.media_type === "VIDEO" || post.media_type === "CAROUSEL_ALBUM"
    );
  }
  /**
   * Select daily posts from fallback URLs using seeded random
   */
  selectDailyFallbackPosts(count) {
    const berlinTime = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
      timeZone: "Europe/Berlin"
    });
    const berlinDate = new Date(berlinTime);
    const today = Math.floor(berlinDate.getTime() / (1e3 * 60 * 60 * 24));
    const shuffled = [...FALLBACK_IG_URLS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(this.seededRandom(today + i) * (i + 1));
      const temp = shuffled[i];
      if (temp !== void 0 && shuffled[j] !== void 0) {
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
      }
    }
    return shuffled.slice(0, count);
  }
  /**
   * Seeded random function for consistent daily rotation
   */
  seededRandom(seed) {
    const x = Math.sin(seed++) * 1e4;
    return x - Math.floor(x);
  }
  /**
   * Get Instagram profile URL
   */
  getProfileUrl() {
    return "https://instagram.com/lacantina.berlin";
  }
  /**
   * Clear cache manually (for testing/admin purposes)
   */
  clearCache() {
    this.cache.clear();
    console.log("\u{1F4F8} Instagram: Cache cleared");
  }
};
var instagramService = new InstagramService();

// server/routes/instagram.ts
var router12 = import_express12.default.Router();
var rateLimitMap = /* @__PURE__ */ new Map();
var isRateLimited = (ip) => {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 6e4 });
    return false;
  }
  if (limit.count >= 10) {
    return true;
  }
  limit.count++;
  return false;
};
router12.get("/posts", async (req, res) => {
  try {
    const ip = req.ip || req.connection.remoteAddress || "unknown";
    if (isRateLimited(ip)) {
      return res.status(429).json({
        error: "Rate limit exceeded",
        message: "Too many requests. Please try again later."
      });
    }
    const count = parseInt(req.query.count) || 6;
    const maxCount = 12;
    const requestCount = Math.min(Math.max(count, 1), maxCount);
    const posts = await instagramService.getInstagramPosts(requestCount);
    return res.json({
      posts,
      count: posts.length,
      profileUrl: instagramService.getProfileUrl(),
      cached: true
      // We don't expose internal caching details
    });
  } catch (error) {
    console.error("\u274C Instagram API route error:", error);
    return res.status(500).json({
      error: "Failed to fetch Instagram posts",
      message: "Please try again later"
    });
  }
});
router12.post("/clear-cache", (req, res) => {
  try {
    instagramService.clearCache();
    return res.json({ success: true, message: "Instagram cache cleared" });
  } catch (error) {
    console.error("\u274C Failed to clear Instagram cache:", error);
    return res.status(500).json({
      error: "Failed to clear cache",
      message: "Please try again later"
    });
  }
});
var instagram_default = router12;

// server/middleware/security.ts
var import_helmet = __toESM(require("helmet"), 1);
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_hpp = __toESM(require("hpp"), 1);
var import_compression = __toESM(require("compression"), 1);
var generalRateLimit = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 1e3,
  // Limit each IP to 1000 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later",
    retryAfter: 15
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      message: "Rate limit exceeded. Please try again later.",
      retryAfter: Math.ceil(15 * 60)
      // seconds
    });
  }
});
var authRateLimit = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes  
  max: 5,
  // Limit each IP to 5 login attempts per windowMs
  message: {
    error: "Too many login attempts from this IP, please try again later",
    retryAfter: 15
  },
  skipSuccessfulRequests: true,
  // Don't count successful requests
  handler: (req, res) => {
    res.status(429).json({
      error: "Too many login attempts",
      message: "Account temporarily locked due to repeated failed login attempts. Please try again in 15 minutes.",
      retryAfter: Math.ceil(15 * 60)
    });
  }
});
var apiRateLimit = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 200,
  // More restrictive for API endpoints
  message: {
    error: "API rate limit exceeded",
    retryAfter: 15
  },
  handler: (req, res) => {
    res.status(429).json({
      error: "API rate limit exceeded",
      message: "Too many API requests. Please slow down.",
      retryAfter: Math.ceil(15 * 60)
    });
  }
});
var uploadRateLimit = (0, import_express_rate_limit.default)({
  windowMs: 60 * 60 * 1e3,
  // 1 hour
  max: 50,
  // 50 uploads per hour per IP
  message: {
    error: "Upload rate limit exceeded",
    retryAfter: 60
  },
  handler: (req, res) => {
    res.status(429).json({
      error: "Upload rate limit exceeded",
      message: "Too many file uploads. Please wait before uploading more files.",
      retryAfter: Math.ceil(60 * 60)
    });
  }
});
var securityHeaders = (0, import_helmet.default)({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        // Allow inline styles only in development for HMR
        process.env.NODE_ENV === "development" ? "'unsafe-inline'" : "",
        "https://fonts.googleapis.com",
        "https://unpkg.com"
      ].filter(Boolean),
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "data:"
      ],
      scriptSrc: [
        "'self'",
        // Allow inline scripts for development - restrict in production
        process.env.NODE_ENV === "development" ? "'unsafe-inline'" : "",
        process.env.NODE_ENV === "development" ? "'unsafe-eval'" : ""
      ].filter(Boolean),
      imgSrc: [
        "'self'",
        "data:",
        "blob:",
        "https:",
        "*.googleapis.com",
        "*.gstatic.com"
      ],
      connectSrc: [
        "'self'",
        "https://maps.googleapis.com",
        "https://places.googleapis.com"
      ],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: process.env.NODE_ENV === "production" ? [] : null
    }
  },
  hsts: {
    maxAge: 31536e3,
    // 1 year
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
});
var inputSanitization = [
  // MongoDB sanitization temporarily disabled due to readonly property conflicts with current Node.js version
  // mongoSanitize({ replaceWith: '_' }), // TODO: Re-enable when compatible version available
  // Protect against HTTP Parameter Pollution attacks
  (0, import_hpp.default)({
    whitelist: ["sort", "fields", "page", "limit"]
    // Allow arrays for these fields
  })
];
var compressionMiddleware = (0, import_compression.default)({
  level: 6,
  // Compression level (0-9)
  threshold: 1024,
  // Only compress files over 1KB
  filter: (req, res) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return import_compression.default.filter(req, res);
  }
});
var securityLogger = (req, res, next) => {
  const startTime = Date.now();
  const suspiciousPatterns = [
    /\.(php|asp|jsp)$/i,
    /\/wp-admin/i,
    /<script/i,
    /union.*select/i,
    /base64_decode/i
  ];
  const userAgent = req.get("User-Agent") || "";
  const isSuspicious = suspiciousPatterns.some(
    (pattern) => pattern.test(req.url) || pattern.test(userAgent)
  );
  if (isSuspicious) {
    console.warn(`\u{1F6A8} Suspicious request detected:`, {
      ip: req.ip,
      userAgent,
      url: req.url,
      method: req.method,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  res.on("finish", () => {
    const duration = Date.now() - startTime;
    if (duration > 5e3) {
      console.warn(`\u23F1\uFE0F  Slow request detected: ${req.method} ${req.url} took ${duration}ms`);
    }
  });
  next();
};
var corsConfig = {
  origin: process.env.NODE_ENV === "production" ? ["https://la-cantina.replit.app", "https://lacantina-berlin.de"] : true,
  // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-CSRF-Token"
  ],
  exposedHeaders: ["X-Response-Time", "X-RateLimit-Limit", "X-RateLimit-Remaining"]
};

// server/index.ts
var import_meta = {};
(0, import_dotenv.config)();
validateEnvironment();
var app = (0, import_express13.default)();
var PORT = process.env.NODE_ENV === "production" ? parseInt(process.env.PORT || "5000") : 3001;
app.use(securityHeaders);
app.use(compressionMiddleware);
app.use(securityLogger);
app.use(generalRateLimit);
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
if (process.env.NODE_ENV === "production" || process.env.REPLIT_DB_URL) {
  app.set("trust proxy", 1);
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") && req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
      return;
    }
    next();
  });
}
app.use(inputSanitization);
app.use((0, import_cors.default)(corsConfig));
app.use((0, import_cookie_parser.default)());
app.use(import_express13.default.json({ limit: "10mb" }));
app.use(import_express13.default.urlencoded({ extended: true, limit: "10mb" }));
app.use((req, res, next) => {
  res.set("Cache-Control", "no-cache");
  next();
});
var getDirname = () => {
  try {
    return __dirname;
  } catch {
    return import_path2.default.dirname((0, import_url.fileURLToPath)(import_meta.url));
  }
};
var __dirname = getDirname();
var distPath = process.env.NODE_ENV === "production" ? import_path2.default.join(__dirname, "../client") : import_path2.default.join(__dirname, "../dist/client");
app.get("/healthz", (_, res) => {
  res.status(200).send("ok");
});
app.use(ssr_default);
async function initializeServer() {
  app.use("/api", health_default);
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
  app.use("/api/menu", apiRateLimit, menu_default);
  app.use("/api/gallery", apiRateLimit, gallery_default);
  app.use("/api/reservations", apiRateLimit, reservations_default);
  app.use("/api/events", apiRateLimit, events_default);
  app.use("/api/contact", apiRateLimit, contact_default);
  app.use("/api/feedback", apiRateLimit, feedback_default);
  app.use("/api/admin", authRateLimit, admin_default);
  app.use("/api/upload", uploadRateLimit, upload_default);
  app.use("/api/reviews", apiRateLimit, google_reviews_default);
  app.use("/api/google-reviews", apiRateLimit, google_reviews_default);
  app.use("/api/instagram", apiRateLimit, instagram_default);
  app.use("/uploads", import_express13.default.static(import_path2.default.join(process.cwd(), "uploads"), {
    maxAge: process.env.NODE_ENV === "production" ? "7d" : "1h",
    etag: true,
    lastModified: true,
    setHeaders: (res, path3) => {
      res.set("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    }
  }));
  const fs2 = await import("fs");
  const distExists = fs2.existsSync(distPath);
  if (distExists) {
    app.use(import_express13.default.static(distPath, {
      maxAge: process.env.NODE_ENV === "production" ? "1d" : 0,
      etag: false,
      lastModified: false
    }));
    app.use((req, res, next) => {
      if (req.path.startsWith("/api/") || req.path === "/health") {
        return next();
      }
      if (req.path.includes(".")) {
        return res.status(404).send("Not found");
      }
      res.sendFile(import_path2.default.join(distPath, "index.html"), (err) => {
        if (err) {
          console.error("Error serving index.html:", err);
          res.status(500).send("Server error");
        }
      });
    });
  } else {
    console.warn(`\u26A0\uFE0F Warning: Frontend dist directory not found at ${distPath}`);
    console.warn(`\u26A0\uFE0F API routes will work, but frontend will not be served`);
    app.use((req, res, next) => {
      if (req.path.startsWith("/api/") || req.path === "/health") {
        return next();
      }
      res.status(503).send("Frontend not available - build required");
    });
  }
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
initializeServer().catch((error) => {
  console.error("\u274C Failed to initialize server:", error);
  process.exit(1);
});
var index_default = app;
//# sourceMappingURL=index.cjs.map
