import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

interface LineItem {
  productId: string;
  name: string;
  qty: number;
  unitPrice: number; // MXN, already with volume discount applied
}

export async function POST(req: NextRequest) {
  try {
    const { items }: { items: LineItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Empty cart" }, { status: 400 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      currency: "mxn",
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        quantity: item.qty,
        price_data: {
          currency: "mxn",
          unit_amount: item.unitPrice * 100, // Stripe uses centavos
          product_data: {
            name: item.name,
            metadata: { productId: item.productId },
          },
        },
      })),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?cart=1`,
      locale: "es",
      custom_text: {
        submit: { message: "Tu pedido será confirmado por nuestro equipo en 24 h." },
      },
      metadata: {
        source: "aesthetik-skin",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Stripe checkout error]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
