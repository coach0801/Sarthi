import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  timestamp,
  jsonb,
  uuid,
  varchar,
  index,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const brands = pgTable("brands", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  monthlyRevenueBand: varchar("monthly_revenue_band", { length: 50 }).notNull(),
  channels: jsonb("channels").$type<string[]>().default([]),
  targetMarginPct: real("target_margin_pct").default(20),
  packagingCostPerOrder: real("packaging_cost_per_order").default(25),
  handlingFeePerOrder: real("handling_fee_per_order").default(15),
  onboardedAt: timestamp("onboarded_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const connectors = pgTable("connectors", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id").references(() => brands.id).notNull(),
  channel: varchar("channel", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).default("disconnected").notNull(),
  credentials: jsonb("credentials").$type<Record<string, string>>().default({}),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  lastSyncAt: timestamp("last_sync_at"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const skus = pgTable("skus", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id").references(() => brands.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  sku: varchar("sku", { length: 100 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  cogs: real("cogs").notNull(),
  mrp: real("mrp").notNull(),
  weight: real("weight").default(0.5),
  createdAt: timestamp("created_at").defaultNow(),
})

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    brandId: uuid("brand_id").references(() => brands.id).notNull(),
    orderId: varchar("order_id", { length: 100 }).notNull(),
    channel: varchar("channel", { length: 50 }).notNull(),
    skuId: uuid("sku_id").references(() => skus.id),
    skuName: varchar("sku_name", { length: 255 }),
    quantity: integer("quantity").default(1),
    placedAt: timestamp("placed_at").notNull(),
    grossRevenue: real("gross_revenue").notNull(),
    discount: real("discount").default(0),
    gst: real("gst").default(0),
    channelFee: real("channel_fee").default(0),
    paymentGatewayFee: real("payment_gateway_fee").default(0),
    freightForward: real("freight_forward").default(0),
    freightReverse: real("freight_reverse").default(0),
    adAttribution: real("ad_attribution").default(0),
    cogs: real("cogs").default(0),
    packagingCost: real("packaging_cost").default(0),
    rtoProvision: real("rto_provision").default(0),
    contributionMargin: real("contribution_margin").default(0),
    paymentMethod: varchar("payment_method", { length: 50 }).default("UPI"),
    isRTO: boolean("is_rto").default(false),
    pincode: varchar("pincode", { length: 10 }),
    customerId: varchar("customer_id", { length: 100 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [
    index("orders_brand_placed_idx").on(t.brandId, t.placedAt),
    index("orders_channel_idx").on(t.channel),
  ]
)

export const adSpend = pgTable(
  "ad_spend",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    brandId: uuid("brand_id").references(() => brands.id).notNull(),
    platform: varchar("platform", { length: 50 }).notNull(),
    campaignId: varchar("campaign_id", { length: 100 }).notNull(),
    campaignName: varchar("campaign_name", { length: 255 }).notNull(),
    adSetName: varchar("ad_set_name", { length: 255 }),
    date: timestamp("date").notNull(),
    spend: real("spend").default(0),
    impressions: integer("impressions").default(0),
    clicks: integer("clicks").default(0),
    conversions: integer("conversions").default(0),
    revenue: real("revenue").default(0),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => [index("ad_spend_brand_date_idx").on(t.brandId, t.date)]
)

export const agentActions = pgTable("agent_actions", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id").references(() => brands.id).notNull(),
  agent: varchar("agent", { length: 50 }).notNull(),
  type: varchar("type", { length: 100 }).notNull(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  expectedImpact: real("expected_impact").default(0),
  expectedImpactPct: real("expected_impact_pct").default(0),
  confidence: real("confidence").default(0.7),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  permissionLevel: varchar("permission_level", { length: 20 }).default("propose"),
  reasoning: text("reasoning"),
  data: jsonb("data").$type<Record<string, unknown>>().default({}),
  executedAt: timestamp("executed_at"),
  createdAt: timestamp("created_at").defaultNow(),
})

export const auditReports = pgTable("audit_reports", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id").references(() => brands.id).notNull(),
  summary: text("summary"),
  totalOpportunity: real("total_opportunity").default(0),
  findings: jsonb("findings").$type<unknown[]>().default([]),
  keyMetrics: jsonb("key_metrics").$type<Record<string, unknown>>().default({}),
  generatedAt: timestamp("generated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
})

export const dailyBriefs = pgTable("daily_briefs", {
  id: uuid("id").defaultRandom().primaryKey(),
  brandId: uuid("brand_id").references(() => brands.id).notNull(),
  date: timestamp("date").notNull(),
  contributionMargin: real("contribution_margin").default(0),
  contributionMarginVsTarget: real("contribution_margin_vs_target").default(0),
  contributionMarginVsYesterday: real("contribution_margin_vs_yesterday").default(0),
  observations: jsonb("observations").$type<string[]>().default([]),
  strategicQuestion: text("strategic_question"),
  generatedAt: timestamp("generated_at").defaultNow(),
})

// Relations
export const brandsRelations = relations(brands, ({ many }) => ({
  connectors: many(connectors),
  skus: many(skus),
  orders: many(orders),
  adSpend: many(adSpend),
  agentActions: many(agentActions),
  auditReports: many(auditReports),
  dailyBriefs: many(dailyBriefs),
}))
