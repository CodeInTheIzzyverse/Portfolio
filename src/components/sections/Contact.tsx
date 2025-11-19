import "./Contact.scss"
import { Label } from "@/components/ui/pixelact-ui/label";
import { Input } from "@/components/ui/pixelact-ui/input";
import { Textarea } from "@/components/ui/pixelact-ui/textarea";
import { Button } from "@/components/ui/pixelact-ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/pixelact-ui/alert";
import { useEffect, useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    message: string;
}

function Contact() {
    const form = useRef<HTMLFormElement | null>(null);
    const [success, setSuccess] = useState<boolean | null>(null);
    const { register, formState: { errors }, handleSubmit, reset } = useForm<FormData>();

    useEffect(() => {
        if (success !== null) {
            const timer = setTimeout(() => {
                setSuccess(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success]);

    const sendEmail: SubmitHandler<FormData> = (data) => {
        if (!data.name || !data.email || !data.message) return;

        fetch("/.netlify/functions/sendEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async response => {
                if (response.status === 429) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Rate limit exceeded (429)`);
                }

                if (!response.ok) {
                    const errorBody = await response.json(); // Leer el cuerpo de error si no es 429
                    throw new Error(errorBody.message || `HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log('SUCCESS!', data.message);
                setSuccess(true);
            })
            .catch((error) => {
                console.log('FAILED...', error);
                setSuccess(false);
            });

        reset();
    };

    return (
        <>
            <section className="contact" id="contact">
                <h2>Contact</h2>
                <Alert className="contact-info">
                    <AlertTitle>Email</AlertTitle>
                    <AlertDescription>
                        dev.izzyverse@gmail.com <br />
                        +57 319 432 7423
                    </AlertDescription>
                </Alert>
                <article className="contact-form">
                    <h3>Contact me</h3>
                    <form ref={form} onSubmit={handleSubmit(sendEmail)}>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                {...register("name", { required: true, minLength: 3, maxLength: 50 })}
                            />
                            {
                                errors.name?.type === "required" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Name is required</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.name?.type === "minLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Name must be at least 3 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.name?.type === "maxLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Name must be at most 50 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="john@example.com"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    minLength: 3,
                                    maxLength: 50
                                })}
                            />
                            {
                                errors.email?.type === "required" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Email is required</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.email?.type === "pattern" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Email format is invalid</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.email?.type === "minLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Email must be at least 3 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.email?.type === "maxLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Email must be at most 50 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                        </div>
                        <div>
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Your message here..."
                                {...register("message", { required: true, minLength: 3, maxLength: 1000 })}
                            />
                            {
                                errors.message?.type === "required" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Message is required</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.message?.type === "minLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Message must be at least 3 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                            {
                                errors.message?.type === "maxLength" && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>Message must be at most 1000 characters</AlertDescription>
                                    </Alert>
                                )
                            }
                        </div>
                        <Button className="btn"><input type="submit" value="Send" /></Button>
                    </form>
                </article>
            </section>
            {
                success === true &&
                <div className="alert success">
                    <Alert variant="success">
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your message has been sent successfully</AlertDescription>
                    </Alert>
                </div>
            }
            {
                success === false &&
                <div className="alert error">
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>An error occurred while sending your message</AlertDescription>
                    </Alert>
                </div>
            }
        </>
    );
}

export default Contact;