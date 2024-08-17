import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const res = await request.json();
  const accessToken = res.data.accessToken;

  return Response.json(res.data, {
    status: 200,
    headers: {
      "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly`,
    },
  });
};
