import { baseApi } from "@/app/utils/axios";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await baseApi.get("/products");
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }
  }
}
