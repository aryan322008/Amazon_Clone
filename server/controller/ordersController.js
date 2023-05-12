import userModal from "../models/userModal.js";
import ordersModal from "../models/ordersModal.js";
import currentOrdersModal from "../models/currentOrdersModal.js";

const addOrdersInHistory = async (req, res) => {
  const user = req.user;
  const ordersObj = req.body;

  const full_user = await userModal.findById(req.user);

  if (!full_user) {
    res.status(404).send({ message: "User not found" });
  }

  const orderedUser = await ordersModal.findOne({ user });

  if (!orderedUser) {
    const created_order = await ordersModal.create({
      user,
      orders: {
        ...ordersObj,
      },
    });

    const order = ordersModal
      .findById(created_order._id)
      .populate({ path: "orders.products.item" });

    res.send({ name: full_user.name, orders: order });
  } else {
    const order = await ordersModal.findByIdAndUpdate(
      orderedUser._id,
      {
        $push: {
          orders: {
            ...ordersObj,
          },
        },
      },
      { new: true }
    ) .populate({ path: "orders.products.item" });
    res.send({ name: user.name, orders: order.orders });
  }
};

const addOrdersInCurrent = async (req, res) => {
  const user = req.user;
  const ordersArray = req.body;

  const full_user = await userModal.findById(req.user);

  if (!full_user) {
    res.status(404).send({ message: "User not found" });
  }

  const orderedUser = await currentOrdersModal.findOne({ user });

  if (!orderedUser) {
    const created_order = await currentOrdersModal.create({
      user,
      orders: [...ordersArray],
    });

    const order = await currentOrdersModal
      .findById(created_order._id)
      .populate({ path: "orders.item" });

    res.send(order.orders);
  } else {
    const order = await currentOrdersModal
      .findByIdAndUpdate(
        orderedUser._id,
        {
          orders: ordersArray,
        },
        { new: true }
      )
      .populate({ path: "orders.item" });

    res.send(order.orders);
  }
};

const fecthOrders = async (req, res) => {
  const user = req.user;

  const orders = await currentOrdersModal
    .findOne({ user })
    .populate({ path: "orders.item" });

  res.send(orders.orders);
};

const fetchOrdersInHistory = async (req, res) => {
  const user = req.user;

  const full_user = await userModal.findById(req.user);

  if (!full_user) {
    res.status(404).send({ message: "User not found" });
  }

  const order = await ordersModal
    .findOne({ user })
    .populate({ path: "orders.products.item" });

    res.send({ name: full_user.name, orders: order.orders });
}

export { addOrdersInHistory, addOrdersInCurrent, fecthOrders, fetchOrdersInHistory };
