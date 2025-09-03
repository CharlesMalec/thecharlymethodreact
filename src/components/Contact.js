import React from 'react';

const Contact = () => (
  <section id="contact" className="mb-20 md:mb-32">
    <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Let's Connect</h2>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
        Ready to take the next step in your career journey? Let's connect for a <strong className="text-indigo-600">free leadership session</strong>. We look forward to hearing from you. 
      </p>
      <form name="contact" className="space-y-8 max-w-xl mx-auto" data-netlify="true">
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input type="text" id="name" name="name" className="w-full px-5 py-3 border border-gray-300 rounded-xl" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" id="email" name="email" className="w-full px-5 py-3 border border-gray-300 rounded-xl" required />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea id="message" name="message" rows="5" className="w-full px-5 py-3 border border-gray-300 rounded-xl" required></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-4 rounded-full">Submit</button>
      </form>
    </div>
  </section>
);

export default Contact;