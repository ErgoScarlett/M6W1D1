import { Schema, model } from 'mongoose'


const postSchema = new Schema(
    {
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        cover: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
          },
        readTime: {
            value: {
                type: Number,
                required: true,
            },
            unit: {
                type: String,
                required: true,
            }
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Author"
        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: "Comment" 
        }]
        },
        { collection: "posts" }
    )

export default model('Post', postSchema, 'posts')