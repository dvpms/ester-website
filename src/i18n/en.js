// src/i18n/en.js
//
// All UI text in English.
// Imported by components — NEVER hardcode text directly in JSX.
// Key structure MUST be identical to id.js.

export const en = {
  nav: {
    home: "Home",
    properties: "Properties",
    area: "Areas",
    blog: "Articles",
    about: "About Me",
    contact: "Contact",
  },

  cta: {
    whatsapp: "Chat on WhatsApp",
    consult: "Free Consultation",
    brochure: "Request Brochure",
    more: "View More",
    bookSurvey: "Book a Survey",
    submit: "Send",
    calculate: "Calculate",
  },

  hero: {
    headline: "Find Your Dream Property",
    subheadline: "Multi-area property specialist in South Tangerang — BSD City, Gading Serpong, Alam Sutera, and Bintaro.",
    searchPlaceholder: "Search area or property name...",
    badge: "Trusted since 2015",
  },

  filter: {
    allArea: "All Areas",
    allType: "All Types",
    allSegment: "All Segments",
    allTransaction: "All Transactions",
    priceRange: "Price Range",
    apply: "Apply Filters",
    reset: "Reset",
    segment: {
      primary: "Primary (Developer)",
      secondary: "Secondary (Owner)",
    },
    type: {
      rumah: "House",
      ruko: "Shophouse",
      kavling: "Land Plot",
      apartemen: "Apartment",
    },
    transaction: {
      dijual: "For Sale",
      disewakan: "For Rent",
    },
    status: {
      tersedia: "Available",
      terjual: "Sold",
      proses: "In Process",
    },
  },

  form: {
    nama: "Full Name",
    email: "Email Address",
    telepon: "Phone Number",
    pesan: "Message / Question",
    kawasan: "Area of Interest",
    budget: "Maximum Budget",
    jenisProperti: "Property Type",
    segmen: "Segment",
    required: "Required",
    emailInvalid: "Invalid email format",
    phonePlaceholder: "e.g. +62812345678",
    messagePlaceholder: "Tell us about your property needs...",
    successMessage: "Message sent! Esther will contact you shortly.",
    errorMessage: "Something went wrong. Please try again or contact us via WhatsApp.",
    privacy: "Your data is safe and will not be shared with third parties.",
  },

  common: {
    loading: "Loading...",
    noResult: "No properties match your filters.",
    back: "Back",
    share: "Share",
    copy: "Copy Link",
    copied: "Link copied!",
    price: "Price",
    location: "Location",
    type: "Type",
    area: "Area",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    landArea: "Land Area",
    buildingArea: "Building Area",
    developer: "Developer",
    owner: "Owner",
    publishedOn: "Published on",
    readMore: "Read More",
    relatedArticles: "Related Articles",
    relatedProperties: "Properties in This Area",
    trustBadge: "Safe & Trusted Transactions",
    yearsExperience: "Years of Experience",
    propertiesSold: "Properties Sold",
    happyClients: "Happy Clients",
    kawasanCovered: "Areas Covered",
  },

  footer: {
    tagline: "Multi-area property specialist in South Tangerang.",
    quickLinks: "Quick Links",
    contact: "Contact Us",
    followUs: "Follow Us",
    copyright: `© ${new Date().getFullYear()} Esther Property. All rights reserved.`,
    disclaimer: "Prices and availability are subject to change. Contact us for the latest information.",
  },

  kpr: {
    title: "Mortgage Calculator",
    subtitle: "Easily simulate your mortgage payments.",
    hargaRumah: "Property Price (IDR)",
    uangMuka: "Down Payment (%)",
    tenorTahun: "Loan Tenor (Years)",
    bungaTahunan: "Annual Interest Rate (%)",
    hasilSimulasi: "Simulation Results",
    pokokPinjaman: "Principal Loan",
    cicilanPerBulan: "Monthly Installment",
    totalBayar: "Total Payment",
    totalBunga: "Total Interest",
    disclaimer: "This simulation is indicative. Consult your bank for accurate information.",
  },
};
