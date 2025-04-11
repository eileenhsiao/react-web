import BookItem from './BookItem';

function BookList({ books }) {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 content">
         {books.map((book) => (
            <BookItem key={book.id} book={book} />
         ))}
      </div>
   );
}

export default BookList;