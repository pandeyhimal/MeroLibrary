import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaBook, FaUsers, FaGlobe, FaHeart } from 'react-icons/fa';
import { spacing } from '../styles/designSystem';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className={`${spacing.container}`}>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                {t('about.hero.title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-95 leading-relaxed font-light">
                {t('about.hero.subtitle')}
              </p>
            </div>
            
            {/* Right side - Cartoon illustrations */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md">
                {/* Main illustration */}
                <div className="relative">
                  <img
                    src="https://img.freepik.com/free-vector/reading-concept-illustration_114360-2674.jpg?w=400&h=300&fit=crop"
                    alt="Reading illustration"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -left-4 bg-yellow-400 p-3 rounded-full shadow-lg animate-gentle-bounce">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-pink-400 p-3 rounded-full shadow-lg animate-gentle-pulse">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Secondary illustration - Books stack */}
                <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-xl shadow-lg animate-gentle-bounce">
                  <img
                    src="https://img.freepik.com/free-vector/books-stack-realistic_1284-4735.jpg?w=200&h=150&fit=crop"
                    alt="Books stack"
                    className="w-24 h-20 object-cover rounded-lg"
                  />
                </div>
                
                {/* Floating book */}
                <div className="absolute top-1/2 -right-8 bg-white p-3 rounded-lg shadow-lg transform -translate-y-1/2 animate-float">
                  <img
                    src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?w=100&h=80&fit=crop"
                    alt="Floating book"
                    className="w-16 h-12 object-cover rounded"
                  />
                </div>
                
                {/* Additional floating elements */}
                <div className="absolute top-4 -right-4 bg-green-400 p-2 rounded-full shadow-lg animate-gentle-pulse">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* Small floating stars */}
                <div className="absolute top-1/4 -left-2 bg-blue-400 p-1 rounded-full shadow-md animate-gentle-bounce">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <div className="absolute bottom-1/4 -right-2 bg-purple-400 p-1 rounded-full shadow-md animate-gentle-pulse">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Story Section */}
      <div className={`${spacing.container} py-16`}>
        <div className="max-w-5xl">
          <h2 className="text-4xl font-bold mb-10 text-gray-800 text-center leading-tight">
            {t('about.story.title')}
          </h2>
          
          <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
            <p className="text-xl leading-8 font-medium">
              {t('about.story.paragraph1')}
            </p>
            
            <p className="text-xl leading-8 font-medium">
              {t('about.story.paragraph2')}
            </p>

            <p className="text-xl leading-8 font-medium">
              {t('about.story.paragraph3')}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced What We Do */}
      <div className="bg-white py-16">
        <div className={`${spacing.container}`}>
          <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center leading-tight">
            {t('about.whatWeDo.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FaBook className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t('about.whatWeDo.bookCollection.title')}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-7 font-medium">
                {t('about.whatWeDo.bookCollection.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FaUsers className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t('about.whatWeDo.authorInfo.title')}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-7 font-medium">
                {t('about.whatWeDo.authorInfo.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FaGlobe className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t('about.whatWeDo.globalAccess.title')}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-7 font-medium">
                {t('about.whatWeDo.globalAccess.description')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-3 rounded-full mr-4">
                  <FaHeart className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t('about.whatWeDo.community.title')}</h3>
              </div>
              <p className="text-gray-600 text-lg leading-7 font-medium">
                {t('about.whatWeDo.community.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* New Section: Building the Future of Reading */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
        <div className={`${spacing.container}`}>
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-800 leading-tight">
              {t('about.future.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="space-y-6 text-gray-700">
                  <p className="text-xl leading-8 font-medium">
                    {t('about.future.paragraph1')}
                  </p>
                  
                  <p className="text-xl leading-8 font-medium">
                    {t('about.future.paragraph2')}
                  </p>
                  
                  <p className="text-xl leading-8 font-medium">
                    {t('about.future.paragraph3')}
                  </p>
                  
                  <p className="text-2xl font-bold text-blue-600 leading-8">
                    {t('about.future.tagline')}
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="text-center">
                    <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('about.future.progress.title')}</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                        <div className="text-gray-600 font-medium">{t('about.future.progress.books')}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">30+</div>
                        <div className="text-gray-600 font-medium">{t('about.future.progress.authors')}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 bg-yellow-400 p-3 rounded-full shadow-lg animate-gentle-bounce">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-green-400 p-3 rounded-full shadow-lg animate-gentle-pulse">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Team Section */}
      <div className={`${spacing.container} py-16`}>
        <h2 className="text-4xl font-bold mb-12 text-gray-800 text-center leading-tight">
          {t('about.team.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <img
              src="https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/468559266_2036222400139543_2050471002308505891_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Fq2u2FjhGZYQ7kNvwFufWV1&_nc_oc=Adkq4GnNab0PR1XVaKP5FW_BoPrlT7hGL3kFoP5X_3TKNKTXK9XHW2IxMRX_BHU1DIA&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=YcsCxDZ0a1fy59xI0R1wYg&oh=00_AfNIZQRKrmwv0dVulOBxct59PHexkZieKpDH9xwr4Tgnzw&oe=685869C3"
              alt={t('about.team.himal.name')}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-100 mx-auto mb-6"
            />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{t('about.team.himal.name')}</h3>
              <p className="text-blue-600 mb-4 text-lg font-semibold">{t('about.team.himal.position')}</p>
              <p className="text-gray-600 text-base leading-6 font-medium">
                {t('about.team.himal.description')}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
              alt={t('about.team.sita.name')}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-100 mx-auto mb-6"
            />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{t('about.team.sita.name')}</h3>
              <p className="text-blue-600 mb-4 text-lg font-semibold">{t('about.team.sita.position')}</p>
              <p className="text-gray-600 text-base leading-6 font-medium">
                {t('about.team.sita.description')}
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center md:col-span-2 lg:col-span-1">
            <img
              src="https://scontent.fktm20-1.fna.fbcdn.net/v/t39.30808-6/485785293_1532278720781219_1097131785083471993_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=dI0FYK6fhsMQ7kNvwFpjfsS&_nc_oc=AdnfKyKS9EGHogQvtJK2jkqQ1FNSb4h_hphFMVTEarqjy4VELDqxwRkxZSnrBt6Lx0Q&_nc_zt=23&_nc_ht=scontent.fktm20-1.fna&_nc_gid=D1jK1NyIRlZT_bDxG8osxg&oh=00_AfPFXqm8T44i6gqwfEX8Gli3BKj5DAnu9vi5WAYzLY0eug&oe=68587A0E"
              alt={t('about.team.nabin.name')}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-blue-100 mx-auto mb-6"
            />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">{t('about.team.nabin.name')}</h3>
              <p className="text-blue-600 mb-4 text-lg font-semibold">{t('about.team.nabin.position')}</p>
              <p className="text-gray-600 text-base leading-6 font-medium">
                {t('about.team.nabin.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className={`${spacing.container} text-center`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
            {t('about.cta.title')}
          </h2>
          <p className="mb-8 max-w-4xl mx-auto text-xl leading-8 font-medium opacity-95">
            {t('about.cta.description1')}
          </p>
          {t('about.cta.description2') && (
            <p className="mb-8 max-w-4xl mx-auto text-xl leading-8 font-medium opacity-95">
              {t('about.cta.description2')}
            </p>
          )}
          {t('about.cta.description3') && (
            <p className="mb-10 max-w-4xl mx-auto text-xl leading-8 font-medium opacity-95">
              {t('about.cta.description3')}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/books"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 inline-block text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t('about.cta.browseBooks')}
            </Link>
            <button 
              onClick={() => window.location.href = 'mailto:info@merolibrary.com,himalpandey2002@gmail.com?subject=Team%20Join%20Request&body=Hello,%0D%0A%0D%0AI am interested in joining the Mero Library team. Here are my details:%0D%0A%0D%0A- Name:%0D%0A- Area of Expertise:%0D%0A- Experience:%0D%0A- Why I want to join:%0D%0A%0D%0AThank you!'}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t('about.cta.contactForm')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 