import React, { useState } from 'react';
import { AuthLayout, Logo } from '../../layouts/AuthLayout';
import { FormInput } from '../../components/CustomElements/FormInput';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowLeft, Laptop, BookOpen, Shield } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email is required');
            return;
        }

        setIsLoading(true);
        try {
            // Add your password reset logic here
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
            setIsEmailSent(true);
        } catch (error) {
            setError('Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const heroContent = (
        <div className="relative z-10 text-center text-white max-w-lg">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-16 left-16 w-24 h-24 bg-white rounded-xl transform rotate-12"></div>
                <div className="absolute bottom-24 right-24 w-20 h-20 bg-white rounded-xl transform -rotate-6"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-8 flex justify-center space-x-6">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce">
                        <Mail className="w-12 h-12 text-yellow-300" />
                    </div>
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce delay-150">
                        <Lock className="w-12 h-12 text-yellow-300" />
                    </div>
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 animate-bounce delay-300">
                        <Shield className="w-12 h-12 text-yellow-300" />
                    </div>
                </div>

                <h2 className="text-4xl font-bold mb-6">
                    Password Recovery
                    <span className="block text-yellow-300">Made Simple</span>
                </h2>

                <p className="text-xl text-emerald-100 mb-8">
                    Don't worry! It happens to the best of us. We'll help you
                    get back into your account in no time.
                </p>

                {/* Steps */}
                <div className="space-y-4 text-left">
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">1</span>
                        <span className="text-emerald-100">Enter your email address</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">2</span>
                        <span className="text-emerald-100">Check your inbox for reset link</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">3</span>
                        <span className="text-emerald-100">Create a new password</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AuthLayout heroContent={heroContent} isReversed>
            <Logo variant="green" />

            {!isEmailSent ? (
                <>
                    <h1 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password?</h1>
                    <p className="text-gray-600 mb-6">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormInput
                            label="Email Address"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            error={error}
                            placeholder="Enter your email"
                            required
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium 
                            hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                            focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl 
                            transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Check Your Email</h2>
                    <p className="text-gray-600">
                        We've sent password recovery instructions to your email address.
                    </p>
                </div>
            )}

            <Link
                to="/login"
                className="inline-flex items-center text-sm text-emerald-600 hover:text-emerald-700 mt-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
            </Link>
        </AuthLayout>
    );
};

export default ForgotPasswordPage;