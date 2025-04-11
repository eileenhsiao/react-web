import { Helmet } from 'react-helmet-async';
import Header from '../components/Header'
import BookList from '@/components/BookList'
import Footer from '@/components/Footer'
import books from "@/json/books.json";

function Home() {
  return (
    
    <div className="container mx-auto main-layout bg-gray-900 min-h-screen">
      
      <Header 
        title="Welcome to the Bookstore"
        slogan="The best place to introduce you some great books"
      />
      <BookList books ={books} className="content" />
     
      <Footer className="footer" />
    </div>
  )
}

export default Home
