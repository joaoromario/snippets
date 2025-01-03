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

  return <div>{snippet?.title}</div>;
}
