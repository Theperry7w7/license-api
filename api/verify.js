export default async function handler(req, res) {
  const { placeId, key } = req.query;

  // 🔐 Variables secretas (Vercel)
  const MASTER_KEY = process.env.MASTER_KEY;
  const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

  // ❌ Validación básica
  if (!placeId || !key || !MASTER_KEY || key !== MASTER_KEY) {
    return res.json({ authorized: false });
  }

  // 🔒 LICENCIAS AUTORIZADAS
  const LICENSES = [
    {
      placeId: "75014134442384", // TU PlaceId autorizado
      enabled: false
    }

    // 👉 Ejemplo para otro cliente:
    // { placeId: "123456789", enabled: true }
  ];

  const license = LICENSES.find(
    l => l.placeId === String(placeId)
  );

  const authorized = license && license.enabled === true;

  // 🚨 ALERTA A DISCORD SI NO ESTÁ AUTORIZADO
  if (!authorized && DISCORD_WEBHOOK) {
    try {
      const gameUrl = `https://www.roblox.com/games/${placeId}`;

      await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "🚨 INTENTO DE USO NO AUTORIZADO",
              color: 16711680,
              fields: [
                { name: "PlaceId", value: String(placeId), inline: true },
                { name: "Juego", value: gameUrl }
              ],
              footer: {
                text: "Sistema de Licencias - Theperry7u6"
              },
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    } catch (err) {
      // ❗ Si Discord falla, NO romper la API
    }
  }

  return res.json({ authorized });
}
