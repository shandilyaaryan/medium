export default function Featured() {
    const featuredItems = [
      { title: "Affiliate Marketing Basics", category: "Marketing", views: 15000 },
      { title: "Creating High-Converting Landing Pages", category: "Web Design", views: 12000 },
      { title: "SEO Strategies for 2024", category: "SEO", views: 10000 },
      { title: "Monetizing Your Blog: A Complete Guide", category: "Blogging", views: 9500 },
      { title: "Email Marketing Techniques That Work", category: "Marketing", views: 8000 },
      { title: "Social Media Growth Hacks", category: "Social Media", views: 7500 },
    ]
  
    return (
      <div style={{
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Featured Posts</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {featuredItems.map((item, index) => (
            <li key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #e0e0e0', paddingBottom: '16px' }}>
              <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{item.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  backgroundColor: '#f0f0f0',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {item.category}
                </span>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>{item.views.toLocaleString()} views</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }