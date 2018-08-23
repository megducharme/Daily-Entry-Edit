const FormManager = require("./JournalForm")
const DataManager = require("./DataManager")
const entryList = require("./EntryList")

// Render the journal entry form
document.querySelector("#journalForm").innerHTML = FormManager.renderEntryForm()

// Render the list of entries
const listEntries = () => {
    DataManager.getAllEntries()
        .then(allEntries => entryList(allEntries))
}

listEntries()

// Handle delete button clicks
document.querySelector(".entryList").addEventListener("click", evt => {
    if (evt.target.classList.contains("entry__delete")) {
        const id = parseInt(evt.target.id.split("--")[1])
        DataManager.deleteEntry(id).then(listEntries)
    }
    else if (evt.target.classList.contains("entry__edit")) {
        const id = parseInt(evt.target.id.split("--")[1])
        editEntry(id)
        // DataManager.editEntry(id).then(listEntries)
    }
})

let edit = {
    mode: false,
    id: null
}
function editEntry(id){
    DataManager.getSingleEntry(id)
    .then(singleEntry => {
        edit.id = id
        edit.mode = true
        document.getElementById("entryTitle").value = singleEntry.title;
        document.getElementById("entryContent").value = singleEntry.content;
    });
}



// Add an event listener for the save button
document.querySelector("#saveEntryButton").addEventListener("click", () => {
    // Get form field values
    // Create object from them
    // Add timestamp
    const newEntry = {
        title: document.querySelector("#entryTitle").value,
        content: document.querySelector("#entryContent").value,
        date: Date.now()
    }
    if(edit.mode){
        DataManager.editEntry(edit.id, newEntry).then(listEntries)
        edit.mode = false;
        edit.id = null;
    }else{
        // POST to API
        DataManager.saveJournalEntry(newEntry)
            .then(() => {
                // Clear the form fields
                FormManager.clearForm()
                listEntries()
            })
    }

})
