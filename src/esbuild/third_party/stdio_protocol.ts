const encoder = new TextEncoder()
const decoder = new TextDecoder()
export const encodeUTF8: (text: string) => Uint8Array = text => encoder.encode(text)
export const decodeUTF8: (bytes: Uint8Array) => string = bytes => decoder.decode(bytes)
