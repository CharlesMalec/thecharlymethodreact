import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, Video, GraduationCap, Download, ExternalLink, ArrowLeft } from 'lucide-react';
import humanTemplate from '../documents/HUMAN_1to1_Template.pdf';
import humanQuickScan from '../documents/HUMAN - Quick Scan.pdf';

const Resources = () => {
    const [activeTab, setActiveTab] = useState('toolbox');

    const tabs = [
        {
            id: 'toolbox',
            name: 'Management ToolBox',
            icon: FileText,
            description: 'Actionable worksheets and templates designed to improve communication and build trust in your team.',
            content: [
                { 
                    name: 'HUMAN - 1 to 1 Template', 
                    type: 'PDF Template',
                    description: 'A structured template for running highly effective, person-centered 1-to-1 meetings.',
                    url: humanTemplate 
                },
                { 
                    name: 'HUMAN - Quick Scan', 
                    type: 'Assessment Tool',
                    description: 'A simple scorecard to scan and assess team health across key human dimensions.',
                    url: humanQuickScan 
                },
            ],
        },
        {
            id: 'videos-internet',
            name: 'Inspirational Videos',
            icon: Video,
            description: 'Curated speeches and talks on leadership, human-centered coaching, and listening.',
            content: [
                { 
                    name: 'Why good leaders make you feel safe', 
                    type: 'Simon Sinek (TED)',
                    description: 'A deep dive into how trust is built by creating a circle of safety within teams.',
                    url: 'https://www.youtube.com/watch?v=lmyZMtPVodo' 
                },
                { 
                    name: 'The Power of Listening', 
                    type: 'William Ury (TEDx)',
                    description: 'Learn how active listening helps resolve deep conflicts and build genuine consensus.',
                    url: 'https://www.youtube.com/watch?v=saXfavo1OQo' 
                },
            ],
        },
        {
            id: 'video-courses',
            name: 'Video Courses',
            icon: GraduationCap,
            description: 'Guided masterclasses and courses to sharpen your day-to-day leadership and coaching skills.',
            content: [
                { 
                    name: 'Course: Hear Actively', 
                    type: 'Video Masterclass',
                    description: 'A comprehensive, practical guide to listening actively, handling resistance, and mentoring with empathy.',
                    url: 'https://www.youtube.com/embed/J5VsOeHMSvw?si=wnpffwYz9akor-fD' 
                },
            ],
        },
    ];

    const currentTab = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="min-h-screen bg-gray-50/50 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/10 w-96 h-96 glow-blob-primary rounded-full filter blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 glow-blob-secondary rounded-full filter blur-3xl opacity-30 pointer-events-none" />
            
            {/* Dot Grid overlay */}
            <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
                
                {/* Back button */}
                <div className="mb-8">
                    <NavLink to="/" className="inline-flex items-center space-x-2 text-gray-500 hover:text-primary transition font-medium">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Home</span>
                    </NavLink>
                </div>

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-secondary font-semibold text-sm tracking-wider uppercase bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                        The Charly Method Library
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mt-4 mb-6">
                        Coaching & Leadership Resources
                    </h1>
                    <p className="text-xl text-gray-600 font-light leading-relaxed">
                        Practical templates, courses, and inspirational videos to help you find clarity, grow in your career, and support your team. Completely free to access and download.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                    {/* Sidebar navigation */}
                    <aside className="w-full lg:w-80 bg-white p-6 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-between">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-6">Categories</h2>
                            <ul className="space-y-3">
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    return (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center space-x-3 py-3 px-4 rounded-2xl transition duration-300 border text-left ${activeTab === tab.id
                                                    ? 'bg-primary border-primary text-white font-semibold shadow-md'
                                                    : 'bg-white border-transparent text-gray-700 hover:bg-gray-50 hover:text-primary'
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-secondary' : 'text-gray-400'}`} />
                                                <span>{tab.name}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Aesthetic Footer Widget in Sidebar */}
                        <div className="mt-12 p-5 bg-gradient-to-br from-blue-50/60 to-amber-50/40 rounded-2xl border border-blue-50 text-xs text-gray-600">
                            <p className="font-semibold text-primary mb-1">💡 Need customized support?</p>
                            <p className="leading-relaxed">
                                Let's translate these tools into action for your specific career or team. Contact me to start a conversation.
                            </p>
                            <NavLink to="/#contact" className="inline-block mt-3 text-secondary font-bold hover:underline">
                                Get in touch &rarr;
                            </NavLink>
                        </div>
                    </aside>

                    {/* Content area */}
                    <main className="flex-1 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-md flex flex-col">
                        <div className="mb-8 border-b border-gray-100 pb-6">
                            <h2 className="text-3xl font-bold text-primary mb-2">{currentTab.name}</h2>
                            <p className="text-gray-500">{currentTab.description}</p>
                        </div>

                        {currentTab.content.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {currentTab.content.map((item, index) => {
                                    const isVideo = activeTab === 'videos-internet' || activeTab === 'video-courses';
                                    return (
                                        <div 
                                            key={index} 
                                            className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 flex flex-col justify-between hover:border-amber-200 transition duration-300"
                                        >
                                            <div>
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
                                                        {item.type}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-bold text-primary mb-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                                                    {item.description}
                                                </p>
                                            </div>

                                            <div>
                                                {isVideo ? (
                                                    <div className="w-full">
                                                        <div className="aspect-video relative rounded-xl overflow-hidden shadow-sm bg-black">
                                                            <iframe
                                                                src={item.url.includes('youtube.com') ? item.url.replace('watch?v=', 'embed/') : item.url}
                                                                title={item.name}
                                                                className="absolute inset-0 w-full h-full"
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                referrerPolicy="strict-origin-when-cross-origin"
                                                                allowFullScreen
                                                            />
                                                        </div>
                                                        {item.url.includes('youtube.com') && !item.url.includes('embed') && (
                                                            <a 
                                                                href={item.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center space-x-1.5 mt-3 text-xs text-secondary hover:underline font-semibold"
                                                            >
                                                                <span>Watch on YouTube</span>
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <a
                                                        href={item.url}
                                                        download
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center space-x-2 px-4 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 hover:shadow transition duration-300"
                                                    >
                                                        <Download className="w-4 h-4 text-secondary" />
                                                        <span>Download Template</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No content available for this category yet.</p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Resources;
