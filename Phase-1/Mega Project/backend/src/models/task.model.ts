import mongoose from "mongoose";
import { AvailableTaskStatuses, TaskStatus } from "../constants/interfaces";

interface Attachment {
  url: string;
  mimetype: string;
  size: number;
}

export interface TaskDocument extends mongoose.Document {
  title: string;
  description: string;
  project: mongoose.Types.ObjectId;
  assignedTo: mongoose.Types.ObjectId;
  assignedBy: mongoose.Types.ObjectId;
  status: TaskStatus;
  attachments: Attachment[];
  createdAt: Date;
  updatedAt: Date;
}

const AttachmentSchema = new mongoose.Schema<Attachment>({
  url: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
});

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatuses,
      default: TaskStatus.TODO,
    },
    attachments: {
      type: [AttachmentSchema],
      default: [],
    },
  },
  { timestamps: true },
);

const Task = mongoose.model<TaskDocument>("Task", taskSchema);
export default Task;
