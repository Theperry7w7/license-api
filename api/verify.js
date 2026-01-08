export default function handler(req, res) {
  const { placeId, ownerId, key } = req.query;

  const MASTER_KEY = process.env.MASTER_KEY;

  if (!placeId || !ownerId || !key) {
    return res.status(400).json({ authorized: false });
  }

  if (!MASTER_KEY || key !== MASTER_KEY) {
    return res.json({ authorized: false });
  }

  const LICENSES = [
    {
      placeId: "75014134442384",
      ownerId: "8164725133",
      enabled: true
    }
  ];

  const licenseValid = LICENSES.some(lic =>
    lic.enabled &&
    lic.placeId === placeId &&
    lic.ownerId === ownerId
  );

  return res.json({ authorized: licenseValid });
}
