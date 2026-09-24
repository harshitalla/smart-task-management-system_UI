export interface Task {
  id?: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  deadline: string;
  assigned_to?: number;
  assigned_user?: string;
}
