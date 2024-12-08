interface NetworkGameSetupProps {
    onCreateRoom: () => void;
    onJoinRoom: (roomCode: string) => void;
    isCreatingRoom: boolean;
}
export declare function NetworkGameSetup({ onCreateRoom, onJoinRoom, isCreatingRoom }: NetworkGameSetupProps): import("react/jsx-runtime").JSX.Element;
export {};
