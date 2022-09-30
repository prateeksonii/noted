import type { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { AnimateSharedLayout, motion } from "framer-motion";

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

  useEffect(() => {
    const notes = localStorage.getItem("noted_notes");
    if (notes) {
      setNotes(JSON.parse(notes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("noted_notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <div className="container mx-auto p-4">
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

        <AnimateSharedLayout>
          <motion.div className="mt-4 flex flex-col gap-4" layout>
            {notes.map((note) => (
              <motion.div
                layout
                initial={{ opacity: 0, translateY: "-100%" }}
                animate={{ opacity: 1, translateY: "0" }}
              >
                <div key={note.id} className="rounded bg-zinc-700 p-4">
                  {note.note}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimateSharedLayout>
      </main>
    </div>
  );
};

export default IndexPage;
