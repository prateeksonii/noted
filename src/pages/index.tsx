import type { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { MdAdd, MdCheck, MdOutlineStickyNote2 } from "react-icons/md";
import { AnimateSharedLayout, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { Note } from "../types/notes";
import Modal from "../components/Modal";

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

      <main className="relative h-full">
        <AnimateSharedLayout>
          <motion.div className="mt-4 flex flex-col gap-4" layout>
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
        </AnimateSharedLayout>
        <Modal notes={notes} setNotes={setNotes} />
      </main>
    </div>
  );
};

export default IndexPage;
