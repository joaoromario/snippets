import { db } from "@/app/db";
import { SnippetShowPageProps } from "@/app/snippets/interface";
import SnippetNotFound from "./not-found";

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  //delay to see the loading page
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return <SnippetNotFound params={{ id }} />;
  }

  return (
    <div>
      <div className="flex my-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-2">
          <button className="p-2 border rounded">Edit</button>
          <button className="p-2 border rounded">Delete</button>
        </div>
      </div>

      <pre className="p-3 border rounded bg-gray-200 border-gray-300">
        <code>{snippet?.code}</code>
      </pre>
    </div>
  );
}
