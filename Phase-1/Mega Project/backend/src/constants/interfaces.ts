export enum UserRoles {
  ADMIN = "admin",
  PROJECT_ADMIN = "project_admin ",
  MEMBER = "member",
}

export const AvailableUserRoles = Object.values(UserRoles);

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export const AvailableTaskStatuses = Object.values(TaskStatus);
