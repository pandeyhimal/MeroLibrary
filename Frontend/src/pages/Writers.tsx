import { useState, useMemo } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Types
interface Writer {
  id: number;
  name: {
    en: string;
    ne: string;
  };
  image: string;
  shortBio: {
    en: string;
    ne: string;
  };
  fullBio: {
    en: string;
    ne: string;
  };
  birthDate: {
    en: string;
    ne: string;
  };
  deathDate?: {
    en: string;
    ne: string;
  };
  birthPlace: {
    en: string;
    ne: string;
  };
  education: {
    en: string[];
    ne: string[];
  };
  notableWorks: {
    en: string[];
    ne: string[];
  };
  awards: {
    en: string[];
    ne: string[];
  };
  genres: {
    en: string[];
    ne: string[];
  };
  category: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

// Sample data for writers
const writers: Writer[] = [
  {
    id: 1,
    name: {
      en: "Laxmi Prasad Devkota",
      ne: "लक्ष्मीप्रसाद देवकोटा"
    },
    image: "https://th.bing.com/th/id/OIP.txt-Z0HM81Pmo8M2LhXchQHaJ5?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `The great poet of Nepali literature, who composed epics like "Munamadan".`,
      ne: "नेपाली साहित्यको महाकवि, जसले 'मुनामदन' जस्ता महाकाव्यहरू रचना गरे।"
    },
    fullBio: {
      en: `Lakshmi Prasad Devkota (1909/11/12–1959/9/14)AD is the Mahakavi (Great Poet) of Nepali literature. He contributed to Nepali literature in various genres such as epic, poetry, drama, and essay. His "Munamadan" is the most famous epic in Nepali literature. He played a significant role in the development of modern Nepali literature.`,
      ne: "लक्ष्मीप्रसाद देवकोटा (१९०९-१९५९)AD नेपाली साहित्यको महाकवि हुन्। उनले नेपाली साहित्यमा महाकाव्य, कविता, नाटक, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'मुनामदन' नेपाली साहित्यको सबैभन्दा प्रसिद्ध महाकाव्य हो। उनले आधुनिक नेपाली साहित्यको विकासमा महत्त्वपूर्ण भूमिका खेलेका छन्।"
    },
    birthDate: {
      en: "BS. 1966/07/27",
      ne: "वि.सं. १९६६/०७/२७"
    },
    deathDate: {
      en: "BS. 2016/06/29",
      ne: "वि.सं. २०१६/०६/२९"
    },
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Trichandra college, Kathmandu",
        "Patna University, India"
      ],
      ne: [
        "त्रिचन्द्र कलेज, काठमाडौं",
        "पटना विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "मुनामदन",
        "पागल",
        "शाकुन्तल",
        "सुलोचना",
        "कुन्जिनी"
      ],
      ne: [
        "मुनामदन",
        "पागल",
        "शाकुन्तल",
        "सुलोचना",
        "कुन्जिनी"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Epic", "Drama", "Essay"],
      ne: ["कविता", "महाकाव्य", "नाटक", "निबन्ध"]
    },
    category: "classical"
  },
  {
    id: 2,
    name: {
      en: "Madhav Prasad Ghimire",
      ne: "माधव प्रसाद घिमिरे"
    },
    image: "https://th.bing.com/th/id/OIP.RQ2cD4Jh0r1ut_B5jemxtAHaE8?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned poet and writer of Nepali literature, who composed epics like "Gorkha".`,
      ne: "नेपाली साहित्यको प्रसिद्ध कवि र लेखक, जसले 'गोरखा' जस्ता महाकाव्यहरू रचना गरे।"
    },
    fullBio: {
      en: `Madhav Prasad Ghimire (1919–2020)AD was a renowned poet and writer of Nepali literature. He contributed to various genres such as poetry, epics, and drama. His epic "Gorkha" is considered one of the finest works in Nepali literature. He played a significant role in the development of Nepali literary tradition.`,
      ne: "माधव प्रसाद घिमिरे (१९१९-२०२०)AD नेपाली साहित्यको प्रसिद्ध कवि र लेखक हुन्। उनले नेपाली साहित्यमा कविता, महाकाव्य, नाटक लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'गोरखा' महाकाव्य नेपाली साहित्यको उत्कृष्ट कृति हो। उनले नेपाली साहित्यको विकासमा महत्त्वपूर्ण भूमिका खेलेका छन्।"
    },
    birthDate: {
      en: "BS. 1978/01/19",
      ne: "वि.सं. १९७८/०१/१९"
    },
    deathDate: {
      en: "BS. 2077/05/05",
      ne: "वि.सं. २०७७/०५/०५"
    },    
    birthPlace: {
      en: "Lamjung, Nepal",
      ne: "लमजुङ, नेपाल"
    },
    education: {
      en: [
        "Trichandra College, Kathmandu",
        "Banaras Hindu University, India"
      ],
      ne: [
        "त्रिचन्द्र कलेज, काठमाडौं",
        "बनारस हिन्दू विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "गोरखा",
        "मालती मङ्गले",
        "अशोक",
        "राजेन्द्र",
        "नवराज"
      ],
      ne: [
        "गोरखा",
        "मालती मङ्गले",
        "अशोक",
        "राजेन्द्र",
        "नवराज"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार",
        "प्रतिभा पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार",
        "प्रतिभा पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Epic", "Drama"],
      ne: ["कविता", "महाकाव्य", "नाटक"]
    },
    category: "classical"
  },
  {
    id: 3,
    name: {
      en: "Balkrishna Sama",
      ne: "बालकृष्ण सम"
    },
    image: "https://assets.rumsan.net/clients/recordnepal/1617605399111",
    shortBio: {
      en: `A renowned playwright and poet of Nepali literature, who wrote plays like "Magh".`,
      ne: "नेपाली साहित्यको प्रसिद्ध नाटककार र कवि, जसले 'माघ' जस्ता नाटकहरू रचना गरे।"
    },
    fullBio: {
      en: `Balkrishna Sama (1902–1981)AD was a renowned playwright and poet in Nepali literature. He contributed to various genres including drama, poetry, and essays. His play "Magh" is considered a classic work in Nepali literature. He played a significant role in the development of Nepali dramatic literature.`,
      ne: "बालकृष्ण सम (१९०२-१९८१)AD नेपाली साहित्यको प्रसिद्ध नाटककार र कवि हुन्। उनले नेपाली साहित्यमा नाटक, कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'माघ' नाटक नेपाली साहित्यको क्लासिक कृति हो। उनले नेपाली नाटक साहित्यको विकासमा महत्त्वपूर्ण भूमिका खेलेका छन्।"
    },
    birthDate: {
      en: "BS. 1969/10/10",
      ne: "वि.सं. १९६९/१०/१०"
    },
    deathDate: {
      en: "BS. 2035/06/06",
      ne: "वि.सं. २०३५/०६/०६"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Durbar Highschool, Kathmandu",
        "Trichandra College, Kathmandu"
      ],
      ne: [
        "दरबार हाइस्कुल, काठमाडौं",
        "त्रिचन्द्र कलेज, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "माघ",
        "मुक्ति",
        "आमा",
        "प्रेमपिण्ड",
        "अन्धो बगैंचा"
      ],
      ne: [
        "माघ",
        "मुक्ति",
        "आमा",
        "प्रेमपिण्ड",
        "अन्धो बगैंचा"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ]
    },
    genres: {
      en: ["Drama", "Poetry", "Essay"],
      ne: ["नाटक", "कविता", "निबन्ध"]
    },
    category: "classical"
  },
  {
    id: 4,
    name: {
      en: "Motiram Bhatta",
      ne: "मोतीराम भट्ट"
    },
    image: "https://sahityapost.com/wp-content/uploads/2020/09/119039514_347240329762796_3983733849251301554_n.png",
    shortBio: {
      en: "The pioneer poet of Nepali literature, who laid the foundation of modern Nepali literature.",
      ne: "नेपाली साहित्यको आदिकवि, जसले आधुनिक नेपाली साहित्यको आधारशिला राखे।"
    },
    fullBio: {
      en: `Motiram Bhatta (1866–1896)AD is regarded as the pioneer poet of Nepali literature. He initiated the modern era in Nepali literature. His work "Priyadarsika" is considered the first modern Nepali poem. He played an important role in the development of Nepali literature.`,
      ne: "मोतीराम भट्ट (१८६६-१८९६)AD नेपाली साहित्यको आदिकवि हुन्। उनले नेपाली साहित्यमा आधुनिक युगको सुरुवात गरेका छन्। उनको 'प्रियदर्शिका' नेपाली साहित्यको पहिलो आधुनिक कविता हो। उनले नेपाली साहित्यको विकासमा महत्त्वपूर्ण भूमिका खेलेका छन्।"
    },
    birthDate: {
      en: "BS. 1923/05/21",
      ne: "वि.सं. १९२३/०५/२१"
    },
    deathDate: {
      en: "BS. 1953/01/25",
      ne: "वि.सं. १९५३/०१/२५"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Durbar Highschool, Kathmandu",
        "Banaras Hindu University, India"
      ],
      ne: [
        "दरबार हाइस्कुल, काठमाडौं",
        "बनारस हिन्दू विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "प्रियदर्शिका",
        "मनोदय",
        "पद्यमञ्जरी",
        "रामगीता"
      ],
      ne: [
        "प्रियदर्शिका",
        "मनोदय",
        "पद्यमञ्जरी",
        "रामगीता"
      ]
    },
    awards: {
      en: [],
      ne: []
    },
    genres: {
      en: ["Poetry", "Essay"],
      ne: ["कविता", "निबन्ध"]
    },
    category: "classical"
  },
  {
    id: 5,
    name: {
      en: "Madan Mani Dixit",
      ne: "मदन मणि दीक्षित"
    },
    image: "https://th.bing.com/th/id/OIP.ykXlkFWYNUk_EJAxtLmx0wAAAA?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned novelist and essayist of Nepali literature, who composed epics like "Munamadan".`,
      ne: "नेपाली साहित्यको प्रसिद्ध उपन्यासकार र निबन्धकार, जसले 'मुनामदन' जस्ता महाकाव्यहरू रचना गरे।"
    },
    fullBio: {
      en: `Madan Mani Dixit (1911–1991)AD was a renowned novelist and essayist of Nepali literature. He contributed to various genres including novels, essays, and poetry. His work "Munamadan" is considered a classic in Nepali literature.`,
      ne: "मदन मणि दीक्षित (१९११-१९९१)AD नेपाली साहित्यको प्रसिद्ध उपन्यासकार र निबन्धकार हुन्। उनले नेपाली साहित्यमा उपन्यास, निबन्ध, कविता लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'मुनामदन' नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 1980/10/21",
      ne: "वि.सं. १९८०/१०/२१"
    },
    deathDate: {
      en: "BS. 2072/03/01",
      ne: "वि.सं. २०७२/०३/०१"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Trichandra College, Kathmandu",
        "Banaras Hindu University, India"
      ],
      ne: [
        "त्रिचन्द्र कलेज, काठमाडौं",
        "बनारस हिन्दू विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "मुनामदन",
        "पागल",
        "शाकुन्तल",
        "सुलोचना"
      ],
      ne: [
        "मुनामदन",
        "पागल",
        "शाकुन्तल",
        "सुलोचना"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "त्रिभुवन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Essay", "Poetry"],
      ne: ["उपन्यास", "निबन्ध", "कविता"]
    },
    category: "classical"
  },
  {
    id: 6,
    name: {
      en: "Banira Giri",
      ne: "बनिरा गिरी"
    },
    image: "https://th.bing.com/th/id/OIP.17oVN2j76b_3RVFFqUM7aQHaJH?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned female poet of Nepali literature, who composed poems like "Karuna."`,
      ne: "नेपाली साहित्यको प्रसिद्ध महिला कवयित्री, जसले 'करुणा' जस्ता कविताहरू रचना गरे।"
    },
    fullBio: {
      en: `Banira Giri (1946–2021)AD was a renowned female poet of Nepali literature. She contributed to Nepali literature through poetry, essays, and various other genres. Her poetry collection "Karuna" is considered a masterpiece of Nepali literature.`,
      ne: "बनिरा गिरी (१९४६-२०२१)AD नेपाली साहित्यको प्रसिद्ध महिला कवयित्री हुन्। उनले नेपाली साहित्यमा कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'करुणा' कविता संग्रह नेपाली साहित्यको उत्कृष्ट कृति हो।"
    },
    birthDate: {
      en: "BS. 2009/11/01",
      ne: "वि.सं. २००९/११/०१"
    },
    deathDate: {
      en: "BS. 2078/02/26",
      ne: "वि.सं. २०७८/०२/२६"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu",
        "Delhi University, India"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं",
        "दिल्ली विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "करुणा",
        "शब्दको सपना",
        "आकाशको छाया",
        "मायाको चुलो"
      ],
      ne: [
        "करुणा",
        "शब्दको सपना",
        "आकाशको छाया",
        "मायाको चुलो"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Essay"],
      ne: ["कविता", "निबन्ध"]
    },
    category: "female"
  },
  {
    id: 7,
    name: {
      en: "Parijat (Bishnu Kumari Waiba)",
      ne: "पारिजात (बिष्णु कुमारी वैवा)"
    },
    image: "https://images.gr-assets.com/authors/1373543549p8/4670909.jpg",
    shortBio: {
      en: `A renowned female writer of Nepali literature, who authored novels like "Shirishko Phool."`,
      ne: "नेपाली साहित्यको प्रसिद्ध महिला लेखिका, जसले 'शिरीषको फूल' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `Parijat (1937–1993)AD was a renowned female writer of Nepali literature. She contributed to Nepali literature through novels, poetry, essays, and various other genres. Her novel "Shirishko Phool" is considered a classic in Nepali literature.`,
      ne: "पारिजात (१९३७-१९९३)AD नेपाली साहित्यको प्रसिद्ध महिला लेखिका हुन्। उनले नेपाली साहित्यमा उपन्यास, कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'शिरीषको फूल' उपन्यास नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 2013/10/27",
      ne: "वि.सं. २०१३/१०/२७"
    },
    deathDate: {
      en: "BS. 2046/02/13",
      ne: "वि.सं. २०४६/०२/१३"
    },    
    birthPlace: {
      en: "Darjeeling, India",
      ne: "दार्जिलिङ, नेपाल"
    },
    education: {
      en: [
        "Padam Kanya sec school, Kathmandu",
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "पदम कन्या मा.वि., काठमाडौं",
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "शिरीषको फूल",
        "महत्त्वाकाङ्क्षा",
        "पहिलो प्रेम",
        "अन्तिम अर्पण"
      ],
      ne: [
        "शिरीषको फूल",
        "महत्त्वाकाङ्क्षा",
        "पहिलो प्रेम",
        "अन्तिम अर्पण"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Poetry", "Essay"],
      ne: ["उपन्यास", "कविता", "निबन्ध"]
    },
    category: "modern"
  },
  {
    id: 8,
    name: {
      en: "Bhanubhakta Acharya",
      ne: "भानुभक्त आचार्य"
    },
    image: "https://thenortheastaffairs.com/wp-content/uploads/2022/07/14555.jpg",
    shortBio: {
      en: `The pioneer poet of Nepali literature, who translated the Ramayana into the Nepali language.`,
      ne: "नेपाली साहित्यको आदिकवि, जसले नेपाली भाषामा रामायण अनुवाद गरे।"
    },
    fullBio: {
      en: `Bhanubhakta Acharya (1814–1868)AD is regarded as the pioneer poet (Aadikavi) of Nepali literature. He made a significant contribution to the development of Nepali literature by translating the Ramayana into the Nepali language. His translation of the Ramayana is considered a classic work in Nepali literature.`,
      ne: "भानुभक्त आचार्य (१८१४-१८६८)AD नेपाली साहित्यको आदिकवि हुन्। उनले नेपाली भाषामा रामायण अनुवाद गरेर नेपाली साहित्यको विकासमा महत्त्वपूर्ण योगदान पुर्याएका छन्। उनको रामायण अनुवाद नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 1871/05/23",
      ne: "वि.सं. १८७१/०५/२३"
    },
    deathDate: {
      en: "BS. 1939/04/06",
      ne: "वि.सं. १९३९/०४/०६"
    },    
    birthPlace: {
      en: "Tanahun, Nepal",
      ne: "तनहुँ, नेपाल"
    },
    education: {
      en: [
        "Paramparik Sanskrit Shikshya"
      ],
      ne: [
        "पारम्परिक संस्कृत शिक्षा"
      ]
    },
    notableWorks: {
      en: [
        "रामायण (अनुवाद)",
        "भक्तमाला",
        "प्रश्नोत्तर",
        "बद्धशिक्षा"
      ],
      ne: [
        "रामायण (अनुवाद)",
        "भक्तमाला",
        "प्रश्नोत्तर",
        "बद्धशिक्षा"
      ]
    },
    awards: {
      en: [],
      ne: []
    },
    genres: {
      en: ["Poetry", "Translation"],
      ne: ["कविता", "अनुवाद"]
    },
    category: "classical"
  },
  {
    id: 9,
    name: {
      en: "B. P. Koirala",
      ne: "बी.पी. कोइराला"
    },
    image: "https://th.bing.com/th/id/OIP.-HwL9SdCCRpXCwoWXUzDLwHaHa?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned novelist and politician of Nepali literature, who authored novels like "Sumnima."`,
      ne: "नेपाली साहित्यको प्रसिद्ध उपन्यासकार र राजनीतिज्ञ, जसले 'सुम्निमा' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `B. P. Koirala (1914–1982)AD was a renowned novelist and politician of Nepali literature. He contributed to Nepali literature through novels, short stories, essays, and various other genres. His novels "Sumnima" and "Tin Ghumti" are considered classic works of Nepali literature.`,
      ne: "बी.पी. कोइराला (१९१४-१९८२) नेपाली साहित्यको प्रसिद्ध उपन्यासकार र राजनीतिज्ञ हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'सुम्निमा', 'तीन घुम्ती' जस्ता उपन्यासहरू नेपाली साहित्यको क्लासिक कृतिहरू हुन्।"
    },
    birthDate: {
      en: "BS. 1992/09/27",
      ne: "वि.सं. १९९२/०९/२७"
    },
    deathDate: {
      en: "BS. 2038/11/15",
      ne: "वि.सं. २०३८/११/१५"
    },    
    birthPlace: {
      en: "Waranasi, Nepal",
      ne: "वाराणसी, नेपाल"
    },
    education: {
      en: [
        "Banaras Hindu University, India",
        "Kolkatta University, India"
      ],
      ne: [
        "बनारस हिन्दू विश्वविद्यालय, भारत",
        "कलकत्ता विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "सुम्निमा",
        "तीन घुम्ती",
        "मोडियाइन",
        "निर्मला"
      ],
      ne: [
        "सुम्निमा",
        "तीन घुम्ती",
        "मोडियाइन",
        "निर्मला"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Story", "Essay"],
      ne: ["उपन्यास", "कथा", "निबन्ध"]
    },
    category: "classical"
  },
  {
    id: 10,
    name: {
      en: "Buddhisagar",
      ne: "बुद्धिसागर"
    },
    image: "https://alchetron.com/cdn/buddhi-sagar-15d0d9f3-d6c4-473c-9435-ce47e7e27e4-resize-750.jpg",
    shortBio: {
      en: `A renowned modern Nepali novelist, who authored novels like "Karnali Blues."`,
      ne: "आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार, जसले 'कर्णाली ब्लुज' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `Buddhisagar (born 1977)AD is a renowned modern Nepali novelist. He has contributed to Nepali literature through novels, stories, and various other genres. His novels "Karnali Blues" and "Phirphire" are considered outstanding works in Nepali literature.`,
      ne: "बुद्धिसागर (जन्म १९७७)AD आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'कर्णाली ब्लुज' र 'फिरफिरे' उपन्यासहरू नेपाली साहित्यको उत्कृष्ट कृतिहरू हुन्।"
    },
    birthDate: {
      en: "BS. 2037/03/24",
      ne: "वि.सं. २०३७/०३/२४"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Jumla, Nepal",
      ne: "जुम्ला, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "कर्णाली ब्लुज",
        "फिरफिरे",
        "काठमाडौं डायरी"
      ],
      ne: [
        "कर्णाली ब्लुज",
        "फिरफिरे",
        "काठमाडौं डायरी"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Story"],
      ne: ["उपन्यास", "कथा"]
    },
    category: "modern"
  },
  {
    id: 11,
    name: {
      en: "Narayan Wagle",
      ne: "नारायण वाग्ले"
    },
    image: "https://www.babelio.com/users/AVT_Narayan-Wagle_612.jpg",
    shortBio: {
      en: `A renowned modern Nepali novelist, who authored novels like "Palpasa Café."`,
      ne: "आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार, जसले 'पल्पसा क्याफे' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `Narayan Wagle (born 1972)AD is a renowned modern Nepali novelist. He has contributed to Nepali literature through novels, stories, and various other genres. His novels "Palpasa Café" and "Mayur Times" are considered outstanding works in Nepali literature.`,
      ne: "नारायण वाग्ले (जन्म १९७२) आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'पल्पसा क्याफे' र 'मयुर टाइम्स' उपन्यासहरू नेपाली साहित्यको उत्कृष्ट कृतिहरू हुन्।"
    },
    birthDate: {
      en: "BS. 2017/03/21",
      ne: "वि.सं. २०१७/०३/२१"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "पल्पसा क्याफे",
        "मयुर टाइम्स",
        "सेतो धरती"
      ],
      ne: [
        "पल्पसा क्याफे",
        "मयुर टाइम्स",
        "सेतो धरती"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Story"],
      ne: ["उपन्यास", "कथा"]
    },
    category: "modern"
  },
  {
    id: 12,
    name: {
      en: "Bhupi Sherchan",
      ne: "भूपी शेरचन"
    },
    image: "https://th.bing.com/th/id/OIP.GXUJDPclQx8Hvpstn5EzSAHaLH?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned poet of Nepali literature, who composed poems like "Ghumne Mechmaathi Andho Manche."`,
      ne: "नेपाली साहित्यको प्रसिद्ध कवि, जसले 'घुम्ने मेचमाथि अन्धो मान्छे' जस्ता कविताहरू रचना गरे।"
    },
    fullBio: {
      en: `Bhupi Sherchan (1936–1989)AD was a renowned poet of Nepali literature. He contributed to Nepali literature through poetry, essays, and various other genres. His poetry collection "Ghumne Mechmaathi Andho Manche" is considered a classic work in Nepali literature.`,
      ne: "भूपी शेरचन (१९३६-१९८९)AD नेपाली साहित्यको प्रसिद्ध कवि हुन्। उनले नेपाली साहित्यमा कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'घुम्ने मेचमाथि अन्धो मान्छे' कविता संग्रह नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 2019/06/28",
      ne: "वि.सं. २०१९/०६/२८"
    },
    deathDate: {
      en: "BS. 2043/01/22",
      ne: "वि.सं. २०४३/०१/२२"
    },    
    birthPlace: {
      en: "Mustang, Nepal",
      ne: "मुस्ताङ, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "घुम्ने मेचमाथि अन्धो मान्छे",
        "हिमाल पारि हेर्दा",
        "आकाश तिर"
      ],
      ne: [
        "घुम्ने मेचमाथि अन्धो मान्छे",
        "हिमाल पारि हेर्दा",
        "आकाश तिर"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Essay"],
      ne: ["कविता", "निबन्ध"]
    },
    category: "poets"
  },
  {
    id: 13,
    name: {
      en: "Lekhnath paudel",
      ne: "लेखनाथ पौड्याल"
    },
    image: "https://alchetron.com/cdn/lekhnath-paudyal-29eaf1f1-7e77-4fe2-aa3c-cc1c040b407-resize-750.jpg",
    shortBio: {
      en: `A renowned poet of Nepali literature, who composed poems like "Barsha Varnan."`,
      ne: "नेपाली साहित्यको प्रसिद्ध कवि, जसले 'वर्षा वर्णन' जस्ता कविताहरू रचना गरे।"
    },
    fullBio: {
      en: `Lekhnath Paudyal (1885–1966) was a renowned poet of Nepali literature. He contributed to Nepali literature through poetry, essays, and various other genres. His poem "Barsha Varnan" is considered a classic work in Nepali literature.`,
      ne: "लेखनाथ पौड्याल (१८८५-१९६६)AD नेपाली साहित्यको प्रसिद्ध कवि हुन्। उनले नेपाली साहित्यमा कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'वर्षा वर्णन' कविता नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 1960/10/06",
      ne: "वि.सं. १९६०/१०/०६"
    },
    deathDate: {
      en: "BS. 2035/07/07",
      ne: "वि.सं. २०३५/०७/०७"
    },    
    birthPlace: {
      en: "Kaski, Nepal",
      ne: "कास्की, नेपाल"
    },
    education: {
      en: [
        "Paramparik Sanskrit Shikshya"
      ],
      ne: [
        "पारम्परिक संस्कृत शिक्षा"
      ]
    },
    notableWorks: {
      en: [
        "वर्षा वर्णन",
        "तरुण तपस्वी",
        "शिशु विकास",
        "राम्रो गर्ने सिक"
      ],
      ne: [
        "वर्षा वर्णन",
        "तरुण तपस्वी",
        "शिशु विकास",
        "राम्रो गर्ने सिक"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Essay"],
      ne: ["कविता", "निबन्ध"]
    },
    category: "poets"
  },
  {
    id: 14,
    name: {
      en: "Gopal Prasad Rimal",
      ne: "गोपाल प्रसाद रिमाल"
    },
    image: "https://th.bing.com/th/id/OIP.wP5fcjRF-Xmji_m6bZEHngAAAA?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A progressive poet of Nepali literature who contributed to the development of modern Nepali poetry.`,
      ne: "नेपाली साहित्यको प्रगतिशील कवि, जसले आधुनिक नेपाली कविताको विकासमा योगदान पुर्याए।"
    },
    fullBio: {
      en: `Gopal Prasad Rimal (1918–1973)AD was a progressive poet of Nepali literature. He contributed to Nepali literature through poetry, drama, and various other genres. He played an important role in the development of modern Nepali poetry.`,
      ne: "गोपाल प्रसाद रिमाल (१९१८-१९७३)AD नेपाली साहित्यको प्रगतिशील कवि हुन्। उनले नेपाली साहित्यमा कविता, नाटक लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनले आधुनिक नेपाली कविताको विकासमा महत्त्वपूर्ण भूमिका खेलेका छन्।"
    },
    birthDate: {
      en: "BS. 1964/10/04",
      ne: "वि.सं. १९६४/१०/०४"
    },
    deathDate: {
      en: "BS. 2030/02/30",
      ne: "वि.सं. २०३०/०२/३०"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Trichandra College, Kathmandu"
      ],
      ne: [
        "त्रिचन्द्र कलेज, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "मास्को",
        "रिमालका कविताहरू",
        "यो प्रजातन्त्र",
        "मायालु"
      ],
      ne: [
        "मास्को",
        "रिमालका कविताहरू",
        "यो प्रजातन्त्र",
        "मायालु"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Drama"],
      ne: ["कविता", "नाटक"]
    },
    category: "poets"
  },
  {
    id: 15,
    name: {
      en: "Shankar Lamichhane",
      ne: "शङ्कर लामिछाने"
    },
    image: "https://th.bing.com/th/id/R.b5ecfd5c774654e8375d22ee35bcc66d?rik=LjnPP5rgnyywCw&pid=ImgRaw&r=0",
    shortBio: {
      en: `A renowned essayist of Nepali literature, who wrote essays like "Pyaj."`,
      ne: "नेपाली साहित्यको प्रसिद्ध निबन्धकार, जसले 'प्याज' जस्ता निबन्धहरू रचना गरे।"
    },
    fullBio: {
      en: `Shankar Lamichhane (1928–1975)AD was a renowned essayist of Nepali literature. He contributed to Nepali literature through essays, stories, and various other genres. His essay collection "Pyaj" is considered a classic work in Nepali literature.`,
      ne: "शङ्कर लामिछाने (१९२८-१९७५)AD नेपाली साहित्यको प्रसिद्ध निबन्धकार हुन्। उनले नेपाली साहित्यमा निबन्ध, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'प्याज' निबन्ध संग्रह नेपाली साहित्यको क्लासिक कृति हो।"
    },
    birthDate: {
      en: "BS. 1984/12/05",
      ne: "वि.सं. २०२८/०३/१७"
    },
    deathDate: {
      en: "BS. 2032/10/10",
      ne: "वि.सं. २०३२/१०/१०"
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Trichandra College, Kathmandu"
      ],
      ne: [
        "त्रिचन्द्र कलेज, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "प्याज",
        "अमृत",
        "श्रीमान गन्धर्व",
        "चिन्तन"
      ],
      ne: [
        "प्याज",
        "अमृत",
        "श्रीमान गन्धर्व",
        "चिन्तन"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Essay", "Story"],
      ne: ["निबन्ध", "कथा"]
    },
    category: "essayists"
  },
  {
    id: 16,
    name: {
      en: "Jhamak Kumari Ghimire",
      ne: "झमक कुमारी घिमिरे"
    },
    image: "https://3.bp.blogspot.com/-F6m0nC2vgP0/UA-4TjE3Y0I/AAAAAAAABPs/4Su5s84nXww/s1600/Jhamak%2B%252B%2BKumari%2BGhimire.jpg",
    shortBio: {
      en: `A renowned female writer of Nepali literature, who authored autobiographies like "Jeevan Kaada Ki Phool."`,
      ne: "नेपाली साहित्यको प्रसिद्ध महिला लेखिका, जसले 'जीवन काडा की फूल' जस्ता आत्मकथाहरू रचना गरे।"
    },
    fullBio: {
      en: `Jhamak Ghimire (born 1980) is a renowned female writer of Nepali literature. She has contributed to Nepali literature through autobiographies, poetry, essays, and various other genres. Her autobiography "Jeevan Kaada Ki Phool" is considered an outstanding work in Nepali literature.`,
      ne: "झमक घिमिरे (जन्म १९८०)AD नेपाली साहित्यको प्रसिद्ध महिला लेखिका हुन्। उनले नेपाली साहित्यमा आत्मकथा, कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'जीवन काडा की फूल' आत्मकथा नेपाली साहित्यको उत्कृष्ट कृति हो।"
    },
    birthDate: {
      en: "BS. 2037/03/21",
      ne: "वि.सं. २०३७/०३/२१"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Jhapa, Nepal",
      ne: "झापा, नेपाल"
    },
    education: {
      en: [
        "Self-Educated"
      ],
      ne: [
        "आत्मशिक्षित"
      ]
    },
    notableWorks: {
      en: [
        "जीवन काडा की फूल",
        "सङ्कल्प",
        "आकाश",
        "मन"
      ],
      ne: [
        "जीवन काडा की फूल",
        "सङ्कल्प",
        "आकाश",
        "मन"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ]
    },
    genres: {
      en: ["Biography", "Poetry", "Essay"],
      ne: ["आत्मकथा", "कविता", "निबन्ध"]
    },
    category: "essayists"
  },
  {
    id: 17,
    name: {
      en: "Amar Neupane",
      ne: "अमर न्यौपाने"
    },
    image: "https://th.bing.com/th/id/OIP.BOtkHZcjI-YtKYacsNk5BwHaGx?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: `A renowned modern Nepali novelist, who authored novels like "Seto Dharti."`,
      ne: "आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार, जसले 'सेतो धरती' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `Amar Nyaupane (born 1973)AD is a renowned modern Nepali novelist. He has contributed to Nepali literature through novels, stories, and various other genres. His novels "Seto Dharti" and "Karodau Kasturi" are considered outstanding works in Nepali literature.`,
      ne: "अमर न्यौपाने (जन्म १९७३)AD आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'सेतो धरती' र 'करोडौं कस्तुरी' उपन्यासहरू नेपाली साहित्यको उत्कृष्ट कृतिहरू हुन्।"
    },
    birthDate: {
      en: "BS. 2034/12/14",
      ne: "वि.सं. २०३४/१२/१४"
    },
    deathDate: {
      en: "",
      ne: ""
    }, 
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "सेतो धरती",
        "करोडौं कस्तुरी",
        "सेतो बाघ",
        "मायालु"
      ],
      ne: [
        "सेतो धरती",
        "करोडौं कस्तुरी",
        "सेतो बाघ",
        "मायालु"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Story"],
      ne: ["उपन्यास", "कथा"]
    },
    category: "modern"
  },
  {
    id: 18,
    name: {
      en: "Krishna Dharabasi",
      ne: "कृष्ण धराबासी"
    },
    image: "https://www.wiki-global.org/wp-content/uploads/2015/04/krishna-dharabasi-2.jpg",
    shortBio: {
      en: `A renowned modern Nepali novelist, who authored novels like "Radha."`,
      ne: "आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार, जसले 'राधा' जस्ता उपन्यासहरू रचना गरे।"
    },
    fullBio: {
      en: `Krishna Dharabasi (born 1964)AD is a renowned modern Nepali novelist. He has contributed to Nepali literature through novels, stories, and various other genres. His novels "Radha" and "Jhola" are considered outstanding works in Nepali literature.`,
      ne: "कृष्ण धराबासी (जन्म १९६४)AD आधुनिक नेपाली साहित्यको प्रसिद्ध उपन्यासकार हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'राधा' र 'झोला' उपन्यासहरू नेपाली साहित्यको उत्कृष्ट कृतिहरू हुन्।"
    },
    birthDate: {
      en: "BS. 2017/04/02",
      ne: "वि.सं. २०१७/०४/०२"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "राधा",
        "झोला",
        "सेतो बाघ",
        "मायालु"
      ],
      ne: [
        "राधा",
        "झोला",
        "सेतो बाघ",
        "मायालु"
      ]
    },
    awards: {
      en: [
        "मदन पुरस्कार"
      ],
      ne: [
        "मदन पुरस्कार"
      ]
    },
    genres: {
      en: ["Novels", "Story"],
      ne: ["उपन्यास", "कथा"]
    },
    category: "modern"
  },
  {
    id: 19,
    name: {
      en: "Yuyutsu Sharma",
      ne: "युयुत्सु शर्मा"
    },
    image: "https://thediplomat.com/wp-content/uploads/2017/07/sizes/td-list-l-2/thediplomat.com-yuyuts-wp.jpg",
    shortBio: {
      en: `A Nepali poet recognized internationally, who represented Nepali poetry worldwide.`,
      ne: "अन्तर्राष्ट्रिय स्तरमा चिनिने नेपाली कवि, जसले विश्वभरमा नेपाली कवितालाई प्रतिनिधित्व गरे।"
    },
    fullBio: {
      en: `Yuyutsu Sharma (born 1960)AD is a Nepali poet recognized internationally. He has contributed to Nepali literature through poetry, translation, and various other genres. He has represented Nepali poetry worldwide.`,
      ne: "युयुत्सु शर्मा (जन्म १९६०)AD अन्तर्राष्ट्रिय स्तरमा चिनिने नेपाली कवि हुन्। उनले नेपाली साहित्यमा कविता, अनुवाद लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनले विश्वभरमा नेपाली कवितालाई प्रतिनिधित्व गरेका छन्।"
    },
    birthDate: {
      en: "BS. 2017/10/21",
      ne: "वि.सं. २०१७/१०/२१"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Newyork University, America"
      ],
      ne: [
        "न्युयोर्क विश्वविद्यालय, अमेरिका"
      ]
    },
    notableWorks: {
      en: [
        "नेपाली कविता",
        "हिमालयन वाइब्स",
        "स्पेस केक",
        "अन्नपूर्ण पोएम्स"
      ],
      ne: [
        "नेपाली कविता",
        "हिमालयन वाइब्स",
        "स्पेस केक",
        "अन्नपूर्ण पोएम्स"
      ]
    },
    awards: {
      en: [
        "अन्तर्राष्ट्रिय कविता पुरस्कार"
      ],
      ne: [
        "अन्तर्राष्ट्रिय कविता पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Translation"],
      ne: ["कविता", "अनुवाद"]
    },
    category: "poets"
  },
  {
    id: 20,
    name: {
      en: "Sarita Tiwari",
      ne: "सरिता तिवारी"
    },
    image: "https://www.onlinekhabar.com/wp-content/uploads/2020/07/Sarita-Tiwari.jpg",
    shortBio: {
      en: `A renowned modern female poet of Nepali literature, who composed feminist poems.`,
      ne: "आधुनिक नेपाली साहित्यको प्रसिद्ध महिला कवयित्री, जसले नारीवादी कविताहरू रचना गरे।"
    },
    fullBio: {
      en: `Sarita Tiwari (born 1975)AD is a renowned modern female poet of Nepali literature. She has contributed to Nepali literature through poetry, essays, and various other genres. Her poems prominently feature feminist consciousness and social concerns.`,
      ne: "सरिता तिवारी (जन्म १९७५)AD आधुनिक नेपाली साहित्यको प्रसिद्ध महिला कवयित्री हुन्। उनले नेपाली साहित्यमा कविता, निबन्ध लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको कविताहरूमा नारीवादी चेतना र समाजिक सरोकार प्रमुख छन्।"
    },
    birthDate: {
      en: "BS. 2036/01/02",
      ne: "वि.सं. २०३६/०१/०२"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं"
      ]
    },
    notableWorks: {
      en: [
        "मायाको चुलो",
        "आकाश तिर",
        "मन",
        "सपना"
      ],
      ne: [
        "मायाको चुलो",
        "आकाश तिर",
        "मन",
        "सपना"
      ]
    },
    awards: {
      en: [
        "सजना पुरस्कार"
      ],
      ne: [
        "सजना पुरस्कार"
      ]
    },
    genres: {
      en: ["Poetry", "Essay"],
      ne: ["कविता", "निबन्ध"]
    },
    category: "female"
  },
  {
    id: 21,
    name: {
      en: "Subin Bhattarai",
      ne: "सुविन भट्टराई"
    },
    image: "https://th.bing.com/th/id/OIP.y4CpWJyOHJ0SstVFtHgcNAHaHa?r=0&rs=1&pid=ImgDetMain",
    shortBio: {
      en: "Modern Nepali novelist and writer, known for works like 'Summer Love' and 'Phirphire'.",
      ne: "आधुनिक नेपाली उपन्यासकार र लेखक, जसले 'समर लभ' र 'फिरफिरे' जस्ता कृतिहरू रचना गरे।"
    },
    fullBio: {
      en: "Subin Bhattarai (born 1987)AD is a modern Nepali novelist and writer. He has contributed to Nepali literature in various genres including novels and short stories. His works like 'Summer Love' and 'Phirphire' are considered excellent works in modern Nepali literature. He is known for his contemporary writing style and portrayal of modern Nepali society.",
      ne: "सुविन भट्टराई (जन्म १९८७)AD आधुनिक नेपाली उपन्यासकार र लेखक हुन्। उनले नेपाली साहित्यमा उपन्यास, कथा लगायत विभिन्न विधामा योगदान पुर्याएका छन्। उनको 'समर लभ' र 'फिरफिरे' जस्ता कृतिहरू आधुनिक नेपाली साहित्यको उत्कृष्ट कृतिहरू मानिन्छन्। उनी आधुनिक लेखन शैली र समकालीन नेपाली समाजको चित्रणका लागि चिनिन्छन्।"
    },
    birthDate: {
      en: "BS. 2039/07/19",
      ne: "वि.सं. २०३९/०७/१९"
    },
    deathDate: {
      en: "",
      ne: ""
    },    
    birthPlace: {
      en: "Kathmandu, Nepal",
      ne: "काठमाडौं, नेपाल"
    },
    education: {
      en: [
        "Tribhuvan University, Kathmandu",
        "University of Delhi, India"
      ],
      ne: [
        "त्रिभुवन विश्वविद्यालय, काठमाडौं",
        "दिल्ली विश्वविद्यालय, भारत"
      ]
    },
    notableWorks: {
      en: [
        "Summer Love",
        "Phirphire",
        "Ulaar",
        "Saat Pailaharu"
      ],
      ne: [
        "समर लभ",
        "फिरफिरे",
        "उलार",
        "सात पैलाहरू"
      ]
    },
    awards: {
      en: [
        "Madan Puraskar",
        "Sajha Puraskar"
      ],
      ne: [
        "मदन पुरस्कार",
        "सजना पुरस्कार"
      ]
    },
    genres: {
      en: ["Novel", "Short Story"],
      ne: ["उपन्यास", "कथा"]
    },
    category: "modern"
  }
];

// Add this after the writers array
const nepaliAlphabets = [
  'क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण',
  'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श',
  'ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ'
];

// Add this after the Writer interface
interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "classical",
    name: "writers.categories.classical.displayName",
    description: "writers.categories.classical.description"
  },
  {
    id: "modern",
    name: "writers.categories.modern.displayName",
    description: "writers.categories.modern.description"
  },
  {
    id: "poets",
    name: "writers.categories.poets.displayName",
    description: "writers.categories.poets.description"
  },
  {
    id: "essayists",
    name: "writers.categories.essayists.displayName",
    description: "writers.categories.essayists.description"
  },
  {
    id: "female",
    name: "writers.categories.female.displayName",
    description: "writers.categories.female.description"
  }
] as const;

// Writer Card Component
const WriterCard = ({ writer, onClick }: { writer: Writer; onClick: () => void }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ne';
  
  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="relative h-64">
        <img
          src={writer.image}
          alt={writer.name[currentLang]}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{writer.name[currentLang]}</h3>
          <p className="text-sm text-gray-200 line-clamp-2">{writer.shortBio[currentLang]}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-2">
          {writer.genres[currentLang].map((genre, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Writer Detail Modal Component
const WriterDetailModal = ({ writer, onClose }: { writer: Writer; onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'ne';
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{writer.name[currentLang]}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label={t('writers.details.close')}
            >
              <FaTimes className="text-3xl" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={writer.image}
                alt={writer.name[currentLang]}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.biography')}</h3>
                <p className="text-gray-800">{writer.fullBio[currentLang]}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.birthDate')}</h3>
                  <p className="text-gray-800">{writer.birthDate[currentLang]}</p>
                </div>
                {writer.deathDate && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.deathDate')}</h3>
                    <p className="text-gray-800">{writer.deathDate[currentLang]}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.birthPlace')}</h3>
                  <p className="text-gray-800">{writer.birthPlace[currentLang]}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.education')}</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {writer.education[currentLang].map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.notableWorks')}</h3>
                <ul className="list-disc list-inside text-gray-800">
                  {writer.notableWorks[currentLang].map((work, index) => (
                    <li key={index}>{work}</li>
                  ))}
                </ul>
              </div>

              {writer.awards[currentLang].length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.awards')}</h3>
                  <ul className="list-disc list-inside text-gray-800">
                    {writer.awards[currentLang].map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('writers.details.genres')}</h3>
                <div className="flex flex-wrap gap-2">
                  {writer.genres[currentLang].map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Writers() {
  const { t } = useTranslation();
  const [selectedWriter, setSelectedWriter] = useState<Writer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlphabet, setSelectedAlphabet] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filter writers based on search and alphabet
  const filteredWriters = useMemo(() => {
    return writers.filter(writer => {
      const matchesSearch = writer.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          writer.name.ne.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          writer.shortBio.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          writer.shortBio.ne.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          writer.fullBio.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          writer.fullBio.ne.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || writer.category === selectedCategory;
      
      const matchesAlphabet = !selectedAlphabet || writer.name.en.startsWith(selectedAlphabet) || writer.name.ne.startsWith(selectedAlphabet);
      
      return matchesSearch && matchesCategory && matchesAlphabet;
    });
  }, [searchQuery, selectedCategory, selectedAlphabet]);

  // Helper function to find category
  const getCategoryInfo = (categoryId: string) => {
    return {
      name: t(`writers.categories.${categoryId}.displayName`),
      description: t(`writers.categories.${categoryId}.description`)
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('writers.title')}</h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {t('writers.description')}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder={t('writers.searchPlaceholder')}
                className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedAlphabet(null);
                }}
                className={`px-4 py-2 rounded-full ${
                  !selectedCategory && !selectedAlphabet
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('writers.filterByCategory')}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedAlphabet(null);
                  }}
                  className={`px-4 py-2 rounded-full ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t(category.name)}
                </button>
              ))}
            </div>

            {/* Alphabet Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => {
                  setSelectedAlphabet(null);
                  setSelectedCategory(null);
                }}
                className={`px-3 py-1 rounded-full ${
                  !selectedAlphabet
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('writers.filterByAlphabet')}
              </button>
              {nepaliAlphabets.map((alphabet) => (
                <button
                  key={alphabet}
                  onClick={() => {
                    setSelectedAlphabet(alphabet);
                    setSelectedCategory(null);
                  }}
                  className={`px-3 py-1 rounded-full ${
                    selectedAlphabet === alphabet
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {alphabet}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Writers Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {selectedCategory 
                ? getCategoryInfo(selectedCategory)?.name
                : selectedAlphabet 
                  ? `${selectedAlphabet} ${t('writers.filterByAlphabet')}`
                  : t('writers.title')}
            </h2>
            {selectedCategory && (
              <p className="text-gray-600 mt-2">
                {getCategoryInfo(selectedCategory)?.description}
              </p>
            )}
          </div>
          <p className="text-gray-600">
            {t('writers.writersFound', { count: filteredWriters.length })}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWriters.map((writer) => (
            <WriterCard
              key={writer.id}
              writer={writer}
              onClick={() => setSelectedWriter(writer)}
            />
          ))}
        </div>
        {filteredWriters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">{t('writers.noWritersFound')}</p>
          </div>
        )}
      </div>

      {/* Writer Detail Modal */}
      {selectedWriter && (
        <WriterDetailModal
          writer={selectedWriter}
          onClose={() => setSelectedWriter(null)}
        />
      )}
    </div>
  );
}

export default Writers; 