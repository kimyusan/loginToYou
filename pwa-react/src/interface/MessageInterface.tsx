export interface MessageInterface {
  messageId: number | null;
  type: string | null;
  roomId: string | null;
  sendUserId: string | null;
  message: string | null;
  contentType: string | null;
  createdAt: string | null;
  readCount: boolean | true;
}
