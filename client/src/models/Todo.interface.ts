export default interface ITodo {
  id?: number;
  section?: string;
  title: string;
  body?: string;
  pinned: boolean;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
  completed?: boolean;
  userId?: number;
}
