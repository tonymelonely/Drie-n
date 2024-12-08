interface TutorialProps {
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    onFinish: () => void;
    onStartPractice: () => void;
}
export declare function Tutorial({ currentStep, onNext, onPrevious, onFinish, onStartPractice }: TutorialProps): import("react/jsx-runtime").JSX.Element;
export {};
