import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

type FormData = {
    name: string;
    email: string;
    age: number;
};

function App() {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === "ar";

    // Create Yup schema with translated messages
    const createSchema = () =>
        yup.object({
            name: yup.string().required(t("validation.nameRequired")).min(2, t("validation.nameMinLength")),
            email: yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")),
            age: yup
                .number()
                .required(t("validation.ageRequired"))
                .positive(t("validation.agePositive"))
                .integer(t("validation.ageInteger"))
                .min(18, t("validation.ageMinimum")),
        });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        resolver: yupResolver(createSchema()),
    });

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert(
            t("success.hello", {
                name: data.name,
                email: data.email,
                age: data.age,
            })
        );
        reset();
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === "en" ? "ar" : "en";
        i18n.changeLanguage(newLang);
    };

    return (
        <div
            className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 ${isRTL ? "rtl" : "ltr"} bg-black`}
            dir={isRTL ? "rtl" : "ltr"}>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-8">
                    {/* Language Toggle Button */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleLanguage}
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200">
                            {t("language.switch")}
                        </button>
                    </div>

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

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">{t("title")}</h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                {t("form.name")}
                            </label>
                            <input
                                {...register("name")}
                                type="text"
                                id="name"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                } ${isRTL ? "text-right" : "text-left"}`}
                                placeholder={t("form.namePlaceholder")}
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                {t("form.email")}
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                id="email"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } ${isRTL ? "text-right" : "text-left"}`}
                                placeholder={t("form.emailPlaceholder")}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label
                                htmlFor="age"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                {t("form.age")}
                            </label>
                            <input
                                {...register("age")}
                                type="number"
                                id="age"
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                    errors.age ? "border-red-500" : "border-gray-300"
                                } ${isRTL ? "text-right" : "text-left"}`}
                                placeholder={t("form.agePlaceholder")}
                            />
                            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}>
                            {isSubmitting ? t("form.submitting") : t("form.submit")}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>{t("form.trySubmitting")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
