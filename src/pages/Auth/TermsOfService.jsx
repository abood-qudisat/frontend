import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle, Scroll, GraduationCap, Scale, AlertCircle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-50 to-white">
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
                    <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
                    <p className="text-xl text-emerald-100">
                        Please read these terms carefully before using our platform
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
                        {/* Account Terms Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">Account Terms</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'You must be at least 13 years old to use this service',
                                    'You must provide accurate and complete registration information',
                                    'You are responsible for maintaining your account security',
                                    'One person or legal entity may maintain no more than one account'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Usage Rules Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Scroll className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">Usage Rules</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'Content must not violate any applicable laws or regulations',
                                    'Respect intellectual property rights and copyrights',
                                    'Do not engage in any unauthorized automated access',
                                    'Do not interfere with the proper functioning of the service'
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-600">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Legal Considerations Section */}
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">Legal Considerations</h2>
                            </div>
                            <div className="space-y-4">
                                {[
                                    'We may terminate or suspend access to our service immediately',
                                    'We reserve the right to modify or discontinue the service',
                                    'You retain all rights to content you submit or upload',
                                    'Our service is provided "as is" without warranties',
                                    'We are not liable for any indirect or consequential damages'
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
                            If you have any questions about our Terms of Service, please contact us at{' '}
                            <a href="mailto:legal@eduflow.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
                                legal@eduflow.com
                            </a>
                        </p>
                    </section>

                    {/* Important Notice */}
                    <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
                        <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-800 text-sm">
                            By using our service, you agree to these terms. We reserve the right to update these terms at any time.
                            Please check this page regularly for updates.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsOfService;