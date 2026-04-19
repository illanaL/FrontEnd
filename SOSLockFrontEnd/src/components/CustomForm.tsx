import { useState } from "react";

interface FormData { name: string; email: string}

export function ContactForm() {

    const [form, setForm] = useState<FormData>({ name: "", email: ""});

    const updateField = (field: keyof FormData) =>

        (e: React.ChangeEvent<HTMLInputElement>) =>

            setForm({ ...form, [field]: e.target.value });

    return (

        <form>

            <input value={form.name} onChange={updateField("name")} />

            <input value={form.email} onChange={updateField("email")} />

        </form>

    );

}