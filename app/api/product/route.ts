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

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const response = await baseApi.post("/product", body);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const params = req.nextUrl.searchParams;
  try {
    const response = await baseApi.put("/product", body, {
      params: { product_id: params.get("product_id") },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
