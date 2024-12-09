import React, { useEffect, useState } from 'react';

const MyAvatars = () => {
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    // Load avatars from local storage
    const storedAvatars = JSON.parse(localStorage.getItem('myAvatars')) || [];
    setAvatars(storedAvatars);
    // localStorage.clear(); // uncomment this to clear local storage
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '50px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem' }}>My Avatars</h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            style={{
              backgroundColor: '#222',
              borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src={avatar.url}
              alt={avatar.name}
              style={{ width: '150px', height: '150px', borderRadius: '10px' }}
            />
            <h3 style={{ marginTop: '10px', fontSize: '1.2rem' }}>{avatar.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAvatars;
