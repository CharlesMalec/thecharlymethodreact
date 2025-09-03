import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => (
  <section id="contact" className="py-20 md:py-32 bg-gray-50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10 text-gray-900">Get in Touch</h2>
      <form name="contact" method="POST" data-netlify="true" className="max-w-lg mx-auto">
        <input type="hidden" name="form-name" value="contact" />
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
          <input type="text" id="name" name="name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" required />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" required />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
          <textarea id="message" name="message" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600" rows="5" required></textarea>
        </div>
        <button type="submit" className="w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700">
          Send Message
        </button>
      </form>
      <div className="text-center mt-8">
        <Link to="/" className="text-indigo-600 hover:underline">Back to Home</Link>
      </div>
    </div>
  </section>
);

export default Contact;