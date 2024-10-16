import { jwtDecode } from "jwt-decode";
import { setCookie } from "cookies-next";
import { redirect } from "next/navigation";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

//interception
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined | any
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? process.env.URL_SERVER_API
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  // handle token invalid
  if (options?.headers?.token) {
    const token = options?.headers?.token.split(" ")[1];
    const decoded: any = jwtDecode(token);
    let now = new Date();

    // expire token
    if (decoded.exp < now.getTime() / 1000 + 30) {
      // client side
      if (typeof window !== "undefined") {
        // refresh token client side
        const response: any = await fetch(
          `${process.env.URL_SERVER_API}/user/refresh`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          }
        );

        const result = await response.json();
        if (result?.success) {
          // refresh token success
          localStorage.setItem("token", result.accessToken);

          const response = await fetch(fullUrl, {
            ...options,
            headers: {
              ...baseHeaders,
              token: `Bearer ${result.accessToken}`,
            },
            cache: "no-cache",
            body,
            method,
          });

          return await response.json();
        } else {
          // refresh token failed || handle logout
          localStorage.removeItem("token");
          await fetch("/api/user", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          });

          setCookie("name", "");
          await fetch(`${process.env.URL_SERVER_API}/user/logout`, {
            method: "POST",
            credentials: "include",
          });

          window.location.href = "/";

          return;
        }
      } else {
        return redirect(`/logout?token=${token}`);
      }
    }
  }

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    cache: "no-cache",
    body,
    method,
  });

  const payload = await response.json();

  return payload;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    // body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
