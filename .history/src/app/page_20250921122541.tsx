import HomeSection from "@/components/HomeSection";

export default function Home() {
  return (
    // Kita gunakan Fragment (<>...</>) untuk membungkus beberapa komponen nantinya
    <>
      <HomeSection />
      {/* Nanti kita akan tambahkan komponen lain di sini, seperti About, Skills, dll. */}
    </>
  );
}
