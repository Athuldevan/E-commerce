import { fetchUsers } from "../../api/services/userService";

// Total orders count
export async function totalOrders() {
  let totalOrdersCount = 0;
  const allUsers = await fetchUsers();
  const users = allUsers?.filter((user) => user?.role === "user");
  totalOrdersCount = users.reduce(
    (acc, currUser) => acc + currUser.orders.length,
    0
  );
  return totalOrdersCount;
}

// Total Revenuue
export async function getRevenue() {
  const allUsers = await fetchUsers();
  const users = allUsers?.filter((user) => user?.role === "user");
  const orders = users.map((user) => user.orders);
  //   const [items] = orders;
  return 5;
}

// get all ORDERED ITEMS 
export async function getAllOrderedItems() {
  const allUsers = await fetchUsers();
  const users = allUsers?.filter((user) => user?.role === "user");
  const allOrders = users?.flatMap((user) =>
    user.orders.map((order) => ({
      deliveredAt : order.deliveredAt,
      total : order.total,
      orderID: order.id,
      date : order.date,
      items: order.items,
      status: order.status,
    })).flat(2)
  );
  return allOrders
}


