export enum BackgroundVariant {
  Ticks = "ticks",
  SubTicks = "subticks",
  Channels = "channels",
}

export type BackgroundProps = {
  variant?: BackgroundVariant;
  color?: string;
};
