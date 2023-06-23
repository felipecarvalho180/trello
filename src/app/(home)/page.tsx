import { Header } from "~/components";
import Board from "~/app/(home)/Board";
import Modal from "./Modal";

export default function Home() {
  return (
    <main>
      <Modal />
      <Header />

      <Board />
    </main>
  );
}
