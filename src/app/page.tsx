import Link from "next/link";
import { db } from "@/app/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className="flex justify-between items-center p-2 border rounded"
        href={`/snippets/${snippet.id}`}
      >
        <h3 className="font-bold">{snippet.title}</h3>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex my-2 justify-between items-center">
        <h1 className="font-bold text-2xl">Snippets</h1>
        <Link href="/snippets/new" className="border rounded p-2">
          New snippet
        </Link>
      </div>

      <div className="flex flex-col gap-2">{renderedSnippets}</div>
    </div>
  );
}
