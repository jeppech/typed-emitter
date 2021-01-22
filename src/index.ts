type EventCallback<T> = (data: T) => void
type RemoveListener = () => void

export class TypedEmitter<Events> {

	private listeners: any[] = []
	private listeners_once: any[] = []

	public on<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>): RemoveListener {
		this.listeners.push({ event, fn })
		return () => this.removeListener(event, fn)
	}

	public once<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>): RemoveListener {
		this.listeners_once.push({ event, fn })
		return () => this.removeListener(event, fn)
	}

	public off<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>) {
		this.removeListener(event, fn)
	}

	public emit<Event extends keyof Events>(event: Event, data?: Events[Event]) {
		for (const listener of this.listeners) {
			
			if (listener.event === event) {
				listener.fn(data)
			}
		}

		this.listeners_once = this.listeners_once.filter((listener) => {
			if (listener.event === event) {
				listener.fn(data)
				return false
			}
			return true
		})
	}

	private removeListener<Event extends keyof Events>(event: Event, fn: EventCallback<Events[Event]>) {
		this.listeners = this.listeners.filter((listener) => {
			return (listener.event !== event && listener.fn !== fn)
		})
	}
}
