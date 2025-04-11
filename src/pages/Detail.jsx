import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookDetail from "@/components/BookDetail";
import books from "@/json/books.json";


function Book() {
   const { bookId } = useParams();
   const book = books.find(
      (x) => x.id === Number(bookId)
   );
   const title = "Book Detail";
   return (
      <div className="container mx-auto main-layout bg-gray-900">
         <Helmet>
               <title>{title}</title>
            </Helmet>
         <Header
            title={title}
            slogan="More information for you."
         />
         
         <BookDetail book={book} className="content" />
         <Footer className="footer" />
      </div>
   );
}

export default Book;
