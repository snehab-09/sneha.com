import { NextResponse } from "next/server";

const PROJECT_ID =
  "prj_ZkUr6gp37TT7iB4zsHgMPffNDf8H";

const TEAM_ID =
  "team_dSxKpI9rwnjqI7kqOuSjXHdX";

export async function GET() {
  try {
    const token =
      process.env.VERCEL_ANALYTICS_TOKEN;

    if (!token) {
      return NextResponse.json(
        {
          error:
            "Analytics token is not configured.",
        },
        { status: 500 }
      );
    }

    const url =
      new URL(
        "https://api.vercel.com/v1/query/web-analytics/visits/count"
      );

    url.searchParams.set(
      "projectId",
      PROJECT_ID
    );

    url.searchParams.set(
      "teamId",
      TEAM_ID
    );

    const response =
      await fetch(url.toString(), {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
        cache: "no-store",
      });

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "Vercel Analytics API error:",
        errorText
      );

      return NextResponse.json(
        {
          error:
            "Failed to fetch analytics.",
        },
        { status: response.status }
      );
    }

    const data =
      await response.json();

    return NextResponse.json({
      views:
        data.data?.pageviews ?? 0,
    });
  } catch (error) {
    console.error(
      "Analytics route error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch view count.",
      },
      { status: 500 }
    );
  }
}