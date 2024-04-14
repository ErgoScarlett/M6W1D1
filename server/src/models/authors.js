import { Schema, model } from 'mongoose'

const authorSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        cognome: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        data_di_nascita: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        }
    },
        {
            collection: 'authors'
        
        }
)

export default model('Authors', authorSchema)