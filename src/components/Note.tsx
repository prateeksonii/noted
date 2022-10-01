import { FC, useState } from "react";
import { motion } from "framer-motion";
import { Note } from "../types/notes";
import useModal from "../hooks/useModal";
import { Dialog } from "@headlessui/react";

interface NoteCardProps {
  note: Note;
}

const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const { handleClose, isOpen, open } = useModal();

  const [noteValue, setNoteValue] = useState(note.note);

  const handleEditNote = () => {};

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
          initial={{ opacity: 0, translateY: "-100%" }}
          animate={{ opacity: 1, translateY: "0" }}
          onClick={open}
        >
          <div className="rounded bg-zinc-700 p-4">{note.note}</div>
        </motion.div>
      )}
    </>
  );
};

export default NoteCard;
