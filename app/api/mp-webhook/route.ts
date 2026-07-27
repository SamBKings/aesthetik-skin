import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // MP sends different event types; we only care about payments
    if (body.type !== "payment") {
      return NextResponse.json({ ok: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) return NextResponse.json({ ok: true });

    const paymentClient = new Payment(client);
    const payment = await paymentClient.get({ id: paymentId });

    // Only process approved payments
    if (payment.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    // Log order details — visible in Vercel logs
    console.log("=== NUEVO PEDIDO APROBADO ===");
    console.log("ID de pago:", payment.id);
    console.log("Total:", payment.transaction_amount, payment.currency_id);
    console.log("Comprador:", payment.payer?.email);
    console.log("Método de pago:", payment.payment_type_id, payment.payment_method_id);
    console.log("Productos:", JSON.stringify(payment.additional_info?.items, null, 2));
    console.log("============================");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[mp-webhook]", err);
    // Always return 200 so MP doesn't retry endlessly
    return NextResponse.json({ ok: true });
  }
}

// MP sends GET to verify the endpoint exists
export async function GET() {
  return NextResponse.json({ status: "ok" });
}
