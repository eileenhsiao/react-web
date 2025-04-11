import { useParams } from 'react-router';
import { Helmet } from "react-helmet-async"
import _ from 'lodash';
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import BookList from "@/components/BookList";
import books from "@/json/books.json";

function Category() {
  const { categoryName } = useParams();
  const _books = books.filter(
    x => x?.category.toUpperCase() === categoryName.toUpperCase()
  );

  const title = _.startCase(categoryName);

  return (
    <div>
      <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
        <Header
          title={title}
          slogan="The best place to introduce you some great books"
        />
        <BookList books={_books} className="content" />
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Category;
