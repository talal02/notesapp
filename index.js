const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const { argv } = require('process')
//ADD COMMAND
yargs.command(
    {
        command: 'add',
        desc: 'Add a new note',
        builder: {
            title: {
                desc: 'Title of Note',
                demandOption: true,
                type: 'string'
            },
            body: {
                desc: 'Body of Note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            notes.addnote(argv.title, argv.body)
        }
    }
)
//Remove
.command(
    {
        command: 'remove',
        desc: 'remove a note',
        builder: {
            title: {
                desc: 'Title of Note to Delete',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            notes.removenote(argv.title)
        }
    }
)
//List
.command(
    {
        command: 'list',
        desc: 'List your note',
        handler: () => {
            notes.listnote()
        }
    }
)
//read
.command(
    {
        command: 'read',
        desc: 'Read a note',
        builder: {
            title: {
                desc: 'Read a particular note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            notes.readnote(argv.title)
        }
    }
).help().argv
