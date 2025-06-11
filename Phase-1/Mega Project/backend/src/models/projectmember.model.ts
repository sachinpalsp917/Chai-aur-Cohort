import mongoose, { Schema } from "mongoose";
import { AvailableUserRoles, UserRoles } from "../constants/interfaces";

export interface ProjectMemberDocument extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  project: mongoose.Schema.Types.ObjectId;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
}
const ProjectMemberSchema = new mongoose.Schema<ProjectMemberDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRoles.MEMBER,
    },
  },
  { timestamps: true },
);

const ProjectMember = mongoose.model<ProjectMemberDocument>(
  "ProjectMember",
  ProjectMemberSchema,
);
export default ProjectMember;
