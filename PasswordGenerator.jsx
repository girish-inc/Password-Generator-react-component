import { useState, useCallback, useEffect, useRef } from "react";

export default function PasswordGenerator() {
    const [length, setLength] = useState(8);
    const [numbersAllowed, setNumbersAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");
    const [showCopied, setShowCopied] = useState(false);
    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if (numbersAllowed) str += "0123456789";
        if (charAllowed) str += "!@#$%^&*-+=[]{}~`";
        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numbersAllowed, charAllowed]);

    useEffect(() => {
        passwordGenerator();
    }, [passwordGenerator, length, numbersAllowed, charAllowed]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0, 101);
        window.navigator.clipboard.writeText(password);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    }, [password]);

    return (
        <div className="w-full max-w-lg mx-auto shadow-lg rounded-xl p-8 my-12 bg-slate-900 text-gray-100 font-sans transition-all duration-300 ease-in-out">
            <h1 className="text-2xl font-semibold text-gray-100 text-center mb-8">Password Generator</h1>
            <div className="flex rounded-lg overflow-hidden mb-6 bg-slate-800/50 backdrop-blur-sm shadow-inner">
                <input
                    type="text"
                    value={password}
                    className="w-full py-3 px-4 bg-transparent text-gray-100 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
                    placeholder="Generated Password"
                    readOnly
                    ref={passwordRef}
                />
                <button
                    onClick={copyPasswordToClipboard}
                    className="bg-teal-600 text-white px-6 py-3 hover:bg-teal-500 active:bg-teal-700 font-medium text-sm uppercase tracking-wide transition-all duration-200"
                >
                    Copy
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={6}
                        max={30}
                        value={length}
                        className="w-full h-2 bg-slate-600 rounded-lg cursor-pointer accent-teal-500 transition-all duration-200 hover:accent-teal-400"
                        onChange={(e) => setLength(e.target.value)}
                    />
                    <label className="text-gray-100 font-medium whitespace-nowrap">Length: {length}</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={numbersAllowed}
                        id="numberInput"
                        className="w-5 h-5 accent-teal-500 rounded focus:ring-2 focus:ring-teal-400 transition-all duration-200"
                        onChange={() => setNumbersAllowed((prev) => !prev)}
                    />
                    <label htmlFor="numberInput" className="text-gray-100 font-medium">Numbers</label>
                </div>
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        checked={charAllowed}
                        id="characterInput"
                        className="w-5 h-5 accent-teal-500 rounded focus:ring-2 focus:ring-teal-400 transition-all duration-200"
                        onChange={() => setCharAllowed((prev) => !prev)}
                    />
                    <label htmlFor="characterInput" className="text-gray-100 font-medium">Special Characters</label>
                </div>
            </div>
            {showCopied && (
                <div className="mt-6 text-center bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md font-medium animate-fade-in-up">
                    Copied to Clipboard!
                </div>
            )}
        </div>
    );
}