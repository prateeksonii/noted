import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import { Note } from "../types/notes";
import AddNoteModal from "../components/AddNoteModal";
import NoteCard from "../components/Note";
import { useAtom } from "jotai";
import notesAtom from "../atoms/notesAtom";
import Nav from "../components/common/Nav";

const IndexPage: NextPage = () => {
  const [notes, setNotes] = useAtom(notesAtom);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("noted_notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <div className="container mx-auto flex h-full flex-col p-4">
      <Nav />
      <main className="relative h-[calc(100vh-4rem)]">
        <AddNoteModal notes={notes} setNotes={setNotes} />
        <LayoutGroup>
          <motion.div
            className="flex flex-col gap-4 overflow-ellipsis pt-4 md:grid md:grid-cols-[repeat(auto-fit,minmax(min(10rem,100%),1fr))] md:gap-8"
            layout
          >
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </motion.div>
        </LayoutGroup>
      </main>
    </div>
  );
};

export default IndexPage;
