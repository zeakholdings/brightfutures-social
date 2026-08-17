import { useMemo, useState } from "react";
import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { getPosts } from "@/lib/cms/server";
import type { Post } from "@/lib/cms/types";

export const Route = createFileRoute("/stories")({
  loader: async (): Promise<Post[]> => getPosts(),
  head: () => ({
    meta: [
      { title: "News & Stories | BrightFutures Greenwich" },
      {
        name: "description",
        content: "News and stories from BrightFutures Greenwich.",
      },
      {
        property: "og:title",
        content: "News & Stories | BrightFutures Greenwich",
      },
    ],
  }),
  component: StoriesRoute,
});
function StoriesRoute() {
  const isDetail = useRouterState({
    select: (state) => state.matches.some((match) => match.routeId === "/stories/$slug"),
  });
  return isDetail ? <Outlet /> : <Stories />;
}
const labels: Record<string, string> = {
  news: "News",
  society: "Society updates",
  "student-voice": "Student voice",
  opportunities: "Opportunities",
  events: "Event recaps",
  history: "BrightFutures history",
  podcast: "Podcast / Voices of Change",
};
function Stories() {
  const posts: Post[] = Route.useLoaderData();
  const [category, setCategory] = useState("all");
  const shown = useMemo(
    () => posts.filter((p) => category === "all" || p.category === category),
    [posts, category],
  );
  const categories = [
    ...new Set(posts.flatMap((p) => (p.category ? [p.category] : []))),
  ];
  return (
    <div>
      <PageHero
        eyebrow="News & Stories"
        title="What’s happening in our community."
        body="Updates, student voice and stories from BrightFutures Greenwich."
      />
      <section className="bg-cream px-6 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-4 border-b border-forest/20 pb-6">
            <button
              onClick={() => setCategory("all")}
              className={
                category === "all"
                  ? "font-semibold text-coral"
                  : "text-forest/60"
              }
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={
                  category === c ? "font-semibold text-coral" : "text-forest/60"
                }
              >
                {labels[c] || c}
              </button>
            ))}
          </div>
          {shown.length ? (
            <div className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-12">
              {shown.map((post, index) => (
                <article
                  key={post.slug}
                  className={`border-b-2 border-forest/20 py-9 ${index === 0 ? "md:col-span-2 lg:col-span-8" : index % 3 === 1 ? "lg:col-span-4" : "lg:col-span-6"}`}
                >
                  {post.featured_image ? (
                    <img
                      src={post.featured_image}
                      alt={post.featured_image_alt || ""}
                      className={`mb-6 w-full border-2 border-forest object-cover ${index === 0 ? "aspect-[16/8]" : "aspect-[4/3]"}`}
                    />
                  ) : null}
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-coral">
                    {post.category ? labels[post.category] : "Story"}
                  </p>
                  <h2 className={`mt-3 font-display leading-tight text-forest ${index === 0 ? "text-4xl sm:text-6xl" : "text-3xl"}`}>
                    <Link to="/stories/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt ? (
                    <p className="mt-4 text-forest/70">{post.excerpt}</p>
                  ) : null}
                  <p className="mt-5 text-sm text-forest/50">
                    {new Intl.DateTimeFormat("en-GB", {
                      dateStyle: "long",
                    }).format(new Date(post.published_at))}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="my-12 max-w-2xl border-l-4 border-coral bg-cream-dim px-6 py-5">
              <h2 className="font-display text-2xl text-forest">Stories from BrightFutures are coming soon.</h2>
              <p className="mt-3 leading-relaxed text-forest/65">
                We’ll share occasional society updates, student voice and highlights from across the year.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
