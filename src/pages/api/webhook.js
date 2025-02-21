export default function handler(req, res) {
    if (req.method === "POST") {
      return res.status(200).json({ message: "Webhook received!" });
    }
    res.status(405).json({ error: "Method Not Allowed" });
  }
  