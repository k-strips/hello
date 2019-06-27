import React from 'react';
import Button from './button';


export default function Table (props) {
    const { list, pattern, onDismiss } = props;
    const isSearched = (searchTerm) => item => item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      <div className='table'>
        {list.map(item =>
            <div key={item.objectID} className='table-row'>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
              <span>
                <Button
                onClick={() => onDismiss(item.objectID)}>
                  Dismiss
                </Button>
              </span>
            </div>
        )}
      </div>
    );
}
