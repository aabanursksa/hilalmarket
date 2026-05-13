export type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  unit: string;
  category: string;
  rating?: number;
  badge?: string;
  inStock?: boolean;
};

const img = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

export const products: Product[] = [
  { id: "p1", name: "Fresh Red Apples", price: 2.99, oldPrice: 3.99, image: img("photo-1568702846914-96b305d2aaeb"), unit: "1kg", category: "fruits", rating: 4.8, badge: "Sale", inStock: true },
  { id: "p2", name: "Organic Bananas", price: 1.49, oldPrice: 1.99, image: img("photo-1571771894821-ce9b6c11b08e"), unit: "1kg", category: "fruits", rating: 4.6, inStock: true },
  { id: "p3", name: "Fresh Tomatoes", price: 1.99, image: img("photo-1592924357228-91a4daadcfea"), unit: "1kg", category: "vegetables", rating: 4.5, inStock: true },
  { id: "p4", name: "Whole Milk", price: 3.49, oldPrice: 3.99, image: img("photo-1563636619-e9143da7973b"), unit: "1L", category: "dairy", rating: 4.7, badge: "Hot", inStock: true },
  { id: "p5", name: "Free-Range Eggs", price: 4.99, image: img("photo-1582722872445-44dc5f7e3c8f"), unit: "12pcs", category: "dairy", rating: 4.9, inStock: true },
  { id: "p6", name: "Fresh Salmon Fillet", price: 12.99, oldPrice: 15.99, image: img("photo-1574781330855-d0db8cc6a79c"), unit: "500g", category: "seafood", rating: 4.8, badge: "Sale", inStock: true },
  { id: "p7", name: "Chicken Breast", price: 8.49, image: img("photo-1604503468506-a8da13d82791"), unit: "1kg", category: "meat", rating: 4.6, inStock: true },
  { id: "p8", name: "Sourdough Bread", price: 3.99, image: img("photo-1509440159596-0249088772ff"), unit: "1pc", category: "bakery", rating: 4.7, inStock: true },
  { id: "p9", name: "Orange Juice", price: 4.49, oldPrice: 5.49, image: img("photo-1600271886742-f049cd451bba"), unit: "1L", category: "beverages", rating: 4.5, badge: "New", inStock: true },
  { id: "p10", name: "Avocado", price: 1.99, image: img("photo-1523049673857-eb18f1d7b578"), unit: "1pc", category: "fruits", rating: 4.4, inStock: true },
  { id: "p11", name: "Chocolate Cookies", price: 2.49, image: img("photo-1499636136210-6f4ee915583e"), unit: "200g", category: "snacks", rating: 4.6, inStock: true },
  { id: "p12", name: "Basmati Rice", price: 6.99, oldPrice: 8.99, image: img("photo-1586201375761-83865001e31c"), unit: "2kg", category: "grocery", rating: 4.8, badge: "Sale", inStock: true },
];

export const categories = [
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", image: img("photo-1610348725531-843dff563e2c"), count: 124 },
  { slug: "meats-seafood", name: "Meats & Seafood", image: img("photo-1607623814075-e51df1bdc82f"), count: 64 },
  { slug: "breakfast-dairy", name: "Breakfast & Dairy", image: img("photo-1488477181946-6428a0291777"), count: 89 },
  { slug: "breads-bakery", name: "Breads & Bakery", image: img("photo-1509440159596-0249088772ff"), count: 52 },
  { slug: "beverages", name: "Beverages", image: img("photo-1600271886742-f049cd451bba"), count: 110 },
  { slug: "frozen-foods", name: "Frozen Foods", image: img("photo-1606851094291-6efae152bb87"), count: 47 },
  { slug: "biscuits-snacks", name: "Biscuits & Snacks", image: img("photo-1499636136210-6f4ee915583e"), count: 96 },
  { slug: "grocery-staples", name: "Grocery & Staples", image: img("photo-1586201375761-83865001e31c"), count: 178 },
  { slug: "household-needs", name: "Household Needs", image: img("photo-1583947215259-38e31be8751f"), count: 71 },
  { slug: "healthcare", name: "Healthcare", image: img("photo-1584308666744-24d5c474f2ae"), count: 39 },
  { slug: "baby-pregnancy", name: "Baby & Pregnancy", image: img("photo-1515488042361-ee00e0ddd4e4"), count: 28 },
];

export const orders = [
  { id: "#HM-10245", date: "May 8, 2026", total: 48.50, status: "Delivered", type: "Standard" },
  { id: "#HM-10244", date: "May 6, 2026", total: 23.99, status: "Out for delivery", type: "Express" },
  { id: "#HM-10243", date: "May 2, 2026", total: 89.20, status: "Processing", type: "Standard" },
  { id: "#HM-10242", date: "Apr 28, 2026", total: 15.75, status: "Cancelled", type: "Standard" },
  { id: "#HM-10241", date: "Apr 22, 2026", total: 67.30, status: "Delivered", type: "Express" },
];
