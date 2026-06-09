export interface Task {
  id: number;
  title: string;
  completed: boolean;
  editing?: boolean; // Propiedad opcional para indicar si la tarea está en modo edición
}