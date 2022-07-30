import React from 'react'
import {Link} from 'react-router-dom';
import RenderBooks from './RenderBook';
import './App.css'

class SearchBooks extends React.Component {
  state={
    query: '',
    typingTimeout: 0
  }
  

  handleQuery= (search) => {  
      this.setState(()=> ({
        query: search.trim()
      }))
    	
      if(this.timeout){ 
        clearTimeout(this.timeout); 
      }
   		
      this.timeout = setTimeout(() => {
        this.props.searchBook(search.trim());
      }, 1000);
    
  }

  render() {
    const {books} = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" onClick={()=>this.handleQuery("")}>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleQuery(e.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              books.error ?
              	<div>No results available</div>
              :
              books.length ?
              	books.map((item) => (
                <RenderBooks book={item} key={item.id} updateBook={this.props.updateBook}/>
              ))
              : null
            }

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks;