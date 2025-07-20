/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_API_ENDPOINT } from "./config/data";
import { ApiResponse } from "./types/api";

interface Howl {
  link: string;
  method?: "get" | "post" | "delete" | "put" | "patch";
  content?:
    | "json"
    | "text"
    | "html"
    | "xml"
    | "form"
    | "multipart"
    | "javascript"
    | "css"
    | "png"
    | "jpeg"
    | "gif"
    | "pdf";
  data?: any;
  auth?: "bearer" | "basic" | "digest" | "apiKey" | "awsSignature" | "custom";
  token?: string;
  mode?: "cors" | "no-cors" | "same-origin";
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  credentials?: "omit" | "same-origin" | "include";
  redirect?: "follow" | "manual" | "error";
  referrerPolicy?:
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  integrity?: string;
}

const options = {
  type: {
    json: "application/json",
    text: "text/plain",
    html: "text/html",
    xml: "application/xml",
    form: "application/x-www-form-urlencoded",
    multipart: "multipart/form-data",
    javascript: "application/javascript",
    css: "text/css",
    png: "image/png",
    jpeg: "image/jpeg",
    gif: "image/gif",
    pdf: "application/pdf",
  },
  auth: {
    bearer: "Bearer",
    basic: "Basic",
    digest: "Digest",
    apiKey: "Api-Key",
    awsSignature: "",
    custom: "CustomScheme",
  },
};

export default async function howl<T = any>({
  link,
  method = "get",
  data = null,
  auth = "bearer",
  content = "json",
  token,
  mode = "cors",
  cache = "default",
  credentials = "same-origin",
  redirect = "follow",
  referrerPolicy = "strict-origin-when-cross-origin",
  integrity = "",
}: Howl): Promise<ApiResponse<T>> {
  try {
    if (!link) {
      return {
        success: false,
        message: "Missing required 'link' parameter.",
        data: null as any,
      };
    }

    const headers: HeadersInit = {
      "Content-Type": options.type[content] || "application/json",
    };

    if (token) {
      headers["Authorization"] = `${options.auth[auth] || "Bearer"} ${token}`;
    }

    const body: BodyInit | null =
      data && content === "json" ? JSON.stringify(data) : data;

    const call = await fetch(`${BASE_API_ENDPOINT}${link}`, {
      method: method.toUpperCase(),
      mode,
      cache,
      credentials,
      redirect,
      referrerPolicy,
      integrity,
      headers,
      body,
    });

    const json = (await call.json()) as ApiResponse<T>;

    return json;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error during request:", error.message);
      return {
        success: false,
        message: error.message,
        data: null as any,
      };
    }
    return {
      success: false,
      message: "Unknown error",
      data: null as any,
    };
  }
}
