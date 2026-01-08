export default function handler(req, res) {
  const { placeId, ownerId, key } = req.query;

  return res.json({
    received: {
      placeId: placeId,
      ownerId: ownerId,
      key: key
    },
    envKeyExists: !!process.env.MASTER_KEY,
    envKeyValue: process.env.MASTER_KEY || null
  });
}

