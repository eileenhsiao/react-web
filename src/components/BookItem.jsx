/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import _ from 'lodash';

function BookItem({ book }) {
   return (
      <section className="pt-4 px-3 lg:px-4">
         <div className="border border-gray-500 rounded overflow-hidden">
            <Link to={`/books/id/${book.id}`}>
               <img className="w-full" src={book.cover} alt={book.title} />
            </Link>
            <div className="p-4">
               <h6 className="text-white opacity-80 mb-1">
                  {book.author}
               </h6>
               <h5 className="text-white mb-3">
                  {book.title}
               </h5>
               <p className="text-white opacity-70 mb-3">
                  {_.truncate(book.summary, { length: 60, omission: " ... " })}
               </p>
               <div className="flex justify-between flex-wrap">
                  <Link to={`/books/id/${book.id}`} className="no-underline text-blue-500 flex items-center">
                     See More
                     <svg width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                     </svg>
                  </Link>
                  <span className="text-gray-500 inline-flex items-center leading-none text-lg pr-3 py-1 font-bold">
                     {book.price}
                  </span>
               </div>
            </div>
         </div>
      </section>
   );
}

export default BookItem;