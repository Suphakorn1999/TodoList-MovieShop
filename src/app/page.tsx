import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <h1 className="text-5xl font-bold text-white mb-12">Welcome to My Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4">📝 Todo List</h2>
          <p className="text-gray-600 mb-6">Manage your daily tasks</p>
          <Link href="/todolist" className="inline-block bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700">
            Enter App
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:scale-105 transition">
          <h2 className="text-2xl font-bold mb-4">🎬 Movie Shop</h2>
          <p className="text-gray-600 mb-6">Shop and stream your favorite movies</p>
          <Link href="/movieshop" className="inline-block bg-purple-600 text-white px-5 py-3 rounded-lg hover:bg-purple-700">
            Enter App
          </Link>
        </div>
      </div>
    </div>
  );
}
