import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import { Note } from "../types/notes";
import AddNoteModal from "../components/AddNoteModal";

const IndexPage: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);

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
    <div className="container mx-auto flex h-screen flex-col p-4">
      <nav className="flex h-16 items-center gap-2">
        <MdOutlineStickyNote2 className="h-10 w-10" />
        <span className="text-2xl font-medium">Noted</span>
      </nav>

      <main className="relative h-[calc(100vh-4rem)]">
        <LayoutGroup>
          <motion.div className="flex flex-col gap-4 pt-4" layout>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, translateY: "-100%" }}
                animate={{ opacity: 1, translateY: "0" }}
              >
                <div className="rounded bg-zinc-700 p-4">{note.note}</div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
        <AddNoteModal notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
};

export default IndexPage;
