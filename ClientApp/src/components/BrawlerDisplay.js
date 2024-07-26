import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BrawlerPortraitArr from './BrawlerImages';

export const BrawlerDisplay = () => {
  const [brawlers, setBrawlers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const brawlTag = searchParams.get('tag');
    if (brawlTag) {
      populateBrawlerData(brawlTag);
    }
  }, [searchParams]);

  const populateBrawlerData = async (brawlTag) => {
    const response = await fetch(`api/brawlers/${encodeURIComponent(brawlTag)}`);
    const data = await response.json();
    setBrawlers(data.brawlers);
    setLoading(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const isBrawlerUnlocked = (name) => {
    return brawlers.some(brawler => brawler.name === name.toUpperCase());
  };

  const renderBrawlerTable = () => {
    const searchedBrawlers = BrawlerPortraitArr.filter(brawler =>
      brawler.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const unlockedBrawlers = searchedBrawlers.filter(brawler =>
      isBrawlerUnlocked(brawler.name)
    );

    const lockedBrawlers = searchedBrawlers.filter(brawler =>
      !isBrawlerUnlocked(brawler.name)
    );

    const sortedBrawlers = unlockedBrawlers.concat(lockedBrawlers);

    return (
      <div>
        <input
          type="text"
          placeholder="Search Brawlers..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <div className="brawler-card-list">
          {sortedBrawlers.map((brawler, index) => {
            const isUnlocked = isBrawlerUnlocked(brawler.name);
            const cardClass = isUnlocked ? "brawler-card" : "brawler-card locked";
            return (
              <div key={index} className={cardClass}>
                <div className="brawler-image-container">
                  <img src={brawler.imageId} alt={brawler.name} className="brawler-image" />
                </div>
                <div className="brawler-info">
                  <p className="brawler-name">{brawler.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 id="tabelLabel">Your Brawlers</h1>
      <p>Should grey out brawlers you don't have</p>
      {loading ? <p><em>Loading...</em></p> : renderBrawlerTable()}
    </div>
  );
};

export default BrawlerDisplay;
