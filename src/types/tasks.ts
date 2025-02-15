export type Task = {
  id: string;
  label: string;
  start: Date;
  end: Date;
  hidden?: boolean;
  selected?: boolean;
};
