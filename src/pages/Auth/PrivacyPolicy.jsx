import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, UserCheck, CheckCircle, BookOpen } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen  w-screen overflow-hidden  bg-gradient-to-br from-gray-50 to-white">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-xl font-bold text-gray-900">EduFlow</span>
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <Link
                                to="/sign-up"
                                className="inline-flex items-center text-sm text-gray-600 hover:text-emerald-600"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <header className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
                    <p className="text-xl text-emerald-100">
                        We value your privacy and are committed to protecting your personal information
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid gap-8">
                    {/* Last Updated */}
                    <div className="text-right text-sm text-gray-500">
                        Last updated: June 16, 2025
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {/* Information Collection Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Shield className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">Information We Collect</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Name and contact information',
                                    'Account credentials',
                                    'Course preferences and learning history',
                                    'Payment information'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Data Protection Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">How We Protect Your Data</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'End-to-end encryption for sensitive data',
                                    'Regular security audits and assessments',
                                    'Secure cloud storage with redundancy',
                                    'Strict access controls and authentication'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Your Rights Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">Your Rights</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Access and download your personal data',
                                    'Request corrections to inaccurate information',
                                    'Delete your account and associated data',
                                    'Opt-out of marketing communications',
                                    'Control your privacy settings'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Contact Section */}
                    <section className="mt-12 text-center">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions?</h2>
                        <p className="text-gray-600">
                            If you have any questions about our Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@eduflow.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                privacy@eduflow.com
                            </a>
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;