import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailPayload {
  type: "welcome" | "reset_password" | "car_alert";
  to: string;
  data?: Record<string, string>;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = "noreply@aportucoche.com";
const FROM_NAME = "aportucoche.com";

function buildWelcomeEmail(to: string, data: Record<string, string>) {
  return {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [to],
    subject: "¡Bienvenido a aportucoche.com!",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: #1E2A38; padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
              aportu<span style="color: #4CAF50;">coche</span><span style="color: rgba(255,255,255,0.3); font-weight: 400; font-size: 14px;">.com</span>
            </h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1E2A38; margin: 0 0 16px; font-size: 24px;">¡Hola, ${data.name || ""}!</h2>
            <p style="color: #555; line-height: 1.6; margin: 0 0 24px;">
              Tu cuenta en <strong>aportucoche.com</strong> ha sido creada con éxito. Ahora puedes:
            </p>
            <ul style="color: #555; line-height: 2; padding-left: 20px; margin: 0 0 32px;">
              <li>Guardar tus coches favoritos</li>
              <li>Crear búsquedas personalizadas</li>
              <li>Recibir alertas de nuevos chollos</li>
              <li>Acceder a valoraciones con IA</li>
            </ul>
            <a href="https://aportucoche.com/coches"
              style="display: inline-block; background: #1E2A38; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Empezar a buscar coches
            </a>
          </div>
          <div style="background: #f8f9fa; padding: 20px 40px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Has recibido este email porque te registraste en aportucoche.com.<br>
              Si no fuiste tú, ignora este mensaje.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

function buildResetEmail(to: string, data: Record<string, string>) {
  return {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [to],
    subject: "Recupera tu contraseña - aportucoche.com",
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: #1E2A38; padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
              aportu<span style="color: #4CAF50;">coche</span><span style="color: rgba(255,255,255,0.3); font-weight: 400; font-size: 14px;">.com</span>
            </h1>
          </div>
          <div style="padding: 40px;">
            <h2 style="color: #1E2A38; margin: 0 0 16px; font-size: 24px;">Recupera tu contraseña</h2>
            <p style="color: #555; line-height: 1.6; margin: 0 0 24px;">
              Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón de abajo para crear una nueva contraseña.
            </p>
            <a href="${data.reset_url || '#'}"
              style="display: inline-block; background: #1E2A38; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Restablecer contraseña
            </a>
            <p style="color: #999; font-size: 13px; margin: 24px 0 0;">
              Este enlace expira en 1 hora. Si no solicitaste el cambio de contraseña, ignora este email.
            </p>
          </div>
          <div style="background: #f8f9fa; padding: 20px 40px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Si el botón no funciona, copia este enlace en tu navegador:<br>
              <span style="color: #1E2A38;">${data.reset_url || ''}</span>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

function buildCarAlertEmail(to: string, data: Record<string, string>) {
  return {
    from: `${FROM_NAME} <${FROM_EMAIL}>`,
    to: [to],
    subject: `Nuevo chollo encontrado: ${data.car_title || 'Coche nuevo'} - aportucoche.com`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; margin: 0; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
          <div style="background: #1E2A38; padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: -0.5px;">
              aportu<span style="color: #4CAF50;">coche</span><span style="color: rgba(255,255,255,0.3); font-weight: 400; font-size: 14px;">.com</span>
            </h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 14px;">Alerta de nueva oferta</p>
          </div>
          <div style="padding: 40px;">
            <div style="background: #E8F5E9; border: 1px solid #C8E6C9; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
              <p style="color: #2E7D32; font-weight: 700; margin: 0; font-size: 15px;">¡Nuevo chollo para tu búsqueda "${data.search_name || ''}"!</p>
            </div>
            <h2 style="color: #1E2A38; margin: 0 0 8px; font-size: 20px;">${data.car_title || ''}</h2>
            <p style="font-size: 28px; font-weight: 900; color: #1E2A38; margin: 0 0 16px;">${data.car_price || ''} €</p>
            ${data.car_image ? `<img src="${data.car_image}" alt="${data.car_title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px; object-fit: cover; max-height: 200px;">` : ''}
            <div style="display: flex; gap: 12px; margin-bottom: 24px;">
              ${data.car_year ? `<span style="background: #f1f5f9; color: #64748b; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${data.car_year}</span>` : ''}
              ${data.car_km ? `<span style="background: #f1f5f9; color: #64748b; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${data.car_km} km</span>` : ''}
              ${data.car_province ? `<span style="background: #f1f5f9; color: #64748b; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${data.car_province}</span>` : ''}
            </div>
            <a href="${data.car_url || 'https://aportucoche.com/coches'}"
              style="display: inline-block; background: #4CAF50; color: white; padding: 14px 32px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px;">
              Ver este coche
            </a>
          </div>
          <div style="background: #f8f9fa; padding: 20px 40px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              Recibiste este email porque activaste alertas para la búsqueda "${data.search_name || ''}" en aportucoche.com.<br>
              Puedes desactivar las alertas desde tu <a href="https://aportucoche.com/dashboard" style="color: #1E2A38;">panel de usuario</a>.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: EmailPayload = await req.json();
    const { type, to, data = {} } = payload;

    if (!to || !type) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let emailBody: Record<string, unknown>;

    switch (type) {
      case "welcome":
        emailBody = buildWelcomeEmail(to, data);
        break;
      case "reset_password":
        emailBody = buildResetEmail(to, data);
        break;
      case "car_alert":
        emailBody = buildCarAlertEmail(to, data);
        break;
      default:
        return new Response(
          JSON.stringify({ error: `Unknown email type: ${type}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    });

    const result = await response.json();

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal server error", message: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
