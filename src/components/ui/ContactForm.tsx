import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real app, you would send the data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4 w-full max-w-md"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-lg font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-lg font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-lg font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-[rgba(26,78,138,1)] hover:bg-[rgba(21,62,117,1)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSuccess && (
        <div className="p-2 bg-green-100 text-green-700 rounded-md text-center">
          Message sent successfully!
        </div>
      )}
    </form>
  );
};

export default ContactForm;
