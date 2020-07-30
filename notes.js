const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNote()
    const noteexsist = notes.find((n) => n.title === title)
    if(noteexsist){
        console.log(chalk.redBright.inverse('Note with that title already exists'))
    } else {
        notes.push(
            {
                title: title,
                body: body
            }
        )
        saveNote(notes)
        console.log(chalk.greenBright.inverse('New Note created'))
    }
}

const saveNote = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNote = () => {
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJSON = databuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
       return []
    }
    
}

const removeNote = (title) => {
    const notes = loadNote()
    notes.forEach( (n, i) => {
        if(n.title === title) {
            notes.splice(i, 1)
            console.log(chalk.green.inverse('Note Removed Successfuly..!'))
        }
    }
    )   
    saveNote(notes)    
}

const listNote = () => {
    const notes = loadNote()
    if(notes[0] !== undefined) {
        console.log(chalk.white.inverse.bold(' Your Notes : \n'))
        notes.forEach(
            (n) => {
                console.log(chalk.magentaBright.inverse.bold(' ' + n.title + ' '))
                console.log(chalk.inverse(' ' + n.body + '\n'))
            }
        )
    } else {
        console.log(chalk.yellow.inverse('Your Note list is empty..!'))
    }
}

const readNote = (title) => {
    const notes = loadNote()
    if(notes[0] !== undefined) {
        const notefound = notes.find((n) => n.title === title)
        if(notefound) {
            console.log(chalk.magenta.inverse.bold(' ' + notefound.title + ' '))
            console.log(chalk.inverse(' ' + notefound.body + '\n'))
        } else {
            console.log(chalk.red.inverse('Note with this title doesnot exsist..!'))    
        }
    } else {
        console.log(chalk.yellow.inverse('Your Note list is empty..!'))
    }
}

module.exports = {
    addnote: addNote,
    removenote: removeNote,
    listnote: listNote,
    readnote: readNote
}