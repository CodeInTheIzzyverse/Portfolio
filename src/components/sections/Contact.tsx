import "./Contact.scss"
import { Label } from "@/components/ui/pixelact-ui/label";
import { Input } from "@/components/ui/pixelact-ui/input";
import { Textarea } from "@/components/ui/pixelact-ui/textarea";
import { Button } from "@/components/ui/pixelact-ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/pixelact-ui/alert";
import { useRef } from "react";

function Contact() {
    const form = useRef<HTMLFormElement | null>(null);
    
    const sendEmail = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        const formData = new FormData(form.current);
        const data = Object.fromEntries(formData.entries());

        fetch("/.netlify/functions/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('SUCCESS!', data.message);
        })
        .catch((error) => {
            console.log('FAILED...', error);
        });
    };

    return (
        <section className="contact" id="contact">
            <h2>Contact</h2>
            <Alert className="contact-info">
                <AlertTitle>Email</AlertTitle>
                <AlertDescription>dev.izzyverse@gmail.com</AlertDescription>
            </Alert>
            <article className="contact-form">
                <h3>Contact me</h3>
                <form ref={form} onSubmit={sendEmail}>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" name="name" id="name" placeholder="John Doe" required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea name="message" id="message" required placeholder="Your message here..." />
                    </div>
                    <Button className="btn"><input type="submit" value="Send"/></Button>
                </form>
            </article>
        </section>
    );
}

export default Contact;