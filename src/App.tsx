import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// Yup schema for form validation
const schema = yup.object({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: yup.string().required("Email is required").email("Invalid email format"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer").min(18, "Must be at least 18 years old"),
});

type FormData = yup.InferType<typeof schema>;

function App() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert(`Hello ${data.name}! Your email is ${data.email} and you are ${data.age} years old.`);
        reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center space-x-4 mb-6">
                        <a
                            href="https://vite.dev"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity">
                            <img
                                src={viteLogo}
                                className="h-12 w-12"
                                alt="Vite logo"
                            />
                        </a>
                        <a
                            href="https://react.dev"
                            target="_blank"
                            className="hover:opacity-75 transition-opacity">
                            <img
                                src={reactLogo}
                                className="h-12 w-12 animate-spin"
                                alt="React logo"
                            />
                        </a>
                    </div>

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">React Hook Form + Yup</h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Enter your name"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Age
                            </label>
                            <input
                                {...register("age")}
                                type="number"
                                id="age"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.age ? "border-red-500" : "border-gray-300"
                                }`}
                                placeholder="Enter your age"
                            />
                            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}>
                            {isSubmitting ? "Submitting..." : "Submit Form"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>Try submitting the form with validation!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
