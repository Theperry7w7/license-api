export default function handler(req, res) {
  const { placeId, key } = req.query;

  // 1. Validaciones básicas
  if (!placeId || !key) {
    return res.status(400).json({ authorized: false });
  }

  // 2. Master key (desde Environment Variables)
  const MASTER_KEY = process.env.MASTER_KEY;

  if (!MASTER_KEY || key !== MASTER_KEY) {
    return res.status(403).json({ authorized: false });
  }

  // 3. LICENCIAS PERMITIDAS
  const LICENSES = [
    {
      placeId: "75014134442384", // TU placeId REAL
      enabled: true
      },
    {
      placeId: "106677173608616", // TU placeId REAL
      enabled: true
  },
     {
      placeId: "103616014605849", // TU placeId REAL
      enabled: true
}
  ];

  // 4. Verificación
  const licenseValid = LICENSES.some(
    lic => lic.enabled && lic.placeId === placeId
  );

  return res.json({ authorized: licenseValid });
}
