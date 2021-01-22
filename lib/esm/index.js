export class TypedEmitter {
    constructor() {
        this.listeners = [];
        this.listeners_once = [];
    }
    on(event, fn) {
        this.listeners.push({ event, fn });
        return () => this.removeListener(event, fn);
    }
    once(event, fn) {
        this.listeners_once.push({ event, fn });
        return () => this.removeListener(event, fn);
    }
    off(event, fn) {
        this.removeListener(event, fn);
    }
    emit(event, data) {
        for (const listener of this.listeners) {
            if (listener.event === event) {
                listener.fn(data);
            }
        }
        this.listeners_once = this.listeners_once.filter((listener) => {
            if (listener.event === event) {
                listener.fn(data);
                return false;
            }
            return true;
        });
    }
    removeListener(event, fn) {
        this.listeners = this.listeners.filter((listener) => {
            return (listener.event !== event && listener.fn !== fn);
        });
    }
}
