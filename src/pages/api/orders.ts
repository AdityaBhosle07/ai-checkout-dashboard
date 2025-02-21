import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client/edge";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Received request:", req.method);

  const { id } = req.query; // Extract the order ID from the URL

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Missing or invalid order ID" });
  }

  if (req.method === "GET") {
    try {
      console.log(`Fetching order with ID: ${id} from database...`);
      const order = await prisma.order.findUnique({
        where: { id }, // Fix: Use id as a string
      });

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Fetched order:", order);
      return res.status(200).json(order);
    } catch (error) {
      console.error("Database fetch error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "PUT") {
    try {
      console.log(`Updating order with ID: ${id}`);
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ error: "Missing required field: status" });
      }

      const updatedOrder = await prisma.order.update({
        where: { id }, // Fix: Use id as a string
        data: { status },
      });

      console.log("Updated order:", updatedOrder);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  console.log(`Method ${req.method} not allowed`);
  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}
