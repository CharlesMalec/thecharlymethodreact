import React from 'react';

const Services = () => (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">Our Coaching Services</h2>
            <div className="grid md:grid-cols-3 gap-10">
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-indigo-100 rounded-full">
                        <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">One-on-One Coaching</h3>
                    <p className="text-gray-600 text-lg">Personalized sessions to address your unique leadership challenges and chart a clear path to your goals.</p>
                </div>
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-indigo-100 rounded-full">
                        <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V7.5a2.5 2.5 0 00-2.5-2.5h-9a2.5 2.5 0 00-2.5 2.5V18a2 2 0 002 2h2m6 0v-2a2 2 0 012-2h2v-2h-2m-8 2H7v-2a2 2 0 012-2h2m0 0h2m-2-2v2h2v-2h-2zm-6-2h2m-2-2h2m-2 0h-2m2 0h2m-2 0h2m-2 0h2m-2-2h2m-2 0h2m-2 0h2m-2-2h2m-2 0h2m-2 0h2"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Team Workshops</h3>
                    <p className="text-gray-600 text-lg">Customized workshops to enhance communication, build trust, and foster a culture of collaboration within your team.</p>
                </div>
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-indigo-100 rounded-full">
                        <svg className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h2a2 2 0 002-2V7.5a2.5 2.5 0 00-2.5-2.5h-9a2.5 2.5 0 00-2.5 2.5V18a2 2 0 002 2h2m6 0v-2a2 2 0 012-2h2v-2h-2m-8 2H7v-2a2 2 0 012-2h2m0 0h2m-2-2v2h2v-2h-2zm-6-2h2m-2-2h2m-2 0h-2m2 0h2m-2 0h2m-2 0h2m-2-2h2m-2 0h2m-2 0h2m-2-2h2m-2 0h2m-2 0h2"></path>
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">Leadership Assessments</h3>
                    <p className="text-gray-600 text-lg">Comprehensive assessments to identify strengths and opportunities for growth in your leadership style.</p>
                </div>
                {/* Add other service cards similarly */}
            </div>
        </div>
    </section>
);

export default Services;