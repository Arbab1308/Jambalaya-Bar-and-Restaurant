// MOCK DATA ONLY (frontend-only). Replace with backend integration later.

export const siteConfig = {
  brandName: "Greenhouse Bar & Kitchen",
  city: "Goa",
  tagline: "A laid-back bar & kitchen for long nights, loud laughs, and wood-oven comfort.",
  primaryCtaLabel: "Reserve a Table",
  contact: {
    phoneDisplay: "+91 90000 00000",
    phoneTel: "+919000000000",
    whatsappDisplay: "+91 90000 00000",
    whatsappWaMe: "https://wa.me/919000000000",
    addressLine1: "123 Beach Road, Anjuna",
    addressLine2: "North Goa, Goa 403509",
    mapsUrl: "https://maps.google.com/?q=Anjuna+Goa",
    hours: [
      { label: "Mon–Thu", value: "12:00 PM – 12:00 AM" },
      { label: "Fri–Sat", value: "12:00 PM – 1:30 AM" },
      { label: "Sun", value: "12:00 PM – 12:00 AM" }
    ]
  },
  socials: {
    instagramUrl: "https://instagram.com/",
    googleReviewsUrl: "https://www.google.com/search?q=restaurant+reviews",
    zomatoUrl: "https://www.zomato.com/",
    swiggyUrl: "https://www.swiggy.com/"
  }
};

export const media = {
  heroBackground:
    "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/fd18qa4r_image.png",
  gallery: [
    {
      id: "ambience-1",
      label: "Ambience",
      url: "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/zi2ygd2p_image.png"
    },
    {
      id: "dessert-1",
      label: "Dessert",
      url: "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/k4edh0fk_image.png"
    },
    {
      id: "hall-1",
      label: "Dining Hall",
      url: "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/fd18qa4r_image.png"
    },
    {
      id: "burger-1",
      label: "Burgers",
      url: "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/7unvnnyd_image.png"
    },
    {
      id: "salad-1",
      label: "Salads",
      url: "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/tokr8q0p_image.png"
    }
  ]
};

export const signatureDishes = [
  {
    id: "sig-1",
    name: "Wood-Oven Pizza Flight",
    desc: "Margherita + Indiana + Frutti Di Mare — made to share.",
    price: "From ₹340",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/7unvnnyd_image.png",
    pill: "Best Seller"
  },
  {
    id: "sig-2",
    name: "Crème Brûlée",
    desc: "Silky custard, crackled caramel — the perfect finish.",
    price: "Ask for today’s",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/k4edh0fk_image.png",
    pill: "Dessert"
  },
  {
    id: "sig-3",
    name: "Goan Chilly Fry",
    desc: "Squid / Chicken / Beef / Prawn — your heat level, your rules.",
    price: "₹450",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/zi2ygd2p_image.png",
    pill: "Spicy"
  },
  {
    id: "sig-4",
    name: "Chicken Tikka + Cocktails",
    desc: "Smoky grill bites with bar-forward mixes.",
    price: "₹420",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/fd18qa4r_image.png",
    pill: "Pairing"
  },
  {
    id: "sig-5",
    name: "Italian Seafood Salad",
    desc: "Fresh, bright, and built for the beach.",
    price: "₹390",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/tokr8q0p_image.png",
    pill: "Fresh"
  },
  {
    id: "sig-6",
    name: "Paneer Pakoras",
    desc: "Crisp outside, soft inside — a classic start.",
    price: "₹540",
    imageUrl:
      "https://customer-assets.emergentagent.com/job_e454242d-3672-4d3e-9006-cc8e825e06c6/artifacts/7unvnnyd_image.png",
    pill: "Starter"
  }
];

export const menuCategories = [
  {
    id: "starters",
    title: "Starters",
    subtitle: "Crunch, char, spice — built for first sips.",
    items: [
      { name: "Paneer Pakoras", price: 540, veg: true },
      { name: "Gobi Manchurian (Dry)", price: 510, veg: true },
      { name: "Crispy Babycorn", price: 520, veg: true },
      { name: "Cheesy Nachos With Tomato Salsa", price: 520, veg: true },
      { name: "Veg Spring Roll", price: 300, veg: true },
      { name: "Chicken Pakora", price: 520 },
      { name: "Pepper Chicken", price: 350 },
      { name: "Chicken Wings", price: 380 },
      { name: "Chilly Chicken (Dry)", price: 450 },
      { name: "Chicken Malai Kebabs", price: 420 },
      { name: "Chicken Tikka", price: 420 },
      { name: "Chicken Haryali Kebab", price: 400 },
      { name: "Chicken 65", price: 390 },
      { name: "Chicken Spring Roll", price: 390 },
      { name: "Fish Fingers", price: 420 },
      { name: "Rawa Fried Chonak Fish", price: 420 },
      { name: "Fish Tikka", price: 460 },
      { name: "Pepper Prawns", price: 460 },
      { name: "Prawn Tempura", price: 400 },
      { name: "Prawn Cocktail", price: 360 },
      { name: "Chicken Lollipops", price: 350 }
    ]
  },
  {
    id: "soups",
    title: "Soups",
    subtitle: "Warm, bold, and ready for monsoon evenings.",
    items: [
      { name: "Sweetcorn Vegetable", price: 200, veg: true },
      { name: "Vegetable Hot & Sour", price: 200, veg: true },
      { name: "Vegetable Monchow", price: 200, veg: true },
      { name: "Tomato And Basil", price: 220, veg: true },
      { name: "Cream Of Mushroom", price: 220, veg: true },
      { name: "Chicken & Sweetcorn", price: 250 },
      { name: "Chicken Hot & Sour", price: 250 },
      { name: "Chicken Manchow", price: 250 },
      { name: "Sweetcorn Crab Soup", price: 340 }
    ]
  },
  {
    id: "pizzas",
    title: "Wood Oven Pizzas",
    subtitle: "Classic bases. Big flavours. A little smoke.",
    items: [
      { name: "Margherita", price: 340, veg: true },
      {
        name: "Fresca (Buffalo mozzarella, rocket, parmesan)",
        price: 450,
        veg: true
      },
      {
        name: "Diavolo (Paneer, mix grilled veg, mushroom, chilli)",
        price: 450,
        veg: true
      },
      { name: "Americana (Pork pepperoni)", price: 450 },
      { name: "Tedesco (German pork and beef sausage)", price: 450 },
      { name: "Napoletana (Anchovies, capers, olives)", price: 450 },
      { name: "Goana (Spicy goan pork sausages, chillies & onion)", price: 410 },
      { name: "Indiana (Chicken tikka, mozzarella & onion)", price: 410 },
      { name: "Jambalaya Special (Bbq chicken, peppers & onion)", price: 410 },
      { name: "Frutti Di Mare (Mixed fresh seafood)", price: 460 },
      { name: "Quattro Stagioni (Ham, artichokes, mushroom)", price: 450 }
    ]
  },
  {
    id: "goan",
    title: "Goan Dishes",
    subtitle: "Local heat, coastal comfort, always satisfying.",
    items: [
      { name: "Mushroom Xacutti", price: 550, veg: true },
      { name: "Paneer & Mushroom Chilly Fry", price: 350, veg: true },
      { name: "Bhindi Cauliflower & Caldin", price: 340, veg: true },
      { name: "Goan Chilly Fry- Squid/Chicken/Beef/Prawn", price: 450 },
      { name: "Goan Pork Sausage Chilli Fry", price: 420 },
      { name: "Goan Roast Pork Chilli Fry", price: 440 },
      { name: "Chicken Xacutti/Vindalho (On the bone)", price: 410 },
      { name: "Chicken Cafreal (Half chicken)", price: 410 },
      { name: "Pork Vindalho", price: 450 },
      { name: "Goan Fish Curry Rice", price: 410 },
      { name: "Goan Prawn Curry Rice", price: 410 },
      { name: "King Prawn Xacutti", price: 730 },
      { name: "Mutton Xacutti (On the bone)", price: 550 }
    ]
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Something sweet. Something memorable.",
    items: [
      {
        name: "Fresh Fruit Salad (Chunks of seasonal fruit)",
        price: 0,
        meta: "Ask for today’s"
      },
      {
        name: "Brownie Mania (Warm brownie with vanilla gelato)",
        price: 0,
        meta: "Ask for today’s"
      },
      { name: "Banana Split", price: 0, meta: "Ask for today’s" },
      { name: "Tiramisu", price: 0, meta: "Ask for today’s" },
      { name: "Creme Brulee", price: 0, meta: "Ask for today’s" },
      { name: "Nutella Pizza", price: 0, meta: "Ask for today’s" },
      {
        name: "Italian Gelato (2 scoops)",
        price: 0,
        meta: "Vanilla, chocolate, hazelnut & more"
      }
    ]
  }
];

export const events = [
  {
    id: "event-1",
    title: "Live Music Fridays",
    desc: "Acoustic sets that build into a full-room singalong.",
    when: "Every Friday • 8:30 PM",
    highlight: "Limited tables near the stage"
  },
  {
    id: "event-2",
    title: "Cocktail Hour",
    desc: "House pours, sharp mixes, and easy conversation.",
    when: "Daily • 5:00 PM – 7:00 PM",
    highlight: "Ask for the bartender’s special"
  },
  {
    id: "event-3",
    title: "Sunday Brunch Club",
    desc: "Fresh salads, grill plates, and dessert finales.",
    when: "Sundays • 12:00 PM – 4:00 PM",
    highlight: "Great for groups"
  }
];

export const testimonials = [
  {
    id: "t-1",
    name: "Aarav",
    quote:
      "The vibe is unreal — greenery overhead, warm lights, and a menu that keeps everyone happy.",
    rating: 5
  },
  {
    id: "t-2",
    name: "Meera",
    quote:
      "Wood-oven pizzas + cocktails was the move. Staff was quick and super friendly.",
    rating: 5
  },
  {
    id: "t-3",
    name: "Kunal",
    quote:
      "Perfect for birthdays. We booked a corner and it felt like our own little party.",
    rating: 4
  }
];

export const faqs = [
  {
    id: "faq-1",
    q: "Do you take walk-ins?",
    a: "Yes — but weekends fill fast. Reserving guarantees your table (especially for larger groups)."
  },
  {
    id: "faq-2",
    q: "Can you accommodate birthdays and private parties?",
    a: "Absolutely. Tell us your date, headcount, and vibe — we’ll set up seating, music, and a custom menu plan."
  },
  {
    id: "faq-3",
    q: "Do you have vegetarian options?",
    a: "Plenty. We highlight veg items across the menu and can also customize spice levels." 
  }
];
