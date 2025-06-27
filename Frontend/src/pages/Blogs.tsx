import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaCalendar, FaUser, FaEye, FaHeart, FaSort, FaFilter } from 'react-icons/fa';
import { spacing, typography, components, animations } from '../styles/designSystem';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
  likes: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  // Mock blog data with translations
  const getBlogPosts = (): BlogPost[] => [
    {
      id: 1,
      title: t('blogs.samplePosts.goldenAge.title'),
      excerpt: t('blogs.samplePosts.goldenAge.excerpt'),
      author: "डा. राम श्रेष्ठ",
      date: "2024-01-15",
      readTime: `5 ${t('blogs.labels.minRead')}`,
      category: "literature",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop",
      views: 1250,
      likes: 89,
      isFeatured: true
    },
    {
      id: 2,
      title: t('blogs.samplePosts.modernPoetry.title'),
      excerpt: t('blogs.samplePosts.modernPoetry.excerpt'),
      author: "सुश्री सीता अधिकारी",
      date: "2024-01-12",
      readTime: `7 ${t('blogs.labels.minRead')}`,
      category: "poetry",
      image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdyaXRlcnxlbnwwfHwwfHx8MA%3D%3D",
      views: 980,
      likes: 67,
      isNew: true
    },
    {
      id: 3,
      title: t('blogs.samplePosts.novelTradition.title'),
      excerpt: t('blogs.samplePosts.novelTradition.excerpt'),
      author: "प्रो. हरि बस्नेत",
      date: "2024-01-10",
      readTime: `6 ${t('blogs.labels.minRead')}`,
      category: "novel",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop",
      views: 1100,
      likes: 78
    },
    {
      id: 4,
      title: t('blogs.samplePosts.dramaHistory.title'),
      excerpt: t('blogs.samplePosts.dramaHistory.excerpt'),
      author: "डा. गीता तामाङ",
      date: "2024-01-08",
      readTime: `8 ${t('blogs.labels.minRead')}`,
      category: "drama",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=250&fit=crop",
      views: 850,
      likes: 56
    },
    {
      id: 5,
      title: t('blogs.samplePosts.womenWriters.title'),
      excerpt: t('blogs.samplePosts.womenWriters.excerpt'),
      author: "सुश्री रेखा थापा",
      date: "2024-01-05",
      readTime: `4 ${t('blogs.labels.minRead')}`,
      category: "literature",
      image: "https://images.unsplash.com/photo-1600188769045-bc6026bfc8cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvbWVuJTIwd3JpdGVyfGVufDB8fDB8fHww",
      views: 1200,
      likes: 92,
      isNew: true
    },
    {
      id: 6,
      title: t('blogs.samplePosts.digitalLiterature.title'),
      excerpt: t('blogs.samplePosts.digitalLiterature.excerpt'),
      author: "डा. राजेश कुमार",
      date: "2024-01-03",
      readTime: `9 ${t('blogs.labels.minRead')}`,
      category: "technology",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      views: 750,
      likes: 45
    },
    {
      id: 7,
      title: t('blogs.samplePosts.contemporaryStories.title'),
      excerpt: t('blogs.samplePosts.contemporaryStories.excerpt'),
      author: "डा. सुरेश थापा",
      date: "2024-01-20",
      readTime: `6 ${t('blogs.labels.minRead')}`,
      category: "story",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop",
      views: 890,
      likes: 72,
      isNew: true,
      isFeatured: true
    },
    {
      id: 8,
      title: t('blogs.samplePosts.childrenLiterature.title'),
      excerpt: t('blogs.samplePosts.childrenLiterature.excerpt'),
      author: "सुश्री अनिता श्रेष्ठ",
      date: "2024-01-18",
      readTime: `5 ${t('blogs.labels.minRead')}`,
      category: "children",
      image: "https://plus.unsplash.com/premium_photo-1723618896443-357dbe5cf099?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNoaWxkcmVucyUyMGxpdGVyYXR1cmV8ZW58MHx8MHx8fDA%3D",
      views: 650,
      likes: 48
    }
  ];

  const blogPosts = getBlogPosts();

  const categories = [
    { id: 'all', name: t('blogs.categories.all') },
    { id: 'literature', name: t('blogs.categories.literature') },
    { id: 'poetry', name: t('blogs.categories.poetry') },
    { id: 'novel', name: t('blogs.categories.novel') },
    { id: 'drama', name: t('blogs.categories.drama') },
    { id: 'story', name: t('blogs.categories.story') },
    { id: 'children', name: t('blogs.categories.children') },
    { id: 'technology', name: t('blogs.categories.technology') }
  ];

  const sortOptions = [
    { id: 'latest', name: t('blogs.sort.latest') },
    { id: 'oldest', name: t('blogs.sort.oldest') },
    { id: 'popular', name: t('blogs.sort.popular') },
    { id: 'views', name: t('blogs.sort.views') },
    { id: 'likes', name: t('blogs.sort.likes') }
  ];



  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'popular':
        return (b.views + b.likes) - (a.views + a.likes);
      case 'views':
        return b.views - a.views;
      case 'likes':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'ne' ? 'ne-NP' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className={`${spacing.container} py-16`}>
          <div className="text-center">
            <h1 className={`${typography.h1} mb-4`}>{t('blogs.title')}</h1>
            <p className={`${typography.body} max-w-2xl mx-auto`}>
              {t('blogs.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className={`${spacing.container} py-8`}>
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={t('blogs.searchPlaceholder')}
              className={`${components.input} pl-10 w-full`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
          {/* Category Filter */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FaFilter className="mr-2" />
              {t('blogs.labels.categories')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <FaSort className="mr-2" />
              {t('blogs.labels.sortBy')}
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`${components.input} text-sm`}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{sortedPosts.length}</span> {t('blogs.labels.resultsFound')}
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className={`${spacing.container} pb-16`}>
        {sortedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post) => (
              <article
                key={post.id}
                className={`${components.card} ${animations.hover} cursor-pointer relative`}
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6">
                  <h3 className={`${typography.h3} mb-3 line-clamp-2`}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <FaUser className="text-gray-400" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendar className="text-gray-400" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <span className="text-blue-600 font-medium">{post.readTime}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FaEye className="text-gray-400" />
                        <span>{post.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaHeart className="text-gray-400" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                    <button className={`${components.button.secondary} text-sm`}>
                      {t('blogs.labels.readMore')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className={`${typography.h3} text-gray-600 mb-2`}>
              {t('blogs.labels.noResults')}
            </h3>
            <p className="text-gray-500">
              {t('blogs.labels.noResultsDesc')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs; 