const getConversationId = (senderId: string, recipientId: string) =>
  senderId > recipientId
    ? `${senderId + recipientId}`
    : `${recipientId + senderId}`;

export default getConversationId;
