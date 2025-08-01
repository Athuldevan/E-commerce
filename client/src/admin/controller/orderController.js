import axios from "axios";
import { fetchUsers } from "../../api/services/userService";
import BASE_URL from "../../api/BASE_URL";

// Total orders count
export async function totalOrders() {
  let totalOrdersCount = 0;

  const allUsers = await fetchUsers();
  const users = allUsers?.filter((user) => user?.role === "user");
  totalOrdersCount = users?.reduce(
    (acc, currUser) => acc + currUser?.orders?.length,
    0
  );
  return totalOrdersCount;
}
// get all ORDERED ITEMS
export async function getAllOrderedItems() {
  const allUsers = await fetchUsers();
  const users = allUsers?.filter((user) => user?.role === "user");
  const allOrders = users?.flatMap((user) =>
    user?.orders
      .map((order) => ({
        deliveredAt: order.deliveredAt,
        total: order.total,
        orderID: order.orderID,
        date: order.date,
        items: order.items,
        status: order.status,
        userID: order.userID,
      }))
      .flat(2)
  );
  return allOrders;
}

export async function cancelOrder(orderID) {
  const allUsers = await fetchUsers();
  const user = allUsers.find(
    (user) =>
      user.role === "user" && user?.orders?.find((order) => order.id === orderID)
  );
  const userID = user.id; // user id of the user who placerd the order;   

  const updatedOrders = user?.orders?.map((order) =>
    order.id === orderID ? { ...order, status: "cancelled" } : order
  );
  return await axios.put(`${BASE_URL}/users/${userID}`, {
    ...user,
    orders: updatedOrders,
  });
}
