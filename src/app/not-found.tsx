import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16 flex-1 flex items-center">
        <div className="max-w-xl mx-auto px-6 py-32 text-center flex flex-col items-center gap-5">
          <span className="font-serif text-7xl font-bold text-gradient">404</span>
          <h1 className="font-serif text-3xl font-bold text-fg">
            This page does not exist
          </h1>
          <p className="text-fg-muted">
            The link may be out of date, or the page may have moved. Everything
            else is still where you left it.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <Button href="/">Back to home</Button>
            <Button href="/contact" variant="outline">
              Contact us
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
