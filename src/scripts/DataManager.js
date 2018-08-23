const APIManager = Object.create(null, {
    saveJournalEntry: {
        value: (entry) => {
            return fetch("http://localhost:8088/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(response => response.json())
        }
    },
    getAllEntries: {
        value: () => {
            return fetch("http://localhost:8088/entries?_order=desc&_sort=date").then(r => r.json())
        }
    },
    getSingleEntry: {
        value: (id) => {
            return fetch(`http://localhost:8088/entries/${id}`).then(r => r.json())
        }
    },
    deleteEntry: {
        value: (id) => {
            return fetch(`http://localhost:8088/entries/${id}`, {
                method: "DELETE"
            })
                .then(r => r.json())
        }
    },
    editEntry: {
        value: (id, entryToEdit) => {
            return fetch(`http://localhost:8088/entries/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entryToEdit)
            })
                .then(response => response.json());
        }
    }
})

module.exports = APIManager