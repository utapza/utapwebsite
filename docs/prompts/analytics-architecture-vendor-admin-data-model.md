This is a classic architectural pivot from a simple transactional system to an analytical one.

---

## 1. Data Architecture: The "Smart Backfill"

Instead of querying the `orders` table directly for stats, you should create a dedicated `vendor_customer_stats` table (for the vendor view) and a `student_stats` table (for the admin view).

* **The Backfill:** Write a one-time migration script that iterates through historical orders and populates these tables.
* **The Live Sync:** Use **Database Triggers** (in Supabase/PostgreSQL) or **Edge Functions**. Every time an order status changes to "Completed," the trigger automatically increments the `total_spent`, updates `last_purchase_date`, and recalculates `most_purchased_item_id` for that specific vendor-student relationship.

---

## 2. Vendor Dashboard: Customer Insights

For the vendor, the goal is **Segmented Performance**. They only see data relative to their own shop.

### The Paginated Table (15 items)

Use a "Shallow-to-Deep" pattern. Load the core metrics first; fetch the granular details only on demand.

| Metric | Description |
| --- | --- |
| **Customer Name** | Student identification. |
| **Loyalty Tier** | Based on order frequency (e.g., "Regular" vs "New"). |
| **Total Revenue** | Lifetime value ($) generated for *this* vendor. |
| **Last Active** | Helps identify "at-risk" customers who haven't visited lately. |

### Advanced Analytics for Vendors

* **Product Performance:** A "Dead Stock" report showing items with high stock but zero sales in the last 30 days.
* **Demographic Heatmap:** Anonymous charts showing if the store is trending with specific age groups or departments (e.g., "70% of your sales come from Engineering students").

---

## 3. Admin Dashboard: The "Macro" View

The Admin needs to see the ecosystem health. The `admin/student-profiles` page should use the **Master-Detail Pattern**.

* **The Table:** High-level student stats across all vendors.
* **The Modal (On Click):** When the admin clicks "View," you fetch a JSON object containing their full history, category preferences (e.g., "Spends 60% on snacks, 40% on stationery"), and peak spending times.
* **Product Performance:** An admin view of "Top 10 Products Campus-wide" vs "Underperforming Vendors."

---

## 4. Student App: The "Gamified" Profile

To stimulate buying habits on the React Native app, we can use the **Recency, Frequency, and Monetary (RFM)** model to show personalized highlights.

* **"Your Favorites":** Display the most purchased item with a "One-tap Reorder" button.
* **"Trending at [Your Campus]":** Social proof—showing what other students are buying right now.
* **"Budget Tracker":** A small visual showing their spending this month versus last month to keep them engaged with the app.

---

## 5. Technical Implementation (React/TypeScript)

Since you are using **React/Supabase**, leverage **React Query (TanStack Query)** for the frontend.

1. **Server-Side Pagination:** Always pass `page` and `pageSize` to your Supabase RPC or API. Never pull the whole list to the frontend.
2. **State Management:** Use a "Selected Customer" state. When a row is clicked, trigger a secondary fetch for that specific ID.
3. **Visuals:** For the "Performance" aspect, use a lightweight library like `recharts` for the web dashboard to show "Stock vs. Sales" bar charts.

```typescript
// Example: Shallow Customer Data Type
interface CustomerSummary {
  id: string;
  full_name: string;
  total_orders: number;
  last_purchase: string;
}

// Example: Deep Analytics Type (Fetched on Click)
interface CustomerDetails extends CustomerSummary {
  favorite_category: string;
  spending_trend: number[]; // For a small sparkline chart
  average_order_value: number;
}



## 1. Vendor Dashboard: "Grow Your Business"

Vendors need to know how to optimize their inventory and who their best customers are.

### **The "Meaningful" Stats**

* **Customer Retention Rate:** The percentage of students who have returned for a second or third purchase. (High retention = Great service).
* **The "Dead Stock" Warning:** A list of items that haven't moved in 14+ days but have high inventory levels. (Action: "Create a discount for this item").
* **Peak Hour Heatmap:** A visual chart showing when students buy most (e.g., 10:00 AM – 11:00 AM). (Action: "Increase staff during this window").
* **Basket Affinity (Frequently Bought Together):** "Students who bought *Bread* also bought *Milk* 80% of the time." (Action: "Bundle these items").
* **Estimated "Stock-Out" Date:** Based on the last 7 days of sales, predict when an item will hit zero.

### **Demographic Insights**

* **Gender/Age Split:** A simple pie chart showing the dominant buyer persona.
* **Department Reach:** Which faculty or residence is buying the most from them?

---

## 2. Admin Dashboard: "Ecosystem Health"

As an admin, you aren't just looking at one store; you’re looking at the whole "economy" of the campus.

### **The "Meaningful" Stats**

* **Velocity of Money:** How fast are students spending their loaded credits?
* **Vendor Performance Quadrant:** A 4-box grid:
1. *Stars:* High sales, high customer satisfaction.
2. *Underdogs:* Low sales, high satisfaction (Needs marketing).
3. *Warning:* High sales, high refund/complaint rate.
4. *Zombies:* Low sales, low satisfaction.


* **Student "Flight" Risk:** Identify students who haven't used the app in 30 days.
* **System Latency vs. Sales:** Does a slower app response time correlate with lower sales that day? (Crucial for the technical team).
* **Top 5 "Viral" Products:** Products that went from 0 to 100 sales the fastest across the entire platform.

---

## 3. Student App (uTAP): "Smart Spending"

For students, the data should be fun, slightly "gamified," and helpful for their budget.

### **The "Meaningful" Stats**

* **"Your Campus Spirit":** A badge or stat showing they are in the "Top 10% of Coffee Lovers" on campus.
* **The "Savings Tracker":** "By using uTAP promotions, you’ve saved R150 this month."
* **Smart Recommendations:** "Students in your residence are currently loving [Product Name]."
* **Price Comparison (Cheapest Stores):** A "Price Leaderboard" for common items like bread, milk, or printing services.
* **The "Monthly Wrap":** A mini-version of "Spotify Wrapped" at the end of the month—*Your favorite meal, your most visited vendor, and your total steps to get to stores.*

---

