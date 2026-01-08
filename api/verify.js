export default function handler(req, res) {
  const { placeId, ownerId, key } = req.query;

  const MASTER_KEY = process.env.MASTER_KEY;

  if (!placeId || !ownerId || !key) {
    return res.status(400).json({ authorized: false, reason: "missing_params" });
  }

  if (!MASTER_KEY || key !== MASTER_KEY) {
    return res.json({ authorized: false, reason: "invalid_key" });
  }

  // ⚠️ NORMALIZAR A STRING (ESTA ERA LA CLAVE)
  const pId = String(placeId);
  const oId = String(ownerId);

  const LICENSES = [
    {
      placeId: "75014134442384",
      ownerId: "8164725133",
      enabled: true
    }
    // aquí agregas más clientes
  ];

  const licenseValid = LICENSES.some(lic =>
    lic.enabled === true &&
    lic.placeId === pId &&
    lic.ownerId === oId
  );

  return res.json({
    authorized: licenseValid
  });
}
