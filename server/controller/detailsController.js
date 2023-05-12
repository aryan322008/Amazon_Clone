import itemModal from "../models/itemModel.js";

const productDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await itemModal
      .findById(id)
      .then((response) => {
        res.send(response);
      })
      .catch((error) => {
        return res
          .status(404)
          .json({ errors: [{ msg: "product doesn't exists" }] });
      });
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "internal error" }] });
  }
};

export { productDetails };
