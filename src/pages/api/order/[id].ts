import { NextApiRequest, NextApiResponse } from "next";

// API handler function
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query; // Get the ID from the URL

    if (req.method === "PUT") {
        // Simulate updating an order
        return res.status(200).json({ message: `Order ${id} updated successfully!` });
    }

    // Handle other HTTP methods
    return res.status(405).json({ error: "Method Not Allowed" });
}
