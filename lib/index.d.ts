declare type EventCallback<T> = (data: T) => void;
declare type RemoveListener = () => void;
export declare class TypedEmitter<Events> {
    private listeners;
    private listeners_once;
    on<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>): RemoveListener;
    once<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>): RemoveListener;
    off<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>): void;
    emit<Event extends keyof Events>(event: Event, data?: Events[Event]): void;
    private removeListener;
}
export {};
