import React, { Component } from 'react';
import Search from './components/search';
import Table from './components/table';
import './App.css';

const DEFAULT_QUERY = 'Redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  fetchSearchTopStories( searchTerm ) {
    fetch(url)
        .then(response => response.json())
        .then(result => this.setSearchTopStories(result))
        .catch(error => error);
  }

  onSearchChange(event){
    this.setState({searchTerm: event.target.value})
  }

  onSearchSubmit() {
    const { searchTerm } = this.state;
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
    }


  componentDidMount() {
    fetch(url)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  render(){
    const { result, searchTerm } = this.state;

    return(
      <div className='page'>
        <div className='interactions'>
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          >
          Search
          </Search>
        </div>
        { result
          ?
          <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
          />
          : null
        }
      </div>
    );
  }
}

export default App;
