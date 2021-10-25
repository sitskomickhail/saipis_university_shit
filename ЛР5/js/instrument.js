class Instrument {
    #id;
    #name;
    #purpose;
    #weight;
    #cost;
    #additionalProps

    constructor(name, purpose, weight, cost) {
        this.#name = name;
        this.#purpose = purpose;
        this.#weight = weight;
        this.#cost = cost;
        this.#additionalProps = new Map();
    }

    set name(value) {
        this.#name = value;
    }

    get name() {
        return this.#name;
    }

    set purpose(value) {
        this.#purpose = value;
    }

    get purpose() {
        return this.#purpose;
    }

    set weight(value) {
        this.#weight = value;
    }

    get weight() {
        return this.#weight;
    }

    set cost(value) {
        this.#cost = value;
    }

    get cost() {
        return this.#cost;
    }

    set id(value) {
        this.#id = value;
    }

    get id() {
        return this.#id
    }

    addProperty(propKey, propValue) {
        this.#additionalProps.set(propKey, propValue);
    }

    getPropertiesList() {
        return this.#additionalProps;
    }
}