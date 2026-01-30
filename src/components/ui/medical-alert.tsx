// src/components/ui/medical-alert.tsx
'use client';

import { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';

interface MedicalAlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description: string;
    icon?: ReactNode;
    className?: string;
    actions?: ReactNode;
}

const alertStyles = {
    success: {
        container: 'bg-emerald-50/50 border-emerald-100 shadow-sm shadow-emerald-100/50',
        icon: 'text-emerald-600',
        title: 'text-emerald-900',
        description: 'text-emerald-700/80',
        defaultIcon: <CheckCircle className="h-5 w-5" />
    },
    error: {
        container: 'bg-rose-50/50 border-rose-100 shadow-sm shadow-rose-100/50',
        icon: 'text-rose-600',
        title: 'text-rose-900',
        description: 'text-rose-700/80',
        defaultIcon: <XCircle className="h-5 w-5" />
    },
    warning: {
        container: 'bg-amber-50/50 border-amber-100 shadow-sm shadow-amber-100/50',
        icon: 'text-amber-600',
        title: 'text-amber-900',
        description: 'text-amber-700/80',
        defaultIcon: <AlertTriangle className="h-5 w-5" />
    },
    info: {
        container: 'bg-blue-50/50 border-blue-100 shadow-sm shadow-blue-100/50',
        icon: 'text-blue-600',
        title: 'text-blue-900',
        description: 'text-blue-700/80',
        defaultIcon: <Info className="h-5 w-5" />
    }
};

export default function MedicalAlert({
    type,
    title,
    description,
    icon,
    className = '',
    actions
}: MedicalAlertProps) {
    const styles = alertStyles[type];

    return (
        <div
            className={`rounded-2xl border p-5 ${styles.container} ${className} transition-all duration-300`}
            role="alert"
        >
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 mt-0.5 ${styles.icon}`}>
                    {icon || styles.defaultIcon}
                </div>

                <div className="flex-1">
                    <h3 className={`text-sm font-bold leading-none mb-1.5 ${styles.title}`}>
                        {title}
                    </h3>
                    <p className={`text-[13px] leading-relaxed ${styles.description}`}>
                        {description}
                    </p>

                    {actions && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {actions}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}