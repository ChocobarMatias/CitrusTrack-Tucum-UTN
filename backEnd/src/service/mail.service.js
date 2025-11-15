const nodemailer = require('nodemailer');// libreria para enviar emails
const dotenv = require('dotenv');// para leer variables de entorno
dotenv.config(); // inicializar dotenv

 // configuracion del transporter de nodemailer

 const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587 || 465,
    secure: false, // esto sirve para que no falle con port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// Mail 1 – Confirmación de COMPRA (nuevo)

const enviarConfirmacionCompra = async (email, detallesPedido) => {
  const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 25px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #2e7d32;">
      
      <h2 style="color: #2e7d32; margin-bottom: 10px; font-weight: 700;">
        Compra Confirmada ✔
      </h2>

      <p style="color: #444; font-size: 15px;">
        Estimado/a,<br><br>
        Su compra fue registrada exitosamente. A continuación le dejamos el resumen:
      </p>

      <ul style="background: #fafafa; padding: 15px; border: 1px solid #eee; border-radius: 8px;
                 font-size: 15px; color: #333;">
        <li><strong>ID del Pedido:</strong> ${detallesPedido.idPedido}</li>
        <li><strong>Producto:</strong> ${detallesPedido.producto}</li>
        <li><strong>Cantidad:</strong> ${detallesPedido.cantidad}</li>
        <li><strong>Total:</strong> $${detallesPedido.precioTotal}</li>
        <li><strong>Fecha:</strong> ${detallesPedido.fechaPedido}</li>
      </ul>

      <p style="color: #444; margin-top: 15px;">
        En breve comenzaremos a preparar su pedido. Le avisaremos cuando esté en camino.
      </p>

      <p style="color: #2e7d32; font-weight: 700; margin-top: 20px;">
        CitrusTrack – Gestión Inteligente de Logística Agrícola
      </p>
      <p style="font-size: 13px; color: #777;">UTN – Facultad Regional Tucumán</p>
    </div>
  </div>`;

  return transporter.sendMail({
    from: `"CitrusTrack" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Compra Confirmada – CitrusTrack",
    html,
  });
};

// Mail 2 – Pedido EN CAMINO (nuevo)

const enviarPedidoEnCamino = async (email, detallesPedido) => {
  const html = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 25px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-left: 6px solid #f4b400;">
      
      <h2 style="color: #f4b400; margin-bottom: 10px; font-weight: 700;">
        ¡Tu pedido está en camino! 🚚
      </h2>

      <p style="color: #444; font-size: 15px;">
        Su pedido salió del centro logístico y se encuentra en tránsito.
      </p>

      <ul style="background: #fafafa; padding: 15px; border: 1px solid #eee; border-radius: 8px;
                 font-size: 15px; color: #333;">
        <li><strong>ID Pedido:</strong> ${detallesPedido.idPedido}</li>
        <li><strong>Producto:</strong> ${detallesPedido.producto}</li>
        <li><strong>Cantidad:</strong> ${detallesPedido.cantidad}</li>
        <li><strong>Chofer:</strong> ${detallesPedido.chofer}</li>
        <li><strong>Unidad:</strong> ${detallesPedido.unidad}</li>
        <li><strong>ETA (estimado):</strong> ${detallesPedido.eta}</li>
      </ul>

      <p style="color: #444; margin-top: 15px;">
        Podrá ver el progreso del envío en cuanto esté disponible.
      </p>

      <p style="color: #2e7d32; font-weight: 700; margin-top: 20px;">
        CitrusTrack – Gestión Inteligente de Logística Agrícola
      </p>
      <p style="font-size: 13px; color: #777;">UTN – Facultad Regional Tucumán</p>
    </div>
  </div>`;

  return transporter.sendMail({
    from: `"CitrusTrack" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Tu pedido está en camino – CitrusTrack",
    html,
  });
};

// Mail 3 – Confirmación de recepción (tu mail actual, revisado)

const enviarConfirmacionRecepcionPedido = async (email, detallesPedido) => {  
  const htmlTemplate = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6f7; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; padding: 25px; 
                box-shadow: 0 4px 12px rgba(0,0,0,0.08); border-left: 6px solid #2e7d32;">
        
      <h2 style="color: #2e7d32; margin-bottom: 10px; font-weight: 700;">
        Recepción Confirmada ✔
      </h2>

      <p style="color: #444; font-size: 15px;">
        Estimado/a,<br><br>
        Confirmamos que su pedido fue recibido correctamente. Aquí tiene el detalle:
      </p>

      <ul style="background: #fafafa; padding: 15px; border: 1px solid #eee; border-radius: 8px;
                 font-size: 15px; color: #333;">
        <li><strong>Producto:</strong> ${detallesPedido.producto}</li>
        <li><strong>Cantidad:</strong> ${detallesPedido.cantidad}</li>
        <li><strong>Precio Total:</strong> $${detallesPedido.precioTotal}</li>
        <li><strong>Fecha del Pedido:</strong> ${detallesPedido.fechaPedido}</li>
      </ul>

      <p style="color: #444; margin-top: 20px;">
        Gracias por confiar en CitrusTrack.
      </p>

      <p style="color: #2e7d32; font-weight: 700; margin-top: 25px;">
        CitrusTrack – Gestión Inteligente de Logística Agrícola
      </p>
      <p style="font-size: 13px; color: #777;">UTN – Facultad Regional Tucumán</p>
    </div>
  </div>
  `;

  return transporter.sendMail({
    from: `"CitrusTrack" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Recepción Confirmada – CitrusTrack",
    html: htmlTemplate
  });
};

// Export final


module.exports = {enviarConfirmacionCompra,enviarPedidoEnCamino, enviarConfirmacionRecepcionPedido,}