import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import './NewsPage.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  
  const headerRef = useRef(null);
  const featuredRef = useRef(null);
  const newsGridRef = useRef(null);
  const categoryRef = useRef(null);
  
  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        console.log('API Response:', data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(article => article.category))];
        setCategories(['all', ...uniqueCategories]);
        
        // Set featured article (most recent or with isFeatured flag)
        setFeatured(data[0]);
        
        // Set remaining articles
        setNewsArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        
        // Demo data for development
        const demoData = [
          {
            id: 1,
            title: 'Breaking News: New Exhibition Opens',
            excerpt: 'The most anticipated exhibition of the year opens this weekend featuring works from renowned artists.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'exhibitions',
            image: '/images/news1.jpg',
            date: '2025-04-05',
            author: 'Jane Smith'
          },
          {
            id: 2,
            title: 'Artist Spotlight: Maria Rodriguez',
            excerpt: 'Award-winning artist Maria Rodriguez discusses her new collection and creative process.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'artists',
            image: '/images/news2.jpg',
            date: '2025-04-03',
            author: 'John Doe'
          },
          {
            id: 3,
            title: 'Community Workshop Series Announced',
            excerpt: 'New series of workshops aimed at young artists will begin next month.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'community',
            image: '/images/news3.jpg',
            date: '2025-04-01',
            author: 'Mark Johnson'
          },
          {
            id: 4,
            title: 'Annual Art Festival Returns',
            excerpt: "The city's biggest art festival announces dates and featured artists for this year's event.",

            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'events',
            image: '/images/news4.jpg',
            date: '2025-03-30',
            author: 'Sarah Williams'
          },
          {
            id: 5,
            title: 'New Digital Art Installation',
            excerpt: 'Revolutionary digital art experience debuts at the downtown gallery this Friday.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'exhibitions',
            image: '/images/news5.jpg',
            date: '2025-03-28',
            author: 'Alex Chen'
          },
          {
            id: 6,
            title: 'Local Artist Wins International Award',
            excerpt: 'Hometown hero recognized for groundbreaking work in sustainable art practices.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.',
            category: 'artists',
            image: '/images/news6.jpg',
            date: '2025-03-26',
            author: 'Emma Brown'
          }
        ];
        
        setCategories(['all', ...new Set(demoData.map(article => article.category))]);
        setFeatured(demoData[0]);
        setNewsArticles(demoData);
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);
  
  // GSAP animations
  useEffect(() => {
    if (loading) return;
    
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );
    
    // Featured article animation
    gsap.fromTo(
      featuredRef.current,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 0.3, ease: 'back.out(1.7)' }
    );
    
    // Category tabs animation
    gsap.fromTo(
      categoryRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power2.out' }
    );
    
    // News grid animation
    if (newsGridRef.current && newsGridRef.current.children.length > 0) {
      gsap.fromTo(
        newsGridRef.current.children,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          delay: 0.7, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newsGridRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading, activeCategory]);
  
  // Filter news by category
  const filterNews = () => {
    if (activeCategory === 'all') {
      return newsArticles;
    }
    return newsArticles.filter(article => article.category === activeCategory);
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Helper function to get image source
  const getImageSrc = (image) => {
    if (!image) return '/images/news-default.jpg';
    
    // If image is a base64 string
    if (typeof image === 'string') {
      // Check if it's already a complete data URL
      if (image.startsWith('data:image')) {
        return image;
      }
      // If it starts with http or / it's a URL
      if (image.startsWith('http') || image.startsWith('/')) {
        return image;
      }
      // If it's just a base64 string without the prefix
      return `data:image/jpeg;base64,${image}`;
    }
    
    // Fallback
    return '/images/news-default.jpg';
  };
  
  const handleCategoryChange = (category) => {
    // Reset animations for the news grid
    if (newsGridRef.current) {
      gsap.set(newsGridRef.current.children, { opacity: 0, y: 50 });
    }
    
    setActiveCategory(category);
    
    // Add animation for category change
    gsap.to(categoryRef.current.children, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(document.querySelector(`#category-${category}`), {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };
  
  if (loading) {
    return (
      <div className="news-page">
    {/*<Navbar />*/}
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading latest news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-page">
      {/*<Navbar />*/}
      
      {/* Page Header */}
      <header className="news-header" ref={headerRef}>
        <h1>Latest News</h1>
        <p>Stay updated with the latest from our world</p>
      </header>
      
      {/* Featured Article */}
      {featured && (
        <section className="featured-article" ref={featuredRef}>
          <div className="featured-image">
            <img
              src={getImageSrc(featured.image)}
              alt={featured.title}
              onError={(e) => {
                e.target.src = '/images/news-default.jpg';
              }}
            />
            <div className="featured-tag">Featured</div>
          </div>
          <div className="featured-content">
            <div className="featured-meta">
              <span className="featured-category">{featured.category}</span>
              <span className="featured-date">{formatDate(featured.date)}</span>
            </div>
            // ...Previous imports and code...

<h2>{featured.title}</h2>
<p>{featured.excerpt}</p>
<p className="featured-author">By {featured.author}</p>
</div>
</section>
)}

{/* Category Filters */}
<div className="news-categories" ref={categoryRef}>
{categories.map((cat) => (
<button
key={cat}
id={`category-${cat}`}
className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
onClick={() => handleCategoryChange(cat)}
>
{cat.charAt(0).toUpperCase() + cat.slice(1)}
</button>
))}
</div>

{/* News Grid */}
<section className="news-grid" ref={newsGridRef}>
{filterNews().map((article) => (
<div key={article.id} className="news-card">
<div className="news-image">
  <img
    src={getImageSrc(article.image)}
    alt={article.title}
    onError={(e) => {
      e.target.src = '/images/news-default.jpg';
    }}
  />
</div>
<div className="news-info">
  <div className="news-meta">
    <span className="news-category">{article.category}</span>
    <span className="news-date">{formatDate(article.date)}</span>
  </div>
  <h3>{article.title}</h3>
  <p>{article.excerpt}</p>
  <p className="news-author">By {article.author}</p>
</div>
</div>
))}
</section>
</div>
);
};

export default NewsPage;
