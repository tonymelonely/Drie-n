interface ToastProps {
    message: string;
    type?: 'error' | 'success' | 'info';
    duration?: number;
}
export declare function Toast({ message, type, duration }: ToastProps): import("react/jsx-runtime").JSX.Element | null;
export {};
