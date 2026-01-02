export const INITIAL_PRODUCTS = [
  {
    id: 'wollo-01',
    name: 'Wollo Kemis - Traditional Chic',
    nameAm: 'የወሎ ባህል ቀሚስ',
    description: 'Authentic Wollo embroidery featuring the iconic colorful Tilet patterns on premium hand-spun cotton.',
    descriptionAm: 'በጥጥ የተሰራ የወሎ ባህል ቀሚስ በደማቅ ጥበብ የተሸለመ።',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    category: 'Women',
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Cream'],
    isFeatured: true
  },
  {
    id: 'gondar-01',
    name: 'Gondar Royal Kemis',
    nameAm: 'የጎንደር ባህል ቀሚስ',
    description: 'Inspired by the royalty of Gondar, this dress features thick, elegant embroidery patterns.',
    descriptionAm: 'የጎንደር ነገስታት የሚለብሱት አይነት ጥበብ ያለው ቀሚስ።',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    category: 'Women',
    sizes: ['M', 'L', 'XL'],
    colors: ['White'],
    isFeatured: true
  }
];

export const TRANSLATIONS = {
  en: {
    navHome: 'Home', navShop: 'Collection', navAdmin: 'Admin', navOrders: 'My Orders', navLogin: 'Login', navLogout: 'Logout', navProfile: 'Profile',
    heroTitle: 'Authentic Habesha Tradition', heroSub: 'Hand-woven Ethiopian excellence delivered to your doorstep.',
    featuredTitle: 'Masterpiece Collection', buyNow: 'Order Now', viewDetails: 'Detail', orderTitle: 'Complete Your Order',
    fullName: 'Full Name', phoneNumber: 'Phone Number', deliveryAddress: 'Address', submitOrder: 'Confirm Order', successOrder: 'Order Received!',
    footerContact: 'Support', size: 'Size', color: 'Color', category: 'Category', searchPlaceholder: 'Search...', all: 'All', price: 'Price',
    statusPending: 'Pending', statusApproved: 'Approved', statusDeclined: 'Declined', loginTitle: 'Sign In', signupTitle: 'Sign Up',
    email: 'Email', password: 'Password', dontHaveAccount: "No account?", alreadyHaveAccount: 'Have account?',
    fullNameError: 'Name required', passwordError: 'Min 6 chars', authError: 'Auth failed', duplicateError: 'Exists', loginRequired: 'Login first',
    show: 'Show', hide: 'Hide', productDetails: 'Details'
  },
  am: {
    navHome: 'መነሻ', navShop: 'ምርቶች', navAdmin: 'አስተዳዳሪ', navOrders: 'ትዕዛዞቼ', navLogin: 'ግባ', navLogout: 'ውጣ', navProfile: 'ፕሮፋይል',
    heroTitle: 'እውነተኛ የሀበሻ ጥበብ', heroSub: 'በእጅ የተሰሩ ምርጥ የኢትዮጵያ ባህል ልብሶች።',
    featuredTitle: 'ልዩ ምርቶቻችን', buyNow: 'ይዘዙ', viewDetails: 'ዝርዝር', orderTitle: 'ትእዛዝ ያጠናቅቁ',
    fullName: 'ሙሉ ስም', phoneNumber: 'ስልክ', deliveryAddress: 'አድራሻ', submitOrder: 'አረጋግጥ', successOrder: 'ተቀብለናል!',
    footerContact: 'ያግኙን', size: 'መጠን', color: 'ቀለም', category: 'ምድብ', searchPlaceholder: 'ፈልግ...', all: 'ሁሉም', price: 'ዋጋ',
    statusPending: 'ሂደት ላይ', statusApproved: 'ጸድቋል', statusDeclined: 'ተሰርዟል', loginTitle: 'ይግቡ', signupTitle: 'ይመዝገቡ',
    email: 'ኢሜይል', password: 'የይለፍ ቃል', dontHaveAccount: "አካውንት የለዎትም?", alreadyHaveAccount: 'አካውንት አለዎት?',
    fullNameError: 'ስም ያስፈልጋል', passwordError: 'ቢያንስ 6', authError: 'ስህተት', duplicateError: 'አለ', loginRequired: 'ይግቡ',
    show: 'አሳይ', hide: 'ደብቅ', productDetails: 'ዝርዝር'
  }
};

const PK = 'hab_prod'; const OK = 'hab_ord'; const UK = 'hab_usr'; const CK = 'hab_cur';

export const storageService = {
  getProducts: () => JSON.parse(localStorage.getItem(PK)) || INITIAL_PRODUCTS,
  saveProducts: (p) => localStorage.setItem(PK, JSON.stringify(p)),
  getOrders: () => JSON.parse(localStorage.getItem(OK)) || [],
  getOrdersByUser: (uid) => storageService.getOrders().filter(o => o.userId === uid),
  addOrder: (o) => { const all = storageService.getOrders(); all.unshift(o); localStorage.setItem(OK, JSON.stringify(all)); },
  updateOrderStatus: (id, s) => { const all = storageService.getOrders(); const i = all.findIndex(o => o.id === id); if(i !== -1) { all[i].status = s; localStorage.setItem(OK, JSON.stringify(all)); } },
  getUsers: () => JSON.parse(localStorage.getItem(UK)) || [],
  saveUser: (u) => { const all = storageService.getUsers(); all.push(u); localStorage.setItem(UK, JSON.stringify(all)); },
  getCurrentUser: () => JSON.parse(localStorage.getItem(CK)),
  setCurrentUser: (u) => localStorage.setItem(CK, JSON.stringify(u)),
  logoutUser: () => localStorage.removeItem(CK)
};

export const telegramService = {
  sendOrderNotification: async (o) => { console.log('TELEGRAM:', o); return true; }
};