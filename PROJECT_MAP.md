# PROJECT MAP - MikroTik Hotspot Portal
# سوبر ماركت صيام — الهوية الذهبية

---

## [TECH_STACK]

| الطبقة | التقنية | الحجم | ملاحظات |
|--------|---------|-------|---------|
| Markup | HTML5 | 11.6 KB | Doctype `<!DOCTYPE html>` |
| Styling | CSS3 | 16.7 KB | Pure CSS, 4 breakpoints |
| Scripting | Vanilla JS | 6.2 KB | ES5+ safe, IIFE wrapped |
| Target | MikroTik Hotspot | RouterOS v6+ | Offline-only, zero network |
| Total | 3 files | **33.7 KB** | مناسب لموارد MikroTik |

---

## [COLOR PALETTE — الهوية الذهبية]

| اللون | الكود | الاستخدام |
|-------|-------|-----------|
| ذهبي | `#C5A059` | أزرار، حدود، نقاط تفاعل رئيسية |
| ذهبي فاتح | `#D4AF37` | عناوين، توهج، Hover |
| ذهبي غامق | `#A8862E` | Hover للأزرار |
| بني داكن | `#362E1E` | Header, Footer, خلفية Hero |
| ذهبي ترابي | `#8A6E46` | أيقونات الاتصال, Gallery |
| رمادي فحمي | `#2C3E50` | نصوص أساسية |
| أبيض | `#FAFAFA` | خلفية الصفحة |
| أبيض نقي | `#FFFFFF` | خلفية الكروت |
| رمادي فاتح | `#F4F6F7` | خلفيات أقسام ثانوية |
| رمادي حدود | `#E5E8E8` | حدود وظلال خفيفة |

**نسبة التوزيع (60-30-10):** 60% أبيض/محايد + 30% بني/ذهبي ترابي + 10% ذهبي

---

## [SYSTEM_FLOW]

```
User → WiFi → MikroTik Hotspot → login.html
  │
  ├─ Header: ثابت (شعار + اسم المتجر)
  ├─ Hero: شعار كبير + typing effect ديناميكي
  ├─ Login: POST $(link-login-only) [username + password]
  ├─ Trial: GET trial with MAC
  ├─ Payment: بطاقة بنك فلسطين + QR code
  ├─ Contact: 4 بطاقات (هاتف, واتساب, فيسبوك, موقع)
  ├─ Services: 6 بطاقات خدمات
  ├─ Gallery: 4 صور مع stagger entrance
  └─ Footer: حقوق الملكية
```

---

## [DYNAMIC FEATURES]

| الميزة | التقنية | الوصف |
|--------|---------|-------|
| Typing Effect | JS `setTimeout` | نصوص تظهر حرفاً حرفاً وتتبدل |
| Stagger Entrance | CSS classes `.stagger-1..6` | بطاقات تظهر بتأخير تصاعدي |
| Gradient Animation | CSS `@keyframes bgShift` | خلفية Hero تتحرك ببطء (12s) |
| Glow on Title | CSS `@keyframes glow` | عنوان Hero يتوهج ذهبياً |
| Float Logo | CSS `@keyframes float` | شعار Hero يطفو (4s) |
| Pulse Trial | CSS `@keyframes pulse` | زر التجربة ينبض (3s) |
| Shimmer Button | CSS `::after` pseudo | تأثير ضوء يمر على الزر |
| Animated Counters | JS `setInterval` | أرقام تتصاعد (قابلة للتوسع) |
| Scroll Reveal | IntersectionObserver | العناصر تظهر عند التمرير |

---

## [ORPHANS & PENDING]

| العنصر | الحالة | الإجراء المطلوب |
|--------|--------|-----------------|
| images/logo.png | **بحاجة لصورة** | شعار المتجر (يفضل دائري، خلفية شفافة) |
| images/background.jpg | **بحاجة لصورة** | خلفية Hero (1920x1080) |
| images/payment-qr.png | **بحاجة لصورة** | QR Code بنك فلسطين (300x300) |
| images/store.jpg | **بحاجة لصورة** | صورة واجهة/داخل المتجر (800x600) |
| أرقام الحساب في HTML | **قابلة للتعديل** | غيّر في `payment-single` |
| أرقام التواصل في HTML | **قابلة للتعديل** | غيّر في `contact-grid` |

---

## [VERIFICATION LOG]

| الاختبار | النتيجة | ملاحظات |
|----------|---------|---------|
| MikroTik variables (4) | PASS | `$(link-login-only)`, `$(link-orig)`, `$(mac-esc)`, `$(link-orig-esc)` |
| Zero CDN/External | PASS | لا CDN, لا Google Fonts, لا @import |
| RTL Arabic | PASS | `dir="rtl"` على `<html>` |
| Gold palette applied | PASS | `#C5A059` في الأزرار، `#362E1E` في الهيدر |
| Bank of Palestine only | PASS | بنك فلسطين + QR code — لا بنوك أخرى |
| Hero large logo | PASS | `hero-logo` 120px مع float animation |
| Typing effect | PASS | 4 عبارات متناوبة |
| Stagger animations | PASS | 6 مستويات تأخير |
| Responsive (900/640/420) | PASS | 3 breakpoints + base |
| JS security (no eval/innerHTML) | PASS | safe |
| Total size | PASS | 33.7 KB |
| iOS font-size 16px | PASS | منع auto-zoom |

---

*آخر تحديث: 2026-07-08*
*الحالة: Production-Ready — Gold Edition*
