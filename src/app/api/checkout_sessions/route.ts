import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/core/server";
import { getUserById } from "@/lib/api/users";

const SUBSCRIPTION_PRICE_ID =
  process.env.STRIPE_VENDOR_PRICE_ID || "price_1UeGel3QUIN76AIOxsdAEIg6";

export async function POST() {
  try {
    const headersList = await headers();
    const origin =
      headersList.get("origin") ||
      process.env.BETTER_AUTH_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    let sessionData;
    try {
      sessionData = await getSession();
    } catch {
      return NextResponse.json(
        { error: "Unauthorized: Session not found" },
        { status: 401 }
      );
    }

    const userId = sessionData?.user?.id;
    const userEmail = sessionData?.user?.email;

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Please log in first" },
        { status: 401 }
      );
    }

    const dbUser = await getUserById(userId);
    if (Boolean(dbUser?.isBlocked || dbUser?.blocked)) {
      return NextResponse.json(
        {
          code: "BLOCKED",
          error: "Your account has been blocked by an admin.",
        },
        { status: 403 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail || dbUser?.email || undefined,
      line_items: [
        {
          price: SUBSCRIPTION_PRICE_ID,
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