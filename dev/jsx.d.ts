declare namespace JSX {
  interface IntrinsicElements {
    h1: {
      title?: string;
    };
    [tagName: string]: any;
  }
}
