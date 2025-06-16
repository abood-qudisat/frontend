import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const FormInput = ({
    label,
    type = 'text',
    id,
    error,
    showPassword,
    togglePassword,
    ...props
}) => {
    const isPasswordType = type === 'password';

    return (
        <div className="space-y-1">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 text-left">
                {label}
            </label>
            <div className="relative">
                <input
                    type={isPasswordType && showPassword ? 'text' : type}
                    id={id}
                    className={`
            w-full px-4 py-3 ${isPasswordType ? 'pr-12' : ''}
            border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200 bg-white/80 backdrop-blur-sm
            ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
                    {...props}
                />
                {isPasswordType && (
                    <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};