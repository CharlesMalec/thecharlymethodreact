import React from 'react';
import { Link } from 'react-router-dom';

const Books = () => (
  <section id="books" className="py-20 md:py-32 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Recommended Books</h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        Discover books that inspire authentic leadership and personal growth. (As an Amazon Associate, we earn from qualifying purchases.)
      </p>
      <div className="grid md:grid-cols-3 gap-10">
        {/* Book 1 */}
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img
            src="https://placehold.co/200x300/E5E7EB/4B5563?text=Book+Cover"
            alt="Book 1"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold mb-3">Book Title 1</h3>
          <p className="text-gray-600 text-lg mb-4">
            A transformative guide on leadership that emphasizes empathy and authenticity.
          </p>
          <a
            href="YOUR_AMAZON_AFFILIATE_LINK_1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700"
          >
            Buy on Amazon
          </a>
        </div>
        {/* Book 2 */}
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img
            src="https://placehold.co/200x300/E5E7EB/4B5563?text=Book+Cover"
            alt="Book 2"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold mb-3">Book Title 2</h3>
          <p className="text-gray-600 text-lg mb-4">
            Learn strategies to build trust and foster collaboration in teams.
          </p>
          <a
            href="YOUR_AMAZON_AFFILIATE_LINK_2"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700"
          >
            Buy on Amazon
          </a>
        </div>
        {/* Book 3 */}
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img
            src="https://placehold.co/200x300/E5E7EB/4B5563?text=Book+Cover"
            alt="Book 3"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h3 className="text-2xl font-semibold mb-3">Book Title 3</h3>
          <p className="text-gray-600 text-lg mb-4">
            A deep dive into ethical leadership for modern organizations.
          </p>
          <a
            href="YOUR_AMAZON_AFFILIATE_LINK_3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700"
          >
            Buy on Amazon
          </a>
        </div>
      </div>
      <div className="text-center mt-12">
        <Link
          to="/contact"
          className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-xl hover:bg-indigo-700"
        >
          Contact Us for More Recommendations
        </Link>
      </div>
    </div>
  </section>
);

export default Books;