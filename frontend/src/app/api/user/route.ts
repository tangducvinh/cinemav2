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

export const PUT = async (request: Request) => {
  return Response.json("success", {
    status: 200,
    headers: {
      "Set-Cookie": `token=''; Path=/; HttpOnly`,
      // "Set-Cookie": `token=delete`,
    },
  });
};
