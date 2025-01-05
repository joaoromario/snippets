import { db } from "@/app/db";
import { SnippetShowPageProps } from "@/app/snippets/interface";
import SnippetNotFound from "./not-found";
// import { notFound } from "next/navigation";
import Link from "next/link";
import { deleteSnippet } from "@/actions/index";

export default async function SnippetShowPage({
  params,
}: SnippetShowPageProps) {
  //delay to see the loading page
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = await params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(data.id) },
  });

  if (!snippet) {
    return <SnippetNotFound params={{ id: params.id }} />;
    // return notFound();
  }

  const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex my-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-300">
        <code>{snippet?.code}</code>
      </pre>
    </div>
  );
}
