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

            {/* Why Mero Library Section */}
            <div className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Interactive Open Book Design */}
                        <div 
                            className="relative cursor-pointer"
                            onMouseEnter={() => setIsBookOpen(true)}
                            onMouseLeave={() => setIsBookOpen(false)}
                        >
                            {/* Book Spine */}
                            <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-gradient-to-b from-gray-700 via-gray-600 to-gray-700 transform -translate-x-1/2 z-10 rounded-sm shadow-lg"></div>
                            
                            {/* Open Book Container */}
                            <div className={`flex flex-col md:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200 transition-all duration-1000 ease-in-out transform ${isBookOpen ? 'scale-105' : 'scale-100'}`}>
                                
                                {/* Left Page - Pictures */}
                                <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-8 md:p-12 relative">
                                    {/* Page Curl Effect */}
                                    <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-200 to-transparent"></div>
                                    
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 left-4 text-gray-500 text-sm font-serif">1</div>
                                    
                                    {/* Main Image */}
                                    <div className="mb-8">
                                        <img 
                                            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGlnaXRhbCUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
                                            alt="Digital Library"
                                            className="w-full h-64 object-cover rounded-lg shadow-md border-2 border-white"
                                        />
                                    </div>
                                    
                                    {/* Additional Images Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <img 
                                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                                            alt="Reading"
                                            className="w-full h-24 object-cover rounded-md shadow-sm border border-white"
                                        />
                                        <img 
                                            src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3N8ZW58MHx8MHx8fDA%3D"
                                            alt="Books"
                                            className="w-full h-24 object-cover rounded-md shadow-sm border border-white"
                                        />
                                        <img 
                                            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                                            alt="Library"
                                            className="w-full h-24 object-cover rounded-md shadow-sm border border-white"
                                        />
                                        <img 
                                            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGlnaXRhbCUyMGxpYnJhcnl8ZW58MHx8MHx8fDA%3D"
                                            alt="Digital"
                                            className="w-full h-24 object-cover rounded-md shadow-sm border border-white"
                                        />
                                    </div>
                                </div>

                                {/* Right Page - Content */}
                                <div className="md:w-1/2 bg-white p-8 md:p-12 relative">
                                    {/* Page Curl Effect */}
                                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200 to-transparent"></div>
                                    
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 right-4 text-gray-500 text-sm font-serif">2</div>
                                    
                                    <div className="max-w-lg">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800 font-serif">📚 Why Mero Library?</h2>
                                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                            Mero Library is Nepal's digital gateway to the world of books — designed to make reading more accessible, convenient, and culturally relevant.
                                        </p>

                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">✨ What We Offer:</h3>
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                            Whether you're at home, in your room, or on the go — Mero Library lets you explore a wide range of Nepali books from anywhere with an internet connection. No need to visit a physical library.
                                        </p>

                                        <div className="space-y-4 mb-6">
                                            <h4 className="text-xl font-semibold mb-4 text-gray-800">We bring you:</h4>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">📘</span>
                                                    <span className="text-gray-700">Verified information about Nepali novels, poems, biographies, and more</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🌐</span>
                                                    <span className="text-gray-700">Easy online access anytime, anywhere</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">📱</span>
                                                    <span className="text-gray-700">Mobile and desktop-friendly platform</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🔖</span>
                                                    <span className="text-gray-700">Personalized reading experience</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="text-gray-700 italic text-sm">
                                            And coming soon: a free book rental service to get real books delivered to your doorstep.
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Pages - Our Mission */}
                                <div className={`md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 p-8 md:p-12 relative transition-all duration-700 ease-in-out transform ${pageTurned >= 1 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                                    {/* Page Curl Effect */}
                                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200 to-transparent"></div>
                                    
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 right-4 text-gray-500 text-sm font-serif">3</div>
                                    
                                    <div className="max-w-lg">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800 font-serif">🎯 Our Mission</h2>
                                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                            To democratize access to Nepali literature and create a vibrant digital ecosystem that preserves, promotes, and celebrates our rich literary heritage.
                                        </p>

                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">🌟 What Drives Us:</h3>
                                        <p className="text-gray-700 mb-6 leading-relaxed">
                                            We believe that every Nepali deserves access to quality literature, regardless of their location or economic status. Our mission is to bridge the gap between readers and Nepali books.
                                        </p>

                                        <div className="space-y-4 mb-6">
                                            <h4 className="text-xl font-semibold mb-4 text-gray-800">Our Commitment:</h4>
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">📖</span>
                                                    <span className="text-gray-700">Preserve and digitize rare Nepali literary works</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🌍</span>
                                                    <span className="text-gray-700">Make Nepali literature accessible globally</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">👥</span>
                                                    <span className="text-gray-700">Support emerging Nepali authors and poets</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🎓</span>
                                                    <span className="text-gray-700">Promote literacy and reading culture in Nepal</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="text-gray-700 italic text-sm">
                                            Together, we're building a future where Nepali literature thrives in the digital age.
                                        </p>
                                    </div>
                                </div>

                                {/* Additional Pages - Our Goals */}
                                <div className={`md:w-1/2 bg-gradient-to-br from-purple-50 to-violet-100 p-8 md:p-12 relative transition-all duration-700 ease-in-out transform ${pageTurned >= 2 ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
                                    {/* Page Curl Effect */}
                                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-gray-200 to-transparent"></div>
                                    
                                    {/* Page Number */}
                                    <div className="absolute bottom-4 right-4 text-gray-500 text-sm font-serif">4</div>
                                    
                                    <div className="max-w-lg">
                                        <h2 className="text-3xl font-bold mb-6 text-gray-800 font-serif">🎯 Our Goals</h2>
                                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                            We envision a future where Nepali literature reaches every corner of the world, inspiring generations and preserving our cultural identity.
                                        </p>

                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">🚀 Short-term Goals (2024-2025):</h3>
                                        <div className="space-y-4 mb-6">
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">📚</span>
                                                    <span className="text-gray-700">Digitize 10,000+ Nepali books and manuscripts</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">📱</span>
                                                    <span className="text-gray-700">Launch mobile app for better accessibility</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🌐</span>
                                                    <span className="text-gray-700">Reach 100,000+ active users worldwide</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <h3 className="text-2xl font-semibold mb-4 text-gray-800">🌟 Long-term Vision (2025-2030):</h3>
                                        <div className="space-y-4 mb-6">
                                            <ul className="space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🏛️</span>
                                                    <span className="text-gray-700">Establish digital archive of all Nepali literature</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🤝</span>
                                                    <span className="text-gray-700">Partner with international libraries and institutions</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🎨</span>
                                                    <span className="text-gray-700">Create multimedia content for Nepali literature</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="text-2xl">🌍</span>
                                                    <span className="text-gray-700">Make Nepali literature available in multiple languages</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <p className="text-gray-700 italic text-sm">
                                            Join us in this journey to preserve and promote the rich literary heritage of Nepal.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Instruction */}
                            <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-500 ${isBookOpen ? 'opacity-0' : 'opacity-100'}`}>
                                <p className="text-gray-600 text-sm font-medium">Hover to turn pages one by one 📖</p>
                            </div>
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
