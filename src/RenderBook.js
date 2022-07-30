import React from 'react'
import './App.css'

class RenderBook extends React.Component {

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 174, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : "none"} onChange={(e) => this.props.updateBook(book.id, e.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {
            <div className="book-authors">{
			book.authors &&
			book.authors.join(', ')
			}</div>
		}
      </div>
    )
  }
}

export default RenderBook;