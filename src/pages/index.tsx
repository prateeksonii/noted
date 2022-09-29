import type { NextPage } from "next";
import { FormEventHandler, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";

type Note = {
  id: number;
  note: string;
  createdAt: string;
};

const IndexPage: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const note = formData.get("note") as string;

    const newNote: Note = {
      id: notes.length + 1,
      note,
      createdAt: Date.now().toString(),
    };

    setNotes([newNote, ...notes]);
  };

  return (
    <div className="container p-4">
      <nav className="flex items-center gap-2">
        <MdOutlineStickyNote2 className="h-10 w-10" />
        <span className="text-2xl font-medium">Noted</span>
      </nav>

      <main className="my-8">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="note"
            id="note"
            className="w-full rounded border-zinc-700 bg-zinc-900 placeholder:text-zinc-500"
            placeholder="Take a note..."
          />
          <input type="submit" value="" />
        </form>

        <div className="mt-4 flex flex-col gap-4">
          {notes.map((note) => (
            <div key={note.id} className="rounded bg-zinc-700 p-4">
              {note.note}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IndexPage;
