const generateMessage = ({ name, message }) => {
  return {
    username: name,
    text: message,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMessage,
};
