# Secure & ATS-Friendly CV Generator

[Español](README.es.md) | [English](README.md)

## Project Overview

This is a modern, privacy-focused web application designed to help users create professional, customizable CVs (resumes) in PDF format. Built with Next.js and React, the core innovation lies in its complete client-side PDF generation, ensuring that sensitive personal data never leaves the user's browser, thus enhancing security and privacy.

The application leverages the power of React Server Components for its landing page (optimizing for SEO and initial load) and then transitions to a client-heavy application for the interactive CV creation process, where all data handling and PDF generation occur in the user's browser.

## Features

*   **100% Client-Side PDF Generation:** Your personal data stays private and secure on your device. No data is ever sent to or stored on our servers.
*   **ATS-Friendly Output:** Generates PDFs with selectable, searchable text, making your CV easily parsable by Applicant Tracking Systems (ATS) and human readers.
*   **Multi-Language Support:** Generate CVs in multiple languages (currently English and Spanish, with easy expandability) using native browser internationalization APIs (`Intl.DateTimeFormat`) for accurate date formatting.
*   **Intuitive Form Interface:** A user-friendly form allows for easy input and management of all CV sections (personal info, experience, education, skills, projects, references).
*   **Real-time PDF Preview:** See your CV as it's being built with an integrated PDF viewer.
*   **Optimized Performance:** Leverages Next.js App Router for efficient code splitting and a fast initial loading experience.
## Technologies Used

*   **Next.js (App Router):** React framework for server-side rendering (SSR), static site generation (SSG), and API routes.
*   **React:** For building interactive user interfaces.
*   **TypeScript:** For type-safe development, improving code quality and maintainability.
*   **@react-pdf/renderer:** A powerful library for rendering React components into high-quality, selectable-text PDFs purely on the client-side.
*   **Intl.DateTimeFormat (Native Web API):** For robust and accurate date localization without external libraries.

## Getting Started

Follow these instructions to set up and run the project locally.


### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/AtaraBastruka/ats_cv_generator.git
    cd ats_cv_generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Development Server

1.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

## Usage

1.  **Landing Page:** Upon visiting the application, you'll land on an SSR-rendered introduction page highlighting the project's features and benefits.
2.  **Start Creating:** Click the "Start Your CV Now" button (or navigate to `/create`) to access the interactive CV builder.
3.  **Fill the Form:** Input your personal, experience, education, skills, projects, and reference information into the intuitive form fields.
4.  **Select Language:** Choose your desired language (English or Spanish) from the dropdown. Dates and potentially other static strings will update accordingly.
5.  **Preview & Download:**
    *   Toggle the "Show Preview" button to see a real-time rendition of your CV in PDF format.
    *   Click "Download PDF" to save the generated CV directly to your device.

## Project Structure (High-Level)

```
├── app/
│   ├── layout.tsx         # Root layout for global UI
│   ├── page.tsx           # SSR Landing Page (/)
│   │
│   └── create/            # CV creation flow (/create)
│       ├── page.tsx       # Main client-side CV form & PDF preview page ("use client")
│       └── components/    # Components specific to the CV creation process
│           ├── CvForm.tsx # Client-side component for input fields
│           └── ...        # Other form-related sub-components
│
├── components/            # Reusable UI components (e.g., Header, Footer)
│   └── MyCvDocument.tsx   # The core @react-pdf/renderer document definition (no "use client")
│
├── public/                # Static assets (e.g., images)
└── ...
```
## Key Design Decisions

*   **Client-Side Data Privacy:** The primary design choice was to keep all user data and PDF generation exclusively in the browser. This eliminates the need for server-side data storage, enhancing user trust and simplifying data privacy compliance.
*   **ATS Compatibility with `react-pdf/renderer`:** Unlike `html2canvas` which creates image-based PDFs, `@react-pdf/renderer` was chosen specifically because it renders React components into true vector PDFs with selectable, searchable text, crucial for modern recruiting processes.
*   **Internationalization (i18n) with `Intl.DateTimeFormat`:** Instead of relying on heavy third-party libraries or manual string mappings for dates, the native `Intl.DateTimeFormat` API is used for efficient and accurate month/year translations and formatting. Custom capitalization logic is applied for specific locales (e.g., Spanish) to align with common CV formatting conventions.
*   **Next.js App Router for Hybrid Rendering:** The App Router enables a flexible rendering strategy:
    *   The landing page (`/`) is a **Server Component**, benefiting from faster initial load and SEO.
    *   The interactive CV builder (`/create`) is a **Client Component**, enabling rich user interaction and client-side execution for PDF generation.
*   **Dynamic Imports for Client-Only Libraries:** `@react-pdf/renderer` components like `PDFViewer` are dynamically imported with `ssr: false` to ensure they are only loaded and executed in the browser environment, preventing Next.js server-side build errors.

## Future Enhancements (Ideas)

*   **More CV Templates/Designs:** Offer a variety of professional-looking templates.
*   **Drag-and-Drop Reordering:** Allow users to reorder sections (e.g., experience, education).
*   **User Accounts (Optional):** If user data storage becomes a requested feature (with appropriate privacy considerations), implement secure authentication and database.
*   **More Languages:** Expand localization to include French, German, Portuguese, etc.
*   **PDF Upload for Editing:** Enable users to upload existing PDFs to populate the form fields.
*   **Improved Form Validation and Error Handling.**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
