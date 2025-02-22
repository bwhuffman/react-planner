export type Region<T = any> = {
  id: string;
  channelId: string;
  label: string;
  start: Date;
  end: Date;
  color?: string;
  hidden?: boolean;
  selected?: boolean;
  data?: T;
};
