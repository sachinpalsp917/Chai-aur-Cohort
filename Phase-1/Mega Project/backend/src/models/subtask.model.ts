import mongoose, { mongo } from "mongoose";

export interface subTaskDocument extends mongoose.Document {
  title: string;
  task: mongoose.Types.ObjectId;
  isCompleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
const subtaskSchema = new mongoose.Schema<subTaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const subTask = mongoose.model<subTaskDocument>("SubTask", subtaskSchema);
export default subTask;
