import React from 'react';
import { Link } from 'react-router-dom';

const Books = () => (
  <section id="books" className="py-20 md:py-32 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Recommended Books</h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        Discover books that inspire authentic leadership.
        (As an Amazon Associate, we earn from qualifying purchases.)
      </p>
      <div className="grid md:grid-cols-3 gap-10">
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img src="https://m.media-amazon.com/images/I/71ece6mAwoL._SL1000_.jpg" alt="Book 1" className="w-full h-64 object-cover rounded-lg mb-6" />
          <h3 className="text-2xl text-primary font-semibold mb-3">The Human-Centric Workplace: Enabling People, Communities and Our Planet to Thrive</h3>
          <p className="text-gray-600 text-lg mb-4">by Simone Fenton-Jarvis</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Description: </strong>Explores how recognition, connection, and empowerment drive human-centric workplaces, with strategies to foster sustainable performance and well-being.</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Why Recommend:</strong> Focuses on practical approaches to humanize workplaces, perfectly aligned with our human-centric approach.</p>
          <a href="https://amzn.to/3JJQpgr" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700">
            Buy on Amazon
          </a>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img src="https://m.media-amazon.com/images/I/71WUqP6mNHL._SL1500_.jpg" alt="Book 1" className="w-full h-64 object-cover rounded-lg mb-6" />
          <h3 className="text-2xl text-primary font-semibold mb-3">Making Work Human: How Human-Centered Companies are Changing the Future of Work and the World</h3>
          <p className="text-gray-600 text-lg mb-4">by Eric Mosley and Derek Irvine</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Description: </strong>A practical guide for creating workplaces that prioritize employee well-being, creativity, and performance over productivity metrics. It covers leadership roles, workplace culture, and brain science for human-focused management.</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Why Recommend:</strong> Directly aligns with human-centric principles, offering actionable insights for leaders.</p>
          <a href="https://amzn.to/3VtmQ58" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700">
            Buy on Amazon
          </a>
        </div>
        <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
          <img src="https://m.media-amazon.com/images/I/71zXntN+mQL._SL1500_.jpg" alt="Book 1" className="w-full h-64 object-cover rounded-lg mb-6" />
          <h3 className="text-2xl text-primary font-semibold mb-3">The Heart of Service: A Blueprint for Human-Centric AI in Customer Service</h3>
          <p className="text-gray-600 text-lg mb-4">by Nick Glimsdahl</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Description: </strong>A business parable and playbook for integrating AI in customer service while prioritizing human connection, with leadership takeaways for real-world application.</p>
          <p className="text-gray-600 text-lg mb-4"><strong>Why Recommend:</strong> Balances technology and human-centricity, relevant for modern leadership discussions.</p>
          <a href="https://amzn.to/4n7CAXj" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700">
            Buy on Amazon
          </a>
        </div>
        {/* Add more book entries as needed */}
      </div>
      <div className="text-center mt-12">
        <Link
          to="/contact"
          className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-xl hover:bg-indigo-700 md:text-lg text-base whitespace-nowrap"
        >
          <span className="hidden md:inline">Contact Us for More Recommendations</span>
          <span className="md:hidden">Contact for Recommendations</span>
        </Link>
      </div>
    </div>
  </section>
);

export default Books;