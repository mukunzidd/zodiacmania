export default class Signs {
  static async findAll(req, res) {
    try {
      const signs = await Sign.find();
      res.status(200).json({
        message: 'Success',
        data: signs,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}
