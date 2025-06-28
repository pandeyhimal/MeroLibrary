import { useState, useEffect, useRef } from 'react';
import { FaBook, FaUsers, FaPenFancy, FaSearch, FaHeart, FaComments, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Home() {
    const [displayText, setDisplayText] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [pageTurned, setPageTurned] = useState(0); // 0, 1, 2, 3 for different pages
    const fullText = "Books are a gateway to a new conceptual world — a universe where you can read, visualize, and truly live countless lives. They invite you to see from multiple perspectives, helping you think in diverse and deeper ways. A book doesn't just inform you — it transforms you. It quietly guides you toward becoming a completely new version of yourself.";
    const [currentIndex, setCurrentIndex] = useState(0);

    const books = [
        {
            url: "https://www.sourcenepal.com/wp-content/uploads/2023/08/Siris-ko-Phool.webp",
            title: "Siris ko Phool"
        },
        {
            url: "https://en.dharmapedia.net/w/images/1/1d/Muna_Madan_-_book_cover.jpg",
            title: "Muna Madan"
        },
        {
            url: "https://washburnreview.org/wp-content/uploads/2023/05/book-review.png",
            title: "Book Review"
        },
        {
            url: "https://th.bing.com/th/id/R.4cd59a463fed229b197b8db3c7a1e05e?rik=DH%2fhq2NzsJQsHg&pid=ImgRaw&r=0",
            title: "Classic Book"
        },
        {
            url: "https://books.bizmandala.com/media/books/9780143454397/9780143454397-5142.webp",
            title: "Modern Book"
        },
        {
            url: "https://villanepal.com/wp-content/uploads/2024/07/Jiwan-Kada-Ki-Phool-640x1024.webp",
            title: "Jiwan Kada Ki Phool"
        },
        {
            url: "https://books.bizmandala.com/media/books/9789937541275/9789937541275-6910.webp",
            title: "Contemporary Book"
        }
    ];

    // Text typing effect
    useEffect(() => {
        if (currentIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + fullText[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 30);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, fullText]);

    // Image auto-swap effect
    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                setCurrentImageIndex(prev => (prev + 1) % books.length);
            }, 3000); // Swap every 3 seconds

            return () => clearInterval(interval);
        }
    }, [isHovered, books.length]);

    // Get previous, current, and next image indices
    const getImageIndices = () => {
        const prev = (currentImageIndex - 1 + books.length) % books.length;
        const next = (currentImageIndex + 1) % books.length;
        return { prev, current: currentImageIndex, next };
    };

    const { prev, current, next } = getImageIndices();

    // Add state for testimonials carousel
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    const testimonials = [
        {
            quote: "Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.",
            author: "Madan Puraskar Winner",
            name: "Narayan Wagle",
            image: "https://th.bing.com/th/id/R.4cd59a463fed229b197b8db3c7a1e05e?rik=DH%2fhq2NzsJQsHg&pid=ImgRaw&r=0",
            book: "Palpasa Cafe"
        },
        {
            quote: "A book is a dream that you hold in your hands. In Nepal, our stories are our heritage, and Mero Library is preserving them for generations to come.",
            author: "Award-Winning Poet",
            name: "Muna Madan",
            image: "https://en.dharmapedia.net/w/images/1/1d/Muna_Madan_-_book_cover.jpg",
            book: "Muna Madan"
        },
        {
            quote: "The power of Nepali literature lies in its ability to bridge the past and present, connecting readers with our rich cultural heritage.",
            author: "Contemporary Writer",
            name: "Samrat Upadhyay",
            image: "https://books.bizmandala.com/media/books/9780143454397/9780143454397-5142.webp",
            book: "Arresting God in Kathmandu"
        }
    ];

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    // Page turning effect
    useEffect(() => {
        if (isBookOpen) {
            // Turn pages one by one with delays
            const timer1 = setTimeout(() => setPageTurned(1), 300);
            const timer2 = setTimeout(() => setPageTurned(2), 600);
            const timer3 = setTimeout(() => setPageTurned(3), 900);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        } else {
            // Reset pages when not hovering
            setPageTurned(0);
        }
    }, [isBookOpen]);

    return (
        <div className="min-h-screen">
            {/* Existing Hero Section */}
            <div className="min-h-[80vh] flex items-center">
                <div className="container mx-auto px-4">
                    <div className="flex gap-12 items-center">
                        {/* Left side - Text content */}
                        <div className="flex-1 max-w-2xl">
                            <h1 className="text-4xl font-bold mb-6">
                                Read. Reflect. Rise.
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 min-h-[200px]">
                                {displayText}
                                <span className="animate-pulse">|</span>
                            </p>
                            <button className="bg-blue-500 text-white px-6 py-2 rounded">
                                Get Started
                            </button>
                        </div>

                        {/* Right side - Image gallery */}
                        <div 
                            className="flex-1 relative h-[500px]"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="flex items-center justify-center gap-4 h-full">
                                {/* Previous image */}
                                <div className="w-[200px] h-[300px] transition-all duration-500 ease-in-out transform hover:scale-105">
                                    <img 
                                        src={books[prev].url} 
                                        alt={books[prev].title}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Current (center) image */}
                                <div className="w-[300px] h-auto transition-all duration-500 ease-in-out transform hover:scale-105">
                                    <img 
                                        src={books[current].url} 
                                        alt={books[current].title}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                    />
                                </div>

                                {/* Next image */}
                                <div className="w-[200px] h-[300px] transition-all duration-500 ease-in-out transform hover:scale-105">
                                    <img 
                                        src={books[next].url} 
                                        alt={books[next].title}
                                        className="w-full h-full object-cover rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Books Section - Real Book Feel */}
            <div className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 drop-shadow-lg">Featured Books</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 justify-items-center">
                        {books.map((book, idx) => (
                            <div
                                key={book.title}
                                className="relative group w-[180px] h-[270px] flex flex-col items-center cursor-pointer"
                                style={{ perspective: '1200px' }}
                            >
                                {/* Book shadow */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 bg-black/20 rounded-full blur-md z-0" />
                                {/* Book cover */}
                                <div
                                    className="relative z-10 w-full h-full rounded-lg shadow-2xl group-hover:shadow-3xl transition-shadow duration-300"
                                    style={{
                                        transform: 'rotateY(-8deg) rotateZ(-2deg)',
                                        boxShadow: '0 8px 32px 0 rgba(60,60,60,0.25), 0 1.5px 0 #bfa76a',
                                        background: '#fff',
                                        borderLeft: '8px solid #bfa76a', // spine
                                        borderRadius: '0.5rem',
                                    }}
                                >
                                    <img
                                        src={book.url}
                                        alt={book.title}
                                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                        style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}
                                    />
                                    {/* Book spine effect */}
                                    <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-r from-yellow-900/80 to-yellow-200/40 rounded-l-lg" />
                                    {/* Book open effect on hover */}
                                    <div
                                        className="absolute inset-0 rounded-lg pointer-events-none"
                                        style={{
                                            boxShadow: 'inset 0 0 18px 0 #fff8, 0 0 0 2px #bfa76a',
                                            opacity: 0.7,
                                            transition: 'opacity 0.3s',
                                        }}
                                    />
                                </div>
                                {/* Book info */}
                                <div className="mt-4 text-center">
                                    <h3 className="font-bold text-lg text-gray-900 leading-tight drop-shadow-sm">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 italic">by {book.title === 'Muna Madan' ? 'Madhav Prasad Ghimire' : book.title === 'Siris ko Phool' ? 'Parijat' : 'Nepali Author'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Mero Library, Mission, Vision - Modern Clean Layout */}
            <div className="py-20 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Why Mero Library */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                            <div className="text-4xl mb-4">📚</div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Why Mero Library?</h2>
                            <p className="text-gray-700 mb-4">
                                Mero Library is Nepal's digital gateway to the world of books — designed to make reading more accessible, convenient, and culturally relevant.
                            </p>
                            <ul className="text-left space-y-2 text-gray-600 text-sm">
                                <li><span className="mr-2">📘</span>Verified information about Nepali novels, poems, biographies, and more</li>
                                <li><span className="mr-2">🌐</span>Easy online access anytime, anywhere</li>
                                <li><span className="mr-2">📱</span>Mobile and desktop-friendly platform</li>
                                <li><span className="mr-2">🔖</span>Personalized reading experience</li>
                            </ul>
                            <p className="text-gray-500 italic text-xs mt-4">And coming soon: a free book rental service to get real books delivered to your doorstep.</p>
                        </div>
                        {/* Our Mission */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                            <div className="text-4xl mb-4">🎯</div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
                            <p className="text-gray-700 mb-4">
                                To democratize access to Nepali literature and create a vibrant digital ecosystem that preserves, promotes, and celebrates our rich literary heritage.
                            </p>
                            <ul className="text-left space-y-2 text-gray-600 text-sm">
                                <li><span className="mr-2">📖</span>Preserve and digitize rare Nepali literary works</li>
                                <li><span className="mr-2">🌍</span>Make Nepali literature accessible globally</li>
                                <li><span className="mr-2">👥</span>Support emerging Nepali authors and poets</li>
                                <li><span className="mr-2">🎓</span>Promote literacy and reading culture in Nepal</li>
                            </ul>
                            <p className="text-gray-500 italic text-xs mt-4">Together, we're building a future where Nepali literature thrives in the digital age.</p>
                        </div>
                        {/* Our Vision */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                            <div className="text-4xl mb-4">🌈</div>
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h2>
                            <p className="text-gray-700 mb-4">
                                To inspire a new generation of readers and writers, and to make Nepali literature a global phenomenon.
                            </p>
                            <ul className="text-left space-y-2 text-gray-600 text-sm">
                                <li><span className="mr-2">📚</span>A digital library in every Nepali home</li>
                                <li><span className="mr-2">🌏</span>Nepali books read and loved worldwide</li>
                                <li><span className="mr-2">🤝</span>A thriving community of readers and writers</li>
                            </ul>
                            <p className="text-gray-500 italic text-xs mt-4">Join us on this journey to make Nepali literature shine on the world stage.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-4">Voices of Nepali Literature</h2>
                    <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                        Discover what renowned Nepali authors have to say about the power of literature and the importance of preserving our literary heritage
                    </p>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Testimonial Cards */}
                        <div className="relative h-[400px] overflow-hidden">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-full transition-all duration-500 ease-in-out transform ${
                                        index === currentTestimonial
                                            ? 'translate-x-0 opacity-100'
                                            : index < currentTestimonial
                                            ? '-translate-x-full opacity-0'
                                            : 'translate-x-full opacity-0'
                                    }`}
                                >
                                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                                        {/* Author Image */}
                                        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                                            <img
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                className="w-full h-full object-cover rounded-xl shadow-lg"
                                            />
                                        </div>

                                        {/* Quote Content */}
                                        <div className="flex-1">
                                            <FaQuoteLeft className="text-blue-500 text-4xl mb-4 opacity-20" />
                                            <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                                                "{testimonial.quote}"
                                            </blockquote>
                                            <div className="space-y-2">
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-blue-600 font-medium">
                                                    {testimonial.author}
                                                </p>
                                                <p className="text-gray-600">
                                                    Author of <span className="font-medium">{testimonial.book}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                        >
                            <FaChevronLeft className="text-blue-500 text-xl" />
                        </button>
                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors"
                        >
                            <FaChevronRight className="text-blue-500 text-xl" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestimonial(index)}
                                    className={`w-3 h-3 rounded-full transition-colors ${
                                        index === currentTestimonial
                                            ? 'bg-blue-500'
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
