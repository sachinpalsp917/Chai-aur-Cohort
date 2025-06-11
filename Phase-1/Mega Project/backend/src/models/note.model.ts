import mongoose, { Schema } from "mongoose";

export interface projectNote extends mongoose.Document {
  project: mongoose.Types.ObjectId; //ref: projectId
  createdBy: mongoose.Types.ObjectId; //ref: userId
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
const projectNoteSchema = new mongoose.Schema<projectNote>(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const ProjectNote = mongoose.model<projectNote>(
  "ProjectNote",
  projectNoteSchema,
);
export default ProjectNote;
