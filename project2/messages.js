const messages = [];

function addMessage(username, text) {
  messages.push({
    id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
    username,
    text,
    timestamp: Date.now(),
  });
}

function getMessagesAfterId(lastMessageId = 0) {
  return messages.filter((message) => message.id > lastMessageId);
}
  
function getLatestMessageId() {
  if (messages.length === 0) {
    return 0;
}
  return messages[messages.length - 1].id;
}

module.exports = {
  addMessage,
  getMessagesAfterId,
  getLatestMessageId,
};
