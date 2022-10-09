import { Dialog } from "@headlessui/react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { MdAdd, MdCheck } from "react-icons/md";
import { motion } from "framer-motion";
import useModal from "../hooks/useModal";
import { Note } from "@prisma/client";
import { trpc } from "../utils/trpc";
import { useAtom } from "jotai";
import userAtom from "../atoms/userAtom";
import { nanoid } from "nanoid";

interface AddNoteModalProps {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

const AddNoteModal: FC<AddNoteModalProps> = ({ notes, setNotes }) => {
  const [user] = useAtom(userAtom);
  const { isOpen, open, handleClose } = useModal();
  const [note, setNote] = useState("");

  const { mutateAsync } = trpc.useMutation("notes.create");
  const ctx = trpc.useContext();

  const handleAddNote = async () => {
    if (note === "") {
      return;
    }

    if (user) {
      await mutateAsync({
        note,
      });

      ctx.invalidateQueries(["notes.all"]);
    } else {
      const newNote: Note = {
        id: nanoid(),
        note,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "draft",
      };

      setNotes([newNote, ...notes]);
      setNote("");
    }
  };
  return (
    <>
      {isOpen ? (
        <button
          className="absolute -top-4 -right-0 bottom-auto z-10 grid h-12 w-12 place-items-center items-center gap-1 rounded-full bg-green-600 !p-0 py-2 px-4 font-medium transition-all hover:bg-sky-800 md:hidden"
          onClick={handleAddNote}
        >
          <MdCheck className="text-2xl" />
        </button>
      ) : (
        <button
          className="absolute bottom-1 right-1 flex items-center gap-1 rounded-full bg-sky-600 py-2 px-4 font-medium transition-all hover:bg-sky-800 md:static"
          onClick={open}
        >
          <>
            <MdAdd />
            <span>Add note</span>
          </>
        </button>
      )}
      <Dialog
        open={isOpen}
        onClose={() => handleClose(handleAddNote)}
        className="fixed top-20 bottom-10 left-10 right-10 rounded border bg-zinc-800 p-4 md:absolute md:mx-auto md:w-1/3"
        as={motion.div}
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.2 } }}
        exit={{ scale: 0, transition: { duration: 1 } }}
      >
        <Dialog.Panel className="flex h-full flex-col">
          <Dialog.Title className="text-2xl font-medium">
            What&apos;s on your mind?
          </Dialog.Title>
          <Dialog.Description className="text-sm text-zinc-400">
            Hint: Press Esc to save and exit.
          </Dialog.Description>
          <div className="my-2 h-full">
            <textarea
              name="note"
              id="note"
              className="h-full w-full rounded border-none border-zinc-700 bg-inherit outline-none transition-all duration-1000 placeholder:text-zinc-500"
              placeholder="Take a note..."
              onChange={(e) => setNote(e.target.value)}
              value={note}
            />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default AddNoteModal;
