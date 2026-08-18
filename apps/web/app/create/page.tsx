import Footer from "@/components/home/footer";
import Navbar from "@/components/home/navbar";
import RoomTerminal from "@/components/form/roomTerminal";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <RoomTerminal />
      </main>

      <Footer />
    </div>
  );
}
