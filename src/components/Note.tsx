import { FC, useState } from "react";
import { motion } from "framer-motion";
import useModal from "../hooks/useModal";
import { Dialog } from "@headlessui/react";
import { useAtom } from "jotai";
import notesAtom from "../atoms/notesAtom";
import { Note } from "@prisma/client";
import userAtom from "../atoms/userAtom";
import { trpc } from "../utils/trpc";

interface NoteCardProps {
  note: Note;
}

const useNotesCard = (note: Note) => {
  const [user] = useAtom(userAtom);
  const [notes, setNotes] = useAtom(notesAtom);
  const [noteValue, setNoteValue] = useState(note.note);

  const { mutateAsync: mutateAsyncDelete } = trpc.useMutation("notes.delete");
  const { mutateAsync: mutateAsyncUpdate } = trpc.useMutation("notes.update");

  const deleteNote = (id: string) => {
    if (user) {
      mutateAsyncDelete({
        noteId: note.id,
      });
    }
    let newNotes = [...notes];
    newNotes = newNotes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const updateNote = (id: string) => {
    if (user) {
      mutateAsyncUpdate({
        noteId: note.id,
        note: noteValue,
      });
    }

    const newNotes = [...notes];
    const index = newNotes.findIndex((note) => note.id === id);
    newNotes[index] = { ...note, note: noteValue };
    setNotes(newNotes);
  };

  const handleEditNote = () => {
    if (noteValue === "") {
      return deleteNote(note.id);
    }

    updateNote(note.id);
  };

  return { handleEditNote, setNoteValue, noteValue };
};

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const { handleClose, isOpen, open } = useModal();

  const { handleEditNote, noteValue, setNoteValue } = useNotesCard(note);

  return (
    <>
      {isOpen ? (
        <>
          <Dialog
            open={isOpen}
            onClose={() => handleClose(handleEditNote)}
            className="fixed top-20 bottom-10 left-10 right-10 rounded border bg-zinc-800 p-4"
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.2 } }}
            exit={{ scale: 0, transition: { duration: 1 } }}
          >
            <Dialog.Panel className="flex h-full flex-col">
              <Dialog.Title className="text-2xl font-medium">
                Edit Note
              </Dialog.Title>
              <div className="my-2 h-full">
                <textarea
                  name="note"
                  id="note"
                  className="h-full w-full rounded border-none border-zinc-700 bg-inherit outline-none transition-all duration-1000 placeholder:text-zinc-500"
                  placeholder="Take a note..."
                  onChange={(e) => setNoteValue(e.target.value)}
                  value={noteValue}
                />
              </div>
            </Dialog.Panel>
          </Dialog>
        </>
      ) : (
        <motion.div
          layout
          className="-translate-y-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, translateY: "0" }}
          onClick={open}
        >
          <div className="break-words rounded bg-zinc-700 p-4 md:h-full md:min-w-[200px] md:p-8">
            {note.note.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default NoteCard;
