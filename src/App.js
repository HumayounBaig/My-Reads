import React from 'react'
import { Route } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchedBooks: [],
  } 

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () =>{
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
        books
      })
    })
  }

  searchBook = (searchQuery) => {
    if(searchQuery){
      BooksAPI.search(searchQuery)
      .then((res)=>{ 
        
        if(res.error){
          this.setState({
              searchedBooks: res
          })
        }else{
          let tempArr = [];
        	tempArr = res.map((searched)=>{
            	this.state.books.map((book) =>{
                	if(searched.id === book.id){
                    	searched.shelf = book.shelf;
                    }
                  	return book;
                }) 
              	return searched
            })
          this.setState({
          	searchedBooks: tempArr
          })
        }
        
        
        
        
        
        //let tempArr = [];
        
        //tempArr = res.map((item, i) => Object.assign({}, item, this.state.books[i]));
        
        //this.setState({
         // searchedBooks: tempArr.filter((v,i,a) => 
          //  v.title.toLowerCase().includes(searchQuery) &&
           // a.findIndex(t=>(t.id === v.id))=== i
          //)
        //})
      }).catch((error)=>{
        console.log(error) 
      })
    }else{
      this.setState({searchedBooks: []})
    }
    
  }
 
  updateBook = (book, shelf) => {
    BooksAPI.update({id: book}, shelf)
    .then(()=>{
      this.fetchBooks();
    })
  }

  render() {
    return (
      <div className="app"> 
        <Route exact path="/" render={({history})=>(
          <ListBooks books={this.state.books} history={history} updateBook={this.updateBook}/>
        )} />
        <Route exact path="/search" render={()=>(
          <SearchBooks books={this.state.searchedBooks} updateBook={this.updateBook} searchBook={this.searchBook}/>
        )} />
      </div>
        
    )
  }
}

export default BooksApp
