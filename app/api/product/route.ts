import { baseApi } from "@/app/utils/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const response = await baseApi.get("/product", {
      params: { product_id: params.get("product_id") },
    });
    return NextResponse.json(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message);
    }
  }
}
