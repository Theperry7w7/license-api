export default function handler(req, res) {
  const { placeId, key } = req.query;

  const MASTER_KEY = process.env.MASTER_KEY;

  if (!placeId || !key || key !== MASTER_KEY) {
    return res.json({ authorized: false });
  }

  // 🔐 LICENCIAS DEFINITIVAS
  const LICENSES = [
    {
      placeId: "75014134442384", // juego autorizado
      enabled: true
    }
  ];

  const allowed = LICENSES.some(
    lic => lic.enabled && lic.placeId === placeId
  );

  return res.json({ authorized: allowed });
}
