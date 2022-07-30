import React from 'react'
import './App.css'
import RenderBook from './RenderBook';

const ListBooks = (props) => {
//class ListBooks extends React.Component {
  //render() {
    const {books} = props;
    const shelves = [
       { title: 'Currently Reading', key: 'currentlyReading' },
       { title: 'Want To Read', key: 'wantToRead' },
       { title: 'Read', key: 'read' }
    ];
  
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
      		{
              shelves.map((shelf) => (
                  <div key={shelf.key} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.title}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {
                          books.filter((book)=> book.shelf === shelf.key)
                            .map((book) => (
                            <li key={book.id}>
                              <RenderBook book={book} updateBook={props.updateBook} />
                            </li>
                          ))
                        }
                      </ol>
                    </div>
                  </div>
              ))
			}  
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => props.history.push("/search")}>Add a book</button>
        </div>
      </div>
    )
 // }
}

export default ListBooks;