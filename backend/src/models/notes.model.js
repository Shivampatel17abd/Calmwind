
import mongoose, { Schema } from "mongoose";

const noteSchema = mongoose.Schema({
     userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
      note:{
        type: String,
        required: true,
        trim: true,
      }  

},{
        timestamps: true,
    }
)

export const notes = mongoose.model('Notes',noteSchema);