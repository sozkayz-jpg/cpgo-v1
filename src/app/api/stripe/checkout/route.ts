import { stripe } from "@/lib/stripe";
import { jsonResponse, errorResponse } from "@/lib/api-utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return errorResponse("Panier vide");
    }

    const lineItems = items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      customer_email: email,
      success_url: `${req.headers.get("origin") || "http://localhost:3000"}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin") || "http://localhost:3000"}/panier`,
      metadata: {
        orderData: JSON.stringify(items),
      },
    });

    return jsonResponse({ url: session.url, id: session.id });
  } catch {
    return errorResponse("Erreur de création de session Stripe", 500);
  }
}
