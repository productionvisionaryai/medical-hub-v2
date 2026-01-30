/**
 * Recovery Actions Component - Visionary AI Edition
 * * Botones de acción contextuales para Helena AI.
 * Optimizado para respuesta rápida en interfaces médicas.
 */

'use client';

import { ReactNode } from 'react';

interface RecoveryAction {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    primary?: boolean;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    disabled?: boolean;
}

interface RecoveryActionsProps {
    actions: RecoveryAction[];
    className?: string;
}

export default function RecoveryActions({ actions, className = '' }: RecoveryActionsProps) {
    const getButtonStyles = (action: RecoveryAction): string => {
        const baseStyles = 'flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed';

        if (action.primary || action.variant === 'primary') {
            return `${baseStyles} bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200/50`;
        }

        if (action.variant === 'danger') {
            return `${baseStyles} bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-200/50`;
        }

        if (action.variant === 'secondary') {
            return `${baseStyles} bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-sm`;
        }

        if (action.variant === 'ghost') {
            return `${baseStyles} bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700`;
        }

        // Default: Soft slate style
        return `${baseStyles} bg-slate-100 text-slate-700 hover:bg-slate-200`;
    };

    return (
        <div className={`flex flex-wrap gap-3 mt-4 ${className}`}>
            {actions.map((action, index) => (
                <button
                    key={index}
                    onClick={action.onClick}
                    disabled={action.disabled}
                    className={getButtonStyles(action)}
                    type="button"
                >
                    {action.icon && (
                        <span className="flex-shrink-0 w-4 h-4">
                            {action.icon}
                        </span>
                    )}
                    <span>{action.label}</span>
                </button>
            ))}
        </div>
    );
}