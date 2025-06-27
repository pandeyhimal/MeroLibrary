import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar, FaRegStar, FaShoppingCart, FaHeart, FaShare } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Book {
  id: number;
  title: string;
  author: {
    en: string;
    ne: string;
  };
  image: string;
  description: string;
  price: string;
  rating: number;
  category: string;
  language: string;
  pages: number;
  publisher: string;
  publishYear: number;
  isbn: string;
  stock: number;
  reviews: Review[];
}

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
}

interface BookCardProps {
  book: Book;
  onBookClick: (book: Book) => void;
}

// Sample data for most sold books (in real application, this would come from an API)
const mostSoldBooks = [
  {
    id: 1,
    title: "पल्पसा काफे",
    author: {
      en: "Narayan Wagle",
      ne: "नारायण वाग्ले"
    },
    image: "https://usedbooks.sajhakitab.com/wp-content/uploads/2020/12/61hxB9INYDL.jpg",
    description: "एक प्रसिद्ध नेपाली उपन्यास जसले काठमाडौंको जीवनशैली र समाजको चित्रण गर्छ।",
    price: "रु. 550",
    rating: 4.8
  },
  {
    id: 2,
    title: "मुनामदन",
    author: {
      en: "Madhav Prasad Ghimire",
      ne: "माधव प्रसाद घिमिरे"
    },
    image: "https://en.dharmapedia.net/w/images/1/1d/Muna_Madan_-_book_cover.jpg",
    description: "नेपाली साहित्यको क्लासिक कृति, जसले प्रेम र विरहको कथा सुनाउँछ।",
    price: "रु. 450",
    rating: 4.9
  },
  {
    id: 3,
    title: "सेतो धरती",
    author: {
      en: "Amar Neupane",
      ne: "अमर न्यौपाने"
    },
    image: "https://th.bing.com/th/id/OIP.ulrQKkxqHuZ6ci-JiLV2-QAAAA?r=0&rs=1&pid=ImgDetMain",
    description: "नेपाली समाजको परिवर्तन र विकासको कथा समेटिएको उपन्यास।",
    price: "रु. 650",
    rating: 4.7
  },
  {
    id: 4,
    title: "शिरीषको फूल",
    author: {
      en: "Balkrishna Sama",
      ne: "बालकृष्ण सम"
    },
    image: "https://www.sourcenepal.com/wp-content/uploads/2023/08/Siris-ko-Phool.webp",
    description: "नेपाली कविताको उत्कृष्ट कृति, जसले प्रकृतिको सौन्दर्य र मानवीय भावनाहरूको चित्रण गर्छ।",
    price: "रु. 350",
    rating: 4.6
  }
];

// Sample data for book categories
const bookCategories = [
  {
    id: 'literature',
    title: 'नेपाली साहित्य',
    books: [
      {
        id: 1,
        title: "पल्पसा काफे",
        author: {
          en: "Narayan Wagle",
          ne: "नारायण वाग्ले"
        },
        image: "https://usedbooks.sajhakitab.com/wp-content/uploads/2020/12/61hxB9INYDL.jpg",
        description: "एक प्रसिद्ध नेपाली उपन्यास जसले काठमाडौंको जीवनशैली र समाजको चित्रण गर्छ।",
        price: "रु. 550",
        rating: 4.8,
        category: "literature",
        language: "नेपाली",
        pages: 280,
        publisher: "साझा प्रकाशन",
        publishYear: 2075,
        isbn: "978-9937-0-1234-5",
        stock: 15,
        reviews: [
          { user: "राम शर्मा", rating: 5, comment: "अत्यन्तै राम्रो पुस्तक" },
          { user: "सिता पौडेल", rating: 4, comment: "पढ्न लायक पुस्तक" }
        ]
      },
      {
        id: 2,
        title: "शिरीषको फूल",
        author: {
          en: "Balkrishna Sama",
          ne: "बालकृष्ण सम"
        },
        image: "https://www.sourcenepal.com/wp-content/uploads/2023/08/Siris-ko-Phool.webp",
        description: "नेपाली कविताको उत्कृष्ट कृति, जसले प्रकृतिको सौन्दर्य र मानवीय भावनाहरूको चित्रण गर्छ।",
        price: "रु. 350",
        rating: 4.6,
        category: "literature",
        language: "नेपाली",
        pages: 150,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2070,
        isbn: "978-9937-0-5678-9",
        stock: 25,
        reviews: [
          { user: "कृष्ण श्रेष्ठ", rating: 5, comment: "कविताको उत्कृष्ट संग्रह" }
        ]
      }
    ]
  },
  {
    id: 'novel',
    title: 'उपन्यास',
    books: [
      {
        id: 3,
        title: "मुनामदन",
        author: {
          en: "Madhav Prasad Ghimire",
          ne: "माधव प्रसाद घिमिरे"
        },
        image: "https://en.dharmapedia.net/w/images/1/1d/Muna_Madan_-_book_cover.jpg",
        description: "नेपाली साहित्यको क्लासिक कृति, जसले प्रेम र विरहको कथा सुनाउँछ।",
        price: "रु. 450",
        rating: 4.9,
        category: "novel",
        language: "नेपाली",
        pages: 320,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2070,
        isbn: "978-9937-0-5678-9",
        stock: 20,
        reviews: [
          { user: "हरि थापा", rating: 5, comment: "क्लासिक नेपाली उपन्यास" }
        ]
      },
      {
        id: 4,
        title: "सेतो धरती",
        author: {
          en: "Amar Neupane",
          ne: "अमर न्यौपाने"
        },
        image: "https://th.bing.com/th/id/OIP.ulrQKkxqHuZ6ci-JiLV2-QAAAA?r=0&rs=1&pid=ImgDetMain",
        description: "नेपाली समाजको परिवर्तन र विकासको कथा समेटिएको उपन्यास।",
        price: "रु. 650",
        rating: 4.7,
        category: "novel",
        language: "नेपाली",
        pages: 400,
        publisher: "साझा प्रकाशन",
        publishYear: 2072,
        isbn: "978-9937-0-9012-3",
        stock: 18,
        reviews: [
          { user: "सुनीता शर्मा", rating: 4, comment: "समाजको यथार्थ चित्रण" }
        ]
      },
      {
        id: 1002,
        title: "Summer Love",
        author: {
          en: "Subin Bhattarai",
          ne: "सुविन भट्टराई"
        },
        image: "https://res.cloudinary.com/drrum5kpx/image/upload/v1718032772/images/summer-love.jpg",
        description: "Subin Bhattarai द्वारा लिखित चर्चित प्रेम उपन्यास।",
        price: "रु. 480",
        rating: 4.7,
        category: "novel",
        language: "नेपाली",
        pages: 320,
        publisher: "FinePrint",
        publishYear: 2069,
        isbn: "978-9937-0-1111-1",
        stock: 12,
        reviews: [
          { user: "पाठक", rating: 5, comment: "युवापुस्तामा लोकप्रिय" }
        ]
      }
    ]
  },
  {
    id: 'drama',
    title: 'नाटक',
    books: [
      {
        id: 5,
        title: "माघ",
        author: {
          en: "Balkrishna Sama",
          ne: "बालकृष्ण सम"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपाली नाटक साहित्यको क्लासिक कृति, जसले समाजको विभिन्न पक्षहरूको चित्रण गर्छ।",
        price: "रु. 380",
        rating: 4.5,
        category: "drama",
        language: "नेपाली",
        pages: 200,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2068,
        isbn: "978-9937-0-3456-7",
        stock: 12,
        reviews: [
          { user: "राजेश शर्मा", rating: 4, comment: "उत्कृष्ट नाटक" }
        ]
      },
      {
        id: 6,
        title: "मुक्ति",
        author: {
          en: "Madhav Prasad Ghimire",
          ne: "माधव प्रसाद घिमिरे"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "स्वतन्त्रता र मुक्तिको कथा समेटिएको नाटक।",
        price: "रु. 420",
        rating: 4.6,
        category: "drama",
        language: "नेपाली",
        pages: 250,
        publisher: "साझा प्रकाशन",
        publishYear: 2071,
        isbn: "978-9937-0-7890-1",
        stock: 15,
        reviews: [
          { user: "अनिता श्रेष्ठ", rating: 5, comment: "दर्शनीय नाटक" }
        ]
      }
    ]
  },
  {
    id: 'philosophy',
    title: 'दर्शन',
    books: [
      {
        id: 7,
        title: "नेपाली दर्शन",
        author: {
          en: "डा. राम प्रसाद दाहाल",
          ne: "डा. राम प्रसाद दाहाल"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपाली दार्शनिक विचारधारा र परम्पराको विश्लेषणात्मक अध्ययन।",
        price: "रु. 750",
        rating: 4.7,
        category: "philosophy",
        language: "नेपाली",
        pages: 450,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-2345-6",
        stock: 10,
        reviews: [
          { user: "डा. कृष्ण शर्मा", rating: 5, comment: "दार्शनिक विचारको उत्कृष्ट विश्लेषण" }
        ]
      }
    ]
  },
  {
    id: 'history',
    title: 'इतिहास',
    books: [
      {
        id: 8,
        title: "नेपालको इतिहास",
        author: {
          en: "डा. बाबुराम आचार्य",
          ne: "डा. बाबुराम आचार्य"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपालको प्राचीन कालदेखि आधुनिक कालसम्मको विस्तृत इतिहास।",
        price: "रु. 950",
        rating: 4.8,
        category: "history",
        language: "नेपाली",
        pages: 600,
        publisher: "साझा प्रकाशन",
        publishYear: 2074,
        isbn: "978-9937-0-4567-8",
        stock: 8,
        reviews: [
          { user: "प्रो. राम श्रेष्ठ", rating: 5, comment: "इतिहासको उत्कृष्ट दस्तावेज" }
        ]
      },
      {
        id: 9,
        title: "नेपाली क्रान्तिको इतिहास",
        author: {
          en: "डा. पुष्प कमल दाहाल",
          ne: "डा. पुष्प कमल दाहाल"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपाली क्रान्तिको विस्तृत विश्लेषण र इतिहास।",
        price: "रु. 850",
        rating: 4.6,
        category: "history",
        language: "नेपाली",
        pages: 500,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2072,
        isbn: "978-9937-0-6789-0",
        stock: 12,
        reviews: [
          { user: "डा. सुरेश शर्मा", rating: 4, comment: "क्रान्तिको विस्तृत विश्लेषण" }
        ]
      }
    ]
  },
  {
    id: 'biography',
    title: 'जीवनी',
    books: [
      {
        id: 10,
        title: "मदन भण्डारी: जीवन र विचार",
        author: {
          en: "डा. सुरेश अलाल",
          ne: "डा. सुरेश अलाल"
        },
        image: "https://th.bing.com/th/id/R.4bc634d94a8d7907a63661d6c857f2bd?rik=rsp9bDrDGnXGXg&pid=ImgRaw&r=0",
        description: "नेपाली राजनीतिक नेता मदन भण्डारीको जीवन र विचारधाराको विश्लेषण।",
        price: "रु. 650",
        rating: 4.7,
        category: "biography",
        language: "नेपाली",
        pages: 350,
        publisher: "साझा प्रकाशन",
        publishYear: 2071,
        isbn: "978-9937-0-8901-2",
        stock: 15,
        reviews: [
          { user: "राजेश श्रेष्ठ", rating: 5, comment: "उत्कृष्ट जीवनी" }
        ]
      },
      {
        id: 11,
        title: "बालकृष्ण सम: जीवन र साहित्य",
        author: {
          en: "डा. राम प्रसाद शर्मा",
          ne: "डा. राम प्रसाद शर्मा"
        },
        image: "https://th.bing.com/th/id/OIP.mHArxHuV9fl9XMNHeDJluAHaEL?r=0&rs=1&pid=ImgDetMain",
        description: "नेपाली साहित्यकार बालकृष्ण समको जीवन र साहित्यिक योगदानको विश्लेषण।",
        price: "रु. 750",
        rating: 4.8,
        category: "biography",
        language: "नेपाली",
        pages: 400,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-9012-3",
        stock: 10,
        reviews: [
          { user: "डा. सुनीता शर्मा", rating: 5, comment: "साहित्यकारको जीवनको उत्कृष्ट विश्लेषण" }
        ]
      },
      {
        id: 1001,
        title: "जीवन काँडा कि फूल",
        author: {
          en: "Jhamak Ghimire",
          ne: "झमक घिमिरे"
        },
        image: "https://villanepal.com/wp-content/uploads/2024/07/Jiwan-Kada-Ki-Phool-640x1024.webp",
        description: "झमक घिमिरेको आत्मकथा, नेपाली साहित्यमा बहुचर्चित कृति।",
        price: "रु. 450",
        rating: 4.9,
        category: "biography",
        language: "नेपाली",
        pages: 300,
        publisher: "झमक घिमिरे प्रतिष्ठान",
        publishYear: 2067,
        isbn: "978-9937-0-0000-0",
        stock: 10,
        reviews: [
          { user: "समीक्षक", rating: 5, comment: "प्रेरणादायी कृति" }
        ]
      }
    ]
  },
  {
    id: 'poetry',
    title: 'कविता',
    books: [
      {
        id: 12,
        title: "मुनामदन",
        author: {
          en: "लक्ष्मीप्रसाद देवकोटा",
          ne: "लक्ष्मीप्रसाद देवकोटा"
        },
        image: "https://en.dharmapedia.net/w/images/1/1d/Muna_Madan_-_book_cover.jpg",
        description: "नेपाली साहित्यको सबैभन्दा प्रसिद्ध महाकाव्य, जसले प्रेम र विरहको कथा सुनाउँछ।",
        price: "रु. 450",
        rating: 4.9,
        category: "poetry",
        language: "नेपाली",
        pages: 200,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2070,
        isbn: "978-9937-0-1234-6",
        stock: 25,
        reviews: [
          { user: "डा. राम शर्मा", rating: 5, comment: "नेपाली साहित्यको उत्कृष्ट कृति" }
        ]
      },
      {
        id: 13,
        title: "पागल",
        author: {
          en: "लक्ष्मीप्रसाद देवकोटा",
          ne: "लक्ष्मीप्रसाद देवकोटा"
        },
        image: "https://aksharang.com/wp-content/uploads/2024/07/29-JULY-2024-03.jpg",
        description: "महाकवि देवकोटाको प्रसिद्ध कविता संग्रह।",
        price: "रु. 350",
        rating: 4.8,
        category: "poetry",
        language: "नेपाली",
        pages: 150,
        publisher: "साझा प्रकाशन",
        publishYear: 2072,
        isbn: "978-9937-0-2345-7",
        stock: 20,
        reviews: [
          { user: "कवि कृष्ण श्रेष्ठ", rating: 5, comment: "कविताको उत्कृष्ट संग्रह" }
        ]
      },
      {
        id: 1003,
        title: "Man of Nepal",
        author: {
          en: "Balen Shah",
          ne: "बालेन शाह"
        },
        image: "https://th.bing.com/th/id/OIP.hK-h6ksUsvpDUE_-BM_qSQHaJQ?r=0&rs=1&pid=ImgDetMain",
        description: "बालेन शाह द्वारा लिखित चर्चित कविता संग्रह।",
        price: "रु. 350",
        rating: 4.8,
        category: "poetry",
        language: "नेपाली",
        pages: 120,
        publisher: "Balen Publications",
        publishYear: 2078,
        isbn: "978-9937-0-2222-2",
        stock: 8,
        reviews: [
          { user: "कविता प्रेमी", rating: 5, comment: "समसामयिक कविता" }
        ]
      }
    ]
  },
  {
    id: 'shortStories',
    title: 'कथा',
    books: [
      {
        id: 14,
        title: "दोषी चश्मा",
        author: {
          en: "बीपी कोइराला",
          ne: "बीपी कोइराला"
        },
        image: "https://th.bing.com/th/id/OIP.PTMUoj9pTjuGhQYZo9Q45gHaLM?r=0&rs=1&pid=ImgDetMain",
        description: "नेपाली कथाको क्लासिक संग्रह।",
        price: "रु. 400",
        rating: 4.7,
        category: "short-stories",
        language: "नेपाली",
        pages: 250,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2071,
        isbn: "978-9937-0-3456-8",
        stock: 15,
        reviews: [
          { user: "साहित्यकार राम शर्मा", rating: 5, comment: "कथाको उत्कृष्ट संग्रह" }
        ]
      }
    ]
  },
  {
    id: 'children',
    title: 'बाल साहित्य',
    books: [
      {
        id: 15,
        title: "बाल कथाहरू",
        author: {
          en: "माधव प्रसाद घिमिरे",
          ne: "माधव प्रसाद घिमिरे"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "बालबालिकाहरूको लागि रचित कथाहरूको संग्रह।",
        price: "रु. 250",
        rating: 4.6,
        category: "children",
        language: "नेपाली",
        pages: 100,
        publisher: "साझा प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-4567-9",
        stock: 30,
        reviews: [
          { user: "शिक्षक सुनीता शर्मा", rating: 5, comment: "बालबालिकाहरूको लागि उपयोगी" }
        ]
      }
    ]
  },
  {
    id: 'travel',
    title: 'यात्रा वृत्तान्त',
    books: [
      {
        id: 16,
        title: "हिमाल यात्रा",
        author: {
          en: "डा. तुलसी दिवस",
          ne: "डा. तुलसी दिवस"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपालको हिमाली क्षेत्रको यात्रा वृत्तान्त।",
        price: "रु. 650",
        rating: 4.7,
        category: "travel",
        language: "नेपाली",
        pages: 300,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2072,
        isbn: "978-9937-0-5678-0",
        stock: 12,
        reviews: [
          { user: "यात्री राम श्रेष्ठ", rating: 4, comment: "हिमालको सुन्दर वर्णन" }
        ]
      }
    ]
  },
  {
    id: 'religious',
    title: 'धार्मिक साहित्य',
    books: [
      {
        id: 17,
        title: "श्रीमद्भगवद्गीता",
        author: {
          en: "वेदव्यास",
          ne: "वेदव्यास"
        },
        image: "https://cdn.kobo.com/book-images/bc852c9f-2f5e-46fc-8bd5-92adb413189b/1200/1200/False/bhagavad-gita-as-it-is-1.jpg",
        description: "नेपाली अनुवाद र व्याख्यासहितको गीता।",
        price: "रु. 750",
        rating: 4.8,
        category: "religious",
        language: "नेपाली",
        pages: 400,
        publisher: "साझा प्रकाशन",
        publishYear: 2071,
        isbn: "978-9937-0-6789-1",
        stock: 20,
        reviews: [
          { user: "पण्डित कृष्ण शर्मा", rating: 5, comment: "उत्कृष्ट अनुवाद" }
        ]
      }
    ]
  },
  {
    id: 'educational',
    title: 'शैक्षिक पुस्तकहरू',
    books: [
      {
        id: 18,
        title: "नेपाली व्याकरण",
        author: {
          en: "डा. तुलसी राम वैद्य",
          ne: "डा. तुलसी राम वैद्य"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपाली भाषाको व्याकरणको विस्तृत अध्ययन।",
        price: "रु. 550",
        rating: 4.7,
        category: "educational",
        language: "नेपाली",
        pages: 350,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-7890-2",
        stock: 25,
        reviews: [
          { user: "प्रो. राम शर्मा", rating: 5, comment: "व्याकरणको उत्कृष्ट पुस्तक" }
        ]
      }
    ]
  },
  {
    id: 'health',
    title: 'स्वास्थ्य र चिकित्सा',
    books: [
      {
        id: 19,
        title: "आयुर्वेदिक चिकित्सा",
        author: {
          en: "डा. राम प्रसाद शर्मा",
          ne: "डा. राम प्रसाद शर्मा"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "आयुर्वेदिक चिकित्साको विस्तृत जानकारी।",
        price: "रु. 850",
        rating: 4.6,
        category: "health",
        language: "नेपाली",
        pages: 450,
        publisher: "साझा प्रकाशन",
        publishYear: 2072,
        isbn: "978-9937-0-8901-3",
        stock: 15,
        reviews: [
          { user: "डा. सुनीता शर्मा", rating: 4, comment: "आयुर्वेदको उत्कृष्ट जानकारी" }
        ]
      }
    ]
  },
  {
    id: 'agriculture',
    title: 'कृषि र वातावरण',
    books: [
      {
        id: 20,
        title: "आधुनिक कृषि",
        author: {
          en: "डा. राम कृष्ण शर्मा",
          ne: "डा. राम कृष्ण शर्मा"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "आधुनिक कृषि पद्धतिको विस्तृत जानकारी।",
        price: "रु. 750",
        rating: 4.5,
        category: "agriculture",
        language: "नेपाली",
        pages: 400,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-9012-4",
        stock: 18,
        reviews: [
          { user: "कृषक राम श्रेष्ठ", rating: 4, comment: "कृषिको लागि उपयोगी" }
        ]
      }
    ]
  },
  {
    id: 'business',
    title: 'व्यवसाय र अर्थशास्त्र',
    books: [
      {
        id: 21,
        title: "नेपाली अर्थतन्त्र",
        author: {
          en: "डा. राम शरण महत",
          ne: "डा. राम शरण महत"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपालको अर्थतन्त्रको विश्लेषणात्मक अध्ययन।",
        price: "रु. 950",
        rating: 4.7,
        category: "business",
        language: "नेपाली",
        pages: 500,
        publisher: "साझा प्रकाशन",
        publishYear: 2074,
        isbn: "978-9937-0-0123-5",
        stock: 12,
        reviews: [
          { user: "अर्थशास्त्री कृष्ण शर्मा", rating: 5, comment: "अर्थतन्त्रको उत्कृष्ट विश्लेषण" }
        ]
      }
    ]
  },
  {
    id: 'technology',
    title: 'कम्प्युटर र प्रविधि',
    books: [
      {
        id: 22,
        title: "डिजिटल नेपाल",
        author: {
          en: "डा. सुरेश शर्मा",
          ne: "डा. सुरेश शर्मा"
        },
        image: "https://m.media-amazon.com/images/I/71YwZR+QNQL._AC_UF1000,1000_QL80_.jpg",
        description: "नेपालमा डिजिटल प्रविधिको विकास र प्रभाव।",
        price: "रु. 850",
        rating: 4.6,
        category: "technology",
        language: "नेपाली",
        pages: 350,
        publisher: "नेपाल प्रकाशन",
        publishYear: 2073,
        isbn: "978-9937-0-1234-7",
        stock: 15,
        reviews: [
          { user: "प्रविधि विशेषज्ञ राम श्रेष्ठ", rating: 4, comment: "डिजिटल प्रविधिको उत्कृष्ट विश्लेषण" }
        ]
      }
    ]
  }
];

// Book Detail Modal Component
const BookDetailModal = ({ book, onClose }: BookDetailModalProps) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  if (!book) return null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
      return;
    }
    // Extract numeric price from string (e.g., "रु. 550" -> 550)
    const priceMatch = book.price.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : 0;
    const rentalPrice = 2; // Fixed daily rental rate of रु. 2 per day
    
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      price: price,
      rentalPrice: rentalPrice
    });
    alert('Book added to cart!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{book.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              aria-label={t('common.close')}
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Book Image */}
            <div className="relative flex items-center justify-center bg-gray-50 p-8 rounded-lg">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[400px] object-contain max-w-sm"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <FaHeart className="text-red-500" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                  <FaShare className="text-blue-500" />
                </button>
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-600">{t('books.details.author')}</h3>
                <p className="text-gray-800">{book.author[i18n.language as 'en' | 'ne']}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-600">{t('books.details.description')}</h3>
                <p className="text-gray-800">{book.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.language')}</h3>
                  <p className="text-gray-800">{book.language}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.pages')}</h3>
                  <p className="text-gray-800">{book.pages}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.publisher')}</h3>
                  <p className="text-gray-800">{book.publisher}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.publishYear')}</h3>
                  <p className="text-gray-800">{book.publishYear}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.isbn')}</h3>
                  <p className="text-gray-800">{book.isbn}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-600">{t('books.details.stock')}</h3>
                  <p className="text-gray-800">{book.stock} {t('common.available')}</p>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xl">
                        {i < Math.floor(book.rating) ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({book.rating})</span>
                </div>
                <p className="text-3xl font-bold text-blue-600 mb-4">{book.price}</p>
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>{t('cart.addToCart')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('books.details.reviews')}</h3>
            <div className="space-y-4">
              {book.reviews.map((review, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{review.user}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < review.rating ? <FaStar /> : <FaRegStar />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Book Card Component
const BookCard = ({ book, onBookClick }: BookCardProps) => {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
      return;
    }
    // Extract numeric price from string (e.g., "रु. 550" -> 550)
    const priceMatch = book.price.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : 0;
    const rentalPrice = 2; // Fixed daily rental rate of रु. 2 per day
    
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      price: price,
      rentalPrice: rentalPrice
    });
    alert('Book added to cart!');
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onBookClick(book)}
    >
      <div className="relative">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-sm font-semibold text-blue-600">
          {book.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 mb-2">{book.author[i18n.language as 'en' | 'ne']}</p>
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-sm">
                {i < Math.floor(book.rating) ? <FaStar /> : <FaRegStar />}
              </span>
            ))}
          </div>
          <span className="ml-1 text-sm text-gray-600">({book.rating})</span>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{book.description}</p>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 text-sm"
        >
          <FaShoppingCart />
          <span>{t('cart.addToCart')}</span>
        </button>
      </div>
    </div>
  );
};

function Books() {
  const { t, i18n } = useTranslation();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mostSoldBooks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mostSoldBooks.length) % mostSoldBooks.length);
  };

  const handleAddToCart = (book: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      navigate('/login');
      return;
    }
    // Extract numeric price from string (e.g., "रु. 550" -> 550)
    const priceMatch = book.price.match(/\d+/);
    const price = priceMatch ? parseInt(priceMatch[0]) : 0;
    const rentalPrice = 2; // Fixed daily rental rate of रु. 2 per day
    
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      price: price,
      rentalPrice: rentalPrice
    });
    alert('Book added to cart!');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Most Sold Books */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{t('books.mostSold')}</h2>
          
          {/* Book Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
              <div className="relative h-[550px]">
                {mostSoldBooks.map((book, index) => (
                  <div
                    key={book.id}
                    className={`absolute w-full h-full transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row h-full bg-white">
                      {/* Book Image */}
                      <div className="md:w-1/2 h-full relative flex items-center justify-center bg-gray-50 p-8">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-contain max-w-[300px] max-h-96"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/0 md:from-white/0 md:to-white/90"></div>
                      </div>
                      
                      {/* Book Information */}
                      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <div className="max-w-lg">
                          <h3 className="text-3xl font-bold mb-4 text-gray-800">{book.title}</h3>
                          <p className="text-xl mb-4 text-gray-600">{t('books.details.author')}: {book.author[i18n.language as 'en' | 'ne']}</p>
                          <p className="text-gray-600 mb-6 leading-relaxed">{book.description}</p>
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-xl">
                                  {i < Math.floor(book.rating) ? '★' : '☆'}
                                </span>
                              ))}
                            </div>
                            <span className="ml-2 text-gray-600">({book.rating})</span>
                          </div>
                          <p className="text-2xl font-bold mb-6 text-blue-600">{book.price}</p>
                          <button 
                            onClick={(e) => handleAddToCart(book, e)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center space-x-2"
                          >
                            <FaShoppingCart />
                            <span>{t('cart.addToCart')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft className="text-2xl text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight className="text-2xl text-gray-800" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3">
              {mostSoldBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Categories Sections */}
      <div className="container mx-auto px-4 py-12">
        {bookCategories.map((category) => (
          <div key={category.id} className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">{t(`books.categories.${category.id}`)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {category.books.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBookClick={setSelectedBook}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default Books;
