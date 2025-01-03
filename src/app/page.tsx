import { db } from "@/app/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id}>
        <h3 className="font-bold">{snippet.title}</h3>
      </div>
    );
  });

  return (
    <div>
      <h1>Home Page</h1>
      {renderedSnippets}
    </div>
  );
}
