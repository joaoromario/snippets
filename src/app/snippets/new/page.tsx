import { db } from "@/app/db";
import { redirect } from "next/navigation";
export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    //server action
    "use server";

    //check user's inputs and make sure they are valid
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    const language = formData.get("language") as string;

    //create new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
        language,
      },
    });
    console.log(snippet);

    //redirect user back to the root route
    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12 flex items-center">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12 flex items-center">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="language" className="w-auto flex items-center">
            Language
          </label>
          <select
            name="language"
            className="border rounded p-2 w-full"
            id="language"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
