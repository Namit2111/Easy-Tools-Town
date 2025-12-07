declare module 'mammoth/mammoth.browser' {
  export const extractRawText: (input: { arrayBuffer: ArrayBuffer }) => Promise<{ value: string }>;
}

