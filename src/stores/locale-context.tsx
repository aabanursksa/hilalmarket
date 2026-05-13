import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = { lang: string; dir: "ltr" | "rtl"; label: string };

const locales: Locale[] = [
  { lang: "en", dir: "ltr", label: "English" },
  { lang: "ar", dir: "rtl", label: "العربية" },
  { lang: "so", dir: "ltr", label: "Soomaali" },
];

const STORAGE_KEY = "hilaal-locale";

function loadLocale(): Locale {
  if (typeof window === "undefined") return locales[0];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const found = locales.find((l) => l.lang === raw);
      if (found) return found;
    }
  } catch { /* ignore */ }
  return locales[0];
}

function saveLocale(lang: string) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* ignore */ }
}

const translations: Record<string, Record<string, string>> = {
  en: {
    "Home": "Home",
    "Shop": "Shop",
    "Cart": "Cart",
    "Favorites": "Favorites",
    "Orders": "Orders",
    "Track Order": "Track Order",
    "Account": "Account",
    "Checkout": "Checkout",
    "Payment": "Payment",
    "Contact Us": "Contact Us",
    "Best Sellers": "Best Sellers",
    "Latest Offers": "Latest Offers",
    "New Products": "New Products",
    "Search products...": "Search products...",
    "Add to cart": "Add to cart",
    "Your cart is empty": "Your cart is empty",
    "Browse Products": "Browse Products",
    "Continue to Payment": "Continue to Payment",
    "Pay Now": "Pay Now",
    "Order Summary": "Order Summary",
    "Sub-Total": "Sub-Total",
    "Delivery": "Delivery",
    "Discount": "Discount",
    "Total": "Total",
    "Delivery Address": "Delivery Address",
    "Change Address": "Change Address",
    "Delivery Method": "Delivery Method",
    "Payment Method": "Payment Method",
    "Payment Details": "Payment Details",
    "Quantity": "Quantity",
  },
  ar: {
    "Home": "الرئيسية",
    "Shop": "المتجر",
    "Cart": "السلة",
    "Favorites": "المفضلة",
    "Orders": "الطلبات",
    "Track Order": "تتبع الطلب",
    "Account": "الحساب",
    "Checkout": "إتمام الشراء",
    "Payment": "الدفع",
    "Contact Us": "اتصل بنا",
    "Best Sellers": "الأكثر مبيعًا",
    "Latest Offers": "أحدث العروض",
    "New Products": "وصل حديثًا",
    "Search products...": "ابحث عن منتجات...",
    "Add to cart": "أضف للسلة",
    "Your cart is empty": "سلتك فارغة",
    "Browse Products": "تصفح المنتجات",
    "Continue to Payment": "متابعة للدفع",
    "Pay Now": "ادفع الآن",
    "Order Summary": "ملخص الطلب",
    "Sub-Total": "المجموع الفرعي",
    "Delivery": "التوصيل",
    "Discount": "الخصم",
    "Total": "الإجمالي",
    "Delivery Address": "عنوان التوصيل",
    "Change Address": "تغيير العنوان",
    "Delivery Method": "طريقة التوصيل",
    "Payment Method": "طريقة الدفع",
    "Payment Details": "بيانات الدفع",
    "Quantity": "الكمية",
  },
  so: {
    "Home": "Guriga",
    "Shop": "Dukaanka",
    "Cart": "Shopping-ga",
    "Favorites": "La jecelyahay",
    "Orders": "Dalabka",
    "Track Order": "Raad dalabka",
    "Account": "Xisaabta",
    "Checkout": "Dhamaystir",
    "Payment": "Bixinta",
    "Contact Us": "Nala soo xiriir",
    "Best Sellers": "Kuwa ugu iibinta badan",
    "Latest Offers": "Heshiisyada cusub",
    "New Products": "Alaabta cusub",
    "Search products...": "Raadi alaab...",
    "Add to cart": "Ku dar shopping-ga",
    "Your cart is empty": "Shopping-gagu waa madhan",
    "Browse Products": "Daalaco alaabta",
    "Continue to Payment": "U sii soco bixinta",
    "Pay Now": "Bixi hadda",
    "Order Summary": "Soo koobid dalabka",
    "Sub-Total": "Wadarta guud",
    "Delivery": "Gaarsiinta",
    "Discount": "Dhimista",
    "Total": "Wadarta",
    "Delivery Address": "Cinwaanka gaarsiinta",
    "Change Address": "Beddel cinwaanka",
    "Delivery Method": "Habka gaarsiinta",
    "Payment Method": "Habka bixinta",
    "Payment Details": "Faahfaahinta bixinta",
    "Quantity": "Tirada",
  },
};

type LocaleContextType = {
  locale: Locale;
  setLocale: (lang: string) => void;
  locales: Locale[];
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(locales[0]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadLocale();
    if (saved.lang !== locales[0].lang) setLocaleState(saved);
    setHydrated(true);
  }, []);

  const setLocale = useCallback((lang: string) => {
    const found = locales.find((l) => l.lang === lang) ?? locales[0];
    setLocaleState(found);
    saveLocale(found.lang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = found.dir;
      document.documentElement.lang = found.lang;
    }
  }, []);

  useEffect(() => {
    document.documentElement.dir = locale.dir;
    document.documentElement.lang = locale.lang;
  }, [locale]);

  const t = useCallback((key: string) => {
    return translations[locale.lang]?.[key] ?? key;
  }, [locale.lang]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, locales, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
