const cities = {
  "87": {
    id: 87,
    name_tr: "Duhok",
    name_en: "Duhok",
    name_ar: "دهوك",
    address_tr: "Shele caddesi Duhok Tower yani",
    address_en: "Shele caddesi Duhok Tower yani",
    address_ar: "شارع شيلي الجديد قرب دهوك تاور"
  },
  "88": {
    id: 88,
    name_tr: "Erbil",
    name_en: "Erbil",
    name_ar: "أربيل",
    address_tr: "30 metre caddesi Minare Parkı karşısı",
    address_en: "30 metre caddesi Minare Parkı karşısı",
    address_ar: "شارع ٣٠ م -مقابل پارك منارة."
  },
  "92": {
    id: 92,
    name_tr: "Kerkük",
    name_en: "Kerkuk",
    name_ar: "التعميم",
    address_tr: "Kerkük",
    address_en: "Kerkük",
    address_ar: "التعميم"
  },
  "96": {
    id: 96,
    name_tr: "Musul",
    name_en: "Mosul",
    name_ar: "نينوى",
    address_tr: "Musul",
    address_en: "Mosul",
    address_ar: "نينوى"
  },
  "98": {
    id: 98,
    name_tr: "Sulaymaniyah",
    name_en: "Sulaymaniyah",
    name_ar: "سليمانية",
    address_tr: "Sulaymaniyah",
    address_en: "Sulaymaniyah",
    address_ar: "سليمانية"
  },
  "101": {
    id: 101,
    name_tr: "Zaho",
    name_en: "Zaho",
    name_ar: "زاخو",
    address_tr: "Newroz yolu üzeri zakho parkı karşısı",
    address_en: "Newroz yolu üzeri zakho parkı karşısı",
    address_ar: "زاخو شارع نوروز مقابل حديقة زاخو"
  }
}

const getCities = () => {
  // object to array without keys
  const arrayOfCities = Object.keys(cities).map(key => cities[key]);
  return arrayOfCities;
}

const getCityById = (id) => {
  return cities[id];
}

export { getCities, getCityById }