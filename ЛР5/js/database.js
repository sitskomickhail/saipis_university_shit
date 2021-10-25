class Database {
    #dbConnection;

    constructor() {
        this.#dbConnection = openDatabase('instrumentsDb', '1.0', 'Instruments DB', 2 * 1024 * 1024);

        this.#dbConnection.transaction(function (tx) {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS INSTRUMENTS (id INTEGER PRIMARY KEY AUTOINCREMENT, name, purpose, weight, cost)`);
            // tx.executeSql(`DROP TABLE INSTRUMENTS;`);
        });
    }

    insertNewObject(instrument) {
        if (!instrument instanceof Instrument) {
            throw new Error("Not an instrument");
        }

        this.#dbConnection.transaction(function (tx) {
            tx.executeSql('INSERT INTO INSTRUMENTS (name, purpose, weight, cost) ' +
                'VALUES (?, ?, ?, ?)', [
                instrument.name,
                instrument.purpose,
                instrument.weight,
                instrument.cost
            ]);
        });
    }

    selectAll(callBack) {
        this.#dbConnection.transaction(function (tx) {
            tx.executeSql('SELECT * FROM INSTRUMENTS', [], function (tx, results) {
                let instruments = [];

                for (let i = 0; i < results.rows.length; i++) {
                    const currentItem = results.rows.item(i);

                    const totalCount = instruments.push(new Instrument(currentItem.name,
                        currentItem.purpose,
                        currentItem.weight,
                        currentItem.cost));

                    instruments[totalCount - 1].id = currentItem.id;
                }

                callBack(instruments);
            });
        });
    }

    getInstrumentById(id, callBack) {
        this.#dbConnection.transaction(function (tx) {
            tx.executeSql('SELECT * FROM INSTRUMENTS WHERE id = ?', [id], function (tx, results) {
                let instrument;

                if (results.rows.length > 0) {
                    const foundItem = results.rows.item(0);

                    instrument = new Instrument(foundItem.name, foundItem.purpose, foundItem.weight, foundItem.cost);
                    instrument.id = foundItem.id;

                }

                callBack(instrument);
            });
        });
    }

    deleteInstrumentById(id, callBack) {
        this.#dbConnection.transaction(function (tx) {
            tx.executeSql('DELETE FROM table_name WHERE id = ?', [id], function (tx, results) {


                callBack(instrument);
            });
        });
    }

    getMinWeightInstrument(callBack) {
        this.#dbConnection.transaction(function (tx) {
            tx.executeSql('SELECT id, name, purpose, MIN(weight) as weight, cost FROM INSTRUMENTS', [], function (tx, results) {
                let instruments = [];

                if (results.rows.length > 0) {
                    const foundItem = results.rows.item(0);

                    const instrument = new Instrument(foundItem.name, foundItem.purpose, foundItem.weight, foundItem.cost);
                    instrument.id = foundItem.id;

                    instruments.push(instrument);
                }

                callBack(instruments);
            });
        });
    }
}

const database = new Database();