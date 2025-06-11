import mongoose, { Schema } from "mongoose";

export interface ProjectDocument extends mongoose.Document {
  name: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const projectSchema = new mongoose.Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Project = mongoose.model<ProjectDocument>("Project", projectSchema);
export default Project;
