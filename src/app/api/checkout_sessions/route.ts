import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    let userId: string | undefined;
    let userEmail: string | undefined;

    try {
      const sessionData = await getSession();
      userId = sessionData?.user?.id;
      userEmail = sessionData?.user?.email;
    } catch {
      return NextResponse.json(
        { error: "Unauthorized: Session not found" },
        { status: 401 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in first" },
        { status: 401 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail || undefined,
      line_items: [
        {
          price: "price_1UeGel3QUIN76AIOxsdAEIg6",
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        userId,
      },
      success_url: `${origin}/dashboard/vendor/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/vendor/subscription?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}