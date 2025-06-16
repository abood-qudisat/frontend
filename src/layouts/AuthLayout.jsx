import React from 'react';
import { BookOpen } from 'lucide-react';

export const AuthLayout = ({ children, heroContent, isReversed = false }) => {
    const formSection = (
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen overflow-y-auto">
            <div className="w-full max-w-md">{children}</div>
        </div>
    );

    const heroSection = (
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 items-center justify-center p-8 relative overflow-hidden">
            {heroContent}
        </div>
    );

    return (
        <div className="min-h-screen h-screen w-screen flex overflow-hidden">
            {isReversed ? [heroSection, formSection] : [formSection, heroSection]}
        </div>
    );
};

export const Logo = ({ variant = 'blue' }) => {
    const gradientColors = {
        blue: 'from-blue-600 to-indigo-600',
        green: 'from-emerald-600 to-teal-600',
    };

    return (
        <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${gradientColors[variant]} rounded-xl flex items-center justify-center`}>
                    <BookOpen className="w-7 h-7 text-white" />
                </div>
                <span className={`text-3xl font-bold bg-gradient-to-r ${gradientColors[variant]} bg-clip-text text-transparent`}>
                    EduFlow
                </span>
            </div>
        </div>
    );
};