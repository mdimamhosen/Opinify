# Opinify

Opinify is an anonymous feedback platform that allows users to share and receive feedback without revealing their identities. It is designed to facilitate honest and unfiltered communication for personal and professional purposes.

## Features

- **Anonymous Feedback:** Users can give and receive feedback without disclosing their identity.
- **User-Friendly Interface:** Clean and intuitive UI for an enhanced user experience.
- **Message Carousel:** View feedback messages in a carousel format for easy browsing.
- **Responsive Design:** Optimized for various devices and screen sizes.
- **AI Suggestions:** Integrated AI suggestions for personalized feedback and recommendations.

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Mongoose (for MongoDB), TypeScript
- **Validation:** Zod (for schema validation)
- **UI Components:** Shadcn (UI component library)
- **Carousel:** Embla Carousel
- **Icons:** Lucide Icons

## Getting Started

To get started with Opinify locally, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mdimamhosen/opinify.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd opinify
   ```

3. **Create a `.env` File**

   Create a `.env` file in the root directory of the project and add the following environment variables:

   ```plaintext
   MONGODB_URI=your_mongodb_uri_here
   RESEND_EMAIL_API_KEY=your_resend_email_api_key_here
   SECRET=your_secret_key_here
   OPENAI_API_KEY=your_openai_api_key_here
   PASSWORD=your_password_here
   EMAIL=your_email_here
   ```

4. **Install Dependencies**

   ```bash
   npm install
   ```

5. **Run the Development Server**

   ```bash
   bun run dev
   ```

   Your application should be running at `http://localhost:3000`.

## Usage

- **View Feedback:** Navigate to the main page to see a carousel of anonymous feedback messages.
- **AI Suggestions:** Utilize AI-driven suggestions for enhanced feedback.
- **About:** Learn more about Opinify and the developer in the "About" section.
- **Contact:** Reach out via email for inquiries or collaborations in the "Get in Touch" section.

## Development

### Setting Up TypeScript

Ensure TypeScript is properly configured in the project:

1. **Install TypeScript**

   ```bash
   npm add typescript @types/node @types/react
   ```

2. **Initialize TypeScript Configuration**

   ```bash
   npm run tsc --init
   ```

### Validation with Zod

Zod is used for validating schemas in the project. To use Zod:

1. **Install Zod**

   ```bash
   npm add zod
   ```

2. **Implement Schema Validation**

   Create schemas for validation in the project using Zod.

### Mongoose Integration

Mongoose is used for MongoDB data modeling. To use Mongoose:

1. **Install Mongoose**

   ```bash
   npm add mongoose
   ```

2. **Setup Mongoose Models**

   Configure and use Mongoose models for database interactions.

### Shadcn UI Components

Shadcn provides UI components used in Opinify. To use Shadcn:

1. **Install Shadcn**

   ```bash
   npm add shadcn
   ```

2. **Integrate Shadcn Components**

   Utilize Shadcn components for building the user interface.

## Contact

This project was developed by **Md Imam Hosen**. For any inquiries or collaborations, you can reach me at:

- **Email:** [mdimam.cse9.bu@gmail.com](mailto:mdimam.cse9.bu@gmail.com)

## Acknowledgements

- **Next.js:** A React framework for building fast and user-friendly web applications.
- **Tailwind CSS:** A utility-first CSS framework for building modern UI.
- **Embla Carousel:** A lightweight carousel component for React.
- **Lucide Icons:** A collection of icons for use in React applications.
- **Shadcn:** UI component library for modern design.
- **Zod:** TypeScript-first schema validation library.
- **Mongoose:** MongoDB object modeling for Node.js.
- **TypeScript:** A strongly typed programming language for better development experience.
