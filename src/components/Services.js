import React from 'react';
import { User, Users, ClipboardList } from "lucide-react";

const Services = () => (
    <section id="services" className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary">Our Coaching Services</h2>
            <div className="grid md:grid-cols-3 gap-10">
                {/* One-on-One Coaching */}
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-primary rounded-full">
                        <User className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl text-primary font-semibold mb-3">One-on-One Coaching</h3>
                    <p className="text-gray-600 text-lg">
                        Personalized coaching sessions tailored to your unique leadership challenges—
                        whether it’s decision-making, team dynamics, or personal growth. Through a
                        human-centric approach, we’ll work together to explore your strengths, clarify
                        your goals, and create a clear, actionable path toward becoming the leader you aspire to be.
                        <br /><br />
                        <strong>Free 60-minute introductory session</strong> to get started.<br />
                        <strong>Follow-up sessions:</strong> 100€/hour.
                    </p>
                </div>

                {/* Team Workshops */}
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-primary rounded-full">
                        <Users className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl text-primary font-semibold mb-3">Team Workshops</h3>
                    <p className="text-gray-600 text-lg">
                        Customized workshops designed to strengthen communication, build trust, and
                        foster a culture of collaboration within your team. Each workshop is tailored
                        to your organization’s unique context—whether you want to improve
                        cross-functional alignment, navigate change, or boost overall team performance.
                        Sessions combine interactive exercises, practical tools, and reflective discussions
                        to create long-lasting impact for your group.
                        <br /><br />
                        <strong>Pricing:</strong> On demand (based on team size and workshop format).
                    </p>
                </div>

                {/* Leadership Assessments */}
                <div className="bg-white p-10 rounded-3xl shadow-lg services-card-hover">
                    <div className="flex items-center justify-center h-20 w-20 mb-6 bg-primary rounded-full">
                        <ClipboardList className="h-10 w-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl text-primary font-semibold mb-3">Leadership Assessments</h3>
                    <p className="text-gray-600 text-lg">
                        Comprehensive assessments designed to help young and mid-level managers gain
                        clarity on their leadership style. We’ll identify your strengths, highlight areas
                        for growth, and provide actionable insights to support your professional journey.
                        These assessments combine reflective discussions with practical tools, offering
                        you a clear understanding of how to lead with confidence and authenticity.
                        <br /><br />
                        <strong>Free 60-minute introductory session</strong> to get started.<br />
                        <strong>Follow-up sessions:</strong> 100€/hour.
                    </p>
                </div>
            </div>
        </div>
    </section >
);

export default Services;