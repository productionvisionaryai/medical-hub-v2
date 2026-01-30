'use client';

import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

interface ConsentFormProps {
    onConsent: (granted: boolean) => void;
}

export default function ConsentForm({ onConsent }: ConsentFormProps) {
    const [agreed, setAgreed] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const handleAccept = () => {
        if (agreed) {
            localStorage.setItem('helena_medical_consent', 'true');
            onConsent(true);
            setShowForm(false);
        }
    };

    const handleDecline = () => {
        onConsent(false);
        setShowForm(false);
    };

    if (!showForm) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <ShieldCheck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                            Medical Consent
                        </h2>
                        <p className="text-sm text-gray-500">
                            Visionary AI Medical Hub
                        </p>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div className="text-sm text-amber-800">
                                <p className="font-medium">Important Disclaimer</p>
                                <p className="mt-1">
                                    This AI assistant provides informational content only and does not constitute 
                                    medical diagnosis, treatment, or professional medical advice.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                        <p>By proceeding, you acknowledge that:</p>
                        <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>You are using this tool for informational purposes only</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>You should consult a licensed healthcare professional for medical decisions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                                <span>AI-generated responses may not always be accurate or complete</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-6">
                    <input
                        type="checkbox"
                        id="consent-checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="consent-checkbox" className="text-sm text-gray-700">
                        I understand and agree to the above terms
                    </label>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={handleDecline}
                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Decline
                    </button>
                    <button
                        onClick={handleAccept}
                        disabled={!agreed}
                        className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        I Understand - Continue
                    </button>
                </div>
            </div>
        </div>
    );
}
