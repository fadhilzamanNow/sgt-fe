import { baseApi } from "@/app/utils/axios";
import { AxiosError } from "axios";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const authToken = req.headers.get("authorization");
    const response = await baseApi.get("/products", {
      params: {
        page: params.get("page"),
        limit: params.get("limit"),
        q: params.get("q"),
      },
      headers: {
        Authorization: authToken,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
