declare global {
  interface Window {
    readonly history: History & {
      state?: {
        idx?: number;
      };
    };
  }
}
