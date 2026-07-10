import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req) => {
    try {
      const booking = await req.json();

      const token = Deno.env.get("PUSHOVER_API_TOKEN");
      const user = Deno.env.get("PUSHOVER_USER_KEY");

      const services = Array.isArray(booking.services)
        ? booking.services.join(", ")
        : booking.services;

      const message =
`🚗 New Booking

Customer: ${booking.name}
Registration: ${booking.registration}
Vehicle: ${booking.vehicle}

Services:
${services}

Date:
${booking.date}

Notes:
${booking.notes || "None"}
`;

      const response = await fetch(
        "https://api.pushover.net/1/messages.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            token,
            user,
            title: "OB Autos",
            message,
          }),
        }
      );

      const result = await response.json();

      console.log(result);

      return Response.json(result);

    } catch (err) {
      console.error(err);

      return Response.json(
        {
          success: false,
          error: err.message,
        },
        {
          status: 500,
        }
      );
    }
  }),
};