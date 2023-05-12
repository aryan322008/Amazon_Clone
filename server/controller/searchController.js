import itemModal from "../models/itemModel.js";
import userModal from "../models/userModal.js";
import searchModal from "../models/searchModal.js";

const getSearchItems = async (req, res) => {
  const { search_text, page } = req.query;

  try {
    const user = await userModal.findById(req.user);

    const filteredItems = await itemModal.find({
      $text: {
        $search: `${search_text}`,
      },
    });

    if (!req.user) {
      res.send(filteredItems);
    }

    const searchUser = await searchModal.findOne({ user: req.user });

    if (!searchUser) {
      const created_search = await searchModal.create({
        user: user._id,
        search_items: [...filteredItems],
        searchTxt: search_text,
        totalSearchItems: filteredItems.length,
      });

      const final_searched_items = await searchModal
        .find({ _id: created_search._id }, { search_items: { $slice: [0, 1] } })
        .populate({ path: "search_items" });

      if (!final_searched_items.search_items.length) {
        res.send({ ...final_searched_items, search_items: "no items found" });
      } else {
        res.send(final_searched_items);
      }
    } else {
      const searchItem = await searchModal.findByIdAndUpdate(
        searchUser._id,
        {
          search_items: filteredItems,
          searchTxt: search_text,
          totalSearchItems: filteredItems.length,
        },
        { new: true }
      );

      const final_searched_items = await searchModal
        .findOne(
          { _id: searchItem._id },
          { search_items: { $slice: [Number(page) - 1, Number(page)] } }
        )
        .populate({ path: "search_items" });

      console.log(final_searched_items._id, page);

      if (!searchItem.search_items.length) {
        res.send({ ...final_searched_items, search_items: "no items found" });
      } else {
        res.send(final_searched_items);
      }
    }
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "internal error" }] });
  }
};

const fetchSearchItems = async (req, res) => {
  const { search_text, page } = req.query;

  try {
    const user = await userModal.findById(req.user);

    if (!user) {
      const filteredItems = await itemModal.find(
        {
          $text: {
            $search: `${search_text}`,
          },
        },
        { search_items: { $slice: [page - 1, page] } }
      );

      if (!filteredItems.search_items.length) {
        res.send({ ...filteredItems, search_items: "no items found" });
      } else {
        res.send({
          search_items: filteredItems,
          searchText: search_text,
          totalSearchItems: filteredItems.length,
        });
      }
    } else {
      const final_searched_items = await searchModal
        .find({ user: req.user }, { search_items: { $slice: [0, 1] } })
        .populate({ path: "search_items" });

      res.send(final_searched_items);
    }
  } catch (error) {
    return res.status(404).json({ errors: [{ msg: "internal error" }] });
  }
};

export { getSearchItems, fetchSearchItems };

//slicing
