export interface Encoder {
  encode(data: Record<string, unknown>): Promise<string>
}
