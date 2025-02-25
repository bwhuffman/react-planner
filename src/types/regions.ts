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

export type Channel<T = any> = {
  id: string;
  label?: string;
  hidden?: boolean;
  selected?: boolean;
  data?: T;
};

// temporary type for grouping regions by channel
export type Channels = {
  [key: string]: Region[];
};
