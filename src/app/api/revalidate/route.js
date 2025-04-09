import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

const secret = process.env.NEXT_PUBLIC_REVALIDATE_APP_KEY;

export async function POST(request) {
  const req = await request.json();

  try {
    const { type, slug, authorization } = req;

    if (authorization !== secret) {
      Response.json({ message: "Invalid signature" }, { status: 402 });
      return;
    }

    switch (type) {
      case "variant":
        revalidateTag(slug);
        return NextResponse.json(
          {
            message: `Revalidated ${slug} of ${type}`,
            secret: secret,
          },
          { status: 200 },
          { headers: corsHeaders }
        );
      case "all":
        revalidateTag(slug);
        return NextResponse.json({
          message: `Revalidated all api with the tag ${slug}`,
        });

      case "path":
        revalidatePath(slug, "layout");
        return NextResponse.json({
          message: `Revalidated the path "${slug}"`,
        });
    }
    return NextResponse.json(
      { message: "No tag found" },
      { status: 404 },
      { headers: corsHeaders }
    );
    // return Response.json({ message: "No tag found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With, Accept,",
};

export async function OPTIONS(req) {
  return NextResponse.json({}, { headers: corsHeaders });
}
