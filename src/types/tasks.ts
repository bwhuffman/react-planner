export type Task = {
  id: string;
  label: string;
  start: Date;
  end: Date;
  color?: string;
  hidden?: boolean;
  selected?: boolean;
};
