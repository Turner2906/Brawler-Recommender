import React, { Component} from 'react';
import BrawlerPortraitArr from './BrawlerImages';

export class BrawlerDisplay extends Component {
  static displayName = BrawlerDisplay.name;

  constructor(props) {
    super(props);
    this.state = { 
      brawlers: [], 
      loading: true,
      searchQuery: ""};
  }

  componentDidMount() {
    this.populateBrawlerData();
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };
  
  renderBrawlerTable() {
    const { searchQuery } = this.state;
    const searchedBrawlers = BrawlerPortraitArr.filter(brawler =>
      brawler.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    return (
      <div>
        <input
          type="text"
          placeholder="Search Brawlers..."
          value={searchQuery}
          onChange={this.handleSearchChange}
          style={{ marginBottom: '20px', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <div className="brawler-card-list">
          {searchedBrawlers.map((brawler, index) => (
            <div key={index} className="brawler-card">
              <div className="brawler-image-container">
                <img src={brawler.imageId} alt={brawler.name} className="brawler-image" />
              </div>
              <div className="brawler-info">
                <p className="brawler-name">{brawler.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderBrawlerTable();

    return (
      <div>
        <h1 id="tabelLabel" >Your Brawlers</h1>
        <p>Should grey out brawlers you don't have</p>
        {contents}
      </div>
    );
  }

  async populateBrawlerData() {
    const response = await fetch('api/brawlers/%2329UYJJ2J');
    const data = await response.json();
    console.log("Data:", data);
    console.log("Brawlers:", data.brawlers)
    this.setState({ brawlers: data, loading: false });
  }
}