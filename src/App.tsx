import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center space-x-4 mb-8">
                        <a
                            href="https://vite.dev"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity">
                            <img
                                src={viteLogo}
                                className="h-16 w-16"
                                alt="Vite logo"
                            />
                        </a>
                        <a
                            href="https://react.dev"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity">
                            <img
                                src={reactLogo}
                                className="h-16 w-16 animate-spin"
                                alt="React logo"
                            />
                        </a>
                    </div>

                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Vite + React + Tailwind</h1>

                    <div className="text-center">
                        <button
                            onClick={() => setCount((count) => count + 1)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 mb-4">
                            Count is {count}
                        </button>

                        <p className="text-gray-600 mb-4">
                            Edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/App.tsx</code> and save to test HMR
                        </p>

                        <p className="text-sm text-gray-500">Click on the Vite and React logos to learn more</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
