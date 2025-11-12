# Pixora - Bold Futuristic Pitch Deck

This project is a storytelling-driven single-page application (SPA) built with Next.js and React, featuring GSAP animations for a dynamic and engaging user experience. It serves as a futuristic pitch deck, showcasing various aspects of a business or product through distinct, scrollable sections.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **GSAP (GreenSock Animation Platform)**: A powerful JavaScript library for creating high-performance animations.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **CSS Modules**: For scoped styling of components.

## Project Structure

The application is structured into several key components, each representing a section of the pitch deck:

- `app/layout.tsx`: Defines the root layout of the application, including the `Navbar` and global CSS.
- `app/page.tsx`: The main page component that orchestrates the display of various sections.
- `components/Navbar.tsx`: Navigation bar for the application.
- `components/HeroSection.tsx`: The initial, attention-grabbing section of the pitch deck.
- `components/ProblemSolutionSection.tsx`: Details the problem and the proposed solution.
- `components/WhyLinkedInSection.tsx`: Explains the rationale or unique selling proposition.
- `components/ServicesPricingSection.tsx`: Outlines the services offered and their pricing.
- `components/CaseStudiesSection.tsx`: Presents real-world examples or success stories.
- `components/HowWeDoItSection.tsx`: Describes the methodology or process.
- `components/CallToActionSection.tsx`: Encourages user engagement or next steps.
- `components/ParallaxCanvas.tsx`: Likely handles parallax effects or canvas-based animations.
- `components/SolutionHeading.tsx`: A reusable component for section headings.
- `lib/gsap.ts`: Configuration or utility functions related to GSAP animations.
- `public/images/pixoralogo.png`: Project logo or branding image.

## Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sarayu-uu/pix.git
    cd pixora
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Key Features

-   **Single-Page Application (SPA)**: All content is presented on a single page for a seamless user experience.
-   **Storytelling-Driven Design**: Content is structured to guide the user through a narrative.
-   **GSAP Animations**: Smooth and engaging animations enhance the user interface and experience.
-   **Modular Component Structure**: Easy to maintain and extend with distinct components for each section.
-   **TypeScript**: Provides type safety and improves code quality.
