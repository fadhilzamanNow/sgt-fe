import { baseApi } from "@/app/utils/axios";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const authToken = req.headers.get("authorization");
    const response = await baseApi.get("/product", {
      params: { product_id: params.get("product_id") },
      headers: {
        Authorization: authToken,
      },
    });
    return NextResponse.json(response.data);
  } catch (err) {
    if (err instanceof AxiosError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const authToken = req.headers.get("authorization");
  try {
    const response = await baseApi.post("/product", body, {
      headers: {
        Authorization: authToken,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const params = req.nextUrl.searchParams;
  const authToken = req.headers.get("authorization");
  try {
    const response = await baseApi.put("/product", body, {
      params: { product_id: params.get("product_id") },
      headers: {
        Authorization: authToken,
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
