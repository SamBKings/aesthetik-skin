import { NextRequest, NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json() as {
      items: { id: string; title: string; quantity: number; unitPrice: number; image?: string }[];
    };

    if (!items?.length) {
      return NextResponse.json({ error: "No hay productos en el carrito" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aesthetikskin.com";

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: items.map(item => ({
          id: item.id,
          title: item.title,
          quantity: item.quantity,
          unit_price: item.unitPrice,
          currency_id: "MXN",
          picture_url: item.image ? `${siteUrl}${item.image}` : undefined,
        })),
        back_urls: {
          success: `${siteUrl}/pago/exito`,
          failure: `${siteUrl}/pago/error`,
          pending: `${siteUrl}/pago/exito?status=pending`,
        },
        auto_return: "approved",
        notification_url: `${siteUrl}/api/mp-webhook`,
        statement_descriptor: "Aesthetik Skin",
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
      },
    });

    return NextResponse.json({ initPoint: result.init_point });
  } catch (err) {
    console.error("[mp-checkout]", err);
    return NextResponse.json({ error: "Error al crear preferencia de pago" }, { status: 500 });
  }
}
