import { Link } from "@/components/Link";

export default function Home() {
  return (
    <div>
      <nav className="space-y-2 flex flex-col mb-4">
        <Link href="/profile" className="block p-2 bg-blue-500 text-white rounded">
          Profile
        </Link>
        <Link href="/settings" className="block p-2 bg-green-500 text-white rounded">
          Settings
        </Link>
      </nav>
      <h1 className="text-2xl font-bold mb-4">홈페이지</h1>
      <p className="mb-4">나야, 홈화면</p>
    </div>
  );
}
