'use strict';

export class RingBuffer {
    private length: number;
    private buffer: string[];
    private head: number;
    private tail: number;

    constructor(length: number) {
        this.length = length;
        this.buffer = new Array(length);
        this.head = -1;
        this.tail = 0;
    }

    enqueue(v: string) {
        this.set(this.head + 1, v);
        const old = this.head;
        this.head = this.mod(this.head + 1);
        if ((old !== -1) && (this.head === this.tail)) {
            this.tail = this.mod(this.tail) + 1;
        }
    }

    dequeue() {
        if (this.head === -1) {
            return "";
        }
        const v = this.get(this.tail);
        if (this.tail === this.head) {
            this.head = -1;
            this.tail = 0;
        } else {
            this.tail = this.mod(this.tail + 1);
        }
        return v;
    }
    last() {
        if (this.head === -1) {
            return "";
        }
        return this.get(this.head);
    }

    private set(p: number, v: string) {
        this.buffer[this.mod(p)] = v;
    }
    private get(p: number) {
        return this.buffer[this.mod(p)];

    }
    private mod(p: number) {
        return p % this.length;
    }
}
