"use client";

import { createSnippet } from "@/actions/index";
import { useActionState } from "react";

export default function SnippetCreatePage() {
  const [formState, action] = useActionState(createSnippet, { message: "" });

  return (
    <form action={action}>
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

        {formState.message ? (
          <div className="text-red-500 my-1">{formState.message}</div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
