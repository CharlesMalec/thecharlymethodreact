import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import humanTemplate from '../documents/HUMAN_1to1_Template.pdf';

const Material = () => {
    const [user, loading] = useAuthState(auth);
    const [activeTab, setActiveTab] = useState('toolbox');

    const tabs = [
        {
            id: 'toolbox',
            name: 'Management ToolBox',
            content: [
                { name: 'HUMAN - 1 to 1 template.pdf', url: humanTemplate },
            ],
        },
        {
            id: 'videos-internet',
            name: 'Videos - Internet',
            content: [
                { name: 'Why good leaders make you feel safe - Simon Sinek - TED (YouTube)', url: 'https://www.youtube.com/watch?v=lmyZMtPVodo' },
                { name: 'The Power of Listening - William Ury - TED', url: 'https://www.youtube.com/watch?v=saXfavo1OQo' },
            ],
        },
        {
            id: 'video-courses',
            name: 'Video - Courses',
            content: [
                { name: 'Course: Hear Actively', url: 'https://www.youtube.com/embed/J5VsOeHMSvw?si=wnpffwYz9akor-fD' },
            ],
        },
    ];

    if (loading) return <div className="text-center text-gray-600 text-lg">Loading...</div>;
    if (!user) return <Navigate to="/payment" />;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-72 bg-white shadow-lg">
                <div className="p-6 sticky top-0">
                    <h2 className="text-2xl font-bold text-primary mb-6">Resources</h2>
                    <ul className="space-y-2">
                        {tabs.map(tab => (
                            <li key={tab.id}>
                                <button
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full text-left py-3 px-4 rounded-lg transition duration-300 ${activeTab === tab.id
                                        ? 'bg-primary text-white font-semibold'
                                        : 'text-gray-700 hover:bg-washedprimary hover:text-white'
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
            {/* Content Area */}
            <main className="flex-1 p-6 md:p-8">
                <h2 className="text-3xl font-bold text-primary mb-6">
                    {tabs.find(tab => tab.id === activeTab).name}
                </h2>
                {tabs.find(tab => tab.id === activeTab).content.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {tabs.find(tab => tab.id === activeTab).content.map((item, index) => (
                            <li key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                {(activeTab === 'videos-internet' || activeTab === 'video-courses') ? (
                                    <div className="w-full max-w-full">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <iframe
                                                src={item.url.includes('youtube.com') ? item.url.replace('watch?v=', 'embed/') : item.url}
                                                title={item.name}
                                                className="w-full h-full rounded-lg"
                                                frameBorder="0"
                                                scrolling="no"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            />
                                        </div>
                                        {item.url.includes('ted.com') && (
                                            <p className="text-gray-500 text-sm mt-2">
                                                If the video doesn’t load, <a href={item.url.replace('embed.ted.com', 'www.ted.com')} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">watch on TED</a>.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l-4 4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        <span>{item.name}</span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No content available for this category.</p>
                )}
            </main>
        </div>
    );
};

export default Material;

