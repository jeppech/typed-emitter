# Typed EventEmitter for TypeScript
This is fairly simple class, for making Typed events

## Usage
```ts
import { TypedEmitter } from '@jeppech/typed-emitter'

// Start by declaring an interface, describing your events and data types

interface EventData {
	id: number
	user: string
	message: string
}

interface MyEvents {
	'data': EventData
	'connected': undefined
	'disconnected': undefined
}

const emitter = TypedEmitter<MyEvents>()

// Note you get hints, when using the methods of the emitter.
emitter.on('data', (data) => {
	// data is EventData-type
})

emitter.emit('data', {
	'id': 1,
	'user': 'jeppech',
	'message': 'Hello!'
})

class MyClass extends TypedEmitter<MyEvents> {
	constructor() {
		super()

		this.on('data', (data) => {
			// data is EventData-type
		})
	}
}
