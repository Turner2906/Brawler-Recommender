import React, { useState } from 'react';

export const Home = () => {
  const [brawlTag, setBrawlTag] = useState('');

  const handleInputChange = (e) => {
    setBrawlTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brawlTag) {
      window.location.href = `https://localhost:44472/brawler-display?tag=${encodeURIComponent(brawlTag)}`;
    }
  };

  return (
    <div>
      <h1>Enter your Brawler Tag here!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brawlTag}
          onChange={handleInputChange}
          placeholder="Enter Brawler Tag"
          style={{ marginBottom: '20px', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Submit</button>
      </form>
    </div>
  );
};

export default Home;
