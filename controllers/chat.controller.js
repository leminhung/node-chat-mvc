module.exports = {
  message: async (req, res, next) => {
    const { msg } = req.query;
    _io.emit("chat message", msg);

    return res.status(200).json({ msg });
  },
};
