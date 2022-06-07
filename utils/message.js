const generateMessage = ({ name, message }) => {
  return {
    name,
    message,
    createdAt: Date.now(),
  };
};

module.exports = {
  generateMessage,
};
